
function getLineScore(data){
	let retval = {
		home:{
			score1:0,
			score2:0,
			score3:0,
			score4:0,
			score5:0

		},
		away:{
			score1:0,
			score2:0,
			score3:0,
			score4:0,
			score5:0
		}
	}


	// const quarters = [2700, 1800, 900];
	const plays = data.plays;
	const lastPlay = plays[plays.length - 1];

	// Get the final score from the last play
	retval.home.score6 = lastPlay.score.home;
	retval.away.score6 = lastPlay.score.away;

	// If the last play was a scoring play, such as in overtime, 
	// then those points need to be added to the final.
	if (lastPlay.points.number > 0){
		const scorer = lastPlay.points.team;
		const points = lastPlay.points.number;

		if (scorer == "home"){
			retval.home.score6 += points;
		} else {
			retval.home.score6 += points;
		}
	}

	// If the last play is in quarter 5, then that means overtime. If not, then we need to 
	// switch those values to undefined so the linescore renders properly.
	if(lastPlay.quarter == 4){
		retval.home.score5 = undefined;
		retval.away.score5 = undefined;
	}

	// Roll through each play adding any points scored to the appropriate quarter total
	plays.forEach((value, index)=>{
		if(value['points']['number'] > 0){
			let quarter = value['quarter'];
			let scoringTeam = value['points']['team'] == window.homeTeam ? 'home' : 'away';
			let pointsScored = value['points']['number'];
			retval[scoringTeam][`score${quarter}`] = pointsScored + parseInt(retval[scoringTeam][`score${quarter}`]);
		}

	})	
	return retval;
}

module.exports = getLineScore;