import * as d3 from "d3";
var lookupTeamInfo = require('./lookup-team-info');
var _ = require('underscore');
var titleCard = require('./title-card');
var highlightPlays = require('./highlight-plays');


function translateAlong(path) {
	var l = path.getTotalLength();
	return function(i) {
	  return function(t) {
	    var p = path.getPointAtLength(t * l);
	    return "translate(" + p.x + "," + p.y + ")";//Move marker
	  }
	}
}



function transition(i, type_str) {
	let flag = d3.select(`.${type_str}-icon--${i}`);
	let path = d3.select(`.${type_str}-path--${i}`);
	flag.transition()
	    .duration(1000)
	    .style('opacity', 1)
	    .attrTween("transform", translateAlong(path.node()));
}



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

function setDotVertical(dotType, value){

	if(dotType == "score"){
		if (value < 0.70 ) {
			return y(.88)
		} else {
			return y(.10)
		}
	}

	if(dotType == "turnover"){
		if (value < 0.70 ) {
			return y(.80)
		} else {
			return y(.20)
		}
	}
}


function chartAddScores(x,y,bearsHomeAway, height, width){
	// Takes the x and y scale functions as arguments along with a 
	// string (either 'home' or 'away' reflecting the Bears' status for that game)
	console.log('drawing scores');
	const data = window.data.plays;
	const scoreIconDimension = 26;
	const turnoverIconDimension = 20;
	const penaltyIconDimension = 6;
	const dotDelay = window.transition / 9;
	window.dispatch = d3.dispatch('scoresDone','scoreCardDone', 'turnoversDone', 'turnoversCardDone', 'penaltiesCardDone');


	// FILTER SCORING PLAYS
	const scores = d3.select('.chart-inner')
		.append('g')
		.classed('scores', true);

	const scoresData = _.filter(data, (play, index) => {
			return play['points']['number'] > 1 == true;
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
	const penalties = d3.select('.chart-inner')
		.append('g')
		.classed('penalties', true);
	var penaltyData = _.filter(data, (play, index) => {
		if (play['penalties'].length > 0){
			return true;
		};
	});

	titleCard({
		text:`${scoresData.length} Scores`,
		delay:1000
	}, () =>{
			// Place the dots for each score
			scoresData.forEach( (value, index) => {
				setTimeout(function(){
					let homeAway = value['points']['team'] == window.homeTeam ? 'home' : 'away',
						scoreType = value['points']['number'] == 6 ? 'touchdown' : 'fieldgoal',
						winProb = value['prob'][bearsHomeAway],
						play = value['play'];

					// Draw the line
					scores.append('path')
						.style('stroke', '#888')
						.style('stroke-width', '4px')
						.style('stroke-dasharray', '8,5')
						.style('transform-origin', () =>{
							return setDotVertical('score', winProb) > .5 ? 'top' : 'bottom';
						} )
						.style('transform', `scale(0)`)
						.attr('d',`M ${x(play)} ${setDotVertical('score', winProb)} L ${x(play)} ${y(winProb)}`)
						.transition()
							.duration(dotDelay)
							.style('transform', `scale(1)`);

					scores.append('circle')
						.attr('r', 0)
						.attr('cx', x(play))
						.attr('cy', setDotVertical('score', winProb))
						.attr('fill', () => {
							return homeAway == 'home' ? lookupTeamInfo(window.homeTeam, 'team_color') : lookupTeamInfo(window.awayTeam, 'team_color');
						})
						.transition()
						.duration(dotDelay)
						.attr('r', scoreIconDimension);
					
					scores.append('use')
						.attr('x', x(play))
						.attr('y', setDotVertical('score', winProb))
						.attr('height', scoreIconDimension * 2)
						.attr('width', scoreIconDimension * 2)
						.attr("xlink:href", () => {
							if(value['points']['number'] == 6){
								return `#touchdown`;
							} else if(value['points']['number'] == 3) {
								return `#fieldgoal`;
							}
							return `#safety`;
						})
						.style('opacity',0)
						.style('stroke','transparent')
						.style('fill', 'white')
						.attr('transform', `translate(${0-scoreIconDimension}, ${0-scoreIconDimension})`)
						.transition()
							.duration(dotDelay)
							.style('opacity',1)

						
					if (index == scoresData.length - 1){
						console.log('scoresDone');
						window.dispatch.call('scoresDone');
					}
				}, dotDelay * index);

			});
		});


		// Let's listen for when scores is done and then do turnovers.
	window.dispatch.on('scoresDone', () => {
		titleCard({
			text:`${turnoverData.length} Turnovers`,
			delay:1000
		}, () =>{
			turnoverData.forEach( (value, index) => {
				setTimeout(function(){
					let homeAway = value['possessor'] == window.homeTeam ? 'home' : 'away',
					scoreType = value['points']['number'] == 6 ? 'touchdown' : 'fieldgoal',
					winProb = value['prob'][bearsHomeAway],
					play = value['play'];

					turnovers.append('path')
						.style('stroke', '#aaa')
						.style('stroke-width', '3px')
						.style('stroke-dasharray', '5,5')
						.style('transform-origin', () =>{
							return setDotVertical('turnover', winProb) > .5 ? 'top' : 'bottom';
						})
						.style('transform', `scale(0)`)
						.attr('d',`M ${x(play)} ${setDotVertical('turnover', winProb)} L ${x(play)} ${y(winProb)}`)
						.transition()
							.duration(dotDelay)
							.style('transform', `scale(1)`);

					turnovers.append('circle')
						.attr('r', 0)
						.attr('cx', x(play))
						.attr('cy', setDotVertical('turnover', winProb))
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
						window.dispatch.call('turnoversDone');
					}
				}, dotDelay * index);		
			});
		});
	});



	window.dispatch.on('turnoversDone', () => {
		titleCard({
			text:`${penaltyData.length} Penalties`,
			delay:1000
		}, () =>{
			console.log('Now on to penalties');
			penaltyData.forEach((value, index) => {
				let homeAway = value['possessor'] == window.homeTeam ? 'home' : 'away',
				winProb = value['prob'][bearsHomeAway],
				play = value['play'];

				setTimeout(function(){
					penalties.append('path')
						.style('stroke', 'transparent')
						// .style('stroke-width', '1')
						.style('fill', 'transparent')
						.attr('d', () =>{
							let arcPoints = {};
							arcPoints.startX = width,
							arcPoints.startY = height,
							arcPoints.finalX = x(value['play']),
							arcPoints.finalY = y(winProb),
							arcPoints.midpointX = arcPoints.startX + ((arcPoints.finalX - arcPoints.startX) / 2),
							arcPoints.midpointY = -450;
							return `M ${arcPoints.startX} ${arcPoints.startY}
							Q ${arcPoints.midpointX} ${arcPoints.midpointY} ${arcPoints.finalX} ${arcPoints.finalY}`;
						})
						.classed(`penalty-path`, true)
						.classed(`penalty-path--${index}`, true);

					let homeAway = value['possessor'] == window.homeTeam ? 'home' : 'away';

					penalties.append('circle')
						.classed('penalty-icon', true)
						.classed(`penalty-icon--${index}`, true)
						.attr('transform', `translate(${width / 2} ${height})`)
						.attr('stroke', () => {
							return homeAway == 'home' ? lookupTeamInfo(window.homeTeam, 'team_color') : lookupTeamInfo(window.awayTeam, 'team_color');
						})
						.attr('stroke-width', 6)
						.attr('fill', 'yellow')
						.attr('r', penaltyIconDimension)
						.style('opacity',0);

					transition(index, 'penalty');

					if (index == penaltyData.length - 1){
						console.log('now we will highlight plays');
						highlightPlays();
					}							
				}, 25 * index )
			});
		});
	});
}

module.exports = chartAddScores;