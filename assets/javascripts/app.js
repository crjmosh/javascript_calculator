var calcDisplay = document.getElementById('calc-display');
var calcButtons = document.getElementsByClassName('calc-btn');
var calcSigns = document.getElementsByClassName('calc-sign');
var calcEqual = document.getElementById('calc-equal');
var calcClear = document.getElementById('calc-clear');
var calcUp = document.getElementById('calc-up');
var calcDown = document.getElementById('calc-down');
var calcHist = ["END"];
var histPosition = null;
var calcDel = document.getElementById('calc-del');

for(var i = 0; i < calcButtons.length; i++) {
	var calcButton = calcButtons[i];
	calcButton.addEventListener('click', function() {
		var number = this.innerText;
		calcDisplay.innerText = calcDisplay.innerText + number;
		calcDisplay.innerText = calcDisplay.innerText.slice(0, 12);
	});
};

for(var i = 0; i < calcSigns.length; i++) {
	var calcSign = calcSigns[i];
	calcSign.addEventListener('click', function() {
		var symbol = this.innerText;
		var lastDigit = calcDisplay.innerText[calcDisplay.innerText.length - 1];
		if (calcDisplay.innerText != "" || symbol === "-") {
			if (/\/|\+|-|\*/.test(lastDigit)) {
				calcDisplay.innerText = calcDisplay.innerText.slice(0, -1) + symbol;
				calcDisplay.innerText = calcDisplay.innerText.slice(0, 12);
			} else {
				calcDisplay.innerText = calcDisplay.innerText + symbol;
				calcDisplay.innerText = calcDisplay.innerText.slice(0, 12);
			}
		}
	});
};

calcEqual.addEventListener('click', function() {
		calcDisplay.innerText = calcDisplay.innerText.slice(0, 12);
		calcHist.push(calcDisplay.innerText);
		try {
			calcDisplay.innerText = eval(calcDisplay.innerText);
		} catch(err) {
			calcDisplay.innerText = "ERROR";
		}
		calcDisplay.innerText = calcDisplay.innerText.slice(0, 12);
		calcHist.push(calcDisplay.innerText);
		histPosition = null;
});

calcClear.addEventListener('click', function() {
	histPosition = null;
	calcDisplay.innerText = "";
});

calcUp.addEventListener('click', function() {
	if (histPosition === null) {
		histPosition = calcHist.length - 1;
		if (calcDisplay.innerText === calcHist[histPosition]) {
			histPosition -= 1;
			calcDisplay.innerText = calcHist[histPosition];
		} else {
			calcDisplay.innerText = calcHist[histPosition];
		}
	} else if (histPosition > 0){
		histPosition -= 1;
		calcDisplay.innerText = calcHist[histPosition];
	}
});

calcDown.addEventListener('click', function() {
	if (histPosition != null && histPosition < calcHist.length - 1) {
		histPosition += 1;
		calcDisplay.innerText = calcHist[histPosition];
	} else {
		calcDisplay.innerText = "";
		histPosition = null;
	}
});

calcDel.addEventListener('click', function() {
	calcDisplay.innerText = calcDisplay.innerText.slice(0, -1);

});