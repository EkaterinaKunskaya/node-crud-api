import { IncomingMessage } from 'http';

export const bodyParser = (req: IncomingMessage) => {
    return new Promise((resolve, rejects) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
    
            req.on('end', async () => {
                resolve(JSON.parse(body));
            });
        } catch(error) {
            rejects(error);
        }
    });
}