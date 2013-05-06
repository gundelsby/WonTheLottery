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
	
	function createTableRow(numCells) {
		var i, row, numbers = [];
		var inputAttributes = {
			"type": "number",
			"autocomplete": "off",
			"min": "1",
			"max": "34"
		};
		for(i = 0; i < numCells; i++){
			numbers.push(vermin.dom.create("td", {}, vermin.dom.create("input", inputAttributes)));
		}
		return vermin.dom.create("tr", {}, numbers);
	};
	
	function extractTableRowData(tableRow) {
		var i, values = [];
		var tableCells = tableRow.getElementsByTagName("input");
		for(i = 0; i < tableCells.length; i++) {
			values.push(tableCells[i].value);
		}
		return values;
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
				this.tableTicket.appendChild(createTableRow(NUMBERS_IN_ROW));
			};
			
		},
		buildDrawSection: function() {
			var drawSectionContainer = vermin.elements.byId("drawdata");
			drawSectionContainer.appendChild(vermin.dom.create("table", {"id": "main_numbers"}, createTableRow(NUMBERS_IN_ROW)));
			drawSectionContainer.appendChild(vermin.dom.create("table", {"id": "additional_numbers"}, createTableRow(ADDITIONAL_NUMBERS)));
		},
		checkResults: function () {
			console.log("checkResults()");
		},
		saveTicket: function () {
			var i, rows = [], ticket = {};
			var tableRows = this.tableTicket.getElementsByTagName("tr");
			for(i = 0; i < tableRows.length; i++) {
				rows.push(extractTableRowData(tableRows[i]));
			}
			ticket[STORED_OBJECT_ROWS_KEY] = rows;
			localStorage.setItem(LOCAL_STORAGE_PREFIX + LOCAL_STORAGE_TICKET_OBJECT_KEY, JSON.stringify(ticket));
		}
	};
	return lotto;
}());
