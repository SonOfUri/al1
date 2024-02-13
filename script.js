$(document).ready(function() {

    var nyjaOS = Object;
	
	//clock
	nyjaOS.clock = function() {
		// Create two variable with the names of the months and days in an array
		var monthNames = [ "Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]; 
		var dayNames= ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

		// Create a newDate() object
		var newDate = new Date();
		// Extract the current date from Date object
		newDate.setDate(newDate.getDate());
		// Output the day, date, month and year   
		$('#time #date').html(dayNames[newDate.getDay()] + ", " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' 2074');

		setInterval( function() {
			// Create a newDate() object and extract the seconds of the current time on the visitor's
			var seconds = new Date().getSeconds();
			// Add a leading zero to seconds value
			$("#time #clock #sec").html(( seconds < 10 ? "0" : "" ) + seconds);
			},1000);
			
		setInterval( function() {
			// Create a newDate() object and extract the minutes of the current time on the visitor's
			var minutes = new Date().getMinutes();
			// Add a leading zero to the minutes value
			$("#time #clock #min").html(( minutes < 10 ? "0" : "" ) + minutes);
			},1000);
			
		setInterval( function() {
			// Create a newDate() object and extract the hours of the current time on the visitor's
			var hours = new Date().getHours();
			// Add a leading zero to the hours value
			$("#time #clock #hours").html(( hours < 10 ? "0" : "" ) + hours);
			}, 1000);
	}
    

    //sound effects
    //create hover sound effect element
    nyjaOS.hoverSound = $("<audio></audio>").attr({
        "src" : "https://a.pomf.space/vycxkazejlog.mp3",
        "volume" : 0.1,
        "id" : "hover-sound"
    }).appendTo("body");

    $("a").click(function() {
        console.log("enter");
        nyjaOS.hoverSound.trigger("play");
    });

    //start
    nyjaOS.clock();

    $("#about").trigger( "click" );

    $('#music audio').prop("volume", 0.1);

});
