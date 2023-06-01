const WebSocket = require('ws');//引入模块
// import { WebSocketServer } from 'ws';

const wss = new WebSocket.WebSocketServer({ host: '0.0.0.0', port: 28080 });

var userWs = null;
var wsList = []

wss.on('connection', function connection(ws) {
  userWs = ws;
  wsList.push(ws)
  ws.on('error', console.error);
  
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  
    ws.send(`您好! 已收到您发送的消息: ${data}`);
  });
  
  ws.send(`您好! 您成功的连上了我`);
});

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function readUserInput(){
  rl.question("What do you think of node.js? ", function(answer) {
      // TODO: Log the answer in a database
      console.log("Thank you for your valuable feedback:", answer);
    
      if(answer == 'close'){
          rl.close();
      } else {
        wsList.forEach(ws=>{
          ws && ws.send(answer)
        })
          readUserInput()
      }
    });
}
readUserInput()
