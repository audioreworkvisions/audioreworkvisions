<p align="center">
  <img
    src="./assets/arv-banner.png"
    alt="Audioreworkvisions — Local-First AI · Generative Systems · Audio-Visual Engineering"
    width="100%"
  />
</p>

<h1 align="center">Lenox <sub>aka Audioreworkvisions</sub></h1>

<p align="center">
  <strong>Autodidact Software Developer · Generative AI Builder · Audio-Visual Creator</strong>
</p>

<p align="center">
  Building local-first and hybrid AI systems where
  <strong>human intent, machine intelligence, software and audiovisual culture</strong>
  meet.
</p>

<p align="center">
  <a href="https://github.com/audioreworkvisions">
    <img src="https://img.shields.io/badge/GitHub-audioreworkvisions-111827?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.audioreworkvisions.ch">
    <img src="https://img.shields.io/badge/Web-Audioreworkvisions-111827?style=flat-square&logo=vercel&logoColor=00E5FF" alt="Website" />
  </a>
  <a href="https://orcid.org/0009-0004-2502-0849">
    <img src="https://img.shields.io/badge/ORCID-0009--0004--2502--0849-111827?style=flat-square&logo=orcid&logoColor=A6CE39" alt="ORCID" />
  </a>
  <img src="https://img.shields.io/badge/Focus-Local--First_AI-111827?style=flat-square&logo=openai&logoColor=00E5FF" alt="Local-First AI" />
</p>

---

## About

My path into software did not begin in a university or research lab.

It began with questions, experimentation, persistence and the decision to understand how modern computer systems actually work — from operating systems and application architecture to machine learning, generative AI and local inference.

I build software around a simple idea:

> **AI becomes truly interesting when it stops being just a chat window and becomes a runtime layer inside real software.**

My work explores systems that can **reason, retrieve information, use tools, process documents, understand speech, generate speech, orchestrate models and interact with local or cloud resources**.

I am particularly interested in architectures where cloud AI is optional rather than mandatory.

---

## Current Focus

```text
LOCAL-FIRST AI
     │
     ├── Small Language Models
     ├── Local STT / Speech Recognition
     ├── Local TTS / Voice Synthesis
     ├── ONNX / Edge Inference
     ├── Context + Memory
     └── Tool Execution
              │
              ▼
      AGENTIC APPLICATIONS
              │
     ┌────────┼─────────┐
     ▼        ▼         ▼
    RAG      MCP      Desktop
     │      Tools       Apps
     │        │          │
     └────────┼──────────┘
              ▼
      HYBRID AI ROUTER
       Local ↔ Cloud
```

My current development work concentrates on:

- **Local-first Generative AI**
- **Small Language Models / SLMs**
- **Local speech-to-text systems**
- **Local text-to-speech systems**
- **Hybrid local + cloud inference**
- **Agentic AI architectures**
- **Model Context Protocol / MCP**
- **Tool calling and agent orchestration**
- **Retrieval-Augmented Generation / RAG**
- **Document intelligence**
- **Long-term context and memory systems**
- **AI-native desktop applications**
- **Multimodal and audiovisual interfaces**
- **Generative visual systems**
- **OBS / broadcasting automation**
- **AI-assisted music and media workflows**

---

# Hybrid AI Architecture

A large part of my experimentation revolves around keeping the application independent from any single model provider.

