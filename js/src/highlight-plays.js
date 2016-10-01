import * as d3 from "d3";
var lookupTeamInfo = require('./lookup-team-info');
var titleCard = require('./title-card');

function clearElements(){
	d3.select('.scores')
		.transition()
		.delay(300)
		.duration(1000)
		.style('opacity',0);

	d3.select('.penalties')
		.transition()
		.duration(1000)
		.style('opacity',0);

	d3.select('.turnovers')
		.transition()
		.duration(1000)
		.delay(150)
		.style('opacity',0);
}

/*

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
*/

function highlightSinglePlay(data){

	let bearsHomeAway = "Chicago" == window.homeTeam ? 'home' : 'away',
		winProb = data.playData['prob'][bearsHomeAway],
		play = data.playData.playIndex;


	d3.select('.chart-inner')
		.append('circle')
		.classed('top-play', true)
		.attr('r', 0)
		.attr('cx', window.x(play))
		.attr('cy', window.y(winProb))
		.style('stroke', 'black')
		.style('fill', 'transparent')
		.style('stroke-width', 6)
		.style('opacity', 0)
		.transition()
			.duration(750)
			.attr('r', 25)
			.style('opacity', 1)
			.on('end', () => {
				setTimeout(()=> {
					console.log('playcard');
					titleCard({
						text: data.description,
						subtext: data.playData.description,
						credit: data.credit,
						img:data.photo,
						delay:2000,
						changeInBearsWinProb: d3.format('+.1f')(data.resultingChangeInWinProb * 100)
					})
				}, 2000)
			})

}

function highlightPlays(){
	console.log('top plays data', window.topPlays);

	console.log("let's highlight some plays, yo!");
	
	var dispatch = d3.dispatch('play1', 'play2', 'play3');

	titleCard({
		text:'The biggest plays',
		subtext:'Three largest swings in win probability',
		delay:1000
	}, () => {
		clearElements()
		highlightSinglePlay(window.topPlays[0]);

	})
	// // 					// window.dispatch.call('turnoversDone');
	// // 					titleCard({
	// // 						text:'Big Play #1',
	// // 						img:'jordy.jpg',
	// // 						credit:'XYZ PHOTO',
	// // 						delay:4000
	// // 					});
}	

module.exports = highlightPlays;

