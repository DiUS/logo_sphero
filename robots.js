var cylon = require('cylon');
var api = cylon.api('http');
var interval;
var speed = 50;
var heading = 0;
var moveInterval = 1;
var spheroCommander = function() { console.log("please replace me, I am a default function") };

module.exports = {
	config: cylon.config({
	  testMode: true,
		level: 'debug'
	}),
	
	sphero: cylon.robot({
		name: "sphero",

	  connections: {
	    sphero: { adaptor: 'sphero', port: '/dev/tty.Sphero-GBO-AMP-SPP' }
	  },
	
	  devices: {
	    sphero: { driver: 'sphero' }
	  },
	
    setWorker: function(func) {
      spheroCommander = func;
    },

	  work: function(my) {
			console.log("working...")
	    //my.stop();
	
			my.sphero.on('connect', function() {
	      console.log("Setting up Collision Detection...");
	      my.sphero.detectCollisions();
	      //my.sphero.setRGB(0x00FF00);
	      my.sphero.setRGB(0x21366D)
	    });
	
		  my.sphero.on('collision', function(data) {
	      me.sphero.setRGB(0xFF0000);
	      console.log("Collision:");
	      console.log(data);
	    });

      spheroCommander();
	  },
	
	  move: function(distance) {
      distance = parseInt(distance);
			console.log("moving...");

		  var sphero = this.devices.sphero;
      var my = this;
      var count = 0;
      
      while (count < distance * 1000)
      {  
        if (count % 10 == 0)
          sphero.roll(speed, heading);
        
        count += moveInterval;
      }
      my.stop();

	  },
	
		stop: function() {
			console.log("Stopping..")
			this.devices.sphero.stop()
		},
	
		speed: function(speed) {
			console.log("Setting speed to", speed)
			speed = speed;
		},
	
		heading: function(angle) {
			console.log("Setting heading to", angle)
      
      if (angle < 0)
          angle = 360 - angle;

			heading = angle;
		}
	})
}
