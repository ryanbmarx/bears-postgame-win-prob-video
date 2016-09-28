import * as d3 from "d3";
/*

options = {
	text:'Blurb',
	img:'xxxxx.jpg',
	imgCredit : "xyz photo"
}

*/

function titleCard(options){
	console.log(options);
	if (options.img != undefined && options.credit != undefined){
		d3.select('.title-card')
			.style('background-image', `url(./img/${window.gameID}/${options.img})`)	
			.style('background-size', 'cover');
		
		d3.select('.credit')
			.text(options.credit);
	}
	d3.select('.title-card p')
		.text(options.text)
		.style('transform', 'translate(-3000,0)')
		.transition()
			.duration(window.transition * 1.2)
			.style('transform', 'translate(0,0)')
		.transition()
			.duration(window.transition)
			.delay(options.delay * .8)
			.style('transform', 'translate(500px,0)');


	d3.select('.title-card')
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
			.style('transform', 'translate(2000px,0)');
}

module.exports = titleCard;