class ChatInterface {
    constructor() {
        this.messages = [];
        this.apiEndpoint = '/api/chat';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadChatHistory();
        this.updateTemperatureDisplay();
    }

    setupEventListeners() {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');
        const temperatureSlider = document.getElementById('temperature-slider');

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        temperatureSlider.addEventListener('input', () => {
            this.updateTemperatureDisplay();
        });
    }

    updateTemperatureDisplay() {
        const slider = document.getElementById('temperature-slider');
        const display = document.getElementById('temperature-value');
        display.textContent = slider.value;
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage('user', message);
        input.value = '';

        this.showTypingIndicator();

        try {
            const response = await this.callAPI(message);
            this.hideTypingIndicator();
            this.addMessage('assistant', response);
        } catch (error) {
            this.hideTypingIndicator();
            
            let userMessage = 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
            if (error.message) {
                userMessage = error.message;
            }
            
            this.addMessage('system', `❌ ${userMessage}`);
            console.error('Chat API Error:', error);
            
            if (error.message.includes('Netzwerkfehler') || error.message.includes('Server-Fehler')) {
                this.showRetryOption(message);
            }
        }

        this.saveChatHistory();
    }

    async callAPI(message) {
        const model = document.getElementById('model-select').value;
        const temperature = parseFloat(document.getElementById('temperature-slider').value);
        const maxTokens = parseInt(document.getElementById('max-tokens-input').value);

        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    model: model,
                    temperature: temperature,
                    max_tokens: maxTokens,
                    conversation_history: this.messages.slice(-10) // Last 10 messages for context
                })
            });

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                
                try {
                    const errorData = await response.json();
                    if (errorData.error) {
                        errorMessage = errorData.error;
                    }
                } catch (parseError) {
                }

                switch (response.status) {
                    case 401:
                        errorMessage = 'API-Authentifizierung fehlgeschlagen. Bitte überprüfen Sie die OpenAI API-Konfiguration.';
                        break;
                    case 429:
                        errorMessage = 'API-Rate-Limit erreicht. Bitte warten Sie einen Moment und versuchen Sie es erneut.';
                        break;
                    case 500:
                        errorMessage = 'Server-Fehler. Bitte versuchen Sie es später erneut.';
                        break;
                    case 503:
                        errorMessage = 'Service vorübergehend nicht verfügbar. Bitte versuchen Sie es später erneut.';
                        break;
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();
            
            if (!data.response) {
                throw new Error('Ungültige Antwort vom Server erhalten.');
            }
            
            return data.response;
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Netzwerkfehler: Verbindung zum Server fehlgeschlagen. Bitte überprüfen Sie Ihre Internetverbindung.');
            }
            throw error;
        }
    }

    addMessage(role, content) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${role}-message`;
        
        const timestamp = new Date().toLocaleTimeString('de-DE');
        
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="message-role">${this.getRoleDisplayName(role)}</span>
                <span class="message-time">${timestamp}</span>
            </div>
            <div class="message-content">${this.formatMessage(content)}</div>
        `;

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.messages.push({ role, content, timestamp });
    }

    getRoleDisplayName(role) {
        const roleNames = {
            'user': 'Sie',
            'assistant': 'AI Assistant',
            'system': 'System'
        };
        return roleNames[role] || role;
    }

    formatMessage(content) {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        const typingElement = document.createElement('div');
        typingElement.className = 'message assistant-message typing-indicator';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="message-header">
                <span class="message-role">AI Assistant</span>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    showRetryOption(originalMessage) {
        const messagesContainer = document.getElementById('chat-messages');
        const retryElement = document.createElement('div');
        retryElement.className = 'message system-message retry-option';
        retryElement.innerHTML = `
            <div class="message-content">
                <button onclick="window.chatInterface.retryMessage('${originalMessage.replace(/'/g, "\\'")}')">
                    🔄 Nachricht erneut senden
                </button>
            </div>
        `;
        messagesContainer.appendChild(retryElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async retryMessage(message) {
        const retryOptions = document.querySelectorAll('.retry-option');
        retryOptions.forEach(option => option.remove());
        
        document.getElementById('chat-input').value = message;
        await this.sendMessage();
    }

    clearChat() {
        this.messages = [];
        document.getElementById('chat-messages').innerHTML = '';
        this.saveChatHistory();
    }

    saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.messages));
    }

    loadChatHistory() {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            this.messages = JSON.parse(saved);
            this.messages.forEach(msg => {
                this.addMessageToDisplay(msg.role, msg.content, msg.timestamp);
            });
        }
    }

    addMessageToDisplay(role, content, timestamp) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${role}-message`;
        
        const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString('de-DE') : new Date().toLocaleTimeString('de-DE');
        
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="message-role">${this.getRoleDisplayName(role)}</span>
                <span class="message-time">${timeStr}</span>
            </div>
            <div class="message-content">${this.formatMessage(content)}</div>
        `;

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function sendMessage() {
    if (window.chatInterface) {
        window.chatInterface.sendMessage();
    }
}

function clearChat() {
    if (window.chatInterface) {
        window.chatInterface.clearChat();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.chatInterface = new ChatInterface();
});
