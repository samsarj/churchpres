const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let liveItem = null;

wss.on('connection', ws => {
  // Send current liveItem to new client
  ws.send(JSON.stringify({ type: 'liveItem', data: liveItem }));

  ws.on('message', message => {
    const msg = JSON.parse(message);
    if (msg.type === 'setLiveItem') {
      liveItem = msg.data;
      // Broadcast to all clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'liveItem', data: liveItem }));
        }
      });
    }
  });
});

console.log('WebSocket server running on ws://localhost:8080');
