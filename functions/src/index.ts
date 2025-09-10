import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { genkit } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';

setGlobalOptions({ maxInstances: 10 });

const ai = genkit({
    plugins: [vertexAI({ location: 'us-central1' })],
});

export const helloWorld = onRequest(async (request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    const result = await ai.generate({
        model: vertexAI.model('gemini-2.5-pro'),
        prompt: 'Explain Vertex AI in simple terms.',
    });

    response.send(result.text);
});
