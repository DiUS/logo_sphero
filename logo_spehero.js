// for convenient jsdom/Node.js usage:
if (process.argv.length <= 2)
  console.log("please enter the filename for the robot instructions");

var fs = require('fs');
var filename = process.argv[2];
var instructionString, instructions;

var Robot = { };
Robot.FD = function(arg) {
  console.log("inside FD: "+ arg);
}

Robot.BK = function(arg) {
  console.log("inside BK: "+ arg);
}

function checkValidCommand(command) {
  return ['FD', 'BK'].indexOf(command) > -1
}

function readFile(callback) {
  fs.readFile(filename, function (err, data) {
    instructionString = data.toString(); 
    instructions = instructionString.split('\n');
    instructions.forEach(function(order) {
      
      var commands = order.split(" ");
      var command = commands[0];
      var arg = commands[1];

      if ( checkValidCommand(command) )
      {
        Robot[command](arg);  
      }

      else
        console.log("invalid command!")

    });
    callback();
  });
}

function printLine() {
  console.log(instructions);
}

readFile(printLine);
