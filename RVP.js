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

const targetSequence = [randomNumber(0, 10), randomNumber(0, 10), randomNumber(0, 10)];
var makeSureWeDontAccidentallyShowTargetSequence = targetSequence.slice(0,-2); // It doesn't matter if this triggers the check first time.
var probability = 0.05;
var currentNumber = 0;
var inTargetSequence = false;
var position = 0;

function game(){
	if(inTargetSequence){ // If we're meant to be printing the target sequence,
		if (position == 0 && currentNumber == targetSequence[0]){ // If we accidentally jumped in on the first number of the sequence,
			position++; // Jump to the second.
		}
		changeNumber(targetSequence[position]); // Change the number to the matching one in sequence.
		if(position == targetSequence.length-1){ // If we just changed the last number in sequence,
			position = 0; // Then set marker back to start of sequence,
			currentNumber = targetSequence[targetSequence.length-1]; // So we don't print the same number after leaving the sequence!
			inTargetSequence = false; // and leave the target sequence state.
			return
		}
		else{ // otherwise,
			position++; // we aren't at the end, so increment the marker.
			return
		}
	}
	else if (Math.random() < probability){ // Do a check for whether we should enter the target sequence,
		inTargetSequence = true; // and set flag if we should
	}
	//console.log("produced random number: " + currentNumber);
	currentNumber = nonRepeatingRandomNumbers(currentNumber); // Not currently in target sequence, or meant to enter it next loop, so produce a random number.
	changeNumber(currentNumber);
	makeSureWeDontAccidentallyShowTargetSequence.shift(); // Get rid of the oldest number,
	makeSureWeDontAccidentallyShowTargetSequence.push(currentNumber); // and add the current one.
	if (makeSureWeDontAccidentallyShowTargetSequence == targetSequence.slice(0, -2)){ // Have we accidentally printed all but the last element of the target sequence?
		currentNumber = targetSequence[targetSequence.length-1]; // If we have, then set currentNumber to last element of target sequence, ensuring it won't be printed.
	}
	return;
}

window.onload = function initialise(){
document.getElementById("targSequencey").innerText = "Target Sequence = ["+targetSequence+"]";

setInterval(game, 500);
}
