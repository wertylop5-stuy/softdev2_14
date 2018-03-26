"use strict";

//in billions of dollars
const YEAR_2016 = [
	138, 9.43, 516, 70.9, 24.6, 995, 46.4, 25.7, 12.6, 35,
	39, 27.7, 69.7, 484, 159, 7.47, -0.664, 14.4, 17.2, 888,
	185, 1.68, -226
];
const YEAR_2017 = [
	133, 9.28, 516, 60.2, 26.7, 1010, 42, 35.8, 13.2, 31,
	44.8, 25.4, 75.5, 544, 159, 7.65, 1.13, 23.3, 16.9, 908,
	182, 12.1, -225
];

const DEPARTMENTS = [
	"Agriculture", "Commerce", "Defense", "Education", "Energy",
	"Health and Human Service", "Homeland Security",
	"Housing and Urban Development", "Interior",
	"Justice", "Labor", "State", "Transportation",
	"Treasury", "Veteran Affairs", "EPA",
	"General Services Administration",
	"International Assistance Programs",
	"NASA", "Social Security",
	"Other Departments",
	"Allowances",
	"Undistributed Offsetting Receipts"
];

function setAttr(elem, attrs) {
	for (let x in attrs) {
		elem.attr(x, attrs[x]);
	}
}

function makePositive(d) {
	if (d < 0) return -d;
	return d;
}

function createDataObjList(data, labels) {
	let res = [];
	for (let x = 0; x < data.length; x++) {
		res.push({
			name: labels[x],
			value: data[x]
		});
	}
	return res;
}

(() => {
	let data2016 = createDataObjList(YEAR_2016, DEPARTMENTS);
	let data2017 = createDataObjList(YEAR_2017, DEPARTMENTS);

	let graph = d3.select("#graph tbody");

	//add labels first
	graph.selectAll("tr").data(data2016).enter()
		.append("tr").append("td").classed("label", true)
		.text(d => d.name);
	
	//now add data bars
	graph.selectAll("tr").append("td").append("div")
		.classed("bar", true)
		.classed("negative", d => d.value < 0)
		.text(d => d.value)
		.style("width", d => makePositive(d.value));
	
	//set up radio buttons
	d3.select("form").selectAll("input").on("click", () => {
		//gets the currently targeted element's value
		let value = d3.event.target.value;
		if (value === "2016") {
			console.log("2016");
			graph.selectAll("tr").data(data2016);
			graph.selectAll("tr")
				.select("td div")
				.text(d => d.value)
				.classed("negative", d => d.value < 0);
		}
		else if (value === "2017") {
			console.log("2017");
			
			//have to set class and transition seperately
			//for some reason
			graph.selectAll("tr").data(data2017);
			graph.selectAll("tr")
				.select("td div")
				.text(d => d.value)
				.classed("negative", d => d.value < 0);
		}
		
		graph.selectAll("tr")
			.select("td div")
			.transition().duration(2000)
			.style("width", d => {
				return makePositive(d.value) + "px";
			});
	});
})();

