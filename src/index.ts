import { createServer, Server } from 'http';
import { config } from 'dotenv';
import { requestHandler } from './handlers/requestsHandler';

config();

const server: Server = createServer(requestHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});

export {
    server,
};