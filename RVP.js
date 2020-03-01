function randomNumber(base, max) { // Generates a random int between base and max, base inclusive, max exclusive
		return Math.floor(Math.random() * (max-base)) + base;
}

function nonRepeatingRandomNumbers(x){ // Generates a random number that isnt x
	if (x==0){
		return randomNumber(1, 10);
	}
	else if (x==9){
		return randomNumber(0, 8);
	}
	else if (Math.random() < (x/9)+0.05) { // If less than the probability of a number being less than x
		return randomNumber(0, x);
	}
	else return randomNumber(x+1,10);
}

function changeNumber(number){
	document.getElementById("number").innerText = number;
}

class Signal{ // This might be pointless
	constructor(type){
		this.type = type;
	}
}

// Define signals
const start = new Signal("start");
const execute = new Signal("execute");
const clockTick = new Signal("clockTick");
const buttonPress = new Signal("buttonPress");

class GameStateMachine{ // Returns the state it changed to
	constructor(targetSequenceLength) {
		this.state = "start";
		this.position = 0;
		this.currentNumber = 0;
		this.targetSequence = [];
		for(i=0; i<targetSequenceLength; i++){ // targetSequence will end up looking like [1,4,6,2] (random numbers)
			this.currentNumber = nonRepeatingRandomNumbers(this.currentNumber);
			this.targetSequence.push(this.currentNumber);
		}
		this.probability = 0.05;
		this.startTime = Date();
		this.endTime = Date();
		this.lastNumbers = this.targetSequence.slice(1, this.targetSequence.length) // [4,6,2]
	}
	send(signal){ // Gaze upon my works ye mighty, and despair (prepare for a horrid stack of if/else)
		switch(this.state){
			case "start":
				if(signal.type == "clockTick"){
					if (Math.random() < probability){
						this.state = "printSequence";
					}
					else{
						this.state = "printRandom";
					}
				}
				return this.state;

			case "printRandom":
				if(signal.type == "clockTick"){
					changeNumber(this.currentNumber);
					if (this.lastNumbers == this.targetSequence.slice(0, this.targetSequence.length-1)){ // Did we accidentally print the first n-1 numbers of the target sequence?
						this.position == this.targetSequence.length-1; // Jump to end of target sequence
						this.state = "printSequence";
					}
					else if (Math.random() < this.probability){
						this.state = "printSequence";
					}
				}
				return this.state;

			case "printSequence":
				if(signal.type == "clockTick"){
					if (this.position == 0 && this.currentNumber == this.targetSequence[0]){ // If we accidentally jumped in on the first number of the sequence,
						this.position++; // Jump to the second.
					}
					changeNumber(this.targetSequence[position]); // Change the number to the matching one in sequence.
					if(this.position == this.targetSequence.length-1){ // If we just changed the last number in sequence,
						this.startTime = Date();
						this.currentNumber = targetSequence[targetSequence.length-1]; // So we don't print the same number after leaving the sequence!
						this.state = "awaitPress"; // Then set marker back to start of sequence,
					}
					else{ // otherwise,
						this.position++; // we aren't at the end, so increment the marker.
					}
				}
				return this.state;

			case "awaitPress":
				if(signal.type == "buttonPress"){
					this.endTime = Date();
					this.state = "correctPress";
				}
				else if(signal.type == "clockTick"){
					this.state = "missedPress";
				}
				return this.state;

			case "correctPress":
				reactionTime = this.endTime - this.startTime;
				console.log("Reaction time:" + reactionTime); /// REPLACE ME WITH THE DATABASE STUFF
				this.state = "printRandom"; // Note that this means the program will never enter target sequence immediately after leaving it
				return this.state;

			case "missedPress":
				changeNumber(this.currentNumber); // Do this first, to try and keep timing as close to 500ms between numbers as possible
				console.log("Missed the sequence!"); /// REPLACE ME WITH THE DATABASE STUFF
				this.state = "printRandom";
				return this.state;

		}
	}
}

window.onload = function initialise(){
const gameEngine = new GameStateMachine(3);
document.getElementById("targSequencey").innerText = "Target Sequence = ["+gameEngine.targetSequence+"]";
setInterval(gameEngine.send(clockTick), 500);
}

// Other things to measure:
// 	Probabiltiy of false alarms
// 	Sensitivity (Not sure what this is; probably proportion of misses)
