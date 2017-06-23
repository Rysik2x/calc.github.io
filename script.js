var numbers = document.querySelectorAll('.number'),
		operations = document.querySelectorAll('.operation'),
		clearBtns = document.querySelectorAll('.clear-btn'),
		decimalBtn = document.getElementById('decimal'),
		resultBtn = document.getElementById('result'),
		howWorkBtn = document.getElementById('howWorkBtn'),
		display = document.getElementById('display'),
		memoryCurrentNumber = 0,
		memoryNewNumber = false,
		memoryPendingOperation = '',
		operationsList = document.getElementById('operationsList');

for (var i=0; i<clearBtns.length; i++) {
	var clearBtn = clearBtns[i];
	clearBtn.addEventListener('click', function(e) {
		clear(e.srcElement.id);
	});
};

for (var i=0; i<numbers.length; i++) {
	var number = numbers[i];
	number.addEventListener('click', function (e) {
		numberPress(e.target.textContent);
	});
};

for (var i=0; i<operations.length; i++) {
	var operationBtn = operations[i];
	operationBtn.addEventListener('click', function (e) {
		operation(e.target.textContent);
	});
};

	// resultBtn.addEventListener('click', result);

	decimalBtn.addEventListener('click', decimal);

	howWorkBtn.addEventListener('click', howWork);



function numberPress(number) {
	if (memoryNewNumber) {
			display.value = number;
			memoryNewNumber = false;
	} else {
			if (display.value === '0') {
					display.value = number;	
			}	else {
					display.value += number;
	};
	};
};

function operation(op) {
	var localOperationMemory = display.value;

	if (memoryNewNumber && memoryPendingOperation !== '=') {
		display.value = memoryCurrentNumber;
	} else {
		memoryNewNumber = true;
		if (memoryPendingOperation === '+') {
			memoryCurrentNumber += parseFloat(localOperationMemory);
		} else if (memoryPendingOperation === '-') {
			memoryCurrentNumber -= parseFloat(localOperationMemory);
		} else if (memoryPendingOperation === '*') {
			memoryCurrentNumber *= parseFloat(localOperationMemory);
		} else if (memoryPendingOperation === '/') {
			memoryCurrentNumber /= parseFloat(localOperationMemory);
		} else {
			memoryCurrentNumber = parseFloat(localOperationMemory);
		};
		display.value = memoryCurrentNumber;
		memoryPendingOperation = op
	};
};

function decimal() {
	var localDecimalMemory = display.value;
	if (memoryNewNumber) {
		localDecimalMemory = '0.';
		memoryNewNumber = false;
	} else {
		if (localDecimalMemory.indexOf('.') === -1 ) {
				localDecimalMemory += '.';
		}
	};
	display.value = localDecimalMemory;
};

function clear(id) {
	if (id === 'ce') {
		display.value = '0';
		memoryNewNumber = true;
	} else if ( id === 'c') {
		display.value = '0';
		memoryNewNumber = true;
		memoryCurrentNumber = 0;
		memoryPendingOperation = '';
	}
};

function howWork() {
	
	for ( var i=0; i<operations.length; i++) {
		var newLi = document.createElement('li');
		var operationText = operations[i].value;
		newLi.innerText = operationText;
		operationsList.appendChild(newLi);
	};

};