function getTimeOfWinProb(data){
	const plays = data.plays;
	let homeSeconds = 0,
		awaySeconds = 0;
	for (var index = 1; index < plays.length; index++){
		let value = plays[index];
		let previousValue = plays[index - 1];
		let secondsElapsed = previousValue['seconds_remaining'] - value['seconds_remaining'];
		let possessor = window.homeTeam == previousValue['possessor'] ? 'home' : 'away';
		
		if (possessor == 'home'){
			homeSeconds += secondsElapsed;
		} else {
			awaySeconds += secondsElapsed;
		}
	}

	return {
		homeSeconds:homeSeconds,
		awaySeconds:awaySeconds
	}
}

module.exports = getTimeOfWinProb;