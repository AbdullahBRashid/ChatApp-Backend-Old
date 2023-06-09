const wsa = require('ws');

const wss = new wsa.WebSocketServer({ port: 80 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message, isBinary) => {
        if (isBinary) {
            console.log(`Received Binary Message of ${message.length} bytes`);
        } else {
            console.log(`Received Message => ${message}`);
        }
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === wsa.OPEN) {
                if (isBinary) {
                    client.send(message, { binary: true });
                    return;
                }
                client.send(`${message}`);
            }
        });
    });
});