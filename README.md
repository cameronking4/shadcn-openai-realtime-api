# OpenAI WebRTC Shadcn Next15 Starter

This is a WebRTC-based audio streaming application using `OpenAI`'s `Realtime WebRTC API`. Project contains `/api` route and UI components developed with `Next.js` and `shadcn/ui`. It supports real-time audio conversations implented in [skrivov/openai-voice-webrtc-next](https://github.com/skrivov/openai-voice-webrtc-next) with the addition of a hook to abstract the WebRTC handling.

https://github.com/user-attachments/assets/ea9324af-5c18-48d2-b980-2b81baeea4c0

## Features
- **Next.js Framework**: Built with Next.js for server-side rendering and API routes.
- **Modern UI**: Animated using Tailwind CSS & Framer Motion & shadcn/ui.
- **Use-WebRTC Hook**: A hook to abstract the OpenAI WebRTC handling.
- **Tool Calling**: 5 example functions to demonstrate client side tools along with Realtime API: `getCurrentTime`, `partyMode`, `changeBackground`, `launchWebsite`, `copyToClipboard`
- **Type Safety**: TypeScript with strict eslint rules (optional)

## Requirements
- **Deno runtime** or **Node.js**
- OpenAI API Key or Azure OpenAI API Key in `.env` file

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/cameronking4/shadcn-openai-realtime-webrtc.git
cd shadcn-openai-realtime-webrtc
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your-openai-api-key
```

### 3. Install Dependencies
If using **Node.js**:
```bash
npm install
```

If using **Deno**:
```bash
deno install
```

### 4. Run the Application

#### Using Node.js:
```bash
npm run dev
```

#### Using Deno:
```bash
deno task start
```

The application will be available at `http://localhost:3000`.



## Usage
1. Open the app in your browser: `http://localhost:3000`.
3. Select a voice and start the audio session.


## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements
- [OpenAI](https://openai.com/) for their API and models.
- [Next.js](https://nextjs.org/) for the framework.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [Simon Willison’s Weblog](https://simonwillison.net/2024/Dec/17/openai-webrtc/) for inspiration
- [Originator: skrivov](https://github.com/skrivov/openai-voice-webrtc-next) for the WebRTC and Nextjs implementation
