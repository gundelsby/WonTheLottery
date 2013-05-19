/*
 * @depend vermin.core.js
 */
var lotto = lotto || ( function () {
	var NUMBERS_IN_ROW = 7;
	var ADDITIONAL_NUMBERS = 3;
	var ROWS_IN_TICKET = 10;
	var LOCAL_STORAGE_PREFIX = "WonTheLottery:";
	var LOCAL_STORAGE_TICKET_OBJECT_KEY = "ticket";
	var STORED_OBJECT_ROWS_KEY = "rows";
	
	function createTableRow(numCells, storedNumbers) {
		var i, row, cells = [];
		var inputAttributes = {
			"type": "text",
			"autocomplete": "off",
			"maxlength": "2"
		};
		for(i = 0; i < numCells; i++){
			if(Array.isArray(storedNumbers)) {
				inputAttributes.value = storedNumbers[i] || "";
			}
			cells.push(vermin.dom.create("td", {}, vermin.dom.create("input", inputAttributes)));
		}
		return vermin.dom.create("tr", {}, cells);
	};
	
	function extractTableRowData(tableRow) {
		var i, values = [];
		var tableCells = tableRow.getElementsByTagName("input");
		for(i = 0; i < tableCells.length; i++) {
			values.push(tableCells[i].value);
		}
		return values;
	};
	
	function getTicketRows(tableRows) {
		var rows = [];
		for(i = 0; i < tableRows.length; i++) {
			rows.push(extractTableRowData(tableRows[i]));
		}
		return rows;
	};
	
	function getResultForRow(row, drawnNumbers, drawnAdditionalNumbers) {
		var i, j, numMainNumbersFound = 0, numAddNumbersFound = 0;
		for(i = 0; i < row.length; i++){
			for(j = 0; j < drawnNumbers.length; j++){
				if(row[i] === drawnNumbers[j]) {
					numMainNumbersFound++;
					break;
				}
			}
			for(j = 0; j < drawnAdditionalNumbers.length; j++){
				if(row[i] === drawnAdditionalNumbers[j]) {
					numAddNumbersFound++;
					break;
				}
			}
		}
		return {
			main: numMainNumbersFound,
			additional: numAddNumbersFound
		};
	};
	
	var lotto = {
		init: function() {
			vermin.elements.byId("save_ticket").addEventListener("click", this.saveTicket.bind(this), false);
			vermin.elements.byId("check_results").addEventListener("click", this.checkResults.bind(this), false);
			this.createTicket();
			this.buildDrawSection();
		},
		createTicket: function() {
			var i, savedTicket, ticketRows;
			savedTicket = localStorage.getItem(LOCAL_STORAGE_PREFIX + LOCAL_STORAGE_TICKET_OBJECT_KEY);
			ticketRows = savedTicket !== undefined || !savedTicket ? JSON.parse(savedTicket) : null;
			this.tableTicket = vermin.elements.byId("ticket");
			for(i = 0; i < ROWS_IN_TICKET; i++){
				this.tableTicket.appendChild(createTableRow(NUMBERS_IN_ROW, Array.isArray(ticketRows) || ticketRows.rows[i]));
			};
		},
		buildDrawSection: function() {
			var drawSectionContainer = vermin.elements.byId("drawdata");
			drawSectionContainer.appendChild(vermin.dom.create("table", {"id": "main_numbers"}, createTableRow(NUMBERS_IN_ROW)));
			drawSectionContainer.appendChild(vermin.dom.create("table", {"id": "additional_numbers"}, createTableRow(ADDITIONAL_NUMBERS)));
		},
		checkResults: function () {
			var i, drawnNumbers, drawnAdditionalNumbers, rowResults = {};
			var rows = getTicketRows(this.tableTicket.getElementsByTagName("tr"));
			drawnNumbers = extractTableRowData(vermin.elements.byId("main_numbers").getElementsByTagName("tr")[0]);
			drawnAdditionalNumbers = extractTableRowData(vermin.elements.byId("additional_numbers").getElementsByTagName("tr")[0]);
			for(i = 0; i < rows.length; i++){
				rowResults[i] = getResultForRow(rows[i], drawnNumbers, drawnAdditionalNumbers);
				console.log(i+1, "Found " + rowResults[i].main + " winning numbers, and " + rowResults[i].additional + " additional numbers for " + rows[i]);
			}
		},
		saveTicket: function () {
			var rows, ticket = {};
			rows = getTicketRows(this.tableTicket.getElementsByTagName("tr"));
			ticket[STORED_OBJECT_ROWS_KEY] = rows;
			localStorage.setItem(LOCAL_STORAGE_PREFIX + LOCAL_STORAGE_TICKET_OBJECT_KEY, JSON.stringify(ticket));
		}
	};
	return lotto;
}());
