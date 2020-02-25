var sectionHeader,
SectionHeader = {
	settings: {
		window: $(window),
		header: $('.header'),
		logoContainer: $('.logo-container'),
		siteInfo: $('.site-info'),
		socialItems: $('.social-menu .social-item'),
		lastSocialItem: $('.social-menu .social-item:last-of-type'),
		eachSection: $('.section'),
	},
	// On Load ...
	showUI: function() {
		sectionHeader.logoContainer.addClass('reveal');
		sectionHeader.siteInfo.addClass('reveal');
		sectionHeader.socialItems.addClass('reveal');
	},
	showContentOnLoad: function() {
		sectionHeader.lastSocialItem.one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
			// https://www.kirupa.com/html5/the_transitionend_event.htm
			if (e.originalEvent.propertyName == "opacity") {
				sectionHeader.eachSection.each(function() {
					if ($(this).hasClass('portfolio')) {
						// Do nothing.
					} else {
						// Reveal content that's now been loaded and waited for the last animation in SectionHeader.showUI();
						$(this).addClass('reveal');
						// Load the appropriate theme.
						$('.step-1.greeting').find('.imagery').removeClass('hide');
					}
				});
			}
		});
	},
	// On Scroll ...
	deactivateHeader: function() {
		if (!sectionHeader.header.hasClass('scrolled')) {
			sectionHeader.header.addClass('scrolled');
		}
	},
	activateHeader: function() {
		if (sectionHeader.header.hasClass('scrolled')) {
			sectionHeader.header.removeClass('scrolled');
		}
	},
	// Events ...
	onWindowLoad: function() {
		sectionHeader.window.on('load', function() {
			SectionHeader.showUI();
			SectionHeader.showContentOnLoad();
		});
	},
	onWindowScroll: function() {
		sectionHeader.window.on('scroll', function() {
			if( sectionHeader.window.scrollTop() > 20) {
				SectionHeader.deactivateHeader();
			} else {
				SectionHeader.activateHeader();
			}
		});
	},
	bindUIActions: function() {
		SectionHeader.onWindowLoad();
		SectionHeader.onWindowScroll();
	},
	init: function() {
		sectionHeader = this.settings;
		this.bindUIActions();
		console.log( 'SectionHeader loaded!' );
	}
};
