var d3 = require('d3');
var lookupTeamInfo = require('./lookup-team-info');
var scene2 = require('./scene2');

function scene1(){
	console.log('INtro//scene1')

       let scene1transition = 2000;
       d3.select('#video').classed('scene1', true);

       // Slide in home, away logos
       d3.selectAll('.logo')
       		.transition()
       		.duration(scene1transition)	
       			.style('opacity', 1)
       			.style('transform', `translate(0,0)`)
				.style('transform',`translate(0,0) scale(1)`);
		

		// SLide away logos to where it will line up with linescore
		var awayLogoBox = d3.select('.linescore__away .linescore__logo svg').node().getBBox();
			d3.select('.logo--away')
				.transition()
				.duration(scene1transition)
				.delay(scene1transition + 1000)
				.style('width', `${awayLogoBox.width}px`)
				.style('height', `${awayLogoBox.height}px`)
				.style('transform', 'translate(-184px, 335px)')
				.on('end', ()=>{
					d3.select('.linescore__away .linescore__logo svg')
						.transition()
						.duration(50)
						.style('opacity', 1)
						.on('end', () => {
							d3.select('.logo--away')
								.transition()
									.duration(150)
									.style('opacity', 0);
						});
				});

		// SLide home logos to where it will line up with linescore
		var homeLogoBox = d3.select('.linescore__away .linescore__logo svg').node().getBBox();
					d3.select('.logo--home')
				.transition()
				.duration(scene1transition)
				.delay(scene1transition + 1000)
				.style('width', `${homeLogoBox.width}px`)
				.style('height', `${homeLogoBox.height}px`)
				.style('transform', 'translate(-1086px, 549px)')
				.on('end', ()=>{
					// Once logo is in place, slyly switch it with the one in the linescore
					d3.select('.linescore__home .linescore__logo svg')
						.transition()
						.duration(50)
						.style('opacity', 1)
						.on('end', () => {
							d3.select('.logo--home')
								.transition()
									.duration(150)
									.style('opacity', 0);
						});
				});

       d3.selectAll('.title')
       	.transition()
       		.duration(scene1transition)
		       	.style('opacity', 1)
		       	.style('transform', 'translate(0,0)');

		// SLide out, remove the title
		d3.selectAll('.title')		 
			.transition()
				.duration(scene1transition)
				.delay(scene1transition + 1000)
					.style('opacity', 0)
			       	.style('transform', 'translate(0,-1500px)')
   			       	.on('start', () => {
	       				d3.select('.linescore')
						.transition()
							.duration(scene1transition)
							.style('transform','translate(0,0')
							.style('opacity', 1);
		       		})
		       		.on('end', ()=>{
		       			console.log('end of scene1');
		       			scene2();
		       		});


			
	

}

module.exports = scene1;