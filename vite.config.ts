import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');

    return {
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [react()],
        
        // FIXED: 
        // 1. Removed "ProcessingInstruction" typo (changed to 'env').
        // 2. Ensure this matches your GitHub Repo name EXACTLY (case-sensitive).
        //    If your repo is "skill-bridge", this must be "/skill-bridge/".
        base: env.VITE_BASE_PATH || "/Skill_Bridge/", 

        define: {
            // These expose your environment variables to the React app
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                // FIXED: __dirname does not exist in ES Modules. Used process.cwd() instead.
                '@': path.resolve(process.cwd(), '.'),
            }
        }
    };
});