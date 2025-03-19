import { Server } from 'socket.io';
import { NextApiRequest } from 'next';
import { Server as NetServer } from 'http';
import { NextApiResponseWithSocket } from '@/types/socket';

export const config = {
    api: {
        bodyParser: false,
    },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
    if (!res.socket.server.io) {
        const path = '/api/socket';
        const httpServer: NetServer = res.socket.server as any;
        const io = new Server(httpServer, {
            path: path,
            addTrailingSlash: false,
        });

        io.on('connection', (socket) => {
            console.log('Client connected');

            socket.on('message', (message) => {
                io.emit('message', message);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        res.socket.server.io = io;
    }
    res.end();
};

export default ioHandler; 