$(document).on("DOMContentLoaded", function() {
	'use strict';

	//*** Section-Specific Logic ***//
		SiteWide.init();
		SectionHeader.init();
		SectionPortfolio.init();
		SectionHero.init();

	//*** Vendor-Specific Logic ***//
		// Animate on scroll init.
		AOS.init();

		// Rellax init.
		new Rellax('.rellax', {
			// options go here.
		});
});
