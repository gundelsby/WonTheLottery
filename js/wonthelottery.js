/*
 * @depend vermin.core.js
 */
var lotto = lotto || ( function () {
	var NUMBERS_IN_ROW = 7;
	var ROWS_IN_TICKET = 10;
	var lotto = {
		init: function() {
			this.createTicket();
			this.buildDrawSection();
		},
		createTicket: function() {
			var i, j, row, rows = [], numbers = [];
			var inputAttributes = {
				"type": "number",
				"autocomplete": "off",
				"min": "1",
				"max": "34"
			}
			this.tableTicket = vermin.elements.byId("ticket");
			for(i = 0; i < ROWS_IN_TICKET; i++){
				for(j = 0; j < NUMBERS_IN_ROW; j++){
					numbers.push(vermin.dom.create("td", {}, vermin.dom.create("input", inputAttributes)));
				}
				row = vermin.dom.create("tr", {}, numbers);
				rows.push(row);
				numbers = [];
			};
			for(i = 0; i < rows.length; i++){
				this.tableTicket.appendChild(rows[i]);
			};
			
		},
		buildDrawSection: function() {
			var tableMainNumbers = vermin.elements.byId("numbers_main");
			var tableAddNumbers = vermin.elements.byId("numbers_additional");
		}
	};
	return lotto;
}());