```mermaid
flowchart TD

    USER["Human / User"]
    UI["Desktop · Web · Voice UI"]

    USER --> UI

    UI --> ORCHESTRATOR["Agent / Application Orchestrator"]

    ORCHESTRATOR --> MEMORY["Context + Memory"]
    ORCHESTRATOR --> MCP["MCP / Tool Layer"]
    ORCHESTRATOR --> RAG["RAG / Document Intelligence"]
    ORCHESTRATOR --> SPEECH["Speech Layer"]

    SPEECH --> STT["Local STT"]
    SPEECH --> TTS["Local TTS"]

    ORCHESTRATOR --> ROUTER["Inference Router"]

    ROUTER --> LOCAL["Local Models"]
    ROUTER --> CLOUD["Cloud Models"]

    LOCAL --> SLM["SLM / ONNX / llama.cpp / Edge"]
    CLOUD --> AZURE["Azure AI"]
    CLOUD --> OPENAI["OpenAI"]

    MCP --> FILES["Files"]
    MCP --> APIS["APIs"]
    MCP --> SYSTEM["Local System"]
    MCP --> SERVICES["External Services"]

    RAG --> VECTOR["Vector Search"]
    RAG --> DOCUMENTS["Documents / Knowledge"]
```

The objective is not merely to call an LLM.

The objective is to build an **AI runtime** capable of deciding where computation should happen and which resources should be used.

---

## Local Intelligence

I am increasingly interested in running meaningful AI workloads directly on consumer hardware.

### Local Language Models

Areas I explore include:

```text
Small Language Models
        +
Quantized Models
        +
ONNX Runtime
        +
llama.cpp-style inference
        +
Windows / Edge AI
        +
Local context
        +
Tool execution
```

The goal is to make AI applications:

- more private
- less dependent on external APIs
- cheaper to operate
- usable offline
- more deterministic
- modular
- easier to integrate into desktop software

Cloud models remain valuable, but they should be a **capability**, not necessarily the entire architecture.

---

## Local Speech Stack

One of my current areas of development is combining:

```text
Microphone
    ↓
Local STT
    ↓
Local / Hybrid SLM
    ↓
Agent + Tools + Context
    ↓
Local TTS
    ↓
Voice Response
```

This creates the foundation for AI applications that can communicate naturally without requiring every audio stream or inference request to leave the machine.

Current areas of experimentation include:

- speech recognition
- streaming transcription
- local voice synthesis
- low-latency inference
- voice activity detection
- conversational state
- interruption handling
- local SLM integration
- local/cloud fallback routing

---

# Selected Public Projects

## JustitiaAI

