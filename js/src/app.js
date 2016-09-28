// TODO OVERTIME!!!!

var d3 = require('d3');
var lookupTeamInfo = require ('./lookup-team-info');
var scene1 = require ('./scene1');
var scene2 = require ('./scene2');
var scene3 = require ('./scene3');

function runVideo(gameId){
	// This is the master controller function.
	// Start by putting data, metadata into window variables.
	console.log('running video');

	d3.json(`winprobability__${gameId}.json`, (err, data) => {
		
		window.scores = {
			home:{
				score1:0,
				score2:10,
				score3: 3,
				score4: 10,
				score5: undefined,
				score6:23
			},
			away:{
				score1:7,
				score2:7,
				score3: 0,
				score4: 0,
				score5: undefined,
				score6:14
			}
		}



		console.log(data);

		for (var i=0 ; i< data.plays.length ; i++){
			// We need the play number for x-axis. So let's quickly add it.
			data.plays[i]['play'] = i+1;
		}

		window.data = data;
		window.homeTeam = data.metadata.home;
		window.awayTeam = data.metadata.away;
		window.transition = 2000;
		// ###########
		// Start with some housekeeping
		// ###########

		// Load logos into linescore
		window.homeLogo = d3.select('.linescore__home .linescore__logo')
			.append('svg')
			.attr('height', '95%')
			.attr('width', '95%')
			.style('opacity',0);
		
		window.homeLogo.append('use')
			.attr("xlink:href", `#${lookupTeamInfo(window.homeTeam, 'abbrv')}`);

		window.awayLogo = d3.select('.linescore__away .linescore__logo')
			.append('svg')
			.attr('height', '95%')
			.attr('width', '95%')
			.style('opacity',0);
		
		window.awayLogo.append('use')
			.attr("xlink:href", `#${lookupTeamInfo(window.awayTeam, 'abbrv')}`);

		let linescoreRect = d3.select('.linescore').node().getBoundingClientRect();
		let videoRect = d3.select('#video').node().getBoundingClientRect();

		d3.select('.linescore')
			.style('position', 'absolute')
			.style('top', `${(videoRect.height - linescoreRect.height) / 2}px`)
			.style('left', `${(videoRect.width - linescoreRect.width) / 2}px`)
			.style('transform','translate(0, 1000px)')
			.style('opacity',0);

		// Load team names into linescore
		d3.select('.linescore__away .linescore__team')
			.html(`${lookupTeamInfo(window.awayTeam, 'team')}`);

		d3.select('.linescore__home .linescore__team')
			.html(`${lookupTeamInfo(window.homeTeam, 'team')}`);

		// Show the OT in the linescore if needed
		if(window.scores.home.score5 != undefined ){
			d3.selectAll('.linescore__overtime').style('display', 'table-cell');
		}

		// Load up logos for intro
		d3.select('.logo--home')
			.append('svg')
			.attr('height', '95%')
			.attr('width', '95%')
		.append('use')
			.attr("xlink:href", `#${lookupTeamInfo(window.homeTeam, 'abbrv')}`);

		d3.select('.logo--away')
			.append('svg')
			.attr('height', '95%')
			.attr('width', '95%')
		.append('use')
			.attr("xlink:href", `#${lookupTeamInfo(window.awayTeam, 'abbrv')}`);

		// Get our title card ready for some cool transitions!
		d3.select('#video')
			.append('div')
			.classed('title-card', true)
			.append('p')

		d3.select('.title-card')
			.append('p')
			.classed('credit', true);


		// ###########
		// And now, on with the show. Call the first scene (scene1/intro);
		// ###########


		scene3();

	})

}

window.onload = function(){
	runVideo(window.gameID);
}