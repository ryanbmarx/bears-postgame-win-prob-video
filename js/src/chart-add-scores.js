import * as d3 from "d3";
var lookupTeamInfo = require('./lookup-team-info');
var _ = require('underscore');
var titleCard = require('./title-card');

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



function addScores(scoresData){
	scoresData.forEach( (value, index) => {
		setTimeout(function(){
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
					.duration(dotDelay)
					.attr('r', scoreIconDimension);
		}, dotDelay * index);
	});
}



function chartAddScores(x,y,bearsHomeAway){
	// Takes the x and y scale functions as arguments along with a 
	// string (either 'home' or 'away' reflecting the Bears' status for that game)
	console.log('drawing scores');
	const data = window.data.plays;
	const scoreIconDimension = 40;
	const turnoverIconDimension = 20;
	const penaltyIconDimension = 10;
	const dotDelay = window.transition / 7;
	const dispatch = d3.dispatch('scoresDone', 'turnoversDone');


	// FILTER SCORING PLAYS
	const scores = d3.select('.chart-inner')
		.append('g')
		.classed('scores', true);

	const scoresData = _.filter(data, (play, index) => {
			return play['points']['number'] > 2 == true;
	});


	// FILTER TURNOVER PLAYS
	const turnoverPhrases = ['intercept', 'fumble'];
	const turnovers = d3.select('.chart-inner')
		.append('g')
		.classed('turnovers', true);

	var turnoverData = _.filter(data, (play, index) => {
		return isItATurnOver(play, index, turnoverPhrases, data);
	});


	// FILTER PENALTIY PLAYS
	var penaltyData = _.filter(data, (play, index) => {
		if (play['penalties'].length > 0){
			return true;
		};
	});

	let title = d3.select('.dot-text-container')
		.append('p')
		.classed('dot-title', true)
		.text('Scoring plays')
		.style('opacity', 0)
		.transition()
		.duration(window.transition)
		.style('opacity', 1)
		.on('end', () =>{
			// Place the dots for each score
			scoresData.forEach( (value, index) => {
				setTimeout(function(){
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
						.duration(dotDelay)
						.attr('r', scoreIconDimension);
					if (index == scoresData.length - 1){
						console.log('scoresDone');
						dispatch.call('scoresDone');
					}
				}, dotDelay * index);

			});
		});


		// Let's listen for when scores is done and then do turnovers.
		dispatch.on('scoresDone', () => {
			d3.select('.dot-title')
			.transition()
			.duration(window.transition / 2)
			.style('opacity', 0)
			.on('end', (e)=>{
				d3.select('.dot-title')
					.text('Turnovers');	
			})
			.transition()
			.duration(window.transition / 2)
			.style('opacity', 1)
			.on('end', ()=>{
				turnoverData.forEach( (value, index) => {
					setTimeout(function(){
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
							.duration(dotDelay)
							.attr('r', turnoverIconDimension);
					if (index == turnoverData.length - 1){
						console.log('turnoversDone');
						dispatch.call('turnoversDone');
					}

					}, dotDelay * index);		
				});
			});
		});
	dispatch.on('turnoversDone', () => {
		console.log('Now on to penalties');
		d3.select('.dot-title')
			.transition()
			.duration(window.transition / 2)
			.style('opacity', 0)
			.on('end', (e)=>{
				d3.select('.dot-title')
					.text('Penalties');	
			})
			.transition()
			.duration(window.transition / 2)
			.style('opacity', 1)
			.on('end', ()=>{
				penaltyData.forEach( (value, index) => {
					setTimeout(function(){
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
							.duration(dotDelay)
							.attr('r', penaltyIconDimension);
					if (index == penaltyData.length - 1){
						console.log('penalties done');
						// dispatch.call('turnoversDone');
						titleCard({
							text:'Big Play #1',
							img:'jordy.jpg',
							credit:'XYZ PHOTO',
							delay:4000
						});
					}

					}, dotDelay * index);		
				});
			});
	});

	let legend = d3.select('.dot-text-container')
		.append('ul')
		.classed('legend', true);

}

module.exports = chartAddScores;