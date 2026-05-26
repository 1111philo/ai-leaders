# AI Leaders

**Learn AI. Learn WordPress. Earn Living-Wage Jobs.**

Earn a Micro-credential in AI Leadership and WordPress development.

We hope this site becomes the AI Leaders learning platform, empowering the next generation of tech professionals.

## Getting Started

The fastest way to work on this project is using AI-powered development tools.

### Option 1: AI-Powered Development (Recommended)

This project is optimized for AI-assisted coding. We recommend using tools like **Google Antigravity** or **Claude Code**.

1.  **Give Instructions**: Instead of memorizing terminal commands, simply tell your AI agent what you want to do:
    - *"Set up this project and start the development server."*
    - *"I want to add a new feature to the landing page."*
    - *"Fix the alignment on the navigation bar."*
2.  **Let the AI Handle the Rest**: Your AI agent will automatically install dependencies, run the development server, and manage file changes for you. 

### Option 2: Manual Setup (Traditional)

If you prefer using the command line:

1.  **Setup**:
    ```bash
    git clone <repository-url>
    cd ai-leaders
    npm install
    ```

2.  **Run**:
    ```bash
    npm run dev
    ```

    Open `http://localhost:5173` in your browser.

## Environment Setup

To enable the AI assessment features, you need to set up environment variables locally and/or on GitHub.

1.  **Get your API Keys**:
    *   **Gemini API Key**: [Get a key from Google AI Studio](https://aistudio.google.com/app/apikey).
    *   **ReCAPTCHA Site Key**: [Register a v3 site](https://www.google.com/recaptcha/admin) (ensure you select reCAPTCHA v3).

2.  **Local Development**:
    *   Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    *   Fill in your keys in `.env`.

3.  **GitHub Pages Deployment**:
    *   Go to your repository **Settings** > **Secrets and variables** > **Actions**.
    *   Add repository secrets for `VITE_GEMINI_API_KEY` and `VITE_RECAPTCHA_SITE_KEY`.
    *   *Note: For Vite apps on GitHub Pages, secrets typically need to be passed during the build process.*

## Contributing

We welcome contributions! If you're looking for things to contribute, please check out the [Issues on GitHub](https://github.com/1111philo/ai-leaders/issues).

For detailed information on how to contribute, including our PR process, please see our [CONTRIBUTING.md](CONTRIBUTING.md) guide.

## Credits

This project was initially generated with [Google Antigravity](https://deepmind.google/technologies/gemini/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
