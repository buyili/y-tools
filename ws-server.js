const WebSocket = require('ws');//引入模块
// import { WebSocketServer } from 'ws';

const wss = new WebSocket.WebSocketServer({ port: 18080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
  
  ws.send('something');
});
