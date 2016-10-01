import * as d3 from "d3";
/*

options = {
	text:'Blurb',
	img:'xxxxx.jpg',
	imgCredit : "xyz photo",
	dispatch:'xyzEnd',
	subtext:'',
	delay:1000,
	changeInBearsWinProb:.05
}

*/



function titleCard(options, callback){
	console.log(options);

	

	if (options.img != undefined && options.credit != undefined){
		d3.select('#title-card')
			.style('background-image', `url(./img/${window.gameID}/${options.img})`)	
			.style('background-size', 'cover');
		
		d3.select('#title-card')
			.append('p')
			.classed('credit', true)
			.text(options.credit);
	} else{
		// d3.select('.title-card')
		// 	.style('background-image', `url(./img/${window.gameID}/${options.img})`)	
	}
	d3.select('#title-card')
		.append('p')
		.classed('main-text', true)
		.text(options.text)
		.style('transform', 'translate(-3000,0)')
		.transition()
			.duration(window.transition * 1.2)
			.style('transform', 'translate(0,0)')
		.transition()
			.duration(window.transition)
			.delay(options.delay * .8)
			.style('transform', 'translate(500px,0)');

		if(options.subtext){
				d3.select('#title-card')
				.append('p')
				.classed('sub-text', true)
				.text(options.subtext)
				.style('transform', 'translate(-3000,0)')
				.transition()
					.duration(window.transition * 1.4)
					.style('transform', 'translate(0,0)')
				.transition()
					.duration(window.transition)
					.delay(options.delay * .7)
					.style('transform', 'translate(500px,0)');
				}

	d3.select('#title-card')
		.style('transform', 'translate(-2000px,0)')
		.style('opacity', 0)
		.transition()
			.duration(window.transition)
			.style('opacity', 1)
			.style('transform', 'translate(0,0)')
		.transition()
			.duration(window.transition)
			.delay(options.delay)
			.style('opacity', 1)
			.style('transform', 'translate(2000px,0)')
			.on('end', () => {
				if(callback){
					d3.selectAll('#title-card *').remove();
					callback()
				};
			});
}

module.exports = titleCard;