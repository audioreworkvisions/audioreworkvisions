# OIOS AI - Chat & Image Generator

Eine moderne AI-gestützte Chat- und Bildgenerierungs-Plattform mit innovativem Design und OpenAI API-Integration.

## Features

### 🤖 AI Chat Interface
- Interaktiver Chat mit neuesten OpenAI GPT-Modellen:
  - GPT-4o Mini (Standard)
  - GPT-4o Mini Audio Preview
  - GPT-4.1 Mini
  - GPT-4.1 Nano
  - O1 Mini
- Anpassbare Einstellungen (Temperature, Max Tokens)
- Chat-Verlauf wird lokal gespeichert
- Echtzeit-Typing-Indikatoren
- Modernes OIOS AI Design mit Glassmorphismus-Effekten

### 🎨 AI Bild Generator
- Bildgenerierung mit OpenAI DALL-E
- Benutzer-Login System
- Prompt-Speicherung und -Verwaltung
- Bildgalerie mit Download-Funktion
- Vollbild-Ansicht für generierte Bilder

### 🎨 Design
- Modernes OIOS AI Branding mit dunklem Theme
- Glassmorphismus-Effekte und sanfte Animationen
- Starfield-Hintergrund Animation
- Drei-Spalten-Layout mit kollabierenden Sidebars
- Responsive Design für alle Geräte
- Konsistente Benutzeroberfläche mit Gold/Blau Akzenten

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

**Für lokale Entwicklung:**
```bash
cp .env.example .env
```

Bearbeiten Sie die `.env` Datei und fügen Sie Ihren OpenAI API Key hinzu:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
NODE_ENV=development
```

**Für Produktion (GitHub Secrets):**
Konfigurieren Sie den OpenAI API Key als GitHub Secret:
1. Gehen Sie zu Repository Settings → Secrets and variables → Actions
2. Fügen Sie `OPENAI_API_KEY` als neues Secret hinzu
3. Der Server lädt automatisch den Key aus den Umgebungsvariablen

4. **Server starten:**
```bash
npm start
```

Die Anwendung ist dann unter `http://localhost:3001` verfügbar.

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
  "model": "gpt-4o-mini",
  "temperature": 0.7,
  "max_tokens": 1000,
  "conversation_history": []
}
```

**Verfügbare Modelle:**
- `gpt-4o-mini` (Standard)
- `gpt-4o-mini-audio-preview`
- `gpt-4.1-mini`
- `gpt-4.1-nano`
- `o1-mini`

### POST /api/generate-image
Bildgenerierung mit DALL-E

**Request Body:**
```json
{
  "prompt": "Bildbeschreibung",
  "size": "1024x1024"
}
```

### GET /api/health
Gesundheitscheck für den Server

## Sicherheit

- OpenAI API Keys werden serverseitig gespeichert und nie an das Frontend übertragen
- Unterstützung für GitHub Secrets in Produktionsumgebungen
- CORS ist für Entwicklung konfiguriert
- Alle API-Aufrufe werden über den Backend-Server geleitet
- .env Dateien sind in .gitignore ausgeschlossen

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
