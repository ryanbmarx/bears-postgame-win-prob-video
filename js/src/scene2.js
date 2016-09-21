var d3 = require('d3');
var lookupTeamInfo = require('./lookup-team-info');
var _ = require('underscore');

// Text transition method from here: https://bl.ocks.org/mbostock/7004f92cac972edef365

function lineScoreNumberTransition(idx, score, line, transitionTime){

	var format = d3.format(",d");

	let targetScore = score[`score${idx+1}`];
	line.select(`.linescore__${(idx+1)}`)
  		.transition()
	    .duration(transitionTime)
	    .style('color', "black")
	    .on("start", function() {
	    	console.log('starting number tween');
			d3.active(this)
	          .tween("text", function() {
	            var that = d3.select(this),
	                interp = d3.interpolateNumber(1,targetScore);
	            return function(t) { 
	            	that.text(format(interp(t))); 
	            };
	          })
	    });

}



function scene2(){


	console.log('linescore//scene2')
	d3.select('#video').classed('scene1', false).classed('scene2', true);
	let scene2transition = 2000;

	let teams = ['away', 'home'];

	teams.forEach((v,i) => {
		let line = d3.select(`.linescore__${v}`);
		let score = window.scores[v];
		for(var i=0; i < 6; i++){
			var timer = window.setTimeout(lineScoreNumberTransition, 250 * i, i, score, line, scene2transition);
		}
	})
				

	// d3.select('.linescore__away .linescore__6')
 //  		.transition()
	//     .duration(scene2transition)
	//     .on("start", function() {
	//       d3.active(this)
	//           .tween("text", function() {
	//             var that = d3.select(this),
	//                 i = d3.interpolateNumber(0,window.scores.away.score6);
	//             return function(t) { that.text(format(i(t))); };
	//           })
	//     });




}

module.exports = scene2;