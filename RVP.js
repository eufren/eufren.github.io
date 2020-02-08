function randomNumbers() {
		document.getElementById("number").innerText = Math.floor(Math.random() * Math.floor(10));;
}

var setInterval = setInterval(randomNumbers, 500);

randomNumbers()
