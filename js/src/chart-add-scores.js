import * as d3 from "d3";
var lookupTeamInfo = require('./lookup-team-info');




function chartAddScores(x,y,bearsHomeAway){
	// Takes the x and y scale functions as arguments along with a 
	// string (either 'home' or 'away' reflecting the Bears' status for that game)
	console.log('drawing scores');
	const data = window.data.plays;
	const scores = d3.select('.chart-inner')
		.append('g')
		.classed('scores', true)
	data.forEach( (value, index) => {
		if(value['points']['number'] > 2){
			
			let homeAway = value['points']['team'] == window.homeTeam ? 'home' : 'away';
			let scoreType = value['points']['number'] == 6 ? 'touchdown' : 'fieldgoal'
			scores.append('circle')
				.attr('r', 25)
				.attr('cx', x(value['play']))
				.attr('cy', y(value['prob'][bearsHomeAway]))
				.attr('fill', () => {
					return homeAway == 'home' ? lookupTeamInfo(window.homeTeam, 'team_color') : lookupTeamInfo(window.awayTeam, 'team_color');
				})
				.append('image')
					.attr("xlink:href", `${window.ROOT_URL}/svg/${scoreType}.svg`)
					.attr('width',25)
					.attr('height',25)
					.attr('x',0)
					.attr('y',0);

				// .transition()
				// 	.duration(400)
				// 	.attr('r', 25)

				
		}
	});


}

module.exports = chartAddScores;