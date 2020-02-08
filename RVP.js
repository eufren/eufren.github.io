function randomNumbers() {
		document.getElementById("number").innerHTML = Math.floor(Math.random() * Math.floor(10));;
}

var myVar = setInterval(randomNumbers, 500);

randomNumbers()
