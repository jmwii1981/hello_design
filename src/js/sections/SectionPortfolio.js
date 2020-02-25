var sectionPortfolio,
SectionPortfolio = {
	settings: {
		flipper: $('.flipper'),
		siteHeader: $('.header'),

		// Portfolio Section-Specific Elements.
		portfolioContainer: $('.section.portfolio'),
		portfolioKey: $('.portfolio-key'),
		portfolioKeyLegend: $('.portfolio-key-legend'),
		portfolioList: $('.portfolio-list'),
		portfolioLink: $('.portfolio-link'),
		siteTitle: $('.portfolio-site-title'),
		siteLink: $('.portfolio-site-link'),
	},
	onMouseOver: function() {
		sectionPortfolio.portfolioList.on('mouseenter', function() {
			sectionPortfolio.flipper.addClass('flip');
			sectionPortfolio.siteHeader.addClass('down-50-on-hover');
			sectionPortfolio.portfolioContainer.addClass('enlarge-on-hover');
		});
		sectionPortfolio.portfolioList.on('mouseleave', function() {
			sectionPortfolio.flipper.removeClass('flip');
			sectionPortfolio.siteHeader.removeClass('down-50-on-hover');
			sectionPortfolio.portfolioContainer.removeClass('enlarge-on-hover');
			sectionPortfolio.portfolioKeyLegend.find('.line').attr('style', '');
		});
		sectionPortfolio.portfolioLink.on('mouseover', function() {
			var href = $(this).attr('href');
			href = href.replace("//", "");
			var label = $(this).find('.label').text();
			var hex = $(this).parent('.portfolio-item').attr('style');
			hex = hex.replace("background-color: ", "")

			sectionPortfolio.portfolioKeyLegend.find('.portfolio-site-title').html(label);
			sectionPortfolio.portfolioKeyLegend.find('.line').attr('style', 'background-color: ' + hex);
			sectionPortfolio.portfolioKeyLegend.find('.portfolio-site-address').html(href);
		});
	},
	bindUIActions: function() {
		SectionPortfolio.onMouseOver();
	},
	init: function() {
		sectionPortfolio = this.settings;
		this.bindUIActions();
		console.log( 'SectionPortfolio loaded!' );
	}
};
