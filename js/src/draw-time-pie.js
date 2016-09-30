import * as d3 from "d3";
var lookupTeamInfo = require('./lookup-team-info');
var drawChart = require('./drawchart');

function secondsToTime(secs) {
	// http://codeaid.net/javascript/convert-seconds-to-hours-minutes-and-seconds-(javascript)
    var hours = Math.floor(secs / (60 * 60));
   
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
 
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
   
    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}


function drawTimePie(container, data){
	console.log('Drawing time pie');
	// https://bl.ocks.org/mbostock/5100636


	var chartPercentage = 0,
		winTime = 0;

	if (window.homeTeam == "Chicago") {
		chartPercentage = window.timeOfWinProb.homeSeconds / 3600;
		winTime = secondsToTime(window.timeOfWinProb.homeSeconds);
	} else {
		chartPercentage = window.timeOfWinProb.awaySeconds / 3600;
		winTime = secondsToTime(window.timeOfWinProb.awaySeconds);
	}

	var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

	var containerRect = d3.select('.time-pie-container').node().getBoundingClientRect();

	var margin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	}
	var height = containerRect.height,
		width = height,
		innerHeight = height - margin.top - margin.bottom,
		innerWidth = width - margin.left - margin.right,
		radius = height/2;


	var arc = d3.arc()
	    .innerRadius(radius / 2)
	    .outerRadius(radius)
	    .startAngle(0);

	var chartInner = d3.select('.time-pie-container')
		.append('svg')
			.attr('width', width)
			.attr('height', height)
		.append('g')
			.attr("transform", `translate(${width / 2}, ${height / 2})`)
			.classed('chart-inner', true);
	
	// d3.select('.time-pie-container')
	// 	.style('transform', 'translate(-291px,490px) scale(2);');

	var background = chartInner.append("path")
	    .datum({endAngle: tau})
	    .style("fill", "#ddd")
	    .attr("d", arc);

	var foreground = chartInner.append("path")
	    .datum({endAngle: 0 * tau})
	    .style("fill", lookupTeamInfo('Bears', 'team_color'))
	    .attr("d", arc)
		.transition()
	      	.duration(750)
	      	.attrTween("d", arcTween(chartPercentage * tau))
	      	.on('end', ()=>{
	      		d3.select('.time-pie-container')
	      			.append('p')
	      			.classed('win-time', true)
	      			.style('opacity',0)
	      			.style('left', `${width + 25}px`)
	      			.html(`The Bears spent<br />
	      					<span style='background:${lookupTeamInfo('Bears', 'team_color')}' class='bears-highlight'>${winTime.m}:${winTime.s} (${d3.format('.0%')(chartPercentage)})</span><br />
	      					as the likely victor.`)
	      			.transition()
		      			.duration(1000)
		      			.style('opacity',1)
		      			.on('end', () => { drawChart('#chart-container', window.data.plays); });
			});

      function arcTween(newAngle) {
		  return function(d) {
		    var interpolate = d3.interpolate(d.endAngle, newAngle);
		    return function(t) {
		      d.endAngle = interpolate(t);
		     return arc(d);
		    };
		  };
		}
}

module.exports = drawTimePie;