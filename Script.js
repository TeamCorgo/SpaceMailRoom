var HTML = '';
var hourtime = 0;
var daytime = 0;
var Errors = 0;
var GameDifficulty = "";
var TimerOn = true;


//Checks if "Day" is set, If day is set use that (Loads Player game)
//else set it to zero they are either new or lose the game
Day = localStorage.getItem('Day');
if(Day == null){
	var Day = 1;
}
localStorage.removeItem("Day");

//Alert player they are under review
if(Day == 10){
	alert("You are under review today for your tenure performance review. \n\n\n No errors today will be accepted.");		
}

if(Day == 11){
	Day++;
	localStorage.setItem("Day",Day);
	window.location.replace("./win.html");
}

GameDifficulty = localStorage.getItem('GameDifficulty');
if(GameDifficulty == "Hard"){
	GameDifficulty = 'Hard';
	document.getElementById("GameDifficulty").innerHTML = "Change to Easy";
}else{
	GameDifficulty = 'Easy';
	document.getElementById("GameDifficulty").innerHTML = "Change to Hard";
}

var MassArray = [];

var PersonNameArray = [
	"CP-3O",
	"Jango Feet",
	"Kat Fasto",
	"Pizza the Hut",
	"Darth Lacerate",
	"D2-R2",
	"Cylo kent",
	"Yoder",
	"Lucas Daycrawler",
	"Chewbarka",
	"Princess Layup",
	"Darth Father",
	"Splock",
	"Hand Solo",
	"Jimmy T. Skirt",
	"Hunter Pearson",
	"Ben Dover",
	"Hugh Mungus",
	"Jack Hoffer",
	"Drew Peacock",
	"Ross Ewage",
	"Al Coholic",
	"Oliver Klozoff",
	"Mike Rotch",
	"Seymour Butts",
	"Yuri Nator",
	"Hellen Riptide"
	
];

var FullPersonNameArray = []; for (i = 0; i < PersonNameArray.length; i++) {FullPersonNameArray.push(PersonNameArray[i]);}

var PlanetNameArray = [
	"Croiscant",
	"Tattooine",
	"Hath",
	"Nabooooo",
	"Alderan",
	"Bespine",
	"Bendor",
	"Neon Geonosis",
	"Arakis",
	"Athans",
	"Klendathu",
	"Vulcano",
	"Vegas",
	"LV-224a",
	"LV-624",
	"LV-403",
	"LV-404",
	"Water World",
	"Mercury",
	"Venus",
	"Earth",
	"Mars",
	"Jupiter",
	"Saturn",
	"Uranus",
	"Neptune",
	"Pluto"
];

var MainList = [];
var Letters = [];

function AdvanceNextDay(){
	if (Errors > 3){
		window.location.replace("./lose.html");
		return false;
	}else{
		Day++;
		localStorage.setItem("Day",Day);

		if (Day >= 11){
			window.location.replace("./win.html");
		}
		
		window.location.href = "game.html?time="+Date.now().toString();
		return false;		
	}
}




//Update Core Display
document.getElementById("Day").innerHTML = Day;
document.getElementById("Errors").innerHTML = Errors+' / 3';
if(Day == 10){
	document.getElementById("Errors").innerHTML = Errors+' / 0';
}

//Sets number of people and planets
for (i = 0; i < Day * 2; i++) {
	//New List of planets and people
	MainList.push(new MainObject());
}

//Sets number of Letters
//Dice Role
for (i = 0; i < Day * 2; i++) {	
	//New day start letters
	Letters.push(Math.floor((Math.random() * MainList.length)));
}

//Generate Mail in Table
GenerateMailin();
GeneratePlanetList();



window.setInterval(function(){
	/// call your function here.
	if (TimerOn == true){
		hourtime++;
	}
	if (hourtime == 60){
		hourtime = 0;
		//Send new mail
		daytime++; //advance day counter
		
		//display new canvas
		document.getElementById("set").value = (Day)+'d4'+'+'+Errors+'d6';
		document.getElementById("label").innerHTML = '';
		document.getElementById("Dark").style.visibility = 'visible';
		document.getElementById("CanvasHolder").style.visibility = 'visible';
		//stop time
		TimerOn = false;
		
		var delay=5000; //5 second
		
		document.getElementById("throw").click(); 
		setTimeout(function() {
		//your code to be executed after 5 second
			CanvasInfo(document.getElementById("output").value);
			document.getElementById("Dark").style.visibility = 'hidden';
			document.getElementById("CanvasHolder").style.visibility = 'hidden';
			TimerOn = true; //resume Time
			GenerateMailin();
		}, delay);
	}
	
	if (daytime == 5){
		window.location.replace("./lose.html");
		return false;
	}
	
	document.getElementById("HourTime").value = hourtime;
	document.getElementById("DayTime").value = daytime;
}, 400);///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////
// Display Scripts                                                //
////////////////////////////////////////////////////////////////////

function GeneratePlanetList(){
	//Address book for planets
	HTML  = '';
	HTML += '<table border ="1" align="center"><tr><th>Name</th><th>Address</th><th>Zip Code</th></tr>';
	
	for (i = 0; i < MainList.length; i++) {
		HTML += '<tr>';
		HTML += '<td>'+MainList[i].Person+'</td>';
		HTML += '<td align="right">'+MainList[i].Planet+'</td>';
		HTML += '<td align="right">'+MainList[i].Zip+'</td>';
		HTML += '</tr>';
	}
	HTML += '</table>';
	document.getElementById("LookUp").innerHTML = HTML;
}

