var siteWide,
SiteWide = {
	settings: {
		window: $(window),

	},
	onWindowLoad: function() {
		$(window).on('load', function () {
			// Create some vars to test against different browser types.
			is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
			is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
			is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
			is_safari = navigator.userAgent.indexOf("Safari") > -1;
			is_opera = navigator.userAgent.indexOf("Presto") > -1;
			is_mac = (navigator.userAgent.indexOf('Mac OS') != -1);
			is_windows = !is_mac;

			// Rule out any discrepancies.
			if (is_chrome && is_safari){
				is_safari=false;
			}

			// If it's Safari, add a specific class to the paragraph.
			if (is_safari) {
				$('.title').addClass('safari');
				$('.paragraph').addClass('safari');
			}
			// If it's Firefox or Chrome, add a specific class to the paragraph.
			if (is_firefox || is_chrome || is_opera ) {
				$('.title').addClass('firefox-chrome-opera');
				$('.paragraph').addClass('firefox-chrome-opera');
			}
		});
	},
	bindUIActions: function() {
		SiteWide.onWindowLoad();
	},
	init: function() {
		sectionHeader = this.settings;
		this.bindUIActions();
		console.log( 'SiteWide loaded!' );
	}
};
