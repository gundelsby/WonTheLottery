var lotto = lotto || ( function () {
	const NUMBERS_IN_ROW = 7;
	const ADDITIONAL_NUMBERS = 1;
	const ROWS_IN_TICKET = 10;
	const LOCAL_STORAGE_PREFIX = "WonTheLottery:";
	const LOCAL_STORAGE_TICKET_OBJECT_KEY = "ticket";
	const STORED_OBJECT_ROWS_KEY = "STORED_OBJECT_ROWS_KEY";
	const MAIN_NUMBERS_REQ_TO_WIN = 4;
	const WIN_CLASSNAME = 'won';
	
	function createTableCell (inputAttributes) {
		const cell = document.createElement('td');
		const input = document.createElement('input');

		Object.keys(inputAttributes).forEach((key) => {
			input.setAttribute(key, inputAttributes[key]);
		});

		cell.appendChild(input);

		return cell;
	}

	function createTableRow (numCells, storedNumbers) {
		const row = document.createElement('tr');
		const inputAttributes = {
			"type": "text",
			"autocomplete": "off",
			"maxlength": "2"
		};
		
		for(let i = 0; i < numCells; i++) {
			row.appendChild(createTableCell(Object.assign({}, inputAttributes, {
				value: (Array.isArray(storedNumbers)) ? storedNumbers[i] : ''
			})));
		}

	 	return row;
	};
	
	function extractTableRowData (tableRow) {
		return Array.from(tableRow.querySelectorAll('input')).map((cell) => {
			return cell.value;
		});
	};
	
	function getTicketRows (tableRows) {
		return Array.from(tableRows).map((row) => {
			return extractTableRowData(row);
		});
	};
	
	function getResultForRow (row, drawnNumbers, drawnAdditionalNumbers) {
		const main = row.reduce((numbersFound, number) => {
			return drawnNumbers.includes(number) ? numbersFound + 1 : numbersFound;
		}, 0);
		const additional = row.reduce((numbersFound, number) => {
			return drawnAdditionalNumbers.includes(number) ? numbersFound + 1 : numbersFound;
		}, 0);

		return {
			main,
			additional
		};
	};

	function buildDrawSection () {
		const drawSectionContainer = document.getElementById('drawdata');
		const tableMain = document.createElement('table');
		const tableAdditional = document.createElement('table');

		tableMain.id = 'main_numbers';
		tableMain.append(createTableRow(NUMBERS_IN_ROW));
		drawSectionContainer.appendChild(tableMain);

		tableAdditional.id = 'additional_numbers';
		tableAdditional.append(createTableRow(ADDITIONAL_NUMBERS));
		drawSectionContainer.appendChild(tableAdditional);
	}

	function createTicket (tableTicket) {
		const savedTicket = localStorage.getItem(LOCAL_STORAGE_PREFIX + LOCAL_STORAGE_TICKET_OBJECT_KEY);
		const ticketRows = savedTicket ? JSON.parse(savedTicket) : null;
		for(i = 0; i < ROWS_IN_TICKET; i++){
			tableTicket.appendChild(createTableRow(NUMBERS_IN_ROW, Array.isArray(ticketRows[STORED_OBJECT_ROWS_KEY]) && ticketRows[STORED_OBJECT_ROWS_KEY][i]));
		};
	}

	return {
		init: () => {
			createTicket(document.getElementById('ticket'));
			buildDrawSection();

			document.getElementById('save_ticket').addEventListener('click', () => {
				const rows = getTicketRows(document.getElementById('ticket').getElementsByTagName("tr"));
				localStorage.setItem(LOCAL_STORAGE_PREFIX + LOCAL_STORAGE_TICKET_OBJECT_KEY, JSON.stringify({
					STORED_OBJECT_ROWS_KEY: rows
				}));
			});

			document.getElementById('check_results').addEventListener('click', () => {
				const tableRows = document.getElementById('ticket').getElementsByTagName('tr');
				const rows = getTicketRows(tableRows);
				const drawnNumbers = extractTableRowData(document.getElementById('main_numbers').getElementsByTagName('tr')[0]);
				const drawnAdditionalNumbers = extractTableRowData(document.getElementById('additional_numbers').getElementsByTagName('tr')[0]);

				rows.forEach((row, index) => {
					const {main, additional} = getResultForRow(row, drawnNumbers, drawnAdditionalNumbers);
					const won = main >= MAIN_NUMBERS_REQ_TO_WIN ? WIN_CLASSNAME : '';
					tableRows[index].className = won ? WIN_CLASSNAME : '';
					console.log(`Rad ${index + 1} gir ${won ? '' : 'ikke '}premie! (${main}+${additional})`);
				});
			});

		}
	};
	return lotto;
}());
