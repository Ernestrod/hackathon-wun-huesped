(function () {
	var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true, conexiones = 1;
	var cantidad = 100;
	var cantidadGrupos = 4;
	var pelotas = [];
	var pelotaActiva = [];
	var factor  = 10;

	var puntos = 1;
		var todas = true;

        width = window.innerWidth;
        height = window.innerHeight;


	var lasPelotas = {};




	lasPelotas = {
		  "pelotas": {
		    "grupo": [
		     ]
		  }
		}

		for (var i= 0 ; i < cantidadGrupos ; i++){

			element = {
		      	"color": [
		      		{
					"r" : parseInt(Math.random() * (200 - 30) + 30),
					"g" : parseInt(Math.random() * (200 - 30) + 30),
					"b" : parseInt(Math.random() * (200 - 30) + 30)
		      		}
		      	],
		        "pelota": [
		          {
		            "posX": Math.random() * (width) + factor,
		            "posY": Math.random() * (width) + factor,
		          }
		        ]
		      },
			lasPelotas.pelotas.grupo.push(element);




			for (var j= 0 ; j < cantidad ; j++){

			var pelotita = {
		            "posX": Math.random() * (width) + factor,
		            "posY": Math.random() * (width) + factor
		         }

				lasPelotas.pelotas.grupo[i].pelota.push(pelotita);
			}

		}



       // var elem = document.getElementById('boton');

		init();


   
	
	function init() {
        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');



    	//elem.addEventListener('click', cambiar);  
    	//$("boton").trigger('click')
		points = [];
		
        for (var x = 0; x < width; x = x + factor) {
			for (var y = 0; y < height; y = y + factor) {
  				var px = x +  width / 20;
                var py = y +  height / 20;
                var p = {
                    x: px,
                    originX: px,
                    y: py,
                    originY: py
                };

			points.push(p);
        	}

        }



        for (var i in points) {
        	var c = new Circle(points[i], 3, 'rgba(100,1)');
			
			points[i].circle = c;
			points[i].circle.active = 0.2;
			points[i].circle.draw(100, 30, 15);
        }

        var cadaGrupo;

        if (!todas){
        	cadaGrupo = 1;
        }else{
        	cadaGrupo = cantidadGrupos;
        }

        for (var k= 0; k<cadaGrupo; k++){
			
			var pelotaActiva = [];
	        //var px =  lasPelotas.grupo.posX;
			//var py =  lasPelotas.grupo[0].posY;
	        var niveles  = parseInt(cantidad / 4);
	        var nivel = 1;

	        var r =lasPelotas.pelotas.grupo[k].color[0].r
	        var g = lasPelotas.pelotas.grupo[k].color[0].g
	        var b = lasPelotas.pelotas.grupo[k].color[0].b


	      	for (var l = 0; l<cantidad ; l++){
 	             if (l> 0 && l % 4 == 3){
		             nivel++;
	             }

	             px = lasPelotas.pelotas.grupo[k].pelota[l].posX
	             py = lasPelotas.pelotas.grupo[k].pelota[l].posY

	 		 	var pPelota = {
	                    x: px,
						originX: px,
	                    y: py,
	                  	originY: py,
	                };

	            pelotaActiva.push(pPelota);
	        	pelotaActiva[l].circle = new Circle(pelotaActiva[l], 6);			
				pelotaActiva[l].circle.active = 0.8;
				pelotaActiva[l].circle.active = 0.8;
				pelotaActiva[l].active = 0.8;

				if (l>0){
					drawLines(pelotaActiva[l], pelotaActiva[l -1], r, g, b);

				}
				pelotaActiva[l].circle.draw(r, g, b);
	        }	
        }


    }

function animate() {
        requestAnimationFrame(init);
}


function cambiar(elemento) {
	if (todas){
		todas = false
		this.innerHTML = "Ver todas";

	}else{
		todas = true;
		this.innerHTML = "Tu Bola";
	}
	animate();
}


function Circle(pos, rad, color, text) {
        var _this = this;
        (function () {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
            _this.text = text;
            _this.indice = puntos++;
        }());
        this.draw = function (r,g,b) {
            if (!_this.active)
                return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba('+r+','+g+','+b+',' + _this.active + ')';
            ctx.fill();

			ctx.font = "10px serif";
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
        };
}

    function drawLines(p, p2, r, g, b) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba('+r+','+g+','+b+ ',20)';
            ctx.stroke();
	}
}());
