"use strict";

const year2016 = [];
const year2017 = [];

function setAttr(elem, attrs) {
	for (let x in attrs) {
		elem.attr(x, attrs[x]);
	}
}

(() => {
	let graph = d3.select("#graph");
	
	//set up radio buttons
	d3.select("form").selectAll("input").on("click", () => {
		//gets the currently targeted element's value
		let value = d3.event.target.value;
		if (value === "2016") {
			console.log("2016");
			graph.selectAll(".bar").data(year2016);
		}
		else if (value === "2017") {
			console.log("2017");
			graph.selectAll(".bar").data(year2017);
		}
	});
})();

