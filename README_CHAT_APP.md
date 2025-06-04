# AUDIOREWORKVISIONS Chat & Image Generator

Eine AI-gestützte Chat- und Bildgenerierungs-Plattform mit Punk-Wave Design und OpenAI API-Integration.

## Features

### 🤖 AI Chat Interface
- Interaktiver Chat mit OpenAI GPT-Modellen (GPT-3.5 Turbo, GPT-4, GPT-4 Turbo)
- Anpassbare Einstellungen (Temperature, Max Tokens)
- Chat-Verlauf wird lokal gespeichert
- Echtzeit-Typing-Indikatoren
- Responsive Design mit Punk-Wave Ästhetik

### 🎨 AI Bild Generator
- Bildgenerierung mit OpenAI DALL-E
- Benutzer-Login System
- Prompt-Speicherung und -Verwaltung
- Bildgalerie mit Download-Funktion
- Vollbild-Ansicht für generierte Bilder

### 🎨 Design
- Punk-Wave Theme mit Neon-Farben
- Starfield-Hintergrund Animation
- Glitch-Effekte für Text
- Responsive Design für alle Geräte
- Konsistente Benutzeroberfläche

## Installation

### Voraussetzungen
- Node.js (Version 14 oder höher)
- OpenAI API Key

### Setup

1. **Repository klonen:**
```bash
git clone https://github.com/audioreworkvisions/audioreworkvisions.git
cd audioreworkvisions
```

2. **Dependencies installieren:**
```bash
npm install
```

3. **Umgebungsvariablen konfigurieren:**
```bash
cp .env.example .env
```

Bearbeiten Sie die `.env` Datei und fügen Sie Ihren OpenAI API Key hinzu:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=development
```

4. **Server starten:**
```bash
npm start
```

Die Anwendung ist dann unter `http://localhost:3000` verfügbar.

## Verwendung

### Chat Interface
1. Navigieren Sie zu `/chat.html`
2. Wählen Sie ein AI-Modell aus den Einstellungen
3. Passen Sie Temperature und Max Tokens nach Bedarf an
4. Beginnen Sie zu chatten!

### Bild Generator
1. Navigieren Sie zu `/image-generator.html`
2. Melden Sie sich mit einem Benutzernamen an (optional)
3. Geben Sie eine Bildbeschreibung ein
4. Klicken Sie auf "Bild Generieren"
5. Laden Sie das generierte Bild herunter oder speichern Sie den Prompt

## API Endpoints

### POST /api/chat
Chat mit OpenAI GPT-Modellen

**Request Body:**
```json
{
  "message": "Ihre Nachricht",
  "model": "gpt-3.5-turbo",
  "temperature": 0.7,
  "max_tokens": 1000,
  "conversation_history": []
}
```

### POST /api/generate-image
Bildgenerierung mit DALL-E

**Request Body:**
```json
{
  "prompt": "Bildbeschreibung",
  "size": "1024x1024",
  "quality": "standard"
}
```

### GET /api/health
Gesundheitscheck für den Server

## Sicherheit

- OpenAI API Keys werden serverseitig gespeichert und nie an das Frontend übertragen
- CORS ist für Entwicklung konfiguriert
- Alle API-Aufrufe werden über den Backend-Server geleitet

## Entwicklung

### Projektstruktur
```
audioreworkvisions/
├── server.js                 # Express Server
├── chat.html                 # Chat Interface
├── image-generator.html      # Bild Generator Interface
├── assets/
│   └── js/
│       ├── chat.js           # Chat Funktionalität
│       ├── image-generator.js # Bild Generator Funktionalität
│       └── starfield.js      # Hintergrund Animation
├── style.css                 # Haupt-Stylesheet
├── package.json              # Node.js Dependencies
└── .env.example              # Umgebungsvariablen Template
```

### Scripts
- `npm start` - Server starten
- `npm run dev` - Development Server starten

## Lizenz

MIT License - siehe LICENSE Datei für Details.

## Beitragen

1. Fork das Repository
2. Erstellen Sie einen Feature Branch
3. Committen Sie Ihre Änderungen
4. Pushen Sie zum Branch
5. Erstellen Sie einen Pull Request

## Support

Bei Fragen oder Problemen erstellen Sie bitte ein Issue im GitHub Repository.
