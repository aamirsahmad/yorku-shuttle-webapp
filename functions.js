// ------------------------------------------------------------------
// Global Variables
// ------------------------------------------------------------------
var d = new Date();
var hours = Number(d.getHours());
var minutes = Number(d.getMinutes());

// Convert hours to minutes
var time = (hours * 60) + minutes;

// Static strings
var numHrsRe = " hours and ";
var numMinRe = " minutes remaining till the next bus leaves"; 


// ------------------------------------------------------------------
// Function that defines schedule for YU Shuttle Express
// ------------------------------------------------------------------
function express (startTime, interval) {
	var timeId = document.getElementById('express');
	if (time > 1425 || time < 480) {
		timeId.innerHTML = "No shuttle service available";
		return null;
	}
	if (time < startTime) {
		var remaining = startTime - time;
		var hoursre = Math.floor((remaining)/60);
		var minutesre = remaining - (hoursre * 60);
		if(hoursre == 0){
			var timeRemainingStr =  minutesre + numMinRe;
			timeId.innerHTML = timeRemainingStr;
		}else{
			var timeRemainingStr =  hoursre + numHrsRe + minutesre + numMinRe;
			timeId.innerHTML = timeRemainingStr;
		}
		return null;
	}
	else {
		express((startTime + interval), interval);
	}
}


// ------------------------------------------------------------------
// Function that defines schedule for YU Shuttle East/West. Pass different 'id' for east and west respectively
// ------------------------------------------------------------------
function eastWest (startTime1, interval, id) {
	var ewId = document.getElementById(id);
	if (time > 75 && time < 480) {
		ewId.innerHTML = "No shuttle service available";
		return null;
	}
	if (time < startTime1) {
		var remaining = startTime1 - time;
		var hoursre = Math.floor((remaining)/60);
		var minutesre = remaining - (hoursre * 60);
		
		if(hoursre == 0){
			var timeRemainingStr =  minutesre + numMinRe;
			ewId.innerHTML = timeRemainingStr;
		}else{
			var timeRemainingStr =  hoursre + numHrsRe + minutesre + numMinRe;
			ewId.innerHTML = timeRemainingStr;
		}

		return null;
	}
	else {
		eastWest((startTime1 + interval), interval, id);

	}
}


// ------------------------------------------------------------------
// Function that shows the time of next YU Shuttle Express
// ------------------------------------------------------------------
function expressLeaves (startTime, interval) {
	var spanId1 = document.getElementById('expresstime');
	if (time > 1425 || time < 480) {
		spanId1.innerHTML = "Tomorrow at 8:15PM";
		return null;
	}
	if (time < startTime) {
		var h = Math.floor((startTime)/60);
		var m = startTime - (h * 60);
		if(m == 0){
			m = m + "0";
		}
		spanId1.innerHTML = h + ":" + m + "HRS";
		return null;
	}
	else {
		expressLeaves((startTime + interval), interval);
	}
}


// ------------------------------------------------------------------
// Function that shows the time of next YU Shuttle East/West
// ------------------------------------------------------------------
function ewLeaves (startTime, interval, id) {
	var spanEW = document.getElementById(id);
	if (time > 75 && time < 480) {
		spanEW.innerHTML = "Today at 6:00PM";
		return null;
	}
	if (time < startTime) {
		var h = Math.floor((startTime)/60);
		var m = startTime - (h * 60);
		if(m == 0){
			m = m + "0";
		}
		if(h >= 24){
			h = h - 24;
			h = "0" + h;
		}
		
		spanEW.innerHTML = h + ":" + m + "HRS";
		return null;
	}
	else {
		ewLeaves((startTime + interval), interval, id);
	}
}


// ------------------------------------------------------------------
// Calls both functions for YU Shuttle Express
// ------------------------------------------------------------------
function yu_express() {
	// express
	express(1215, 30); 
	expressLeaves(1215, 30); 
	//window.setInterval(timeT2(1215, 30), 10 * 1000);
}


// ------------------------------------------------------------------
// Calls both functions for YU Shuttle East
// ------------------------------------------------------------------
function yu_east() {
	// east
	if(time < 15){
		eastWest(15, 30, 'east');
		ewLeaves(15, 30, 'easttime');
		//window.setInterval(eastWest(15, 35, 'east'), 10 * 1000);
	}
	else if(time > 1420){
		eastWest(1420, 35, 'east');
		ewLeaves(1420, 35, 'easttime');
		//window.setInterval(eastWest(1420, 35, 'east'), 10 * 1000);
	}
	else if(time > 15 && time < 75){
		eastWest(15, 30, 'east');
		ewLeaves(15, 30, 'easttime');
		//window.setInterval(eastWest(15, 30, 'east'), 10 * 1000);
	}
	else if(time < 1200){
		eastWest(1080, 30, 'east');
		ewLeaves(1080, 30, 'easttime');
		//window.setInterval(eastWest(1080, 30, 'east'), 10 * 1000);
	}
	else{
		eastWest(1200, 20, 'east');
		ewLeaves(1200, 20, 'easttime');
		//window.setInterval(eastWest(1200, 20, 'east'), 10 * 1000);
	}
}


// ------------------------------------------------------------------
// Calls both functions for YU Shuttle West
// ------------------------------------------------------------------
function yu_west() {
	// west
	if(time < 15){
		eastWest(15, 30, 'west');
		ewLeaves(15, 30, 'westtime');
		//window.setInterval(eastWest(15, 35, 'west'), 10 * 1000);
	}
	else if(time > 1420){
		eastWest(1420, 35, 'west');
		ewLeaves(1420, 35, 'westtime');
		//window.setInterval(eastWest(1420, 35, 'west'), 10 * 1000);
	}
	else if(time > 15 && time < 75){
		eastWest(15, 30, 'west');
		ewLeaves(15, 30, 'westtime');
		//window.setInterval(eastWest(15, 30, 'west'), 10 * 1000);
	}
	else if(time < 1200){
		eastWest(1080, 30, 'west');
		ewLeaves(1080, 30, 'westtime');
		//window.setInterval(eastWest(1080, 30, 'west'), 10 * 1000);
	}
	else{
		eastWest(1200, 20, 'west');
		ewLeaves(1200, 20, 'westtime');
		//window.setInterval(eastWest(1200, 20, 'west'), 10 * 1000);
	}
}

// ------------------------------------------------------------------
// Acts as Main function
// ------------------------------------------------------------------
function startUpdate() {
	yu_express();
	window.setInterval(yu_express(), 10 * 1000);
	yu_east();
	window.setInterval(yu_east(), 10 * 1000);
	yu_west();
	window.setInterval(yu_west(), 10 * 1000);
}

window.onload = startUpdate;