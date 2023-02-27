const WebSocket = require('ws');//引入模块
// import { WebSocketServer } from 'ws';

const wss = new WebSocket.WebSocketServer({ host: '0.0.0.0', port: 28080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  
    ws.send(`您好! 已收到您发送的消息: ${data}`);
  });
  
  ws.send(`您好! 您成功的连上了我`);
});
