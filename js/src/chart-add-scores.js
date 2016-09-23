import * as d3 from "d3";
var lookupTeamInfo = require('./lookup-team-info');
var _ = require('underscore')

function checkForSubstrings(description, strings_array){
	// takes a strong (description) and an array of substrings. 
	// If any of those substrings are present in the string, it returns true.
	if (description != null){
		for (var i=0; i < strings_array.length; i++){
			if (description.toLowerCase().indexOf(strings_array[i]) > -1){
				return true; 
			}
		}
	}
	return false;
}

function isItATurnOver(play_obj, data_index, turnoverPhrases, data){
	// Returns true if play is a turnover.
	if(checkForSubstrings(play_obj['description'], turnoverPhrases)){
		if(play_obj.possessor != data[data_index + 1].possessor){
			// If possession switches after the play
			return true
		}
	}
	return false;
}



function chartAddScores(x,y,bearsHomeAway){
	// Takes the x and y scale functions as arguments along with a 
	// string (either 'home' or 'away' reflecting the Bears' status for that game)
	console.log('drawing scores');
	const data = window.data.plays;
	const scoreIconDimension = 40;
	const turnoverIconDimension = 20;
	const penaltyIconDimension = 10;

	const scores = d3.select('.chart-inner')
		.append('g')
		.classed('scores', true);

	data.forEach( (value, index) => {
		if(value['points']['number'] > 2){
			
			let homeAway = value['points']['team'] == window.homeTeam ? 'home' : 'away';
			let scoreType = value['points']['number'] == 6 ? 'touchdown' : 'fieldgoal'
			scores.append('circle')
				.attr('r', 0)
				.attr('cx', x(value['play']))
				.attr('cy', y(value['prob'][bearsHomeAway]))
				.attr('fill', () => {
					return homeAway == 'home' ? lookupTeamInfo(window.homeTeam, 'team_color') : lookupTeamInfo(window.awayTeam, 'team_color');
				})
				.transition()
					.duration(400)
					.attr('r', scoreIconDimension);
		}
	});

	// Now let's highlight turnovers
	const turnoverPhrases = ['intercept', 'fumble'];
	const turnovers = d3.select('.chart-inner')
		.append('g')
		.classed('turnovers', true);

	var turnoverData = _.filter(data, (play, index) => {
		return isItATurnOver(play, index, turnoverPhrases, data);
	})
	turnoverData.forEach( (value, index) => {
				
		let homeAway = value['possessor'] == window.homeTeam ? 'home' : 'away';
		turnovers.append('circle')
			.attr('r', 0)
			.attr('cx', x(value['play']))
			.attr('cy', y(value['prob'][bearsHomeAway]))
			.attr('fill', () => {
				return homeAway == 'home' ? lookupTeamInfo(window.homeTeam, 'team_color') : lookupTeamInfo(window.awayTeam, 'team_color');
			})
			.attr('stroke-width', 3)
			.attr('stroke', 'yellow')
			.transition()
				.duration(400)
				.attr('r', turnoverIconDimension)		
	});

	turnoverData.forEach( (value, index) => {
				
		let homeAway = value['possessor'] == window.homeTeam ? 'home' : 'away';
		turnovers.append('circle')
			.attr('r', 0)
			.attr('cx', x(value['play']))
			.attr('cy', y(value['prob'][bearsHomeAway]))
			.attr('fill', () => {
				return homeAway == 'home' ? lookupTeamInfo(window.homeTeam, 'team_color') : lookupTeamInfo(window.awayTeam, 'team_color');
			})
			.attr('stroke-width', 6)
			.attr('stroke', 'yellow')
			.transition()
				.duration(400)
				.attr('r', penaltyIconDimension)		
	});

}

module.exports = chartAddScores;