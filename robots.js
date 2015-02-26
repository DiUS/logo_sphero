var cylon = require('cylon');
var api = cylon.api('http');
var interval;
var speed = 50;
var direction = 0;
var moveInterval = 1;

module.exports = {
	config: cylon.config({
	  testMode: true,
		level: 'debug'
	}),
	
	sphero: cylon.robot({
		name: "sphero",
		speed: 50,
	
	  connections: {
	    sphero: { adaptor: 'sphero', port: '/dev/tty.Sphero-GBO-AMP-SPP' }
	  },
	
	  devices: {
	    sphero: { driver: 'sphero' }
	  },
	
	  work: function(my) {
			console.log("working...")
	    my.stop();
	
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
	  },
	
	  move: function(distance) {
			console.log("moving...");
	
			var count = 0;
			var sphero = this.devices.sphero;
	
		  interval = setInterval(function() {
				sphero.roll(speed, heading);
			  if (count >= distance) {
			  	console.log("finished loop")
					clearInterval(interval);
					return 
				}
			count++;
			}, moveInterval)
	
			// sleep for distance
			console.log("sleeping")
		
			this.stop();
		  console.log("finished moving")
	  },
	
		stop: function() {
			console.log("Stopping..")
			this.devices.sphero.stop()
		},
	
		speed: function(speed) {
			console.log("Setting speed to", speed)
			speed = speed;
		},
	
		heading: function(heading) {
			console.log("Setting heading to", heading)
			heading = heading
		}
	})
}
