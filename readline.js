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
            readUserInput()
        }
      });
}
readUserInput()