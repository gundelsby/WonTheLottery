/*
 * @depend vermin.core.js
 */
var lotto = lotto || ( function () {
	var NUMBERS_IN_ROW = 7;
	var ADDITIONAL_NUMBERS = 3;
	var ROWS_IN_TICKET = 10;
	var LOCAL_STORAGE_PREFIX = "WonTheLottery";
	
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
	
	var lotto = {
		init: function() {
			var self = this;
			vermin.elements.byId("save_ticket").addEventListener("click", (function() { return self.saveTicket}()), false);
			vermin.elements.byId("check_results").addEventListener("click", (function() { return self.checkResults}()), false);
			this.createTicket();
			this.buildDrawSection();
		},
		createTicket: function() {
			var i;
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
			var tableRows = this.tableTicket.getElementsByTagName("tr");
			console.log("rows: ", tableRows);
			console.log("saveTicket()");
		}
	};
	return lotto;
}());