function GenerateMailin(){
	//Generates the display of mail inbox and setups up form info
	HTML  = '';
	HTML += '<div style="position: relative;">';
	HTML += '<table border ="1" align="center"><tr><th>Sender</th><th>Recipient</th><th>Destination Planet</th></tr>';
	
	for (i = 0; i < Letters.length; i++) {
		HTML += '<tr>';
		HTML += '<td>'+MainList[Letters[i]].Sender+'</td>';
		HTML += '<td align="right">'+MainList[Letters[i]].Person+'</td>';
		//HTML += '<td>'+MainList[Letters[i]].Planet+'</td>';
		HTML += '<td nowrap><center>';
		
			if (GameDifficulty == 'Hard'){
				HTML += '<input id="Destination'+i+'" size="10" type="text" class="DestinationText" ondrop="return false;" onpaste="return false;" onkeydown="if (event.keyCode == 13)MassSend()"></input>';
			}else{
				HTML += '<input id="Destination'+i+'" size="10" type="text" class="DestinationText" onkeydown="if (event.keyCode == 13)MassSend()"></input>';
			}
		HTML += '</center></td>';
		HTML += '</tr>';
	}
	
	HTML += '</table>';
	HTML += '<br>';
	HTML += '<button id="MassSend" onclick="MassSend()" class="PinRight">Deliver Letters</button>';
	HTML += '</div>';
	document.getElementById("MailIn").innerHTML = HTML;
	
	//Give focus to first element
	document.getElementById("Destination"+0).focus();
	//alert("Destination"+0);
	//alert(JSON.stringify(Letters));
}




function ChangeDifficulty(){
	//Toggles game difficulty and saves to localstorage so players can repeat play
	if(GameDifficulty == "Easy"){
		GameDifficulty = "Hard";
		document.getElementById("GameDifficulty").innerHTML = "Change to Easy";
	}else{
		GameDifficulty = "Easy";
		document.getElementById("GameDifficulty").innerHTML = "Change to Hard";
	}
	GenerateMailin();
	localStorage.setItem("GameDifficulty", GameDifficulty);
}

////////////////////////////////////////////////////////////////////
// Heavy Logic Section, DONT FUCK UP                              //
////////////////////////////////////////////////////////////////////

function MassSendLetter(i){
	//Gets a single letter and compares sender to receiver
	Answer = MainList[Letters[i]].Planet;
	Answer2 = MainList[Letters[i]].Zip;
	Guess = document.getElementById("Destination"+i).value;
	
	if(Answer == Guess || Answer2 == Guess){
		//alert("Right");
	}else{
		Errors++;
	}
	
	if (Errors > 3){
		window.location.replace("./lose.html");
		return false;
	}
	
	if(Day == 10 && Errors > 0){
		window.location.replace("./lose.html");
		return false;	
	}
	
	Letters.splice(i, 1);
}

function MassSend(){
	//Searches every text field and find ones with content.
	//Sends content indavidualy to be checked
	//Find every textfield that has text
    var x = document.getElementsByClassName("DestinationText");
	for (i = x.length-1; i >= 0; i--){
		if(x[i].value != ''){
			MassSendLetter(i);
		}
	}
	document.getElementById("Errors").innerHTML = Errors+' / 3';
	if(Day == 10){
		document.getElementById("Errors").innerHTML = Errors+' / 0';
	}
	
	if (Letters.length == 0){
		AdvanceNextDay();
	}else{
		//Redraw page
		GenerateMailin();	
	}
}

////////////////////////////////////////////////////////////////////
// Heavy Logic Section DONE                                       //
////////////////////////////////////////////////////////////////////





//Makes random number of x length
function randomFixedInteger(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

////////////////////////////////////////////////////////////////////
// Stable logic section                                           //
////////////////////////////////////////////////////////////////////

function MainObject() {
	//Main object that holds top most info
	this.Sender = FullPersonNameArray[Math.floor((Math.random() * FullPersonNameArray.length))];
	this.Person = GrabUnusedPersonName();
	this.Planet = GrabUnusedPlanetName();
	this.Zip = randomFixedInteger(parseInt(Day) + 3);
}

function GrabUnusedPersonName(){
	//Grab a random person name and add it to list, remove it so no duplicates
	var temp;
	var temp1;
	//Grab random name still in list
	temp = Math.floor((Math.random() * PersonNameArray.length));
	//save to temp var
	temp1 = PersonNameArray[temp];
	//remove name from list
	PersonNameArray.splice(temp, 1);
	//return the random name
	return temp1;
}

function GrabUnusedPlanetName(){
	//Grab a random planet name and add it to list, remove it so no duplicates
	var temp;
	var temp1;
	//Grab random name still in list
	temp = Math.floor((Math.random() * PlanetNameArray.length));
	//save to temp var
	temp1 = PlanetNameArray[temp];
	//remove name from list
	PlanetNameArray.splice(temp, 1);
	//return the random name
	return temp1;
}

function NewDestination(){
	//Grab a random planet to send to
	return MainObject[Math.floor((Math.random() * MainObject.length))];
}

function CanvasInfo(Number){
	//Gets called once, Loads all dice and adds them into letters (pulls random destinations)
	for (i = 0; i < Number; i++) {
		Letters.push(Math.floor((Math.random() * MainList.length)));
	}
}