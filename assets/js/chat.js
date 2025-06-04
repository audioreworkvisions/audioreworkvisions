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
            this.addMessage('system', 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.');
            console.error('Chat API Error:', error);
        }

        this.saveChatHistory();
    }

    async callAPI(message) {
        const model = document.getElementById('model-select').value;
        const temperature = parseFloat(document.getElementById('temperature-slider').value);
        const maxTokens = parseInt(document.getElementById('max-tokens-input').value);

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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
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
