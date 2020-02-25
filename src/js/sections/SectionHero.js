var sectionHero,
SectionHero = {
	settings: {
		// Manipulated elements.
			// Nav.
			siteHeader: $('.header'),
			socialMenu: $('.social-menu'),
			flipper: $('.flipper'),
			// Containers.
			bodyContainer: $('body'),
			heroStyle1Container: $('.section.hero'),
			portfolioContainer: $('.section.portfolio'),
			portfolioListContainer: $('.section.portfolio .portfolio-list'),
			// Lists items.
			portfolioContainerItems: $('.section.portfolio .portfolio-list .portfolio-item'),
		// Interactive elements.
			// Step-through Buttons.
			buttonStep1: $('.button.step-1'),
			buttonStep2: $('.button.step-2'),
			buttonStep3: $('.button.step-3'),
			buttonContact: $('.social-link.contact'),
	},
	buttonStep01OnClick: function() {
		sectionHero.buttonStep1.on('click', function(event) {
			event.preventDefault();

			sectionHero.siteHeader.addClass('down-10');
			sectionHero.portfolioContainer.addClass('reveal')

			// Wait for the portfolio container to complete its animation.
			sectionHero.portfolioContainer.one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {

				// Hide Step 1
				sectionHero.heroStyle1Container.find('.step-1').addClass('suppress');
				sectionHero.bodyContainer.removeClass('computer-pattern');
				// Reveal Step 2 headline only.
				sectionHero.heroStyle1Container.find('.step-2').removeClass('suppress');
				sectionHero.bodyContainer.addClass('hardware-pattern');
				// Hide the social menu.
				sectionHero.socialMenu.addClass('hide');

				// Specifically wait for the portfolio container to finish
				// animating it's bottom property value change.
				// (https://www.kirupa.com/html5/the_transitionend_event.htm)
				if (e.originalEvent.propertyName == "bottom") {

					// Animate portfolio to guide the user by doing the following ...
					// Push the nav/header down by 50px
					sectionHero.siteHeader.addClass('down-50-on-hover');
					// Enlarge the portfolio container
					sectionHero.portfolioContainer.addClass('enlarge-on-hover');
					// When the header has been pushed down, the portfolio enlarged,
					// and the theme changed from light to dark ...
					sectionHero.siteHeader.one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
						if (e.originalEvent.propertyName == "top") {
							// Generate a hover on the portfolio container
							sectionHero.portfolioListContainer.addClass('hover');
							// Count how many items are in the portfolio container.
							var portfolioContainerItemsLength = sectionHero.portfolioContainerItems.length;
							// Iterate through that list of portfolio items ...
							sectionHero.portfolioContainerItems.each(function(index) {
								// Create a timer and base it off of the number of items,
								// multiplying the number of items iterated through by
								// the amount of time you want each event delayed.
								var timer1 = 150 * index;
								// Grab the portfolio item in two different ways.
								var portfolioItem = this;
								var $portfolioItem = $(this);
								// Set a timed interaction of subsequent mouse events to demo
								// how the portfolio works.
								var portfolioDemo = setTimeout(function() {
									// Test the timer.
									// console.log(index + ' timer1: ' + timer1 + 'ms');

									// If this item is any item but the last item.
									if (index >= 0 && index != sectionHero.portfolioContainerItemsLength) {
										// Reset the generated hover on all portfolio items.
										sectionHero.portfolioContainerItems.removeClass('hover');
										// Add a generated hover and mouse enter effect on the subsequent (next)
										// item in the list of given items.
										$(portfolioItem).addClass('hover').find('.portfolio-link').mouseenter();
									}
									// If this is the last item in the list.
									if (index == portfolioContainerItemsLength - 1) {
										// console.log('This is the last one!');

										// Reset the flipper.
										sectionHero.flipper.removeClass('flip');
										// Reset the nav / header.
										sectionHero.siteHeader.removeClass('down-50-on-hover');
										// Reset the generated hover on the portfolio container.
										sectionHero.portfolioListContainer.removeClass('hover');
										// Reset the portfolio container's sizing.
										sectionHero.portfolioContainer.removeClass('enlarge-on-hover');
										// Change background.
										sectionHero.bodyContainer.removeClass('hardware-pattern').addClass('glasses-pattern');
										// Allow user interaction to happen immediately with each of these elements,
										// now that step-1 is done.
										sectionHero.portfolioContainer.addClass('step-1-done');
										sectionHero.siteHeader.addClass('step-1-done');
										// Reveal the social menu.
										sectionHero.socialMenu.removeClass('hide');
										// Reveal instructions.
										$('.step-2.instructional').find('.paragraph').removeClass('hide');
										$('.step-2.instructional').find('.buttons').removeClass('hide');
										// $('.step-2.instructional').find('.imagery').removeClass('hide');
									}
								}, timer1);
							});
						}
					});
				}
			});

		});
	},
	buttonContactOnClick: function() {
		sectionHero.buttonContact.on('click', function(event) {
			event.preventDefault();
			$(this).addClass('visited');

			if (sectionHero.siteHeader.addClass('down-10') && sectionHero.portfolioContainer.hasClass('reveal')) {
				// Hide Step 1, 2, and 3
				sectionHero.heroStyle1Container.find('.step-1').addClass('suppress');
				sectionHero.heroStyle1Container.find('.step-2').addClass('suppress');
				sectionHero.heroStyle1Container.find('.step-3').addClass('suppress');
				// Hide Step 1, 2, and 3 Backgrounds
				sectionHero.bodyContainer.removeClass('computer-pattern');
				sectionHero.bodyContainer.removeClass('hardware-pattern');
				sectionHero.bodyContainer.removeClass('glasses-pattern');
				sectionHero.bodyContainer.removeClass('palm-leaves-pattern');

				// Reveal Step 4 Background
				sectionHero.bodyContainer.addClass('coffee-bean-pattern');
				// Reveal Step 4 Content
				$('.step-4.contact').find('.title').removeClass('hide');
				$('.step-4.contact').find('.paragraph').removeClass('hide');
				$('.step-4.contact').find('.form').removeClass('hide');
				// Reveal Step 4
				sectionHero.heroStyle1Container.find('.step-4').removeClass('suppress');
			} else {
				sectionHero.siteHeader.addClass('down-10');
				sectionHero.portfolioContainer.addClass('reveal');
				// Wait for the portfolio container to complete its animation.
				sectionHero.portfolioContainer.one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
					// Hide Step 1
					sectionHero.heroStyle1Container.find('.step-1').addClass('suppress');
					// Hide Step 1 Background
					sectionHero.bodyContainer.removeClass('computer-pattern');
					// Reveal Step 4 Background
					sectionHero.bodyContainer.addClass('coffee-bean-pattern');
					// Reveal Step 4 Content
					$('.step-4.contact').find('.title').removeClass('hide');
					$('.step-4.contact').find('.paragraph').removeClass('hide');
					$('.step-4.contact').find('.form').removeClass('hide');
					// Reveal Step 4
					sectionHero.heroStyle1Container.find('.step-4').removeClass('suppress');
					// Once the bottom property of the portfolio animation is finished animating ...
					if (e.originalEvent.propertyName == "bottom") {
						// Activate Portfolio
						sectionHero.portfolioContainer.addClass('step-1-done');
						sectionHero.siteHeader.addClass('step-1-done');
					}
				});
			}
		});
	},
	buttonStep02OnClick: function() {
		sectionHero.buttonStep2.on('click', function(event) {
			event.preventDefault();

			$('.step-2.instructional').find('.title').addClass('hide');
			$('.step-2.instructional').find('.paragraph').addClass('hide');
			$('.step-2.instructional').find('.buttons').addClass('hide');
			$('.step-2.instructional').find('.buttons').one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
				sectionHero.heroStyle1Container.find('.step-2').addClass('suppress');
				sectionHero.heroStyle1Container.find('.step-3').removeClass('suppress');
				sectionHero.bodyContainer.removeClass('glasses-pattern').addClass('palm-leaves-pattern');
				var section3Reveal = setTimeout(function(){
					$('.step-3.bio').find('.title').removeClass('hide');
					$('.step-3.bio').find('.paragraph').removeClass('hide');
					$('.step-3.bio').find('.buttons').removeClass('hide');
					// $('.step-3.bio').find('.imagery').removeClass('hide');
				}, 300);
			});
		});
	},
	buttonStep03OnClick: function() {
		sectionHero.buttonStep3.on('click', function(event) {
			event.preventDefault();
			sectionHero.buttonContact.addClass('visited');

			$('.step-3.bio').find('.title').addClass('hide');
			$('.step-3.bio').find('.paragraph').addClass('hide');
			$('.step-3.bio').find('.buttons').addClass('hide');
			// $('.step-3.bio').find('.imagery').addClass('hide');
			$('.step-3.bio').find('.buttons').one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
				sectionHero.heroStyle1Container.find('.step-3').addClass('suppress');
				sectionHero.heroStyle1Container.find('.step-4').removeClass('suppress');
				sectionHero.bodyContainer.removeClass('palm-leaves-pattern').addClass('coffee-bean-pattern');
				var section4Reveal = setTimeout(function(){
					$('.step-4.contact').find('.title').removeClass('hide');
					$('.step-4.contact').find('.paragraph').removeClass('hide');
					$('.step-4.contact').find('.form').removeClass('hide');
					// $('.step-4.contact').find('.imagery').removeClass('hide');
				}, 300);
			});
		});
	},
	bindUIActions: function() {
		SectionHero.buttonStep01OnClick();
		SectionHero.buttonStep02OnClick();
		SectionHero.buttonStep03OnClick();
		SectionHero.buttonContactOnClick();
	},
	init: function() {
		sectionHero = this.settings;
		this.bindUIActions();
		console.log( 'SectionHero loaded!' );
	}
};
