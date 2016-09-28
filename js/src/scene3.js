import * as d3 from "d3";
var drawChart = require('./drawchart')
// var lookupTeamInfo = require('./lookup-team-info');
// var _ = require('underscore');
// var scene4 = require('./scene3');



function scene3(){
	console.log('winProb line // scene3');
	d3.select('#video').classed('scene2', false).classed('scene3', true);

	// Move the linescore up where it will live
	d3.select('.linescore')
		.style('transform-origin', 'top left')
		.transition()
		.duration(window.transition)
		.style('transform', 'scale(.5)')
		.style('top', '50px')
		.style('left','50px')
		.style('opacity', 1)
		.on('end', () =>{ 
			drawChart('#chart-container', window.data.plays);
		});

	// Now, draw the chart.

	d3.select('#chart-container')
		// .style("background", "rgba(0,0,255,.3)")
		.style("width", " 1920px")
		.style("height", " 750px")
		.style("position", " absolute")
		.style("bottom", "0")
		.style("left", "0");

	d3.select('#video')
		.append('div')
		.classed('dot-text-container', true)
		.style("width", '1005px')
		.style("height", '244px')
		.style("position", " absolute")
		.style("top", '47px')
		.style("right", '51px')
		.style('background', 'red');
}

module.exports = scene3;