[![Repository](https://img.shields.io/badge/GitHub-JustitiaAI-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/audioreworkvisions/JustitiaAI)

**Retrieval-Augmented Generation for Swiss legal information.**

JustitiaAI explores AI-assisted access to Swiss legal material using RAG, document retrieval and generative AI.

Core concepts include:

- Azure OpenAI
- Azure AI Search
- vector retrieval
- document ingestion
- source-grounded answers
- citations
- semantic search
- document intelligence
- conversational legal research

The project represents an early step toward more advanced legal AI systems and later experiments such as LexOIMM.

---

## AVA-App

[![Repository](https://img.shields.io/badge/GitHub-AVA--App-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/audioreworkvisions/AVA-App)

Experimental desktop application combining:

```text
Electron
   +
Vue
   +
Vite
   +
Python
   +
AI interaction
```

AVA explores the integration of desktop software, Python processing, file workflows, camera input and AI-assisted interaction inside a cross-platform application architecture.

---

# Active Labs & Evolving Systems

Some of my most active work exists as prototypes, evolving repositories, experiments or private development environments rather than polished public products.

## LexOIMM

**Legal AI · Agentic Desktop System · Document Intelligence**

An evolving AI workspace oriented toward Swiss legal research and professional document workflows.

Conceptually, LexOIMM combines:

```text
Electron Desktop Client
        │
        ├── Legal Documents
        ├── PDF Intelligence
        ├── RAG
        ├── Vector Search
        ├── Agent Reasoning
        ├── Persistent Context
        │
        └── Hybrid AI
                 │
          Local ↔ Azure / Cloud
```

The long-term goal is not simply a legal chatbot, but an **AI-native professional workspace**.

---

## ARV Story Engine / HYROGLYPHS

Experimental generative storytelling and audiovisual system.

Areas include:

- AI-assisted story construction
- generative visual composition
- scene generation
- still-frame pipelines
- visual remix systems
- prompt orchestration
- multimodal generation
- asset libraries
- audiovisual sequencing

The project explores the intersection of:

> **software × generative AI × visual language × narrative systems**

---

## Local Voice + SLM Runtime

Experimental local conversational runtime combining:

- local speech recognition
- local speech synthesis
- local SLM inference
- contextual memory
- tool execution
- hybrid cloud fallback
- streaming responses

The objective is a lightweight conversational AI layer capable of operating primarily on-device.

---

## MCP / Proxy Agent Infrastructure

Experiments around providing a common orchestration layer between applications and AI systems.

```text
Application
     │
     ▼
Agent Runtime
     │
     ├── MCP Servers
     ├── Open Interpreter
     ├── Local Models
     ├── ONNX Models
     ├── Cloud Models
     ├── REST APIs
     └── Local Tools
```

A core principle is avoiding tightly coupling an application to one AI provider.

---

## Crypto Trader Companion

Experimental AI-assisted cryptocurrency research and market-analysis system.

Research areas include:

- portfolio monitoring
- market context
- technical indicators
- news evidence
- on-chain context
- risk analysis
- strategy simulation
- signal scoring
- paper trading
- explainable recommendations

This project is an experimental decision-support and research environment — **not a promise of guaranteed financial returns**.

---

## Audiovisual / OBS Tooling

A parallel engineering track inside Audioreworkvisions focuses on tools for live audiovisual performance.

Experiments include:

- OBS integrations
- automatic track-ID overlays
- DJ metadata systems
- audiovisual control interfaces
- generative visuals
- media libraries
- video-to-GIF processing
- loop generators
- slideshow engines
- streaming overlays
- live performance utilities

These systems connect my software work directly with my work as an audiovisual creator and Techno DJ.

---

# Technology Stack

## Languages

<p>
  <img src="https://img.shields.io/badge/Python-111827?style=for-the-badge&logo=python&logoColor=FFD43B" />
  <img src="https://img.shields.io/badge/TypeScript-111827?style=for-the-badge&logo=typescript&logoColor=3178C6" />
  <img src="https://img.shields.io/badge/JavaScript-111827?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
  <img src="https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26" />
  <img src="https://img.shields.io/badge/CSS3-111827?style=for-the-badge&logo=css3&logoColor=1572B6" />
</p>

---

## Application Development

<p>
  <img src="https://img.shields.io/badge/Electron-111827?style=for-the-badge&logo=electron&logoColor=9FEAF9" />
  <img src="https://img.shields.io/badge/React-111827?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vue.js-111827?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" />
  <img src="https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=646CFF" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-111827?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4" />
</p>

---

## Backend & Runtime

<p>
  <img src="https://img.shields.io/badge/FastAPI-111827?style=for-the-badge&logo=fastapi&logoColor=009688" />
  <img src="https://img.shields.io/badge/Node.js-111827?style=for-the-badge&logo=nodedotjs&logoColor=5FA04E" />
  <img src="https://img.shields.io/badge/Python_Runtime-111827?style=for-the-badge&logo=python&logoColor=FFD43B" />
  <img src="https://img.shields.io/badge/REST_APIs-111827?style=for-the-badge&logo=fastapi&logoColor=00E5FF" />
</p>

---

## AI / Machine Learning

<p>
  <img src="https://img.shields.io/badge/OpenAI-111827?style=for-the-badge&logo=openai&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Azure_AI-111827?style=for-the-badge&logo=microsoftazure&logoColor=0078D4" />
  <img src="https://img.shields.io/badge/ONNX_Runtime-111827?style=for-the-badge&logo=onnx&logoColor=00E5FF" />
  <img src="https://img.shields.io/badge/Local_SLMs-111827?style=for-the-badge&logo=probot&logoColor=8B5CF6" />
  <img src="https://img.shields.io/badge/RAG-111827?style=for-the-badge&logo=databricks&logoColor=FF3621" />
  <img src="https://img.shields.io/badge/Agentic_AI-111827?style=for-the-badge&logo=openai&logoColor=00E5FF" />
  <img src="https://img.shields.io/badge/MCP-111827?style=for-the-badge&logo=protocols&logoColor=FFFFFF" />
</p>

---

## Data & Retrieval

<p>
  <img src="https://img.shields.io/badge/Supabase-111827?style=for-the-badge&logo=supabase&logoColor=3FCF8E" />
  <img src="https://img.shields.io/badge/SQLite-111827?style=for-the-badge&logo=sqlite&logoColor=00E5FF" />
  <img src="https://img.shields.io/badge/Azure_AI_Search-111827?style=for-the-badge&logo=microsoftazure&logoColor=0078D4" />
  <img src="https://img.shields.io/badge/Vector_Search-111827?style=for-the-badge&logo=semanticweb&logoColor=8B5CF6" />
</p>

---

## Development Environment

<p>
  <img src="https://img.shields.io/badge/VS_Code-111827?style=for-the-badge&logo=visualstudiocode&logoColor=007ACC" />
  <img src="https://img.shields.io/badge/GitHub-111827?style=for-the-badge&logo=github&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/GitHub_Copilot-111827?style=for-the-badge&logo=githubcopilot&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/GitHub_Actions-111827?style=for-the-badge&logo=githubactions&logoColor=2088FF" />
  <img src="https://img.shields.io/badge/pnpm-111827?style=for-the-badge&logo=pnpm&logoColor=F69220" />
  <img src="https://img.shields.io/badge/Windows_11-111827?style=for-the-badge&logo=windows11&logoColor=00E5FF" />
</p>

---

# What I Am Exploring

| Area | Direction |
|---|---|
| **Local AI** | Small and quantized models running directly on consumer hardware |
| **Speech AI** | Local STT + TTS connected to conversational agents |
| **Hybrid Inference** | Dynamically routing requests between local and cloud models |
| **Agentic Systems** | Models capable of selecting tools and performing structured workflows |
| **MCP** | Standardized interfaces between AI systems, software and external tools |
| **RAG** | Grounding AI responses in documents and trusted knowledge |
| **Memory** | Persistent application and conversational context |
| **Desktop AI** | Moving AI capabilities from browser demos into real applications |
| **Legal AI** | Document intelligence and retrieval for Swiss legal workflows |
| **Generative Media** | AI-assisted visual, narrative and audiovisual systems |
| **Audio AI** | Speech, music metadata and live-performance tooling |
| **Human–AI Interfaces** | Interfaces where AI behaves as part of the application rather than an isolated chatbot |

---

# Engineering Principles

### 01 — Local when possible

If a task can run safely and efficiently on the user's machine, local execution should remain a serious option.

### 02 — Cloud when useful

Powerful cloud models are valuable, especially for complex reasoning and multimodal workloads.

The architecture should decide when they are required.

### 03 — Models are replaceable

Applications should not be designed around one model.

```text
Application Logic
       ≠
Model Provider
```

Models should be interchangeable components behind a stable application layer.

### 04 — Context is infrastructure

Useful AI requires more than a prompt.

It requires:

```text
Context
+ Memory
+ Retrieval
+ Tools
+ State
+ Permissions
+ Models
```

### 05 — AI should use software

The next generation of AI applications should not only generate text.

They should interact with:

- files
- databases
- APIs
- applications
- operating-system capabilities
- external tools
- structured workflows

### 06 — Build systems, not demos

My interest is increasingly focused on turning AI concepts into persistent software architectures rather than isolated experiments.

---

# Audioreworkvisions

**Audioreworkvisions / ARV** is where several disciplines intersect:

```text
SOFTWARE
   ×
ARTIFICIAL INTELLIGENCE
   ×
SOUND
   ×
VISUAL SYSTEMS
   ×
TECHNO CULTURE
```

Alongside software development, I produce audiovisual experiments and Techno transmissions under the Audioreworkvisions identity.

This creates an unusual engineering environment where tools are often tested in real creative workflows rather than artificial demonstrations.

Examples include:

- live visuals
- generative imagery
- DJ interfaces
- OBS systems
- track metadata
- audiovisual automation
- real-time media pipelines
- experimental human-machine interfaces

The creative work and software work are not separate projects.

They continuously influence each other.

---

# Development Philosophy

My route into technology has been unconventional.

I learn primarily by:

```text
QUESTION
   ↓
RESEARCH
   ↓
BUILD
   ↓
BREAK
   ↓
UNDERSTAND
   ↓
REBUILD
   ↓
CONNECT
```

I am less interested in memorizing isolated technologies than in understanding how systems connect.

Operating systems lead to application architecture.

Application architecture leads to APIs.

APIs lead to distributed systems.

Distributed systems lead to agents.

Agents lead to models.

Models lead back to hardware.

And eventually everything becomes one system.

---

# GitHub

<p align="center">
  <a href="https://github.com/audioreworkvisions">
    <img src="https://img.shields.io/github/followers/audioreworkvisions?style=for-the-badge&logo=github&label=FOLLOWERS&labelColor=111827&color=0EA5E9" />
  </a>
  <a href="https://github.com/audioreworkvisions?tab=repositories">
    <img src="https://img.shields.io/badge/Explore-Repositories-111827?style=for-the-badge&logo=github&logoColor=FFFFFF" />
  </a>
</p>

My repositories include original applications, experiments, research prototypes, reference implementations and forks used to study technologies across the AI ecosystem.

Current areas of repository research include:

```text
Agentic AI
Local AI
Windows ML
Foundry Local
Azure AI
RAG
MCP
LLM Interfaces
Model Inference
Speech
Desktop Applications
Generative Media
```

---

# Connect

<p align="center">

<a href="https://www.audioreworkvisions.ch">
  <img src="https://img.shields.io/badge/Website-Audioreworkvisions-111827?style=for-the-badge&logo=vercel&logoColor=00E5FF" />
</a>

<a href="https://github.com/audioreworkvisions">
  <img src="https://img.shields.io/badge/GitHub-audioreworkvisions-111827?style=for-the-badge&logo=github&logoColor=FFFFFF" />
</a>

<a href="https://www.linkedin.com/in/audioreworkvisions/">
  <img src="https://img.shields.io/badge/LinkedIn-Audioreworkvisions-111827?style=for-the-badge&logo=linkedin&logoColor=0A66C2" />
</a>

<a href="https://www.youtube.com/@audioreworkvisions">
  <img src="https://img.shields.io/badge/YouTube-Audioreworkvisions-111827?style=for-the-badge&logo=youtube&logoColor=FF0000" />
</a>

<a href="https://x.com/audioreworks">
  <img src="https://img.shields.io/badge/X-@audioreworks-111827?style=for-the-badge&logo=x&logoColor=FFFFFF" />
</a>

<a href="https://orcid.org/0009-0004-2502-0849">
  <img src="https://img.shields.io/badge/ORCID-0009--0004--2502--0849-111827?style=for-the-badge&logo=orcid&logoColor=A6CE39" />
</a>

<a href="https://medium.com/@audioreworkvisions.net">
  <img src="https://img.shields.io/badge/Medium-@audioreworkvisions.net-111827?style=for-the-badge&logo=medium&logoColor=FFFFFF" />
</a>

<a href="https://dev.to/audioreworkvisions">
  <img src="https://img.shields.io/badge/DEV.to-audioreworkvisions-111827?style=for-the-badge&logo=devdotto&logoColor=FFFFFF" />
</a>

<a href="mailto:artist@audioreworkvisions.com">
  <img src="https://img.shields.io/badge/Email-artist@audioreworkvisions.com-111827?style=for-the-badge&logo=gmail&logoColor=EA4335" />
</a>

</p>

---

<p align="center">
  <strong>Stay curious. Stay in the tunnel. Keep building.</strong>
</p>

<p align="center">
  <sub>Lenox aka Audioreworkvisions · Switzerland</sub>
</p>
