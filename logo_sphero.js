var robots = require('./robots')
var cylon = require('cylon');
var Sphero = robots.sphero;

// for convenient jsdom/Node.js usage:
if (process.argv.length <= 2)
  console.log("please enter the filename for the robot instructions");

var fs = require('fs')
var filename = process.argv[2];
var instructionString, instructions;

// heading (angle)
// distance (time, seconds)
// move(distance)

var RobotCommands = { };
RobotCommands.FD = function(seconds) {
  console.log("FD @ " + seconds);
  Sphero.move(seconds)
}

RobotCommands.BK = function(seconds) {
  console.log("BK @ " + seconds);
  Sphero.move(seconds);
}

RobotCommands.LT = function(angle) {
  console.log("LT @ " + angle);
  Sphero.heading(angle);
}

RobotCommands.RT = function(angle) {
  console.log("RT @ " + angle);
  Sphero.heading(angle);
}

RobotCommands.SPEED = function(speed) {
  console.log("SPEED @ " + speed);
  Sphero.speed(speed);
}

function checkValidCommand(command) {
  return ['FD', 'BK', 'RT', 'LT', 'SPEED'].indexOf(command) > -1
}

function readFile(callback) {
  fs.readFile(filename, function (err, data) {
    instructionString = data.toString(); 
    instructions = instructionString.split('\n');
    instructions.pop();
    instructions.forEach(function(order) {
      
      var commands = order.split(" ");
      var command = commands[0];
      var arg = commands[1];

      if ( checkValidCommand(command) )
      {
        RobotCommands[command](arg);  
      }

      else
        console.log("invalid command!")

    });
    callback();
  });
}

function printLine() {
  console.log('finished');
}

Sphero.setWorker(function() {readFile(printLine)});
Sphero.start();
