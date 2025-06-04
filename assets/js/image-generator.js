class ImageGenerator {
    constructor() {
        this.apiEndpoint = '/api/generate-image';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedPrompts();
        this.loadUserProfile();
        
        const username = localStorage.getItem('username');
        if (username) {
            this.showProfile(username);
        }
    }

    setupEventListeners() {
        const promptInput = document.getElementById('prompt');
        
        promptInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.generateImage();
            }
        });
    }

    showLogin() {
        document.getElementById('login-form').style.display = 'block';
    }

    login() {
        const username = document.getElementById('username-input').value;
        if (username) {
            localStorage.setItem('username', username);
            this.showProfile(username);
        }
    }

    showProfile(username) {
        document.getElementById('username').textContent = username;
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('profile').style.display = 'flex';
        document.getElementById('login-form').style.display = 'none';
    }

    logout() {
        localStorage.removeItem('username');
        document.getElementById('login-button').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
    }

    loadUserProfile() {
        const profilePicture = 'assets/images/profile-picture.png';
        const username = localStorage.getItem('username') || 'Gast';

        const profileImg = document.querySelector('.profile-picture');
        if (profileImg) {
            profileImg.src = profilePicture;
        }
        
        document.getElementById('username').textContent = username;
    }

    async generateImage() {
        const prompt = document.getElementById('prompt').value;
        if (!prompt.trim()) {
            alert('Bitte geben Sie eine Bildbeschreibung ein.');
            return;
        }

        const container = document.getElementById('generated-image-container');
        container.innerHTML = '<div class="loading-spinner"></div><p>Bild wird generiert...</p>';

        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    size: '1024x1024',
                    quality: 'standard'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            this.displayImage(result.imageUrl, prompt);
        } catch (error) {
            console.error('Image generation error:', error);
            container.innerHTML = '<p>Fehler beim Generieren des Bildes. Bitte versuchen Sie es erneut.</p>';
        }
    }

    displayImage(url, prompt) {
        const generatedImageContainer = document.getElementById('generated-image-container');
        generatedImageContainer.innerHTML = `
            <div class="generated-image-wrapper">
                <img src="${url}" alt="Generated Image" onclick="openImageInNewWindow('${url}')">
                <div class="image-actions">
                    <button onclick="downloadImage('${url}', '${prompt}')">Download</button>
                    <button onclick="openImageInNewWindow('${url}')">Vollbild</button>
                </div>
            </div>
        `;

        this.addToGallery(url, prompt);
    }

    addToGallery(url, prompt) {
        const galleryList = document.getElementById('gallery-list');
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${url}" alt="Generated Image" onclick="openImageInNewWindow('${url}')">
            <div class="gallery-item-info">
                <span class="gallery-prompt">${prompt}</span>
                <button onclick="downloadImage('${url}', '${prompt}')">Download</button>
            </div>
        `;

        if (galleryList.children.length >= 8) {
            galleryList.removeChild(galleryList.children[0]);
        }
        galleryList.appendChild(galleryItem);
    }

    savePrompt() {
        const prompt = document.getElementById('prompt').value;
        if (!prompt.trim()) return;

        let savedPrompts = JSON.parse(localStorage.getItem('savedPrompts')) || [];
        if (!savedPrompts.includes(prompt)) {
            savedPrompts.push(prompt);
            localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts));
            this.loadSavedPrompts();
        }
    }

    loadSavedPrompts() {
        const savedPrompts = JSON.parse(localStorage.getItem('savedPrompts')) || [];
        const savedPromptsContainer = document.getElementById('saved-prompts');
        savedPromptsContainer.innerHTML = '';

        savedPrompts.forEach((prompt, index) => {
            const promptElement = document.createElement('div');
            promptElement.className = 'prompt-item';
            promptElement.innerHTML = `
                <span onclick="usePrompt('${prompt.replace(/'/g, "\\'")}')">${prompt}</span>
                <button onclick="deletePrompt(${index})">Löschen</button>
            `;
            savedPromptsContainer.appendChild(promptElement);
        });
    }

    deletePrompt(index) {
        let savedPrompts = JSON.parse(localStorage.getItem('savedPrompts')) || [];
        savedPrompts.splice(index, 1);
        localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts));
        this.loadSavedPrompts();
    }

    usePrompt(prompt) {
        document.getElementById('prompt').value = prompt;
    }
}

function showLogin() {
    if (window.imageGenerator) {
        window.imageGenerator.showLogin();
    }
}

function login() {
    if (window.imageGenerator) {
        window.imageGenerator.login();
    }
}

function logout() {
    if (window.imageGenerator) {
        window.imageGenerator.logout();
    }
}

function generateImage() {
    if (window.imageGenerator) {
        window.imageGenerator.generateImage();
    }
}

function savePrompt() {
    if (window.imageGenerator) {
        window.imageGenerator.savePrompt();
    }
}

function deletePrompt(index) {
    if (window.imageGenerator) {
        window.imageGenerator.deletePrompt(index);
    }
}

function usePrompt(prompt) {
    if (window.imageGenerator) {
        window.imageGenerator.usePrompt(prompt);
    }
}

function openImageInNewWindow(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function downloadImage(url, prompt) {
    const link = document.createElement('a');
    link.href = url;
    link.download = `generated-image-${prompt.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', function() {
    window.imageGenerator = new ImageGenerator();
});
