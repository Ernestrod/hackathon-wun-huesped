
var nombre;
var mail;
var ball = 1;
var latLong = "-34.5523826,-58.4550925";
var prevName;
var numPerson;

$(document).ready(function(){
	
	$.ajax({
	  type: "GET",
	  url: "admin/api/v1/activateBall/1",
	  cache: false,
	  success: function(data){
		prevName = data.data.pop().name;
		numPerson = data.totalpersons;
		console.log(numPerson);
	  }
	});
	
});


$(".paso1 .btn").click(function(){
	nombre = $("input.name").val();
	nM = $(".paso2 .panel-heading").text().replace("[[nombre]]",nombre);
	$(".paso2 .panel-heading").text(nM);
	$(".prevName").text(prevName);
	$(".num").text(numPerson);
	$(".name").text(nombre);
	$(".paso1").hide();
	
	$(".paso2").show(300)
	
	
});
$(".paso2 button").click(function(){
	mail = $("input.mail").val();
	nM = $(".paso3 .panel-heading").text().replace("[[nombre]]",nombre);
	$(".paso3 .panel-heading").text(nM);
	$(".paso2").hide();
	$(".paso3").show(300,function(){
		
		
		init();
		
	})
	var data = {
		bola: "1",
		mail: mail,
		name: nombre,
		latLong: latLong
		
	};
	$.ajax({
	  type: "POST",
	  url: "admin/api/v1/activateBall",
	  cache: false,
	  data: data,
	  success: function(data){
		
	  }
	});
	
		//google.maps.event.addDomListener(window, 'load', init);
        
            function init() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 11,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(-34.6158238,-58.4333203), // New York

                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);
                // Let's also add a marker while we're at it
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(-34.6158238,-58.4333203),
                    map: map,
                    title: 'Snazzy!'
                });
            }
});