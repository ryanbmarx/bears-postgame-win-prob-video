import * as d3 from "d3";
var lookupTeamInfo = require('./lookup-team-info');
var titleCard = require('./title-card');


function highlightSinglePlay(){

}

function highlightPlays(){
console.log("let's highlight some plays, yo!");
	titleCard({
		text:'The biggest plays',
		subtext:'Three largest swings in win probability'
	})
	// 					// window.dispatch.call('turnoversDone');
	// 					titleCard({
	// 						text:'Big Play #1',
	// 						img:'jordy.jpg',
	// 						credit:'XYZ PHOTO',
	// 						delay:4000
	// 					});
}	

module.exports = highlightPlays;