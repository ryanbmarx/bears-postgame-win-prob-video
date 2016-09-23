import * as d3 from "d3";
var lookupTeamInfo = require('./lookup-team-info');
var chartAddScores = require('./chart-add-scores');


function drawChart(container, data){
	console.log('drawing chart');

	// GET DIMENSIONS OF THE CONTAINER
	var containerRect = d3.select(container).node().getBoundingClientRect();

	var margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 75,
	}
	var height = containerRect.height,
		width = containerRect.width,
		innerHeight = height - margin.top - margin.bottom,
		innerWidth = width - margin.left - margin.right;

	var chartInner = d3.select(container)
		.append('svg')
			.attr('width', width)
			.attr('height', height)
		.append('g')
			.attr('width', innerWidth)
			.attr('height', innerHeight)
			.attr('transform', `translate(${margin.left},${margin.top})`)
			.classed('chart-inner', true);
		
	// chartInner.append("clipPath")
	//     .attr("id", "rectClip")
	//   .append("rect")
	//     .attr("width", 500)
	//     .attr("height", innerHeight);


	// THIS IS THE NUMBER OF PLAYS
	let x = d3.scaleLinear()
	    .range([0, innerWidth])
	    .domain([1, data.length]);

	

	// THIS IS THE WIN PROB
	let y = d3.scaleLinear()
		.range([innerHeight, 0])
		.domain([0, 1]);

	// let yAxis = d3.axisRight(y)
	// 	.ticks(20)
	// 	.tickSize(innerWidth)
	// 	// .innerTickSize(-width)
	// 	// .outerTickSize(0)
	// 	// .tickPadding(10)

	let gridLineWidth = 3;

	chartInner.append('g')
		.attr('class', 'grid')

	// Add horizontal gridlines
	for (var i=0; i< 101; i++){
		if (i % 10 == 0 && i != 50){
			d3.select('.grid')
				.append('rect')
				.style('height', gridLineWidth)
				.style('width', width)
				.style('fill', '#eee')
				.attr('y',y(i/100))
				.attr('x',0)
				.attr('transform', `translate(${0-width}, 0 )`)
				.transition()
				.duration(2000)
				.attr('transform', `translate(0, 0)`);
		}  else if (i == 50){
			d3.select('.grid')
				.append('rect')
				.style('height', gridLineWidth * 2)
				.style('width', width)
				.style('fill', '#aaa')
				.attr('y',y(i/100) - gridLineWidth * 2 / 2)
				.attr('x',0)
				.attr('transform', `translate(${0-width}, 0 )`)
				.transition()
				.duration(2000)
				.attr('transform', `translate(0, 0)`);
		}

	}

	// Add quarter gridlines and labels

		var quarters = [3600, 2700, 1800, 900]

		for (var i=0; i < data.length; i++){
			if(quarters.indexOf(parseInt(data[i]['seconds_remaining'])) > -1){
				d3.select('.grid')
					.append('rect')
					.style('width', gridLineWidth * 2)
					.style('height', height)
					.style('fill', '#aaa')
					.attr('x',x(data[i]['play']))
					.attr('y',0)
					.attr('transform', `translate(0, ${height})`)
					.transition()
					.duration(2000)
					.attr('transform', `translate(0, 0)`)
					.on('end', () => {
					});
					
				let quarterLabel = "";

				switch (data[i]['seconds_remaining']){
					case 3600:
						quarterLabel = "1st Quarter";
						break;
					case 2700:
						quarterLabel = "2nd Quarter";
						break;
					case 1800:
						quarterLabel = "3rd Quarter";
						break;
					case 900:
						quarterLabel = "4th Quarter";
						break;
				}

				d3.select('.grid')
					.append('text')
					.text(quarterLabel)
					.attr('y',50)
					.attr('x',x(data[i]['play']))
					.attr('transform', 'translate(20,0)')
					.classed('quarter-label', true);

			}

	}

	var homeAway = window.homeTeam == 'Chicago' ? 'home' : 'away';

	var areaChart = d3.area()
	    .x(d => x(d.play))
	    .y0(innerHeight)
	    .y1(d => y(d['prob'][homeAway]));

  	chartInner.append("path")
		.datum(data)
		.style('fill', lookupTeamInfo('Chicago', 'team_alternate_color'))
		.attr("class", "areaChart")
		.attr("d", areaChart)
	
	var lineChart = d3.line()
	    .x(d => x(d.play))
	    .y(d => y(d['prob'][homeAway]));
  	
  	chartInner.append("path")
		.datum(data)
		.style('stroke', lookupTeamInfo('Chicago', 'team_color'))
		.style('stroke-width', 10)
		.style('fill', 'none')
		.style('stroke-linecap',"round")
		.attr("class", "lineChart")
		.attr("d", lineChart);

  	chartInner.append("path")
		.datum(data)
		.style('stroke', 'white')
		.style('stroke-width', 4)
		.style('fill', 'none')
		.style('stroke-linecap',"round")
		.attr("class", "lineChart")
		.transition()
		.duration(2000)
			.attr("d", lineChart)
			.on('end', ()=>{
				chartAddScores(x, y, homeAway);
			});




 
}

module.exports = drawChart;