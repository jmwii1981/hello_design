/*!
 * Hello World 2.0
 * Stay hungry. Stay foolish.
 * http://janmichael.digital
 * @author Jan Michael Wallace II
 * @version 2.0.0
 * Copyright 2020. MIT (https://www.mit.edu/~amini/LICENSE.md) licensed.
 */
/*!
 * fullPage 3.0.3
 * https://github.com/alvarotrigo/fullPage.js
 *
 * @license GPLv3 for open source use only
 * or Fullpage Commercial License for commercial use
 * http://alvarotrigo.com/fullPage/pricing/
 *
 * Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
 */
(function( root, window, document, factory, undefined) {
	if( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define( function() {
			root.fullpage = factory(window, document);
			return root.fullpage;
		} );
	} else if( typeof exports === 'object' ) {
		// Node. Does not work with strict CommonJS.
		module.exports = factory(window, document);
	} else {
		// Browser globals.
		window.fullpage = factory(window, document);
	}
}(this, window, document, function(window, document){
	'use strict';

	// keeping central set of classnames and selectors
	var WRAPPER =               'fullpage-wrapper';
	var WRAPPER_SEL =           '.' + WRAPPER;

	// slimscroll
	var SCROLLABLE =            'fp-scrollable';
	var SCROLLABLE_SEL =        '.' + SCROLLABLE;

	// util
	var RESPONSIVE =            'fp-responsive';
	var NO_TRANSITION =         'fp-notransition';
	var DESTROYED =             'fp-destroyed';
	var ENABLED =               'fp-enabled';
	var VIEWING_PREFIX =        'fp-viewing';
	var ACTIVE =                'active';
	var ACTIVE_SEL =            '.' + ACTIVE;
	var COMPLETELY =            'fp-completely';
	var COMPLETELY_SEL =        '.' + COMPLETELY;

	// section
	var SECTION_DEFAULT_SEL =   '.section';
	var SECTION =               'fp-section';
	var SECTION_SEL =           '.' + SECTION;
	var SECTION_ACTIVE_SEL =    SECTION_SEL + ACTIVE_SEL;
	var TABLE_CELL =            'fp-tableCell';
	var TABLE_CELL_SEL =        '.' + TABLE_CELL;
	var AUTO_HEIGHT =           'fp-auto-height';
	var AUTO_HEIGHT_SEL =       '.' + AUTO_HEIGHT;
	var NORMAL_SCROLL =         'fp-normal-scroll';
	var NORMAL_SCROLL_SEL =     '.' + NORMAL_SCROLL;

	// section nav
	var SECTION_NAV =           'fp-nav';
	var SECTION_NAV_SEL =       '#' + SECTION_NAV;
	var SECTION_NAV_TOOLTIP =   'fp-tooltip';
	var SECTION_NAV_TOOLTIP_SEL='.'+SECTION_NAV_TOOLTIP;
	var SHOW_ACTIVE_TOOLTIP =   'fp-show-active';

	// slide
	var SLIDE_DEFAULT_SEL =     '.slide';
	var SLIDE =                 'fp-slide';
	var SLIDE_SEL =             '.' + SLIDE;
	var SLIDE_ACTIVE_SEL =      SLIDE_SEL + ACTIVE_SEL;
	var SLIDES_WRAPPER =        'fp-slides';
	var SLIDES_WRAPPER_SEL =    '.' + SLIDES_WRAPPER;
	var SLIDES_CONTAINER =      'fp-slidesContainer';
	var SLIDES_CONTAINER_SEL =  '.' + SLIDES_CONTAINER;
	var TABLE =                 'fp-table';

	// slide nav
	var SLIDES_NAV =            'fp-slidesNav';
	var SLIDES_NAV_SEL =        '.' + SLIDES_NAV;
	var SLIDES_NAV_LINK_SEL =   SLIDES_NAV_SEL + ' a';
	var SLIDES_ARROW =          'fp-controlArrow';
	var SLIDES_ARROW_SEL =      '.' + SLIDES_ARROW;
	var SLIDES_PREV =           'fp-prev';
	var SLIDES_PREV_SEL =       '.' + SLIDES_PREV;
	var SLIDES_ARROW_PREV =     SLIDES_ARROW + ' ' + SLIDES_PREV;
	var SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL;
	var SLIDES_NEXT =           'fp-next';
	var SLIDES_NEXT_SEL =       '.' + SLIDES_NEXT;
	var SLIDES_ARROW_NEXT =     SLIDES_ARROW + ' ' + SLIDES_NEXT;
	var SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL;

	function initialise(containerSelector, options) {
		var isLicenseValid = options && new RegExp('([\\d\\w]{8}-){3}[\\d\\w]{8}|OPEN-SOURCE-GPLV3-LICENSE').test(options.licenseKey) || document.domain.indexOf('alvarotrigo.com') > -1;

		//only once my friend!
		if(hasClass($('html'), ENABLED)){ displayWarnings(); return; }

		// common jQuery objects
		var $htmlBody = $('html, body');
		var $body = $('body')[0];

		var FP = {};

		// Creating some defaults, extending them with any options that were provided
		options = deepExtend({
			//navigation
			menu: false,
			anchors:[],
			lockAnchors: false,
			navigation: false,
			navigationPosition: 'right',
			navigationTooltips: [],
			showActiveTooltip: false,
			slidesNavigation: false,
			slidesNavPosition: 'bottom',
			scrollBar: false,
			hybrid: false,

			//scrolling
			css3: true,
			scrollingSpeed: 700,
			autoScrolling: true,
			fitToSection: true,
			fitToSectionDelay: 1000,
			easing: 'easeInOutCubic',
			easingcss3: 'ease',
			loopBottom: false,
			loopTop: false,
			loopHorizontal: true,
			continuousVertical: false,
			continuousHorizontal: false,
			scrollHorizontally: false,
			interlockedSlides: false,
			dragAndMove: false,
			offsetSections: false,
			resetSliders: false,
			fadingEffect: false,
			normalScrollElements: null,
			scrollOverflow: false,
			scrollOverflowReset: false,
			scrollOverflowHandler: window.fp_scrolloverflow ? window.fp_scrolloverflow.iscrollHandler : null,
			scrollOverflowOptions: null,
			touchSensitivity: 5,
			normalScrollElementTouchThreshold: 5,
			bigSectionsDestination: null,

			//Accessibility
			keyboardScrolling: true,
			animateAnchor: true,
			recordHistory: true,

			//design
			controlArrows: true,
			controlArrowColor: '#fff',
			verticalCentered: true,
			sectionsColor : [],
			paddingTop: 0,
			paddingBottom: 0,
			fixedElements: null,
			responsive: 0, //backwards compabitility with responsiveWiddth
			responsiveWidth: 0,
			responsiveHeight: 0,
			responsiveSlides: false,
			parallax: false,
			parallaxOptions: {
				type: 'reveal',
				percentage: 62,
				property: 'translate'
			},

			//Custom selectors
			sectionSelector: SECTION_DEFAULT_SEL,
			slideSelector: SLIDE_DEFAULT_SEL,

			//events
			v2compatible: false,
			afterLoad: null,
			onLeave: null,
			afterRender: null,
			afterResize: null,
			afterReBuild: null,
			afterSlideLoad: null,
			onSlideLeave: null,
			afterResponsive: null,

			lazyLoading: true
		}, options);

		//flag to avoid very fast sliding for landscape sliders
		var slideMoving = false;

		var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
		var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
		var container = typeof containerSelector === 'string' ? $(containerSelector)[0] : containerSelector;
		var windowsHeight = getWindowHeight();
		var isResizing = false;
		var isWindowFocused = true;
		var lastScrolledDestiny;
		var lastScrolledSlide;
		var canScroll = true;
		var scrollings = [];
		var controlPressed;
		var startingSection;
		var isScrollAllowed = {};
		isScrollAllowed.m = {  'up':true, 'down':true, 'left':true, 'right':true };
		isScrollAllowed.k = deepExtend({}, isScrollAllowed.m);
		var MSPointer = getMSPointer();
		var events = {
			touchmove: 'ontouchmove' in window ? 'touchmove' :  MSPointer.move,
			touchstart: 'ontouchstart' in window ? 'touchstart' :  MSPointer.down
		};
		var scrollBarHandler;

		// taken from https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution/modal.js
		var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

		//timeouts
		var resizeId;
		var afterSectionLoadsId;
		var afterSlideLoadsId;
		var scrollId;
		var scrollId2;
		var keydownId;
		var originals = deepExtend({}, options); //deep copy
		var activeAnimation;

		displayWarnings();

		//easeInOutCubic animation included in the plugin
		window.fp_easings = deepExtend(window.fp_easings, {
			easeInOutCubic: function (t, b, c, d) {
				if ((t/=d/2) < 1) return c/2*t*t*t + b;return c/2*((t-=2)*t*t + 2) + b;
			}
		});

		/**
		* Sets the autoScroll option.
		* It changes the scroll bar visibility and the history of the site as a result.
		*/
		function setAutoScrolling(value, type){
			//removing the transformation
			if(!value){
				silentScroll(0);
			}

			setVariableState('autoScrolling', value, type);

			var element = $(SECTION_ACTIVE_SEL)[0];

			if(options.autoScrolling && !options.scrollBar){
				css($htmlBody, {
					'overflow': 'hidden',
					'height': '100%'
				});

				setRecordHistory(originals.recordHistory, 'internal');

				//for IE touch devices
				css(container, {
					'-ms-touch-action': 'none',
					'touch-action': 'none'
				});

				if(element != null){
					//moving the container up
					silentScroll(element.offsetTop);
				}

			}else{
				css($htmlBody, {
					'overflow' : 'visible',
					'height' : 'initial'
				});

				setRecordHistory(false, 'internal');

				//for IE touch devices
				css(container, {
					'-ms-touch-action': '',
					'touch-action': ''
				});

				//scrolling the page to the section with no animation
				if (element != null) {
					var scrollSettings = getScrollSettings(element.offsetTop);
					scrollSettings.element.scrollTo(0, scrollSettings.options);
				}
			}
		}

		/**
		* Defines wheter to record the history for each hash change in the URL.
		*/
		function setRecordHistory(value, type){
			setVariableState('recordHistory', value, type);
		}

		/**
		* Defines the scrolling speed
		*/
		function setScrollingSpeed(value, type){
			setVariableState('scrollingSpeed', value, type);
		}

		/**
		* Sets fitToSection
		*/
		function setFitToSection(value, type){
			setVariableState('fitToSection', value, type);
		}

		/**
		* Sets lockAnchors
		*/
		function setLockAnchors(value){
			options.lockAnchors = value;
		}

		/**
		* Adds or remove the possibility of scrolling through sections by using the mouse wheel or the trackpad.
		*/
		function setMouseWheelScrolling(value){
			if(value){
				addMouseWheelHandler();
				addMiddleWheelHandler();
			}else{
				removeMouseWheelHandler();
				removeMiddleWheelHandler();
			}
		}

		/**
		* Adds or remove the possibility of scrolling through sections by using the mouse wheel/trackpad or touch gestures.
		* Optionally a second parameter can be used to specify the direction for which the action will be applied.
		*
		* @param directions string containing the direction or directions separated by comma.
		*/
		function setAllowScrolling(value, directions){
			if(typeof directions !== 'undefined'){
				directions = directions.replace(/ /g,'').split(',');

				directions.forEach(function (direction){
					setIsScrollAllowed(value, direction, 'm');
				});
			}
			else{
				setIsScrollAllowed(value, 'all', 'm');

				if(value){
					setMouseWheelScrolling(true);
					addTouchHandler();
				}else{
					setMouseWheelScrolling(false);
					removeTouchHandler();
				}
			}
		}

		/**
		* Adds or remove the possibility of scrolling through sections by using the keyboard arrow keys
		*/
		function setKeyboardScrolling(value, directions){
			if(typeof directions !== 'undefined'){
				directions = directions.replace(/ /g,'').split(',');

				directions.forEach(function(direction){
					setIsScrollAllowed(value, direction, 'k');
				});
			}else{
				setIsScrollAllowed(value, 'all', 'k');
				options.keyboardScrolling = value;
			}
		}

		/**
		* Moves the page up one section.
		*/
		function moveSectionUp(){
			var prev = prevUntil($(SECTION_ACTIVE_SEL)[0], SECTION_SEL);

			//looping to the bottom if there's no more sections above
			if (!prev && (options.loopTop || options.continuousVertical)) {
				prev = last($(SECTION_SEL));
			}

			if (prev != null) {
				scrollPage(prev, null, true);
			}
		}

		/**
		* Moves the page down one section.
		*/
		function moveSectionDown(){
			var next = nextUntil($(SECTION_ACTIVE_SEL)[0], SECTION_SEL);

			//looping to the top if there's no more sections below
			if(!next &&
				(options.loopBottom || options.continuousVertical)){
				next = $(SECTION_SEL)[0];
			}

			if(next != null){
				scrollPage(next, null, false);
			}
		}

		/**
		* Moves the page to the given section and slide with no animation.
		* Anchors or index positions can be used as params.
		*/
		function silentMoveTo(sectionAnchor, slideAnchor){
			setScrollingSpeed (0, 'internal');
			moveTo(sectionAnchor, slideAnchor);
			setScrollingSpeed (originals.scrollingSpeed, 'internal');
		}

		/**
		* Moves the page to the given section and slide.
		* Anchors or index positions can be used as params.
		*/
		function moveTo(sectionAnchor, slideAnchor){
			var destiny = getSectionByAnchor(sectionAnchor);

			if (typeof slideAnchor !== 'undefined'){
				scrollPageAndSlide(sectionAnchor, slideAnchor);
			}else if(destiny != null){
				scrollPage(destiny);
			}
		}

		/**
		* Slides right the slider of the active section.
		* Optional `section` param.
		*/
		function moveSlideRight(section){
			moveSlide('right', section);
		}

		/**
		* Slides left the slider of the active section.
		* Optional `section` param.
		*/
		function moveSlideLeft(section){
			moveSlide('left', section);
		}

		/**
		 * When resizing is finished, we adjust the slides sizes and positions
		 */
		function reBuild(resizing){
			if(hasClass(container, DESTROYED)){ return; }  //nothing to do if the plugin was destroyed

			isResizing = true;

			windowsHeight = getWindowHeight();  //updating global var

			var sections = $(SECTION_SEL);
			for (var i = 0; i < sections.length; ++i) {
				var section = sections[i];
				var slidesWrap = $(SLIDES_WRAPPER_SEL, section)[0];
				var slides = $(SLIDE_SEL, section);

				//adjusting the height of the table-cell for IE and Firefox
				if(options.verticalCentered){
					css($(TABLE_CELL_SEL, section), {'height': getTableHeight(section) + 'px'});
				}

				css(section, {'height': windowsHeight + 'px'});

				//adjusting the position fo the FULL WIDTH slides...
				if (slides.length > 1) {
					landscapeScroll(slidesWrap, $(SLIDE_ACTIVE_SEL, slidesWrap)[0]);
				}
			}

			if(options.scrollOverflow){
				scrollBarHandler.createScrollBarForAll();
			}

			var activeSection = $(SECTION_ACTIVE_SEL)[0];
			var sectionIndex = index(activeSection, SECTION_SEL);

			//isn't it the first section?
			if(sectionIndex){
				//adjusting the position for the current section
				silentMoveTo(sectionIndex + 1);
			}

			isResizing = false;
			if(isFunction( options.afterResize ) && resizing){
				options.afterResize.call(container, window.innerWidth, window.innerHeight);
			}
			if(isFunction( options.afterReBuild ) && !resizing){
				options.afterReBuild.call(container);
			}
		}

		/**
		* Turns fullPage.js to normal scrolling mode when the viewport `width` or `height`
		* are smaller than the set limit values.
		*/
		function setResponsive(active){
			var isResponsive = hasClass($body, RESPONSIVE);

			if(active){
				if(!isResponsive){
					setAutoScrolling(false, 'internal');
					setFitToSection(false, 'internal');
					hide($(SECTION_NAV_SEL));
					addClass($body, RESPONSIVE);
					if(isFunction( options.afterResponsive )){
						options.afterResponsive.call( container, active);
					}
				}
			}
			else if(isResponsive){
				setAutoScrolling(originals.autoScrolling, 'internal');
				setFitToSection(originals.autoScrolling, 'internal');
				show($(SECTION_NAV_SEL));
				removeClass($body, RESPONSIVE);
				if(isFunction( options.afterResponsive )){
					options.afterResponsive.call( container, active);
				}
			}
		}

		if(container){
			//public functions
			FP.version = '3.0.2';
			FP.setAutoScrolling = setAutoScrolling;
			FP.setRecordHistory = setRecordHistory;
			FP.setScrollingSpeed = setScrollingSpeed;
			FP.setFitToSection = setFitToSection;
			FP.setLockAnchors = setLockAnchors;
			FP.setMouseWheelScrolling = setMouseWheelScrolling;
			FP.setAllowScrolling = setAllowScrolling;
			FP.setKeyboardScrolling = setKeyboardScrolling;
			FP.moveSectionUp = moveSectionUp;
			FP.moveSectionDown = moveSectionDown;
			FP.silentMoveTo = silentMoveTo;
			FP.moveTo = moveTo;
			FP.moveSlideRight = moveSlideRight;
			FP.moveSlideLeft = moveSlideLeft;
			FP.fitToSection = fitToSection;
			FP.reBuild = reBuild;
			FP.setResponsive = setResponsive;
			FP.getFullpageData = options;
			FP.destroy = destroy;
			FP.getActiveSection = getActiveSection;
			FP.getActiveSlide = getActiveSlide;

			FP.test = {
				top: '0px',
				translate3d: 'translate3d(0px, 0px, 0px)',
				translate3dH: (function(){
					var a = [];
					for(var i = 0; i < $(options.sectionSelector, container).length; i++){
						a.push('translate3d(0px, 0px, 0px)');
					}
					return a;
				})(),
				left: (function(){
					var a = [];
					for(var i = 0; i < $(options.sectionSelector, container).length; i++){
						a.push(0);
					}
					return a;
				})(),
				options: options,
				setAutoScrolling: setAutoScrolling
			};

			//functions we want to share across files but which are not
			//mean to be used on their own by developers
			FP.shared = {
				afterRenderActions: afterRenderActions
			};

			window.fullpage_api = FP;

			init();

			bindEvents();
		}

		function init(){
			//if css3 is not supported, it will use jQuery animations
			if(options.css3){
				options.css3 = support3d();
			}

			options.scrollBar = options.scrollBar || options.hybrid;

			setOptionsFromDOM();
			prepareDom();
			setAllowScrolling(true);
			setAutoScrolling(options.autoScrolling, 'internal');
			responsive();

			//setting the class for the body element
			setBodyClass();

			if(document.readyState === 'complete'){
				scrollToAnchor();
			}
			window.addEventListener('load', scrollToAnchor);
		}

		function bindEvents(){

			//when scrolling...
			window.addEventListener('scroll', scrollHandler);

			//detecting any change on the URL to scroll to the given anchor link
			//(a way to detect back history button as we play with the hashes on the URL)
			window.addEventListener('hashchange', hashChangeHandler);

			//when opening a new tab (ctrl + t), `control` won't be pressed when coming back.
			window.addEventListener('blur', blurHandler);

			//when resizing the site, we adjust the heights of the sections, slimScroll...
			window.addEventListener('resize', resizeHandler);

			//Sliding with arrow keys, both, vertical and horizontal
			document.addEventListener('keydown', keydownHandler);

			//to prevent scrolling while zooming
			document.addEventListener('keyup', keyUpHandler);

			//Scrolls to the section when clicking the navigation bullet
			//simulating the jQuery .on('click') event using delegation
			['click', 'touchstart'].forEach(function(eventName){
				document.addEventListener(eventName, delegatedEvents);
			});

			/**
			* Applying normalScroll elements.
			* Ignoring the scrolls over the specified selectors.
			*/
			if(options.normalScrollElements){
				['mouseenter', 'touchstart'].forEach(function(eventName){
					forMouseLeaveOrTOuch(eventName, false);
				});

				['mouseleave', 'touchend'].forEach(function(eventName){
				   forMouseLeaveOrTOuch(eventName, true);
				});
			}
		}

		function delegatedEvents(e){
			var target = e.target;

			if(target && closest(target, SECTION_NAV_SEL + ' a')){
				sectionBulletHandler.call(target, e);
			}
			else if(matches(target, SECTION_NAV_TOOLTIP_SEL)){
				tooltipTextHandler.call(target);
			}
			else if(matches(target, SLIDES_ARROW_SEL)){
				slideArrowHandler.call(target, e);
			}
			else if(matches(target, SLIDES_NAV_LINK_SEL) || closest(target, SLIDES_NAV_LINK_SEL) != null){
				slideBulletHandler.call(target, e);
			}
		}

		function forMouseLeaveOrTOuch(eventName, allowScrolling){
			//a way to pass arguments to the onMouseEnterOrLeave function
			document['fp_' + eventName] = allowScrolling;
			document.addEventListener(eventName, onMouseEnterOrLeave, true); //capturing phase
		}

		function onMouseEnterOrLeave(e) {
			if(e.target == document){
				return;
			}
			var normalSelectors = options.normalScrollElements.split(',');
			normalSelectors.forEach(function(normalSelector){
				if(matches(e.target, normalSelector)){
					setAllowScrolling(document['fp_' + e.type]); //e.type = eventName
				}
			});
		}

		/**
		* Setting options from DOM elements if they are not provided.
		*/
		function setOptionsFromDOM(){

			//no anchors option? Checking for them in the DOM attributes
			if(!options.anchors.length){
				var attrName = '[data-anchor]';
				var anchors = $(options.sectionSelector.split(',').join(attrName + ',') + attrName, container);
				if(anchors.length){
					anchors.forEach(function(item){
						options.anchors.push(item.getAttribute('data-anchor').toString());
					});
				}
			}

			//no tooltips option? Checking for them in the DOM attributes
			if(!options.navigationTooltips.length){
				var attrName = '[data-tooltip]';
				var tooltips = $(options.sectionSelector.split(',').join(attrName + ',') + attrName, container);
				if(tooltips.length){
					tooltips.forEach(function(item){
						options.navigationTooltips.push(item.getAttribute('data-tooltip').toString());
					});
				}
			}
		}

		/**
		* Works over the DOM structure to set it up for the current fullpage options.
		*/
		function prepareDom(){
			css(container, {
				'height': '100%',
				'position': 'relative'
			});

			//adding a class to recognize the container internally in the code
			addClass(container, WRAPPER);
			addClass($('html'), ENABLED);

			//due to https://github.com/alvarotrigo/fullPage.js/issues/1502
			windowsHeight = getWindowHeight();

			removeClass(container, DESTROYED); //in case it was destroyed before initializing it again

			addInternalSelectors();

			var sections = $(SECTION_SEL);

			//styling the sections / slides / menu
			for(var i = 0; i<sections.length; i++){
				var sectionIndex = i;
				var section = sections[i];
				var slides = $(SLIDE_SEL, section);
				var numSlides = slides.length;

				//caching the original styles to add them back on destroy('all')
				section.setAttribute('data-fp-styles', section.getAttribute('style'));

				styleSection(section, sectionIndex);
				styleMenu(section, sectionIndex);

				// if there's any slide
				if (numSlides > 0) {
					styleSlides(section, slides, numSlides);
				}else{
					if(options.verticalCentered){
						addTableClass(section);
					}
				}
			}

			//fixed elements need to be moved out of the plugin container due to problems with CSS3.
			if(options.fixedElements && options.css3){
				$(options.fixedElements).forEach(function(item){
					$body.appendChild(item);
				});
			}

			//vertical centered of the navigation + active bullet
			if(options.navigation){
				addVerticalNavigation();
			}

			enableYoutubeAPI();

			if(options.scrollOverflow){
				scrollBarHandler = options.scrollOverflowHandler.init(options);
			}else{
				afterRenderActions();
			}
		}

		/**
		* Styles the horizontal slides for a section.
		*/
		function styleSlides(section, slides, numSlides){
			var sliderWidth = numSlides * 100;
			var slideWidth = 100 / numSlides;

			var slidesWrapper = document.createElement('div');
			slidesWrapper.className = SLIDES_WRAPPER; //fp-slides
			wrapAll(slides, slidesWrapper);

			var slidesContainer = document.createElement('div');
			slidesContainer.className = SLIDES_CONTAINER; //fp-slidesContainer
			wrapAll(slides, slidesContainer);

			css($(SLIDES_CONTAINER_SEL, section), {'width': sliderWidth + '%'});

			if(numSlides > 1){
				if(options.controlArrows){
					createSlideArrows(section);
				}

				if(options.slidesNavigation){
					addSlidesNavigation(section, numSlides);
				}
			}

			slides.forEach(function(slide) {
				css(slide, {'width': slideWidth + '%'});

				if(options.verticalCentered){
					addTableClass(slide);
				}
			});

			var startingSlide = $(SLIDE_ACTIVE_SEL, section)[0];

			//if the slide won't be an starting point, the default will be the first one
			//the active section isn't the first one? Is not the first slide of the first section? Then we load that section/slide by default.
			if( startingSlide != null && (index($(SECTION_ACTIVE_SEL), SECTION_SEL) !== 0 || (index($(SECTION_ACTIVE_SEL), SECTION_SEL) === 0 && index(startingSlide) !== 0))){
				silentLandscapeScroll(startingSlide, 'internal');
			}else{
				addClass(slides[0], ACTIVE);
			}
		}

		/**
		* Styling vertical sections
		*/
		function styleSection(section, index){
			//if no active section is defined, the 1st one will be the default one
			if(!index && $(SECTION_ACTIVE_SEL)[0] == null) {
				addClass(section, ACTIVE);
			}
			startingSection = $(SECTION_ACTIVE_SEL)[0];

			css(section, {'height': windowsHeight + 'px'});

			if(options.paddingTop){
				css(section, {'padding-top': options.paddingTop});
			}

			if(options.paddingBottom){
				css(section, {'padding-bottom': options.paddingBottom});
			}

			if (typeof options.sectionsColor[index] !==  'undefined') {
				css(section, {'background-color': options.sectionsColor[index]});
			}

			if (typeof options.anchors[index] !== 'undefined') {
				section.setAttribute('data-anchor', options.anchors[index]);
			}
		}

		/**
		* Sets the data-anchor attributes to the menu elements and activates the current one.
		*/
		function styleMenu(section, index){
			if (typeof options.anchors[index] !== 'undefined') {
				//activating the menu / nav element on load
				if(hasClass(section, ACTIVE)){
					activateMenuAndNav(options.anchors[index], index);
				}
			}

			//moving the menu outside the main container if it is inside (avoid problems with fixed positions when using CSS3 tranforms)
			if(options.menu && options.css3 && closest($(options.menu)[0], WRAPPER_SEL) != null){
				$body.appendChild($(options.menu)[0]);
			}
		}

		/**
		* Adds internal classes to be able to provide customizable selectors
		* keeping the link with the style sheet.
		*/
		function addInternalSelectors(){
			addClass($(options.sectionSelector, container), SECTION);
			addClass($(options.slideSelector, container), SLIDE);
		}

		/**
		* Creates the control arrows for the given section
		*/
		function createSlideArrows(section){
			var arrows = [createElementFromHTML('<div class="' + SLIDES_ARROW_PREV + '"></div>'), createElementFromHTML('<div class="' + SLIDES_ARROW_NEXT + '"></div>')];
			after($(SLIDES_WRAPPER_SEL, section)[0], arrows);

			if(options.controlArrowColor !== '#fff'){
				css($(SLIDES_ARROW_NEXT_SEL, section), {'border-color': 'transparent transparent transparent '+options.controlArrowColor});
				css($(SLIDES_ARROW_PREV_SEL, section), {'border-color': 'transparent '+ options.controlArrowColor + ' transparent transparent'});
			}

			if(!options.loopHorizontal){
				hide($(SLIDES_ARROW_PREV_SEL, section));
			}
		}

		/**
		* Creates a vertical navigation bar.
		*/
		function addVerticalNavigation(){
			var navigation = document.createElement('div');
			navigation.setAttribute('id', SECTION_NAV);

			var divUl = document.createElement('ul');
			navigation.appendChild(divUl);

			appendTo(navigation, $body);
			var nav = $(SECTION_NAV_SEL)[0];

			addClass(nav, 'fp-' + options.navigationPosition);

			if(options.showActiveTooltip){
				addClass(nav, SHOW_ACTIVE_TOOLTIP);
			}

			var li = '';

			for (var i = 0; i < $(SECTION_SEL).length; i++) {
				var link = '';
				if (options.anchors.length) {
					link = options.anchors[i];
				}

				li += '<li><a href="#' + link + '"><span class="fp-sr-only">' + getBulletLinkName(i, 'Section') + '</span><span></span></a>';

				// Only add tooltip if needed (defined by user)
				var tooltip = options.navigationTooltips[i];

				if (typeof tooltip !== 'undefined' && tooltip !== '') {
					li += '<div class="' + SECTION_NAV_TOOLTIP + ' fp-' + options.navigationPosition + '">' + tooltip + '</div>';
				}

				li += '</li>';
			}
			$('ul', nav)[0].innerHTML = li;

			//centering it vertically
			css($(SECTION_NAV_SEL), {'margin-top': '-' + ($(SECTION_NAV_SEL)[0].offsetHeight/2) + 'px'});

			//activating the current active section

			var bullet = $('li', $(SECTION_NAV_SEL)[0])[index($(SECTION_ACTIVE_SEL)[0], SECTION_SEL)];
			addClass($('a', bullet), ACTIVE);
		}

		function getBulletLinkName(i, defaultName){
			return options.navigationTooltips[i]
				|| options.anchors[i]
				|| defaultName + ' ' + (i+1)
		}

		/*
		* Enables the Youtube videos API so we can control their flow if necessary.
		*/
		function enableYoutubeAPI(){
			$('iframe[src*="youtube.com/embed/"]', container).forEach(function(item){
				addURLParam(item, 'enablejsapi=1');
			});
		}

		/**
		* Adds a new parameter and its value to the `src` of a given element
		*/
		function addURLParam(element, newParam){
			var originalSrc = element.getAttribute('src');
			element.setAttribute('src', originalSrc + getUrlParamSign(originalSrc) + newParam);
		}

		/*
		* Returns the prefix sign to use for a new parameter in an existen URL.
		*
		* @return {String}  ? | &
		*/
		function getUrlParamSign(url){
			return ( !/\?/.test( url ) ) ? '?' : '&';
		}

		/**
		* Actions and callbacks to fire afterRender
		*/
		function afterRenderActions(){
			var section = $(SECTION_ACTIVE_SEL)[0];

			addClass(section, COMPLETELY);

			lazyLoad(section);
			playMedia(section);

			if(options.scrollOverflow){
				options.scrollOverflowHandler.afterLoad();
			}

			if(isDestinyTheStartingSection() && isFunction(options.afterLoad) ){
				fireCallback('afterLoad', {
					activeSection: null,
					element: section,
					direction: null,

					//for backwards compatibility callback (to be removed in a future!)
					anchorLink: section.getAttribute('data-anchor'),
					sectionIndex: index(section, SECTION_SEL)
				});
			}

			if(isFunction(options.afterRender)){
				fireCallback('afterRender');
			}
		}

		/**
		* Determines if the URL anchor destiny is the starting section (the one using 'active' class before initialization)
		*/
		function isDestinyTheStartingSection(){
			var destinationSection = getSectionByAnchor(getAnchorsURL().section);
			return !destinationSection || typeof destinationSection !=='undefined' && index(destinationSection) === index(startingSection);
		}

		var isScrolling = false;
		var lastScroll = 0;

		//when scrolling...
		function scrollHandler(){
			var currentSection;

			if(!options.autoScrolling || options.scrollBar){
				var currentScroll = getScrollTop();
				var scrollDirection = getScrollDirection(currentScroll);
				var visibleSectionIndex = 0;
				var screen_mid = currentScroll + (getWindowHeight() / 2.0);
				var isAtBottom = $body.offsetHeight - getWindowHeight() === currentScroll;
				var sections =  $(SECTION_SEL);

				//when using `auto-height` for a small last section it won't be centered in the viewport
				if(isAtBottom){
					visibleSectionIndex = sections.length - 1;
				}
				//is at top? when using `auto-height` for a small first section it won't be centered in the viewport
				else if(!currentScroll){
					visibleSectionIndex = 0;
				}

				//taking the section which is showing more content in the viewport
				else{
					for (var i = 0; i < sections.length; ++i) {
						var section = sections[i];

						// Pick the the last section which passes the middle line of the screen.
						if (section.offsetTop <= screen_mid)
						{
							visibleSectionIndex = i;
						}
					}
				}

				if(isCompletelyInViewPort(scrollDirection)){
					if(!hasClass($(SECTION_ACTIVE_SEL)[0], COMPLETELY)){
						addClass($(SECTION_ACTIVE_SEL)[0], COMPLETELY);
						removeClass(siblings($(SECTION_ACTIVE_SEL)[0]), COMPLETELY);
					}
				}

				//geting the last one, the current one on the screen
				currentSection = sections[visibleSectionIndex];

				//setting the visible section as active when manually scrolling
				//executing only once the first time we reach the section
				if(!hasClass(currentSection, ACTIVE)){
					isScrolling = true;
					var leavingSection = $(SECTION_ACTIVE_SEL)[0];
					var leavingSectionIndex = index(leavingSection, SECTION_SEL) + 1;
					var yMovement = getYmovement(currentSection);
					var anchorLink  = currentSection.getAttribute('data-anchor');
					var sectionIndex = index(currentSection, SECTION_SEL) + 1;
					var activeSlide = $(SLIDE_ACTIVE_SEL, currentSection)[0];
					var slideIndex;
					var slideAnchorLink;
					var callbacksParams = {
						activeSection: leavingSection,
						sectionIndex: sectionIndex -1,
						anchorLink: anchorLink,
						element: currentSection,
						leavingSection: leavingSectionIndex,
						direction: yMovement
					};

					if(activeSlide){
						slideAnchorLink = activeSlide.getAttribute('data-anchor');
						slideIndex = index(activeSlide);
					}

					if(canScroll){
						addClass(currentSection, ACTIVE);
						removeClass(siblings(currentSection), ACTIVE);

						if(isFunction( options.onLeave )){
							fireCallback('onLeave', callbacksParams);
						}
						if(isFunction( options.afterLoad )){
							fireCallback('afterLoad', callbacksParams);
						}

						stopMedia(leavingSection);
						lazyLoad(currentSection);
						playMedia(currentSection);

						activateMenuAndNav(anchorLink, sectionIndex - 1);

						if(options.anchors.length){
							//needed to enter in hashChange event when using the menu with anchor links
							lastScrolledDestiny = anchorLink;
						}
						setState(slideIndex, slideAnchorLink, anchorLink, sectionIndex);
					}

					//small timeout in order to avoid entering in hashChange event when scrolling is not finished yet
					clearTimeout(scrollId);
					scrollId = setTimeout(function(){
						isScrolling = false;
					}, 100);
				}

				if(options.fitToSection){
					//for the auto adjust of the viewport to fit a whole section
					clearTimeout(scrollId2);

					scrollId2 = setTimeout(function(){
						//checking it again in case it changed during the delay
						if(options.fitToSection &&

							//is the destination element bigger than the viewport?
							$(SECTION_ACTIVE_SEL)[0].offsetHeight <= windowsHeight
						){
							fitToSection();
						}
					}, options.fitToSectionDelay);
				}
			}
		}

		/**
		* Fits the site to the nearest active section
		*/
		function fitToSection(){
			//checking fitToSection again in case it was set to false before the timeout delay
			if(canScroll){
				//allows to scroll to an active section and
				//if the section is already active, we prevent firing callbacks
				isResizing = true;

				scrollPage($(SECTION_ACTIVE_SEL)[0]);
				isResizing = false;
			}
		}

		/**
		* Determines whether the active section has seen in its whole or not.
		*/
		function isCompletelyInViewPort(movement){
			var top = $(SECTION_ACTIVE_SEL)[0].offsetTop;
			var bottom = top + getWindowHeight();

			if(movement == 'up'){
				return bottom >= (getScrollTop() + getWindowHeight());
			}
			return top <= getScrollTop();
		}

		/**
		* Gets the directon of the the scrolling fired by the scroll event.
		*/
		function getScrollDirection(currentScroll){
			var direction = currentScroll > lastScroll ? 'down' : 'up';

			lastScroll = currentScroll;

			//needed for auto-height sections to determine if we want to scroll to the top or bottom of the destination
			previousDestTop = currentScroll;

			return direction;
		}

		/**
		* Determines the way of scrolling up or down:
		* by 'automatically' scrolling a section or by using the default and normal scrolling.
		*/
		function scrolling(type){
			if (!isScrollAllowed.m[type]){
				return;
			}

			var scrollSection = (type === 'down') ? moveSectionDown : moveSectionUp;

			if(options.scrollOverflow){
				var scrollable = options.scrollOverflowHandler.scrollable($(SECTION_ACTIVE_SEL)[0]);
				var check = (type === 'down') ? 'bottom' : 'top';

				if(scrollable != null ){
					//is the scrollbar at the start/end of the scroll?
					if(options.scrollOverflowHandler.isScrolled(check, scrollable)){
						scrollSection();
					}else{
						return true;
					}
				}else{
					// moved up/down
					scrollSection();
				}
			}else{
				// moved up/down
				scrollSection();
			}
		}

		/*
		* Preventing bouncing in iOS #2285
		*/
		function preventBouncing(e){
			if(options.autoScrolling && isReallyTouch(e)){
				//preventing the easing on iOS devices
				preventDefault(e);
			}
		}

		var touchStartY = 0;
		var touchStartX = 0;
		var touchEndY = 0;
		var touchEndX = 0;

		/* Detecting touch events

		* As we are changing the top property of the page on scrolling, we can not use the traditional way to detect it.
		* This way, the touchstart and the touch moves shows an small difference between them which is the
		* used one to determine the direction.
		*/
		function touchMoveHandler(e){
			var activeSection = closest(e.target, SECTION_SEL);

			// additional: if one of the normalScrollElements isn't within options.normalScrollElementTouchThreshold hops up the DOM chain
			if (isReallyTouch(e) ) {

				if(options.autoScrolling){
					//preventing the easing on iOS devices
					preventDefault(e);
				}

				var touchEvents = getEventsPage(e);

				touchEndY = touchEvents.y;
				touchEndX = touchEvents.x;

				//if movement in the X axys is greater than in the Y and the currect section has slides...
				if ($(SLIDES_WRAPPER_SEL, activeSection).length && Math.abs(touchStartX - touchEndX) > (Math.abs(touchStartY - touchEndY))) {

					//is the movement greater than the minimum resistance to scroll?
					if (!slideMoving && Math.abs(touchStartX - touchEndX) > (window.innerWidth / 100 * options.touchSensitivity)) {
						if (touchStartX > touchEndX) {
							if(isScrollAllowed.m.right){
								moveSlideRight(activeSection); //next
							}
						} else {
							if(isScrollAllowed.m.left){
								moveSlideLeft(activeSection); //prev
							}
						}
					}
				}

				//vertical scrolling (only when autoScrolling is enabled)
				else if(options.autoScrolling && canScroll){

					//is the movement greater than the minimum resistance to scroll?
					if (Math.abs(touchStartY - touchEndY) > (window.innerHeight / 100 * options.touchSensitivity)) {
						if (touchStartY > touchEndY) {
							scrolling('down');
						} else if (touchEndY > touchStartY) {
							scrolling('up');
						}
					}
				}
			}
		}

		/**
		* As IE >= 10 fires both touch and mouse events when using a mouse in a touchscreen
		* this way we make sure that is really a touch event what IE is detecting.
		*/
		function isReallyTouch(e){
			//if is not IE   ||  IE is detecting `touch` or `pen`
			return typeof e.pointerType === 'undefined' || e.pointerType != 'mouse';
		}

		/**
		* Handler for the touch start event.
		*/
		function touchStartHandler(e){

			//stopping the auto scroll to adjust to a section
			if(options.fitToSection){
				activeAnimation = false;
			}

			if(isReallyTouch(e)){
				var touchEvents = getEventsPage(e);
				touchStartY = touchEvents.y;
				touchStartX = touchEvents.x;
			}
		}

		/**
		* Gets the average of the last `number` elements of the given array.
		*/
		function getAverage(elements, number){
			var sum = 0;

			//taking `number` elements from the end to make the average, if there are not enought, 1
			var lastElements = elements.slice(Math.max(elements.length - number, 1));

			for(var i = 0; i < lastElements.length; i++){
				sum = sum + lastElements[i];
			}

			return Math.ceil(sum/number);
		}

		/**
		 * Detecting mousewheel scrolling
		 *
		 * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
		 * http://www.sitepoint.com/html5-javascript-mouse-wheel/
		 */
		var prevTime = new Date().getTime();

		function MouseWheelHandler(e) {
			var curTime = new Date().getTime();
			var isNormalScroll = hasClass($(COMPLETELY_SEL)[0], NORMAL_SCROLL);

			//autoscrolling and not zooming?
			if(options.autoScrolling && !controlPressed && !isNormalScroll){
				// cross-browser wheel delta
				e = e || window.event;
				var value = e.wheelDelta || -e.deltaY || -e.detail;
				var delta = Math.max(-1, Math.min(1, value));

				var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
				var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX ) < Math.abs(e.deltaY) || !horizontalDetection);

				//Limiting the array to 150 (lets not waste memory!)
				if(scrollings.length > 149){
					scrollings.shift();
				}

				//keeping record of the previous scrollings
				scrollings.push(Math.abs(value));

				//preventing to scroll the site on mouse wheel when scrollbar is present
				if(options.scrollBar){
				   preventDefault(e);
				}

				//time difference between the last scroll and the current one
				var timeDiff = curTime-prevTime;
				prevTime = curTime;

				//haven't they scrolled in a while?
				//(enough to be consider a different scrolling action to scroll another section)
				if(timeDiff > 200){
					//emptying the array, we dont care about old scrollings for our averages
					scrollings = [];
				}

				if(canScroll){
					var averageEnd = getAverage(scrollings, 10);
					var averageMiddle = getAverage(scrollings, 70);
					var isAccelerating = averageEnd >= averageMiddle;

					//to avoid double swipes...
					if(isAccelerating && isScrollingVertically){
						//scrolling down?
						if (delta < 0) {
							scrolling('down');

						//scrolling up?
						}else {
							scrolling('up');
						}
					}
				}

				return false;
			}

			if(options.fitToSection){
				//stopping the auto scroll to adjust to a section
				activeAnimation = false;
			}
		}

		/**
		* Slides a slider to the given direction.
		* Optional `section` param.
		*/
		function moveSlide(direction, section){
			var activeSection = section == null ? $(SECTION_ACTIVE_SEL)[0] : section;
			var slides = $(SLIDES_WRAPPER_SEL, activeSection)[0];

			// more than one slide needed and nothing should be sliding
			if (slides == null || slideMoving || $(SLIDE_SEL, slides).length < 2) {
				return;
			}

			var currentSlide = $(SLIDE_ACTIVE_SEL, slides)[0];
			var destiny = null;

			if(direction === 'left'){
				destiny = prevUntil(currentSlide, SLIDE_SEL);
			}else{
				destiny = nextUntil(currentSlide, SLIDE_SEL);
			}

			//isn't there a next slide in the secuence?
			if(destiny == null){
				//respect loopHorizontal settin
				if (!options.loopHorizontal) return;

				var slideSiblings = siblings(currentSlide);
				if(direction === 'left'){
					destiny = slideSiblings[slideSiblings.length - 1]; //last
				}else{
					destiny = slideSiblings[0]; //first
				}
			}

			slideMoving = true && !FP.test.isTesting;
			landscapeScroll(slides, destiny, direction);
		}

		/**
		* Maintains the active slides in the viewport
		* (Because the `scroll` animation might get lost with some actions, such as when using continuousVertical)
		*/
		function keepSlidesPosition(){
			var activeSlides = $(SLIDE_ACTIVE_SEL);
			for( var i =0; i<activeSlides.length; i++){
				silentLandscapeScroll(activeSlides[i], 'internal');
			}
		}

		var previousDestTop = 0;
		/**
		* Returns the destination Y position based on the scrolling direction and
		* the height of the section.
		*/
		function getDestinationPosition(element){
			var elementHeight = element.offsetHeight;
			var elementTop = element.offsetTop;

			//top of the desination will be at the top of the viewport
			var position = elementTop;
			var isScrollingDown =  elementTop > previousDestTop;
			var sectionBottom = position - windowsHeight + elementHeight;
			var bigSectionsDestination = options.bigSectionsDestination;

			//is the destination element bigger than the viewport?
			if(elementHeight > windowsHeight){
				//scrolling up?
				if(!isScrollingDown && !bigSectionsDestination || bigSectionsDestination === 'bottom' ){
					position = sectionBottom;
				}
			}

			//sections equal or smaller than the viewport height && scrolling down? ||  is resizing and its in the last section
			else if(isScrollingDown || (isResizing && next(element) == null) ){
				//The bottom of the destination will be at the bottom of the viewport
				position = sectionBottom;
			}

			/*
			Keeping record of the last scrolled position to determine the scrolling direction.
			No conventional methods can be used as the scroll bar might not be present
			AND the section might not be active if it is auto-height and didnt reach the middle
			of the viewport.
			*/
			previousDestTop = position;
			return position;
		}

		/**
		* Scrolls the site to the given element and scrolls to the slide if a callback is given.
		*/
		function scrollPage(element, callback, isMovementUp){
			if(element == null){ return; } //there's no element to scroll, leaving the function

			var dtop = getDestinationPosition(element);
			var slideAnchorLink;
			var slideIndex;

			//local variables
			var v = {
				element: element,
				callback: callback,
				isMovementUp: isMovementUp,
				dtop: dtop,
				yMovement: getYmovement(element),
				anchorLink: element.getAttribute('data-anchor'),
				sectionIndex: index(element, SECTION_SEL),
				activeSlide: $(SLIDE_ACTIVE_SEL, element)[0],
				activeSection: $(SECTION_ACTIVE_SEL)[0],
				leavingSection: index($(SECTION_ACTIVE_SEL), SECTION_SEL) + 1,

				//caching the value of isResizing at the momment the function is called
				//because it will be checked later inside a setTimeout and the value might change
				localIsResizing: isResizing
			};

			//quiting when destination scroll is the same as the current one
			if((v.activeSection == element && !isResizing) || (options.scrollBar && getScrollTop() === v.dtop && !hasClass(element, AUTO_HEIGHT) )){ return; }

			if(v.activeSlide != null){
				slideAnchorLink = v.activeSlide.getAttribute('data-anchor');
				slideIndex = index(v.activeSlide);
			}

			//callback (onLeave) if the site is not just resizing and readjusting the slides
			if(isFunction(options.onLeave) && !v.localIsResizing){
				var direction = v.yMovement;

				//required for continousVertical
				if(typeof isMovementUp !== 'undefined'){
					direction = isMovementUp ? 'up' : 'down';
				}

				//for the callback
				v.direction = direction;

				if(fireCallback('onLeave', v) === false){
					return;
				}
			}

			// If continuousVertical && we need to wrap around
			if (options.autoScrolling && options.continuousVertical && typeof (v.isMovementUp) !== "undefined" &&
				((!v.isMovementUp && v.yMovement == 'up') || // Intending to scroll down but about to go up or
				(v.isMovementUp && v.yMovement == 'down'))) { // intending to scroll up but about to go down

				v = createInfiniteSections(v);
			}

			//pausing media of the leaving section (if we are not just resizing, as destinatino will be the same one)
			if(!v.localIsResizing){
				stopMedia(v.activeSection);
			}

			if(options.scrollOverflow){
				options.scrollOverflowHandler.beforeLeave();
			}

			addClass(element, ACTIVE);
			removeClass(siblings(element), ACTIVE);
			lazyLoad(element);

			if(options.scrollOverflow){
				options.scrollOverflowHandler.onLeave();
			}

			//preventing from activating the MouseWheelHandler event
			//more than once if the page is scrolling
			canScroll = false || FP.test.isTesting;

			setState(slideIndex, slideAnchorLink, v.anchorLink, v.sectionIndex);

			performMovement(v);

			//flag to avoid callingn `scrollPage()` twice in case of using anchor links
			lastScrolledDestiny = v.anchorLink;

			//avoid firing it twice (as it does also on scroll)
			activateMenuAndNav(v.anchorLink, v.sectionIndex);
		}

		/**
		* Dispatch events & callbacks making sure it does it on the right format, depending on
		* whether v2compatible is being used or not.
		*/
		function fireCallback(eventName, v){
			var eventData = getEventData(eventName, v);

			if(!options.v2compatible){
				trigger(container, eventName, eventData);

				if(options[eventName].apply(eventData[Object.keys(eventData)[0]], toArray(eventData)) === false){
					return false;
				}
			}
			else{
				if(options[eventName].apply(eventData[0], eventData.slice(1)) === false){
					return false;
				}
			}

			return true;
		}

		/**
		* Makes sure to only create a Panel object if the element exist
		*/
		function nullOrSection(el){
			return el ? new Section(el) : null;
		}

		function nullOrSlide(el){
			return el ? new Slide(el) : null;
		}

		/**
		* Gets the event's data for the given event on the right format. Depending on whether
		* v2compatible is being used or not.
		*/
		function getEventData(eventName, v){
			var paramsPerEvent;

			if(!options.v2compatible){

				//using functions to run only the necessary bits within the object
				paramsPerEvent = {
					afterRender: function(){
						return {
							section: nullOrSection($(SECTION_ACTIVE_SEL)[0]),
							slide: nullOrSlide($(SLIDE_ACTIVE_SEL, $(SECTION_ACTIVE_SEL)[0])[0])
						};
					},
					onLeave: function(){
						return {
							origin: nullOrSection(v.activeSection),
							destination: nullOrSection(v.element),
							direction: v.direction
						};
					},

					afterLoad: function(){
						return paramsPerEvent.onLeave();
					},

					afterSlideLoad: function(){
						return {
							section: nullOrSection(v.section),
							origin: nullOrSlide(v.prevSlide),
							destination: nullOrSlide(v.destiny),
							direction: v.direction
						};
					},

					onSlideLeave: function(){
						return paramsPerEvent.afterSlideLoad();
					}
				};
			}
			else{
				paramsPerEvent = {
					afterRender: function(){ return [container]; },
					onLeave: function(){ return [v.activeSection, v.leavingSection, (v.sectionIndex + 1), v.direction]; },
					afterLoad: function(){ return [v.element, v.anchorLink, (v.sectionIndex + 1)]; },
					afterSlideLoad: function(){ return [v.destiny, v.anchorLink, (v.sectionIndex + 1), v.slideAnchor, v.slideIndex]; },
					onSlideLeave: function(){ return [v.prevSlide, v.anchorLink, (v.sectionIndex + 1), v.prevSlideIndex, v.direction, v.slideIndex]; },
				};
			}

			return paramsPerEvent[eventName]();
		}

		/**
		* Performs the vertical movement (by CSS3 or by jQuery)
		*/
		function performMovement(v){
			// using CSS3 translate functionality
			if (options.css3 && options.autoScrolling && !options.scrollBar) {

				// The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
				// that's why we round it to 0.
				var translate3d = 'translate3d(0px, -' + Math.round(v.dtop) + 'px, 0px)';
				transformContainer(translate3d, true);

				//even when the scrollingSpeed is 0 there's a little delay, which might cause the
				//scrollingSpeed to change in case of using silentMoveTo();
				if(options.scrollingSpeed){
					clearTimeout(afterSectionLoadsId);
					afterSectionLoadsId = setTimeout(function () {
						afterSectionLoads(v);
					}, options.scrollingSpeed);
				}else{
					afterSectionLoads(v);
				}
			}

			// using JS to animate
			else{
				var scrollSettings = getScrollSettings(v.dtop);
				FP.test.top = -v.dtop + 'px';

				scrollTo(scrollSettings.element, scrollSettings.options, options.scrollingSpeed, function(){
					if(options.scrollBar){

						/* Hack!
						The timeout prevents setting the most dominant section in the viewport as "active" when the user
						scrolled to a smaller section by using the mousewheel (auto scrolling) rather than draging the scroll bar.

						When using scrollBar:true It seems like the scroll events still getting propagated even after the scrolling animation has finished.
						*/
						setTimeout(function(){
							afterSectionLoads(v);
						},30);
					}else{
						afterSectionLoads(v);
					}
				});
			}
		}

		/**
		* Gets the scrolling settings depending on the plugin autoScrolling option
		*/
		function getScrollSettings(top){
			var scroll = {};

			//top property animation
			if(options.autoScrolling && !options.scrollBar){
				scroll.options = -top;
				scroll.element = $(WRAPPER_SEL)[0];
			}

			//window real scrolling
			else{
				scroll.options = top;
				scroll.element = window;
			}

			return scroll;
		}

		/**
		* Adds sections before or after the current one to create the infinite effect.
		*/
		function createInfiniteSections(v){
			// Scrolling down
			if (!v.isMovementUp) {
				// Move all previous sections to after the active section
				after($(SECTION_ACTIVE_SEL)[0], prevAll(v.activeSection, SECTION_SEL).reverse());
			}
			else { // Scrolling up
				// Move all next sections to before the active section
				before($(SECTION_ACTIVE_SEL)[0], nextAll(v.activeSection, SECTION_SEL));
			}

			// Maintain the displayed position (now that we changed the element order)
			silentScroll($(SECTION_ACTIVE_SEL)[0].offsetTop);

			// Maintain the active slides visible in the viewport
			keepSlidesPosition();

			// save for later the elements that still need to be reordered
			v.wrapAroundElements = v.activeSection;

			// Recalculate animation variables
			v.dtop = v.element.offsetTop;
			v.yMovement = getYmovement(v.element);

			//sections will temporally have another position in the DOM
			//updating this values in case we need them
			v.leavingSection = index(v.activeSection, SECTION_SEL) + 1;
			v.sectionIndex = index(v.element, SECTION_SEL);

			return v;
		}

		/**
		* Fix section order after continuousVertical changes have been animated
		*/
		function continuousVerticalFixSectionOrder (v) {
			// If continuousVertical is in effect (and autoScrolling would also be in effect then),
			// finish moving the elements around so the direct navigation will function more simply
			if (v.wrapAroundElements == null) {
				return;
			}

			if (v.isMovementUp) {
				before($(SECTION_SEL)[0], v.wrapAroundElements);
			}
			else {
				after($(SECTION_SEL)[$(SECTION_SEL).length-1], v.wrapAroundElements);
			}

			silentScroll($(SECTION_ACTIVE_SEL)[0].offsetTop);

			// Maintain the active slides visible in the viewport
			keepSlidesPosition();
		}


		/**
		* Actions to do once the section is loaded.
		*/
		function afterSectionLoads (v){
			continuousVerticalFixSectionOrder(v);

			//callback (afterLoad) if the site is not just resizing and readjusting the slides
			if(isFunction(options.afterLoad) && !v.localIsResizing){
				fireCallback('afterLoad', v);
			}

			if(options.scrollOverflow){
				options.scrollOverflowHandler.afterLoad();
			}

			if(!v.localIsResizing){
				playMedia(v.element);
			}

			addClass(v.element, COMPLETELY);
			removeClass(siblings(v.element), COMPLETELY);

			canScroll = true;

			if(isFunction(v.callback)){
				v.callback();
			}
		}

		/**
		* Sets the value for the given attribute from the `data-` attribute with the same suffix
		* ie: data-srcset ==> srcset  |  data-src ==> src
		*/
		function setSrc(element, attribute){
			element.setAttribute(attribute, element.getAttribute('data-' + attribute));
			element.removeAttribute('data-' + attribute);
		}

		/**
		* Lazy loads image, video and audio elements.
		*/
		function lazyLoad(destiny){
			if (!options.lazyLoading){
				return;
			}

			var panel = getSlideOrSection(destiny);

			$('img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]', panel).forEach(function(element){
				['src', 'srcset'].forEach(function(type){
					var attribute = element.getAttribute('data-' + type);
					if(attribute != null && attribute){
						setSrc(element, type);
					}
				});

				if(matches(element, 'source')){
					var elementToPlay =  closest(element, 'video, audio');
					if(elementToPlay){
						elementToPlay.load();
					}
				}
			});
		}

		/**
		* Plays video and audio elements.
		*/
		function playMedia(destiny){
			var panel = getSlideOrSection(destiny);

			//playing HTML5 media elements
			$('video, audio', panel).forEach(function(element){
				if( element.hasAttribute('data-autoplay') && typeof element.play === 'function' ) {
					element.play();
				}
			});

			//youtube videos
			$('iframe[src*="youtube.com/embed/"]', panel).forEach(function(element){
				if ( element.hasAttribute('data-autoplay') ){
					playYoutube(element);
				}

				//in case the URL was not loaded yet. On page load we need time for the new URL (with the API string) to load.
				element.onload = function() {
					if ( element.hasAttribute('data-autoplay') ){
						playYoutube(element);
					}
				};
			});
		}

		/**
		* Plays a youtube video
		*/
		function playYoutube(element){
			element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		}

		/**
		* Stops video and audio elements.
		*/
		function stopMedia(destiny){
			var panel = getSlideOrSection(destiny);

			//stopping HTML5 media elements
			$('video, audio', panel).forEach(function(element){
				if( !element.hasAttribute('data-keepplaying') && typeof element.pause === 'function' ) {
					element.pause();
				}
			});

			//youtube videos
			$('iframe[src*="youtube.com/embed/"]', panel).forEach(function(element){
				if( /youtube\.com\/embed\//.test(element.getAttribute('src')) && !element.hasAttribute('data-keepplaying')){
					element.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
				}
			});
		}

		/**
		* Gets the active slide (or section) for the given section
		*/
		function getSlideOrSection(destiny){
			var slide = $(SLIDE_ACTIVE_SEL, destiny);
			if( slide.length ) {
				destiny = slide[0];
			}

			return destiny;
		}

		/**
		* Scrolls to the anchor in the URL when loading the site
		*/
		function scrollToAnchor(){
			var anchors =  getAnchorsURL();
			var sectionAnchor = anchors.section;
			var slideAnchor = anchors.slide;

			if(sectionAnchor){  //if theres any #
				if(options.animateAnchor){
					scrollPageAndSlide(sectionAnchor, slideAnchor);
				}else{
					silentMoveTo(sectionAnchor, slideAnchor);
				}
			}
		}

		/**
		* Detecting any change on the URL to scroll to the given anchor link
		* (a way to detect back history button as we play with the hashes on the URL)
		*/
		function hashChangeHandler(){
			if(!isScrolling && !options.lockAnchors){
				var anchors = getAnchorsURL();
				var sectionAnchor = anchors.section;
				var slideAnchor = anchors.slide;

				//when moving to a slide in the first section for the first time (first time to add an anchor to the URL)
				var isFirstSlideMove =  (typeof lastScrolledDestiny === 'undefined');
				var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined' && typeof slideAnchor === 'undefined' && !slideMoving);

				if(sectionAnchor && sectionAnchor.length){
					/*in order to call scrollpage() only once for each destination at a time
					It is called twice for each scroll otherwise, as in case of using anchorlinks `hashChange`
					event is fired on every scroll too.*/
					if ((sectionAnchor && sectionAnchor !== lastScrolledDestiny) && !isFirstSlideMove
						|| isFirstScrollMove
						|| (!slideMoving && lastScrolledSlide != slideAnchor )){

						scrollPageAndSlide(sectionAnchor, slideAnchor);
					}
				}
			}
		}

		//gets the URL anchors (section and slide)
		function getAnchorsURL(){
			var section;
			var slide;
			var hash = window.location.hash;

			if(hash.length){
				//getting the anchor link in the URL and deleting the `#`
				var anchorsParts =  hash.replace('#', '').split('/');

				//using / for visual reasons and not as a section/slide separator #2803
				var isFunkyAnchor = hash.indexOf('#/') > -1;

				section = isFunkyAnchor ? '/' + anchorsParts[1] : decodeURIComponent(anchorsParts[0]);

				var slideAnchor = isFunkyAnchor ? anchorsParts[2] : anchorsParts[1];
				if(slideAnchor && slideAnchor.length){
					slide = decodeURIComponent(slideAnchor);
				}
			}

			return {
				section: section,
				slide: slide
			};
		}

		//Sliding with arrow keys, both, vertical and horizontal
		function keydownHandler(e) {
			clearTimeout(keydownId);

			var activeElement = document.activeElement;
			var keyCode = e.keyCode;

			//tab?
			if(keyCode === 9){
				onTab(e);
			}

			else if(!matches(activeElement, 'textarea') && !matches(activeElement, 'input') && !matches(activeElement, 'select') &&
				activeElement.getAttribute('contentEditable') !== "true" && activeElement.getAttribute('contentEditable') !== '' &&
				options.keyboardScrolling && options.autoScrolling){

				//preventing the scroll with arrow keys & spacebar & Page Up & Down keys
				var keyControls = [40, 38, 32, 33, 34];
				if(keyControls.indexOf(keyCode) > -1){
					preventDefault(e);
				}

				controlPressed = e.ctrlKey;

				keydownId = setTimeout(function(){
					onkeydown(e);
				},150);
			}
		}

		function tooltipTextHandler(){
			/*jshint validthis:true */
			trigger(prev(this), 'click');
		}

		//to prevent scrolling while zooming
		function keyUpHandler(e){
			if(isWindowFocused){ //the keyup gets fired on new tab ctrl + t in Firefox
				controlPressed = e.ctrlKey;
			}
		}

		//binding the mousemove when the mouse's middle button is released
		function mouseDownHandler(e){
			//middle button
			if (e.which == 2){
				oldPageY = e.pageY;
				container.addEventListener('mousemove', mouseMoveHandler);
			}
		}

		//unbinding the mousemove when the mouse's middle button is released
		function mouseUpHandler(e){
			//middle button
			if (e.which == 2){
				container.removeEventListener('mousemove', mouseMoveHandler);
			}
		}

		/**
		* Makes sure the tab key will only focus elements within the current section/slide
		* preventing this way from breaking the page.
		* Based on "Modals and keyboard traps"
		* from https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex
		*/
		function onTab(e){
			var isShiftPressed = e.shiftKey;
			var activeElement = document.activeElement;
			var activeSection = $(SECTION_ACTIVE_SEL)[0];
			var activeSlide = $(SLIDE_ACTIVE_SEL, activeSection)[0];
			var focusableWrapper = activeSlide ? activeSlide : activeSection;
			var focusableElements = [].slice.call($(focusableElementsString, focusableWrapper)).filter(function(item) {
				return item.getAttribute('tabindex') !== '-1'
					//are also not hidden elements (or with hidden parents)
					&& item.offsetParent !== null;
			});

			function preventAndFocusFirst(e){
				preventDefault(e);
				return focusableElements[0] ? focusableElements[0].focus() : null;
			}

			//is there an element with focus?
			if(activeElement){
				if(closest(activeElement, SECTION_ACTIVE_SEL + ',' + SLIDE_ACTIVE_SEL) == null){
					activeElement = preventAndFocusFirst(e);
				}
			}

			//no element if focused? Let's focus the first one of the section/slide
			else{
				preventAndFocusFirst(e);
			}

			//when reached the first or last focusable element of the section/slide
			//we prevent the tab action to keep it in the last focusable element
			if(!isShiftPressed && activeElement == focusableElements[focusableElements.length - 1] ||
				isShiftPressed && activeElement == focusableElements[0]
			){
				preventDefault(e);
			}
		}

		//Scrolling horizontally when clicking on the slider controls.
		function slideArrowHandler(){
			/*jshint validthis:true */
			var section = closest(this, SECTION_SEL);

			/*jshint validthis:true */
			if (hasClass(this, SLIDES_PREV)) {
				if(isScrollAllowed.m.left){
					moveSlideLeft(section);
				}
			} else {
				if(isScrollAllowed.m.right){
					moveSlideRight(section);
				}
			}
		}

		//when opening a new tab (ctrl + t), `control` won't be pressed when coming back.
		function blurHandler(){
			isWindowFocused = false;
			controlPressed = false;
		}

		//Scrolls to the section when clicking the navigation bullet
		function sectionBulletHandler(e){
			preventDefault(e);

			/*jshint validthis:true */
			var indexBullet = index(closest(this, SECTION_NAV_SEL + ' li'));
			scrollPage($(SECTION_SEL)[indexBullet]);
		}

		//Scrolls the slider to the given slide destination for the given section
		function slideBulletHandler(e){
			preventDefault(e);

			/*jshint validthis:true */
			var slides = $(SLIDES_WRAPPER_SEL, closest(this, SECTION_SEL))[0];
			var destiny = $(SLIDE_SEL, slides)[index(closest(this, 'li'))];

			landscapeScroll(slides, destiny);
		}

		/**
		* Keydown event
		*/
		function onkeydown(e){
			var shiftPressed = e.shiftKey;

			//do nothing if we can not scroll or we are not using horizotnal key arrows.
			if(!canScroll && [37,39].indexOf(e.keyCode) < 0){
				return;
			}

			switch (e.keyCode) {
				//up
				case 38:
				case 33:
					if(isScrollAllowed.k.up){
						moveSectionUp();
					}
					break;

				//down
				case 32: //spacebar
					if(shiftPressed && isScrollAllowed.k.up){
						moveSectionUp();
						break;
					}
				/* falls through */
				case 40:
				case 34:
					if(isScrollAllowed.k.down){
						moveSectionDown();
					}
					break;

				//Home
				case 36:
					if(isScrollAllowed.k.up){
						moveTo(1);
					}
					break;

				//End
				case 35:
					 if(isScrollAllowed.k.down){
						moveTo( $(SECTION_SEL).length );
					}
					break;

				//left
				case 37:
					if(isScrollAllowed.k.left){
						moveSlideLeft();
					}
					break;

				//right
				case 39:
					if(isScrollAllowed.k.right){
						moveSlideRight();
					}
					break;

				default:
					return; // exit this handler for other keys
			}
		}

		/**
		* Detecting the direction of the mouse movement.
		* Used only for the middle button of the mouse.
		*/
		var oldPageY = 0;
		function mouseMoveHandler(e){
			if(canScroll){
				// moving up
				if (e.pageY < oldPageY && isScrollAllowed.m.up){
					moveSectionUp();
				}

				// moving down
				else if(e.pageY > oldPageY && isScrollAllowed.m.down){
					moveSectionDown();
				}
			}
			oldPageY = e.pageY;
		}

		/**
		* Scrolls horizontal sliders.
		*/
		function landscapeScroll(slides, destiny, direction){
			var section = closest(slides, SECTION_SEL);
			var v = {
				slides: slides,
				destiny: destiny,
				direction: direction,
				destinyPos: {left: destiny.offsetLeft},
				slideIndex: index(destiny),
				section: section,
				sectionIndex: index(section, SECTION_SEL),
				anchorLink: section.getAttribute('data-anchor'),
				slidesNav: $(SLIDES_NAV_SEL, section)[0],
				slideAnchor: getAnchor(destiny),
				prevSlide: $(SLIDE_ACTIVE_SEL, section)[0],
				prevSlideIndex: index($(SLIDE_ACTIVE_SEL, section)[0]),

				//caching the value of isResizing at the momment the function is called
				//because it will be checked later inside a setTimeout and the value might change
				localIsResizing: isResizing
			};
			v.xMovement = getXmovement(v.prevSlideIndex, v.slideIndex);

			//important!! Only do it when not resizing
			if(!v.localIsResizing){
				//preventing from scrolling to the next/prev section when using scrollHorizontally
				canScroll = false;
			}

			if(options.onSlideLeave){

				//if the site is not just resizing and readjusting the slides
				if(!v.localIsResizing && v.xMovement!=='none'){
					if(isFunction( options.onSlideLeave )){
						if( fireCallback('onSlideLeave', v) === false){
							slideMoving = false;
							return;
						}
					}
				}
			}

			addClass(destiny, ACTIVE);
			removeClass(siblings(destiny), ACTIVE);

			if(!v.localIsResizing){
				stopMedia(v.prevSlide);
				lazyLoad(destiny);
			}

			if(!options.loopHorizontal && options.controlArrows){
				//hidding it for the fist slide, showing for the rest
				toggle($(SLIDES_ARROW_PREV_SEL, section), v.slideIndex!==0);

				//hidding it for the last slide, showing for the rest
				toggle($(SLIDES_ARROW_NEXT_SEL, section), next(destiny) != null);
			}

			//only changing the URL if the slides are in the current section (not for resize re-adjusting)
			if(hasClass(section, ACTIVE) && !v.localIsResizing){
				setState(v.slideIndex, v.slideAnchor, v.anchorLink, v.sectionIndex);
			}

			performHorizontalMove(slides, v, true);
		}


		function afterSlideLoads(v){
			activeSlidesNavigation(v.slidesNav, v.slideIndex);

			//if the site is not just resizing and readjusting the slides
			if(!v.localIsResizing){
				if(isFunction( options.afterSlideLoad )){
					fireCallback('afterSlideLoad', v);
				}

				//needs to be inside the condition to prevent problems with continuousVertical and scrollHorizontally
				//and to prevent double scroll right after a windows resize
				canScroll = true;

				playMedia(v.destiny);
			}

			//letting them slide again
			slideMoving = false;
		}

		/**
		* Performs the horizontal movement. (CSS3 or jQuery)
		*
		* @param fireCallback {Bool} - determines whether or not to fire the callback
		*/
		function performHorizontalMove(slides, v, fireCallback){
			var destinyPos = v.destinyPos;

			if(options.css3){
				var translate3d = 'translate3d(-' + Math.round(destinyPos.left) + 'px, 0px, 0px)';

				FP.test.translate3dH[v.sectionIndex] = translate3d;
				css(addAnimation($(SLIDES_CONTAINER_SEL, slides)), getTransforms(translate3d));

				afterSlideLoadsId = setTimeout(function(){
					if(fireCallback){
						afterSlideLoads(v);
					}
				}, options.scrollingSpeed);
			}else{
				FP.test.left[v.sectionIndex] = Math.round(destinyPos.left);

				scrollTo(slides, Math.round(destinyPos.left), options.scrollingSpeed, function(){
					if(fireCallback){
						afterSlideLoads(v);
					}
				});
			}
		}

		/**
		* Sets the state for the horizontal bullet navigations.
		*/
		function activeSlidesNavigation(slidesNav, slideIndex){
			if(options.slidesNavigation && slidesNav != null){
				removeClass($(ACTIVE_SEL, slidesNav), ACTIVE);
				addClass( $('a', $('li', slidesNav)[slideIndex] ), ACTIVE);
			}
		}

		var previousHeight = windowsHeight;

		//when resizing the site, we adjust the heights of the sections, slimScroll...
		function resizeHandler(){
			//checking if it needs to get responsive
			responsive();

			// rebuild immediately on touch devices
			if (isTouchDevice) {
				var activeElement = document.activeElement;

				//if the keyboard is NOT visible
				if (!matches(activeElement, 'textarea') && !matches(activeElement, 'input') && !matches(activeElement, 'select')) {
					var currentHeight = getWindowHeight();

					//making sure the change in the viewport size is enough to force a rebuild. (20 % of the window to avoid problems when hidding scroll bars)
					if( Math.abs(currentHeight - previousHeight) > (20 * Math.max(previousHeight, currentHeight) / 100) ){
						reBuild(true);
						previousHeight = currentHeight;
					}
				}
			}else{
				//in order to call the functions only when the resize is finished
				//http://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing
				clearTimeout(resizeId);

				resizeId = setTimeout(function(){
					reBuild(true);
				}, 350);
			}
		}

		/**
		* Checks if the site needs to get responsive and disables autoScrolling if so.
		* A class `fp-responsive` is added to the plugin's container in case the user wants to use it for his own responsive CSS.
		*/
		function responsive(){
			var widthLimit = options.responsive || options.responsiveWidth; //backwards compatiblity
			var heightLimit = options.responsiveHeight;

			//only calculating what we need. Remember its called on the resize event.
			var isBreakingPointWidth = widthLimit && window.innerWidth < widthLimit;
			var isBreakingPointHeight = heightLimit && window.innerHeight < heightLimit;

			if(widthLimit && heightLimit){
				setResponsive(isBreakingPointWidth || isBreakingPointHeight);
			}
			else if(widthLimit){
				setResponsive(isBreakingPointWidth);
			}
			else if(heightLimit){
				setResponsive(isBreakingPointHeight);
			}
		}

		/**
		* Adds transition animations for the given element
		*/
		function addAnimation(element){
			var transition = 'all ' + options.scrollingSpeed + 'ms ' + options.easingcss3;

			removeClass(element, NO_TRANSITION);
			return css(element, {
				'-webkit-transition': transition,
				'transition': transition
			});
		}

		/**
		* Remove transition animations for the given element
		*/
		function removeAnimation(element){
			return addClass(element, NO_TRANSITION);
		}

		/**
		* Activating the vertical navigation bullets according to the given slide name.
		*/
		function activateNavDots(name, sectionIndex){
			if(options.navigation && $(SECTION_NAV_SEL)[0] != null){
					removeClass($(ACTIVE_SEL, $(SECTION_NAV_SEL)[0]), ACTIVE);
				if(name){
					addClass( $('a[href="#' + name + '"]', $(SECTION_NAV_SEL)[0]), ACTIVE);
				}else{
					addClass($('a', $('li', $(SECTION_NAV_SEL)[0])[sectionIndex]), ACTIVE);
				}
			}
		}

		/**
		* Activating the website main menu elements according to the given slide name.
		*/
		function activateMenuElement(name){
			var menu = $(options.menu)[0];
			if(options.menu && menu != null){
				removeClass($(ACTIVE_SEL, menu), ACTIVE);
				addClass($('[data-menuanchor="'+name+'"]', menu), ACTIVE);
			}
		}

		/**
		* Sets to active the current menu and vertical nav items.
		*/
		function activateMenuAndNav(anchor, index){
			activateMenuElement(anchor);
			activateNavDots(anchor, index);
		}

		/**
		* Retuns `up` or `down` depending on the scrolling movement to reach its destination
		* from the current section.
		*/
		function getYmovement(destiny){
			var fromIndex = index($(SECTION_ACTIVE_SEL)[0], SECTION_SEL);
			var toIndex = index(destiny, SECTION_SEL);
			if( fromIndex == toIndex){
				return 'none';
			}
			if(fromIndex > toIndex){
				return 'up';
			}
			return 'down';
		}

		/**
		* Retuns `right` or `left` depending on the scrolling movement to reach its destination
		* from the current slide.
		*/
		function getXmovement(fromIndex, toIndex){
			if( fromIndex == toIndex){
				return 'none';
			}
			if(fromIndex > toIndex){
				return 'left';
			}
			return 'right';
		}

		function addTableClass(element){
			//In case we are styling for the 2nd time as in with reponsiveSlides
			if(!hasClass(element, TABLE)){
				var wrapper = document.createElement('div');
				wrapper.className = TABLE_CELL;
				wrapper.style.height = getTableHeight(element) + 'px';

				addClass(element, TABLE);
				wrapInner(element, wrapper);
			}
		}

		function getTableHeight(element){
			var sectionHeight = windowsHeight;

			if(options.paddingTop || options.paddingBottom){
				var section = element;
				if(!hasClass(section, SECTION)){
					section = closest(element, SECTION_SEL);
				}

				var paddings = parseInt(getComputedStyle(section)['padding-top']) + parseInt(getComputedStyle(section)['padding-bottom']);
				sectionHeight = (windowsHeight - paddings);
			}

			return sectionHeight;
		}

		/**
		* Adds a css3 transform property to the container class with or without animation depending on the animated param.
		*/
		function transformContainer(translate3d, animated){
			if(animated){
				addAnimation(container);
			}else{
				removeAnimation(container);
			}

			css(container, getTransforms(translate3d));
			FP.test.translate3d = translate3d;

			//syncronously removing the class after the animation has been applied.
			setTimeout(function(){
				removeClass(container, NO_TRANSITION);
			},10);
		}

		/**
		* Gets a section by its anchor / index
		*/
		function getSectionByAnchor(sectionAnchor){
			var section = $(SECTION_SEL + '[data-anchor="'+sectionAnchor+'"]', container)[0];
			if(!section){
				var sectionIndex = typeof sectionAnchor !== 'undefined' ? sectionAnchor -1 : 0;
				section = $(SECTION_SEL)[sectionIndex];
			}

			return section;
		}

		/**
		* Gets a slide inside a given section by its anchor / index
		*/
		function getSlideByAnchor(slideAnchor, section){
			var slide = $(SLIDE_SEL + '[data-anchor="'+slideAnchor+'"]', section)[0];
			if(slide == null){
				slideAnchor = typeof slideAnchor !== 'undefined' ? slideAnchor : 0;
				slide = $(SLIDE_SEL, section)[slideAnchor];
			}

			return slide;
		}

		/**
		* Scrolls to the given section and slide anchors
		*/
		function scrollPageAndSlide(sectionAnchor, slideAnchor){
			var section = getSectionByAnchor(sectionAnchor);

			//do nothing if there's no section with the given anchor name
			if(section == null) return;

			var slide = getSlideByAnchor(slideAnchor, section);

			//we need to scroll to the section and then to the slide
			if (sectionAnchor !== lastScrolledDestiny && !hasClass(section, ACTIVE)){
				scrollPage(section, function(){
					scrollSlider(slide);
				});
			}
			//if we were already in the section
			else{
				scrollSlider(slide);
			}
		}

		/**
		* Scrolls the slider to the given slide destination for the given section
		*/
		function scrollSlider(slide){
			if(slide != null){
				landscapeScroll(closest(slide, SLIDES_WRAPPER_SEL), slide);
			}
		}

		/**
		* Creates a landscape navigation bar with dots for horizontal sliders.
		*/
		function addSlidesNavigation(section, numSlides){
			appendTo(createElementFromHTML('<div class="' + SLIDES_NAV + '"><ul></ul></div>'), section);
			var nav = $(SLIDES_NAV_SEL, section)[0];

			//top or bottom
			addClass(nav, 'fp-' + options.slidesNavPosition);

			for(var i=0; i< numSlides; i++){
				appendTo(createElementFromHTML('<li><a href="#"><span class="fp-sr-only">'+ getBulletLinkName(i, 'Slide') +'</span><span></span></a></li>'), $('ul', nav)[0] );
			}

			//centering it
			css(nav, {'margin-left': '-' + (nav.innerWidth/2) + 'px'});

			addClass($('a', $('li', nav)[0] ), ACTIVE);
		}


		/**
		* Sets the state of the website depending on the active section/slide.
		* It changes the URL hash when needed and updates the body class.
		*/
		function setState(slideIndex, slideAnchor, anchorLink, sectionIndex){
			var sectionHash = '';

			if(options.anchors.length && !options.lockAnchors){

				//isn't it the first slide?
				if(slideIndex){
					if(anchorLink != null){
						sectionHash = anchorLink;
					}

					//slide without anchor link? We take the index instead.
					if(slideAnchor == null){
						slideAnchor = slideIndex;
					}

					lastScrolledSlide = slideAnchor;
					setUrlHash(sectionHash + '/' + slideAnchor);

				//first slide won't have slide anchor, just the section one
				}else if(slideIndex != null){
					lastScrolledSlide = slideAnchor;
					setUrlHash(anchorLink);
				}

				//section without slides
				else{
					setUrlHash(anchorLink);
				}
			}

			setBodyClass();
		}

		/**
		* Sets the URL hash.
		*/
		function setUrlHash(url){
			if(options.recordHistory){
				location.hash = url;
			}else{
				//Mobile Chrome doesn't work the normal way, so... lets use HTML5 for phones :)
				if(isTouchDevice || isTouch){
					window.history.replaceState(undefined, undefined, '#' + url);
				}else{
					var baseUrl = window.location.href.split('#')[0];
					window.location.replace( baseUrl + '#' + url );
				}
			}
		}

		/**
		* Gets the anchor for the given slide / section. Its index will be used if there's none.
		*/
		function getAnchor(element){
			if(!element){
				return null;
			}
			var anchor = element.getAttribute('data-anchor');
			var elementIndex = index(element);

			//Slide without anchor link? We take the index instead.
			if(anchor == null){
				anchor = elementIndex;
			}

			return anchor;
		}

		/**
		* Sets a class for the body of the page depending on the active section / slide
		*/
		function setBodyClass(){
			var section = $(SECTION_ACTIVE_SEL)[0];
			var slide = $(SLIDE_ACTIVE_SEL, section)[0];

			var sectionAnchor = getAnchor(section);
			var slideAnchor = getAnchor(slide);

			var text = String(sectionAnchor);

			if(slide){
				text = text + '-' + slideAnchor;
			}

			//changing slash for dash to make it a valid CSS style
			text = text.replace('/', '-').replace('#','');

			//removing previous anchor classes
			var classRe = new RegExp('\\b\\s?' + VIEWING_PREFIX + '-[^\\s]+\\b', "g");
			$body.className = $body.className.replace(classRe, '');

			//adding the current anchor
			addClass($body, VIEWING_PREFIX + '-' + text);
		}

		/**
		* Checks for translate3d support
		* @return boolean
		* http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
		*/
		function support3d() {
			var el = document.createElement('p'),
				has3d,
				transforms = {
					'webkitTransform':'-webkit-transform',
					'OTransform':'-o-transform',
					'msTransform':'-ms-transform',
					'MozTransform':'-moz-transform',
					'transform':'transform'
				};

			//preventing the style p:empty{display: none;} from returning the wrong result
			el.style.display = 'block'

			// Add it to the body to get the computed style.
			document.body.insertBefore(el, null);

			for (var t in transforms) {
				if (el.style[t] !== undefined) {
					el.style[t] = 'translate3d(1px,1px,1px)';
					has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
				}
			}

			document.body.removeChild(el);

			return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
		}

		/**
		* Removes the auto scrolling action fired by the mouse wheel and trackpad.
		* After this function is called, the mousewheel and trackpad movements won't scroll through sections.
		*/
		function removeMouseWheelHandler(){
			if (document.addEventListener) {
				document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
				document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
				document.removeEventListener('MozMousePixelScroll', MouseWheelHandler, false); //old Firefox
			} else {
				document.detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
			}
		}

		/**
		* Adds the auto scrolling action for the mouse wheel and trackpad.
		* After this function is called, the mousewheel and trackpad movements will scroll through sections
		* https://developer.mozilla.org/en-US/docs/Web/Events/wheel
		*/
		function addMouseWheelHandler(){
			var prefix = '';
			var _addEventListener;

			if (window.addEventListener){
				_addEventListener = "addEventListener";
			}else{
				_addEventListener = "attachEvent";
				prefix = 'on';
			}

			 // detect available wheel event
			var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
					  document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
					  'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox


			if(support == 'DOMMouseScroll'){
				document[ _addEventListener ](prefix + 'MozMousePixelScroll', MouseWheelHandler, false);
			}

			//handle MozMousePixelScroll in older Firefox
			else{
				document[ _addEventListener ](prefix + support, MouseWheelHandler, false);
			}
		}

		/**
		* Binding the mousemove when the mouse's middle button is pressed
		*/
		function addMiddleWheelHandler(){
			container.addEventListener('mousedown', mouseDownHandler);
			container.addEventListener('mouseup', mouseUpHandler);
		}

		/**
		* Unbinding the mousemove when the mouse's middle button is released
		*/
		function removeMiddleWheelHandler(){
			container.removeEventListener('mousedown', mouseDownHandler);
			container.removeEventListener('mouseup', mouseUpHandler);
		}

		/**
		* Adds the possibility to auto scroll through sections on touch devices.
		*/
		function addTouchHandler(){
			if(isTouchDevice || isTouch){
				if(options.autoScrolling){
					$body.removeEventListener(events.touchmove, preventBouncing, {passive: false});
					$body.addEventListener(events.touchmove, preventBouncing, {passive: false});
				}

				$(WRAPPER_SEL)[0].removeEventListener(events.touchstart, touchStartHandler);
				$(WRAPPER_SEL)[0].removeEventListener(events.touchmove, touchMoveHandler, {passive: false});

				$(WRAPPER_SEL)[0].addEventListener(events.touchstart, touchStartHandler);
				$(WRAPPER_SEL)[0].addEventListener(events.touchmove, touchMoveHandler, {passive: false});
			}
		}

		/**
		* Removes the auto scrolling for touch devices.
		*/
		function removeTouchHandler(){
			if(isTouchDevice || isTouch){
				// normalScrollElements requires it off #2691
				if(options.autoScrolling){
					$body.removeEventListener(events.touchmove, touchMoveHandler, {passive: false});
					$body.removeEventListener(events.touchmove, preventBouncing, {passive: false});
				}

				$(WRAPPER_SEL)[0].removeEventListener(events.touchstart, touchStartHandler);
				$(WRAPPER_SEL)[0].removeEventListener(events.touchmove, touchMoveHandler, {passive: false});
			}
		}

		/*
		* Returns and object with Microsoft pointers (for IE<11 and for IE >= 11)
		* http://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
		*/
		function getMSPointer(){
			var pointer;

			//IE >= 11 & rest of browsers
			if(window.PointerEvent){
				pointer = { down: 'pointerdown', move: 'pointermove'};
			}

			//IE < 11
			else{
				pointer = { down: 'MSPointerDown', move: 'MSPointerMove'};
			}

			return pointer;
		}

		/**
		* Gets the pageX and pageY properties depending on the browser.
		* https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
		*/
		function getEventsPage(e){
			var events = [];

			events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
			events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);

			//in touch devices with scrollBar:true, e.pageY is detected, but we have to deal with touch events. #1008
			if(isTouch && isReallyTouch(e) && options.scrollBar && typeof e.touches !== 'undefined'){
				events.y = e.touches[0].pageY;
				events.x = e.touches[0].pageX;
			}

			return events;
		}

		/**
		* Slides silently (with no animation) the active slider to the given slide.
		* @param noCallback {bool} true or defined -> no callbacks
		*/
		function silentLandscapeScroll(activeSlide, noCallbacks){
			setScrollingSpeed(0, 'internal');

			if(typeof noCallbacks !== 'undefined'){
				//preventing firing callbacks afterSlideLoad etc.
				isResizing = true;
			}

			landscapeScroll(closest(activeSlide, SLIDES_WRAPPER_SEL), activeSlide);

			if(typeof noCallbacks !== 'undefined'){
				isResizing = false;
			}

			setScrollingSpeed(originals.scrollingSpeed, 'internal');
		}

		/**
		* Scrolls silently (with no animation) the page to the given Y position.
		*/
		function silentScroll(top){
			// The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
			// that's why we round it to 0.
			var roundedTop = Math.round(top);

			if (options.css3 && options.autoScrolling && !options.scrollBar){
				var translate3d = 'translate3d(0px, -' + roundedTop + 'px, 0px)';
				transformContainer(translate3d, false);
			}
			else if(options.autoScrolling && !options.scrollBar){
				css(container, {'top': -roundedTop + 'px'});
				FP.test.top = -roundedTop + 'px';
			}
			else{
				var scrollSettings = getScrollSettings(roundedTop);
				setScrolling(scrollSettings.element, scrollSettings.options);
			}
		}

		/**
		* Returns the cross-browser transform string.
		*/
		function getTransforms(translate3d){
			return {
				'-webkit-transform': translate3d,
				'-moz-transform': translate3d,
				'-ms-transform':translate3d,
				'transform': translate3d
			};
		}

		/**
		* Allowing or disallowing the mouse/swipe scroll in a given direction. (not for keyboard)
		* @type  m (mouse) or k (keyboard)
		*/
		function setIsScrollAllowed(value, direction, type){
			//up, down, left, right
			if(direction !== 'all'){
				isScrollAllowed[type][direction] = value;
			}

			//all directions?
			else{
				Object.keys(isScrollAllowed[type]).forEach(function(key){
					isScrollAllowed[type][key] = value;
				});
			}
		}

		/*
		* Destroys fullpage.js plugin events and optinally its html markup and styles
		*/
		function destroy(all){
			setAutoScrolling(false, 'internal');
			setAllowScrolling(false);
			setKeyboardScrolling(false);
			addClass(container, DESTROYED);

			clearTimeout(afterSlideLoadsId);
			clearTimeout(afterSectionLoadsId);
			clearTimeout(resizeId);
			clearTimeout(scrollId);
			clearTimeout(scrollId2);


			window.removeEventListener('scroll', scrollHandler);
			window.removeEventListener('hashchange', hashChangeHandler);
			window.removeEventListener('resize', resizeHandler);

			document.removeEventListener('keydown', keydownHandler);
			document.removeEventListener('keyup', keyUpHandler);

			['click', 'touchstart'].forEach(function(eventName){
				document.removeEventListener(eventName, delegatedEvents);
			});

			['mouseenter', 'touchstart', 'mouseleave', 'touchend'].forEach(function(eventName){
				document.removeEventListener(eventName, onMouseEnterOrLeave, true); //true is required!
			});

			clearTimeout(afterSlideLoadsId);
			clearTimeout(afterSectionLoadsId);

			//lets make a mess!
			if(all){
				destroyStructure();
			}
		}

		/*
		* Removes inline styles added by fullpage.js
		*/
		function destroyStructure(){
			//reseting the `top` or `translate` properties to 0
			silentScroll(0);

			//loading all the lazy load content
			$('img[data-src], source[data-src], audio[data-src], iframe[data-src]', container).forEach(function(item){
				setSrc(item, 'src');
			});

			$('img[data-srcset]').forEach(function(item){
				setSrc(item, 'srcset');
			});

			remove($(SECTION_NAV_SEL + ', ' + SLIDES_NAV_SEL +  ', ' + SLIDES_ARROW_SEL));

			//removing inline styles
			css($(SECTION_SEL), {
				'height': '',
				'background-color' : '',
				'padding': ''
			});

			css($(SLIDE_SEL), {
				'width': ''
			});

			css(container, {
				'height': '',
				'position': '',
				'-ms-touch-action': '',
				'touch-action': ''
			});

			css($htmlBody, {
				'overflow': '',
				'height': ''
			});

			// remove .fp-enabled class
			removeClass($('html'), ENABLED);

			// remove .fp-responsive class
			removeClass($body, RESPONSIVE);

			// remove all of the .fp-viewing- classes
			$body.className.split(/\s+/).forEach(function (className) {
				if (className.indexOf(VIEWING_PREFIX) === 0) {
					removeClass($body, className);
				}
			});

			//removing added classes
			$(SECTION_SEL + ', ' + SLIDE_SEL).forEach(function(item){
				if(options.scrollOverflowHandler){
					options.scrollOverflowHandler.remove(item);
				}
				removeClass(item, TABLE + ' ' + ACTIVE + ' ' + COMPLETELY);
				var previousStyles = item.getAttribute('data-fp-styles');
				if(previousStyles){
					item.setAttribute('style', item.getAttribute('data-fp-styles'));
				}
			});

			//removing the applied transition from the fullpage wrapper
			removeAnimation(container);

			//Unwrapping content
			[TABLE_CELL_SEL, SLIDES_CONTAINER_SEL,SLIDES_WRAPPER_SEL].forEach(function(selector){
				$(selector, container).forEach(function(item){
					//unwrap not being use in case there's no child element inside and its just text
					item.outerHTML = item.innerHTML;
				});
			});

			//removing the applied transition from the fullpage wrapper
			css(container, {
				'-webkit-transition': 'none',
				'transition': 'none'
			});

			//scrolling the page to the top with no animation
			$('html')[0].scrollTo(0, 0);
			$('body')[0].scrollTo(0, 0);

			//removing selectors
			var usedSelectors = [SECTION, SLIDE, SLIDES_CONTAINER];
			usedSelectors.forEach(function(item){
				removeClass($('.' + item), item);
			});
		}

		/*
		* Sets the state for a variable with multiple states (original, and temporal)
		* Some variables such as `autoScrolling` or `recordHistory` might change automatically its state when using `responsive` or `autoScrolling:false`.
		* This function is used to keep track of both states, the original and the temporal one.
		* If type is not 'internal', then we assume the user is globally changing the variable.
		*/
		function setVariableState(variable, value, type){
			options[variable] = value;
			if(type !== 'internal'){
				originals[variable] = value;
			}
		}

		/**
		* Displays warnings
		*/
		function displayWarnings(){
			if(!isLicenseValid){
				showError('error', 'Fullpage.js version 3 has changed its license to GPLv3 and it requires a `licenseKey` option. Read about it here:');
				showError('error', 'https://github.com/alvarotrigo/fullPage.js#options.');
			}

			var extensions = ['fadingEffect', 'continuousHorizontal', 'scrollHorizontally', 'interlockedSlides', 'resetSliders', 'responsiveSlides', 'offsetSections', 'dragAndMove', 'scrollOverflowReset', 'parallax'];
			if(hasClass($('html'), ENABLED)){
				showError('error', 'Fullpage.js can only be initialized once and you are doing it multiple times!');
				return;
			}

			// Disable mutually exclusive settings
			if (options.continuousVertical &&
				(options.loopTop || options.loopBottom)) {
				options.continuousVertical = false;
				showError('warn', 'Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
			}

			if(options.scrollBar && options.scrollOverflow){
				showError('warn', 'Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox');
			}

			if(options.continuousVertical && (options.scrollBar || !options.autoScrolling)){
				options.continuousVertical = false;
				showError('warn', 'Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
			}

			if(options.scrollOverflow && options.scrollOverflowHandler == null){
				options.scrollOverflow = false;
				showError('error', 'The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.');
			}

			//using extensions? Wrong file!
			extensions.forEach(function(extension){
				//is the option set to true?
				if(options[extension]){
					showError('warn', 'fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: '+ extension);
				}
			});

			//anchors can not have the same value as any element ID or NAME
			options.anchors.forEach(function(name){

				//case insensitive selectors (http://stackoverflow.com/a/19465187/1081396)
				var nameAttr =  [].slice.call($('[name]')).filter(function(item) {
					return item.getAttribute('name') && item.getAttribute('name').toLowerCase() == name.toLowerCase();
				});

				var idAttr =  [].slice.call($('[id]')).filter(function(item) {
					return item.getAttribute('id') && item.getAttribute('id').toLowerCase() == name.toLowerCase();
				});

				if(idAttr.length || nameAttr.length ){
					showError('error', 'data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).');
					if(idAttr.length){
						showError('error', '"' + name + '" is is being used by another element `id` property');
					}
					if(nameAttr.length){
						showError('error', '"' + name + '" is is being used by another element `name` property');
					}
				}
			});
		}

		/**
		* Getting the position of the element to scroll when using jQuery animations
		*/
		function getScrolledPosition(element){
			var position;

			//is not the window element and is a slide?
			if(element.self != window && hasClass(element, SLIDES_WRAPPER)){
				position = element.scrollLeft;
			}
			else if(!options.autoScrolling  || options.scrollBar){
				position = getScrollTop();
			}
			else{
				position = element.offsetTop;
			}

			//gets the top property of the wrapper
			return position;
		}

		/**
		* Simulates the animated scrollTop of jQuery. Used when css3:false or scrollBar:true or autoScrolling:false
		* http://stackoverflow.com/a/16136789/1081396
		*/
		function scrollTo(element, to, duration, callback) {
			var start = getScrolledPosition(element);
			var change = to - start;
			var currentTime = 0;
			var increment = 20;
			activeAnimation = true;

			var animateScroll = function(){
				if(activeAnimation){ //in order to stope it from other function whenever we want
					var val = to;

					currentTime += increment;

					if(duration){
						val = window.fp_easings[options.easing](currentTime, start, change, duration);
					}

					setScrolling(element, val);

					if(currentTime < duration) {
						setTimeout(animateScroll, increment);
					}else if(typeof callback !== 'undefined'){
						callback();
					}
				}else if (currentTime < duration){
					callback();
				}
			};

			animateScroll();
		}

		/**
		* Scrolls the page / slider the given number of pixels.
		* It will do it one or another way dependiong on the library's config.
		*/
		function setScrolling(element, val){
			if(!options.autoScrolling || options.scrollBar || (element.self != window && hasClass(element, SLIDES_WRAPPER))){

				//scrolling horizontally through the slides?
				if(element.self != window  && hasClass(element, SLIDES_WRAPPER)){
					element.scrollLeft = val;
				}
				//vertical scroll
				else{
					element.scrollTo(0, val);
				}
			}else{
				 element.style.top = val + 'px';
			}
		}

		/**
		* Gets the active slide.
		*/
		function getActiveSlide(){
			var activeSlide = $(SLIDE_ACTIVE_SEL, $(SECTION_ACTIVE_SEL)[0])[0];
			return nullOrSlide(activeSlide);
		}

		/**
		* Gets the active section.
		*/
		function getActiveSection(){
			return new Section($(SECTION_ACTIVE_SEL)[0]);
		}

		/**
		* Item. Slide or Section objects share the same properties.
		*/
		function Item(el, selector){
			this.anchor = el.getAttribute('data-anchor');
			this.item = el;
			this.index = index(el, selector);
			this.isLast = this.index === $(selector).length -1;
			this.isFirst = !this.index;
		}

		/**
		* Section object
		*/
		function Section(el){
			Item.call(this, el, SECTION_SEL);
		}

		/**
		* Slide object
		*/
		function Slide(el){
			Item.call(this, el, SLIDE_SEL);
		}

		return FP;
	} //end of $.fn.fullpage


	//utils
	/**
	* Shows a message in the console of the given type.
	*/
	function showError(type, text){
		window.console && window.console[type] && window.console[type]('fullPage: ' + text);
	}

	/**
	* Equivalent or jQuery function $().
	*/
	function $(selector, context){
		context = arguments.length > 1 ? context : document;
		return context ? context.querySelectorAll(selector) : null;
	}

	/**
	* Extends a given Object properties and its childs.
	*/
	function deepExtend(out) {
	  out = out || {};

	  for (var i = 1; i < arguments.length; i++) {
		var obj = arguments[i];

		if (!obj)
		  continue;

		for (var key in obj) {
		  if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] === 'object' && obj[key] != null)
			  out[key] = deepExtend(out[key], obj[key]);
			else
			  out[key] = obj[key];
		  }
		}
	  }

	  return out;
	}

	/**
	* Checks if the passed element contains the passed class.
	*/
	function hasClass(el, className){
		if(el == null){
			return false;
		}
		if (el.classList){
			return el.classList.contains(className);
		}
		return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	}

	/**
	* Gets the window height. Crossbrowser.
	*/
	function getWindowHeight(){
		return  'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
	}

	/**
	* Set's the CSS properties for the passed item/s.
	* @param {NodeList|HTMLElement} items
	* @param {Object} props css properties and values.
	*/
	function css(items, props) {
		items = getList(items);

		var key;
		for (key in props) {
			if (props.hasOwnProperty(key)) {
				if (key !== null) {
					for (var i = 0; i < items.length; i++) {
						var item = items[i];
						item.style[key] = props[key];
					}
				}
			}
		}

		return items;
	}

	/**
	* Generic function to get the previous or next element.
	*/
	function until(item, selector, fn){
		var sibling = item[fn];
		while(sibling && !matches(sibling, selector)){
			sibling = sibling[fn];
		}

		return sibling;
	}

	/**
	* Gets the previous element to the passed element that matches the passed selector.
	*/
	function prevUntil(item, selector){
		return until(item, selector, 'previousElementSibling');
	}

	/**
	* Gets the next element to the passed element that matches the passed selector.
	*/
	function nextUntil(item, selector){
		return until(item, selector, 'nextElementSibling');
	}

	/**
	* Gets the previous element to the passed element.
	*/
	function prev(item){
		return item.previousElementSibling;
	}

	/**
	* Gets the next element to the passed element.
	*/
	function next(item){
		return item.nextElementSibling;
	}

	/**
	* Gets the last element from the passed list of elements.
	*/
	function last(item){
		return item[item.length-1];
	}

	/**
	* Gets index from the passed element.
	* @param {String} selector is optional.
	*/
	function index(item, selector) {
		item = isArrayOrList(item) ? item[0] : item;
		var children = selector != null? $(selector, item.parentNode) : item.parentNode.childNodes;
		var num = 0;
		for (var i=0; i<children.length; i++) {
			 if (children[i] == item) return num;
			 if (children[i].nodeType==1) num++;
		}
		return -1;
	}

	/**
	* Gets an iterable element for the passed element/s
	*/
	function getList(item){
		return !isArrayOrList(item) ? [item] : item;
	}

	/**
	* Adds the display=none property for the passed element/s
	*/
	function hide(el){
		el = getList(el);

		for(var i = 0; i<el.length; i++){
			el[i].style.display = 'none';
		}
		return el;
	}

	/**
	* Adds the display=block property for the passed element/s
	*/
	function show(el){
		el = getList(el);

		for(var i = 0; i<el.length; i++){
			el[i].style.display = 'block';
		}
		return el;
	}

	/**
	* Checks if the passed element is an iterable element or not
	*/
	function isArrayOrList(el){
		return Object.prototype.toString.call( el ) === '[object Array]' ||
			Object.prototype.toString.call( el ) === '[object NodeList]';
	}

	/**
	* Adds the passed class to the passed element/s
	*/
	function addClass(el, className) {
		el = getList(el);

		for(var i = 0; i<el.length; i++){
			var item = el[i];
			if (item.classList){
				item.classList.add(className);
			}
			else{
			  item.className += ' ' + className;
			}
		}
		return el;
	}

	/**
	* Removes the passed class to the passed element/s
	* @param {String} `className` can be multiple classnames separated by whitespace
	*/
	function removeClass(el, className){
		el = getList(el);

		var classNames = className.split(' ');

		for(var a = 0; a<classNames.length; a++){
			className = classNames[a];
			for(var i = 0; i<el.length; i++){
				var item = el[i];
				if (item.classList){
					item.classList.remove(className);
				}
				else{
					item.className = item.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				}
			}
		}
		return el;
	}

	/**
	* Appends the given element ot the given parent.
	*/
	function appendTo(el, parent){
		parent.appendChild(el);
	}

	/**
	Usage:

	var wrapper = document.createElement('div');
	wrapper.className = 'fp-slides';
	wrap($('.slide'), wrapper);

	https://jsfiddle.net/qwzc7oy3/15/ (vanilla)
	https://jsfiddle.net/oya6ndka/1/ (jquery equivalent)
	*/
	function wrap(toWrap, wrapper, isWrapAll) {
		var newParent;
		wrapper = wrapper || document.createElement('div');
		for(var i = 0; i < toWrap.length; i++){
			var item = toWrap[i];
			if(isWrapAll && !i || !isWrapAll){
				newParent = wrapper.cloneNode(true);
				item.parentNode.insertBefore(newParent, item);
			}
			newParent.appendChild(item);
		}
		return toWrap;
	}

	/**
	Usage:
	var wrapper = document.createElement('div');
	wrapper.className = 'fp-slides';
	wrap($('.slide'), wrapper);

	https://jsfiddle.net/qwzc7oy3/27/ (vanilla)
	https://jsfiddle.net/oya6ndka/4/ (jquery equivalent)
	*/
	function wrapAll(toWrap, wrapper) {
		wrap(toWrap, wrapper, true);
	}

	/**
	* Usage:
	* wrapInner(document.querySelector('#pepe'), '<div class="test">afdas</div>');
	* wrapInner(document.querySelector('#pepe'), element);
	*
	* https://jsfiddle.net/zexxz0tw/6/
	*
	* https://stackoverflow.com/a/21817590/1081396
	*/
	function wrapInner(parent, wrapper) {
		if (typeof wrapper === "string"){
			wrapper = createElementFromHTML(wrapper);
		}

		parent.appendChild(wrapper);

		while(parent.firstChild !== wrapper){
			wrapper.appendChild(parent.firstChild);
	   }
	}

	/**
	* http://stackoverflow.com/questions/22100853/dom-pure-javascript-solution-to-jquery-closest-implementation
	* Returns the element or `false` if there's none
	*/
	function closest(el, selector) {
		if(el && el.nodeType === 1){
			if(matches(el, selector)){
				return el;
			}
			return closest(el.parentNode, selector);
		}
		return null;
	}

	/**
	* Places one element (rel) after another one or group of them (reference).
	* @param {HTMLElement} reference
	* @param {HTMLElement|NodeList|String} el
	* https://jsfiddle.net/9s97hhzv/1/
	*/
	function after(reference, el) {
		insertBefore(reference, reference.nextSibling, el);
	}

	/**
	* Places one element (rel) before another one or group of them (reference).
	* @param {HTMLElement} reference
	* @param {HTMLElement|NodeList|String} el
	* https://jsfiddle.net/9s97hhzv/1/
	*/
	function before(reference, el) {
		insertBefore(reference, reference, el);
	}

	/**
	* Based in https://stackoverflow.com/a/19316024/1081396
	* and https://stackoverflow.com/a/4793630/1081396
	*/
	function insertBefore(reference, beforeElement, el){
		if(!isArrayOrList(el)){
			if(typeof el == 'string'){
				el = createElementFromHTML(el);
			}
			el = [el];
		}

		for(var i = 0; i<el.length; i++){
			reference.parentNode.insertBefore(el[i], beforeElement);
		}
	}

	//http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
	function getScrollTop(){
		var doc = document.documentElement;
		return (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	}

	/**
	* Gets the siblings of the passed element
	*/
	function siblings(el){
		return Array.prototype.filter.call(el.parentNode.children, function(child){
		  return child !== el;
		});
	}

	//for IE 9 ?
	function preventDefault(event){
		if(event.preventDefault){
			event.preventDefault();
		}
		else{
			event.returnValue = false;
		}
	}

	/**
	* Determines whether the passed item is of function type.
	*/
	function isFunction(item) {
	  if (typeof item === 'function') {
		return true;
	  }
	  var type = Object.prototype.toString(item);
	  return type === '[object Function]' || type === '[object GeneratorFunction]';
	}

	/**
	* Trigger custom events
	*/
	function trigger(el, eventName, data){
		var event;
		data = typeof data === 'undefined' ? {} : data;

		// Native
		if(typeof window.CustomEvent === "function" ){
			event = new CustomEvent(eventName, {detail: data});
		}
		else{
			event = document.createEvent('CustomEvent');
			event.initCustomEvent(eventName, true, true, data);
		}

		el.dispatchEvent(event);
	}

	/**
	* Polyfill of .matches()
	*/
	function matches(el, selector) {
		return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
	}

	/**
	* Toggles the visibility of the passed element el.
	*/
	function toggle(el, value){
		if(typeof value === "boolean"){
			for(var i = 0; i<el.length; i++){
				el[i].style.display = value ? 'block' : 'none';
			}
		}
		//we don't use it in other way, so no else :)

		return el;
	}

	/**
	* Creates a HTMLElement from the passed HTML string.
	* https://stackoverflow.com/a/494348/1081396
	*/
	function createElementFromHTML(htmlString) {
		var div = document.createElement('div');
		div.innerHTML = htmlString.trim();

		// Change this to div.childNodes to support multiple top-level nodes
		return div.firstChild;
	}

	/**
	* Removes the passed item/s from the DOM.
	*/
	function remove(items){
		items = getList(items);
		for(var i = 0; i<items.length; i++){
			var item = items[i];
			if(item && item.parentElement) {
				item.parentNode.removeChild(item);
			}
		}
	}

	/**
	* Filters an array by the passed filter funtion.
	*/
	function filter(el, filterFn){
		Array.prototype.filter.call(el, filterFn);
	}

	//https://jsfiddle.net/w1rktecz/
	function untilAll(item, selector, fn){
		var sibling = item[fn];
		var siblings = [];
		while(sibling){
			if(matches(sibling, selector) || selector == null) {
				siblings.push(sibling);
			}
			sibling = sibling[fn];
		}

		return siblings;
	}

	/**
	* Gets all next elements matching the passed selector.
	*/
	function nextAll(item, selector){
		return untilAll(item, selector, 'nextElementSibling');
	}

	/**
	* Gets all previous elements matching the passed selector.
	*/
	function prevAll(item, selector){
		return untilAll(item, selector, 'previousElementSibling');
	}

	/**
	* Converts an object to an array.
	*/
	function toArray(objectData){
		return Object.keys(objectData).map(function(key) {
		   return objectData[key];
		});
	}

	/**
	* forEach polyfill for IE
	* https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Browser_Compatibility
	*/
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}

	//utils are public, so we can use it wherever we want
	window.fp_utils = {
		$: $,
		deepExtend: deepExtend,
		hasClass: hasClass,
		getWindowHeight: getWindowHeight,
		css: css,
		until: until,
		prevUntil: prevUntil,
		nextUntil: nextUntil,
		prev: prev,
		next: next,
		last: last,
		index: index,
		getList: getList,
		hide: hide,
		show: show,
		isArrayOrList: isArrayOrList,
		addClass: addClass,
		removeClass: removeClass,
		appendTo: appendTo,
		wrap: wrap,
		wrapAll: wrapAll,
		wrapInner: wrapInner,
		closest: closest,
		after: after,
		before: before,
		insertBefore: insertBefore,
		getScrollTop: getScrollTop,
		siblings: siblings,
		preventDefault: preventDefault,
		isFunction: isFunction,
		trigger: trigger,
		matches: matches,
		toggle: toggle,
		createElementFromHTML: createElementFromHTML,
		remove: remove,
		filter: filter,
		untilAll: untilAll,
		nextAll: nextAll,
		prevAll: prevAll,
		showError: showError
	};

	return initialise;
}));

/**
 * jQuery adapter for fullPage.js 3.0.0
 */
if(window.jQuery && window.fullpage){
	(function ($, fullpage) {
		'use strict';

		// No jQuery No Go
		if (!$ || !fullpage) {
			window.fp_utils.showError('error', 'jQuery is required to use the jQuery fullpage adapter!');
			return;
		}

		$.fn.fullpage = function(options) {
			var FP = new fullpage('#' + $(this).attr('id'), options);

			//Static API
			Object.keys(FP).forEach(function (key) {
				$.fn.fullpage[key] = FP[key];
			});
		};
	})(window.jQuery, window.fullpage);
}

window.fp_scrollHorizontallyExtension = function() {
	var l = this,
		e = fp_utils,
		i = fp_utils.$,
		t = fullpage_api.getFullpageData(),
		n = t.options,
		o = t.internals,
		a = ".fp-slide";
	l.getScrollSection = function(l, t) {
		var o, r = i(".fp-section.active")[0],
			c = i(a, r).length;
		if (n.scrollHorizontally && c > 1)
			if (o = i(".fp-slide.active", r)[0], "down" === l) {
				if (e.index(o) + 1 != c) return fullpage_api.moveSlideRight
			} else if (e.index(o)) return fullpage_api.moveSlideLeft;
		return t
	}, l.c = o.c;
	var r = l["common".charAt(0)];
	return "complete" === document.readyState && r("scrollHorizontally"), window.addEventListener("load", function() {
		r("scrollHorizontally")
	}), l
};

/*!
 * fullPage 3.0.4 - Extensions 0.1.7
 * https://github.com/alvarotrigo/fullPage.js
 * @license http://alvarotrigo.com/fullPage/extensions/#license
 *
 * Copyright (C) 2018 alvarotrigo.com - A project by Alvaro Trigo
 */
! function(e, t, n, o, r) {
	"function" == typeof define && define.amd ? define(function() {
		return e.fullpage = o(t, n), e.fullpage
	}) : "object" == typeof exports ? module.exports = o(t, n) : t.fullpage = o(t, n)
}(this, window, document, function(Vt, Zt) {
	"use strict";
	var Gt = "fullpage-wrapper",
		Ft = "." + Gt,
		Ut = "fp-responsive",
		_t = "fp-notransition",
		Qt = "fp-destroyed",
		Jt = "fp-enabled",
		Kt = "fp-viewing",
		qt = "active",
		$t = "." + qt,
		en = "fp-completely",
		tn = "fp-section",
		nn = "." + tn,
		on = nn + $t,
		rn = "fp-tableCell",
		ln = "." + rn,
		an = "fp-auto-height",
		sn = "fp-normal-scroll",
		cn = "fp-nav",
		un = "#" + cn,
		fn = "fp-tooltip",
		dn = "fp-slide",
		vn = "." + dn,
		pn = vn + $t,
		hn = "fp-slides",
		gn = "." + hn,
		mn = "fp-slidesContainer",
		Sn = "." + mn,
		bn = "fp-table",
		wn = "fp-slidesNav",
		yn = "." + wn,
		En = yn + " a",
		e = "fp-controlArrow",
		xn = "." + e,
		An = "fp-prev",
		Ln = xn + ".fp-prev",
		Mn = xn + ".fp-next";

	function Tn(e, t) {
		Vt.console && Vt.console[e] && Vt.console[e]("fullPage: " + t)
	}

	function On(e, t) {
		return (t = 1 < arguments.length ? t : Zt) ? t.querySelectorAll(e) : null
	}

	function kn(e) {
		e = e || {};
		for (var t = 1, n = arguments.length; t < n; ++t) {
			var o = arguments[t];
			if (o)
				for (var r in o) o.hasOwnProperty(r) && ("[object Object]" !== Object.prototype.toString.call(o[r]) ? e[r] = o[r] : e[r] = kn(e[r], o[r]))
		}
		return e
	}

	function Cn(e, t) {
		return null != e && (e.classList ? e.classList.contains(t) : new RegExp("(^| )" + t + "( |$)", "gi").test(e.className))
	}

	function Hn() {
		return "innerHeight" in Vt ? Vt.innerHeight : Zt.documentElement.offsetHeight
	}

	function Rn(e, t) {
		var n;
		for (n in e = l(e), t)
			if (t.hasOwnProperty(n) && null !== n)
				for (var o = 0; o < e.length; o++) {
					e[o].style[n] = t[n]
				}
			return e
	}

	function n(e, t, n) {
		for (var o = e[n]; o && !to(o, t);) o = o[n];
		return o
	}

	function In(e, t) {
		return n(e, t, "previousElementSibling")
	}

	function zn(e, t) {
		return n(e, t, "nextElementSibling")
	}

	function Bn(e, t) {
		if (null == t) return e.previousElementSibling;
		var n = Bn(e);
		return n && to(n, t) ? n : null
	}

	function Nn(e, t) {
		if (null == t) return e.nextElementSibling;
		var n = Nn(e);
		return n && to(n, t) ? n : null
	}

	function jn(e) {
		return e[e.length - 1]
	}

	function Pn(e, t) {
		e = i(e) ? e[0] : e;
		for (var n = null != t ? On(t, e.parentNode) : e.parentNode.childNodes, o = 0, r = 0; r < n.length; r++) {
			if (n[r] == e) return o;
			1 == n[r].nodeType && o++
		}
		return -1
	}

	function l(e) {
		return i(e) ? e : [e]
	}

	function Yn(e) {
		e = l(e);
		for (var t = 0; t < e.length; t++) e[t].style.display = "none";
		return e
	}

	function Dn(e) {
		e = l(e);
		for (var t = 0; t < e.length; t++) e[t].style.display = "block";
		return e
	}

	function i(e) {
		return "[object Array]" === Object.prototype.toString.call(e) || "[object NodeList]" === Object.prototype.toString.call(e)
	}

	function Wn(e, t) {
		e = l(e);
		for (var n = 0; n < e.length; n++) {
			var o = e[n];
			o.classList ? o.classList.add(t) : o.className += " " + t
		}
		return e
	}

	function Xn(e, t) {
		e = l(e);
		for (var n = t.split(" "), o = 0; o < n.length; o++) {
			t = n[o];
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.classList ? i.classList.remove(t) : i.className = i.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " ")
			}
		}
		return e
	}

	function Vn(e, t) {
		t.appendChild(e)
	}

	function o(e, t, n) {
		var o;
		t = t || Zt.createElement("div");
		for (var r = 0; r < e.length; r++) {
			var i = e[r];
			(n && !r || !n) && (o = t.cloneNode(!0), i.parentNode.insertBefore(o, i)), o.appendChild(i)
		}
		return e
	}

	function Zn(e, t) {
		o(e, t, !0)
	}

	function Gn(e, t) {
		for ("string" == typeof t && (t = oo(t)), e.appendChild(t); e.firstChild !== t;) t.appendChild(e.firstChild)
	}

	function Fn(e) {
		for (var t = Zt.createDocumentFragment(); e.firstChild;) t.appendChild(e.firstChild);
		e.parentNode.replaceChild(t, e)
	}

	function Un(e, t) {
		return e && 1 === e.nodeType ? to(e, t) ? e : Un(e.parentNode, t) : null
	}

	function _n(e, t) {
		r(e, e.nextSibling, t)
	}

	function Qn(e, t) {
		r(e, e, t)
	}

	function r(e, t, n) {
		i(n) || ("string" == typeof n && (n = oo(n)), n = [n]);
		for (var o = 0; o < n.length; o++) e.parentNode.insertBefore(n[o], t)
	}

	function Jn() {
		var e = Zt.documentElement;
		return (Vt.pageYOffset || e.scrollTop) - (e.clientTop || 0)
	}

	function Kn(t) {
		return Array.prototype.filter.call(t.parentNode.children, function(e) {
			return e !== t
		})
	}

	function qn(e) {
		e.preventDefault ? e.preventDefault() : e.returnValue = !1
	}

	function $n(e) {
		if ("function" == typeof e) return !0;
		var t = Object.prototype.toString(e);
		return "[object Function]" === t || "[object GeneratorFunction]" === t
	}

	function eo(e, t, n) {
		var o;
		n = void 0 === n ? {} : n, "function" == typeof Vt.CustomEvent ? o = new CustomEvent(t, {
			detail: n
		}) : (o = Zt.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, n), e.dispatchEvent(o)
	}

	function to(e, t) {
		return (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t)
	}

	function no(e, t) {
		if ("boolean" == typeof t)
			for (var n = 0; n < e.length; n++) e[n].style.display = t ? "block" : "none";
		return e
	}

	function oo(e) {
		var t = Zt.createElement("div");
		return t.innerHTML = e.trim(), t.firstChild
	}

	function ro(e) {
		e = l(e);
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			n && n.parentElement && n.parentNode.removeChild(n)
		}
	}

	function a(e, t, n) {
		for (var o = e[n], r = []; o;)(to(o, t) || null == t) && r.push(o), o = o[n];
		return r
	}

	function io(e, t) {
		return a(e, t, "nextElementSibling")
	}

	function lo(e, t) {
		return a(e, t, "previousElementSibling")
	}

	function ao(e, t) {
		e.insertBefore(t, e.firstChild)
	}
	return Vt.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function(e, t) {
			t = t || Vt;
			for (var n = 0; n < this.length; n++) e.call(t, this[n], n, this)
		}), Vt.fp_utils = {
			$: On,
			deepExtend: kn,
			hasClass: Cn,
			getWindowHeight: Hn,
			css: Rn,
			until: n,
			prevUntil: In,
			nextUntil: zn,
			prev: Bn,
			next: Nn,
			last: jn,
			index: Pn,
			getList: l,
			hide: Yn,
			show: Dn,
			isArrayOrList: i,
			addClass: Wn,
			removeClass: Xn,
			appendTo: Vn,
			wrap: o,
			wrapAll: Zn,
			wrapInner: Gn,
			unwrap: Fn,
			closest: Un,
			after: _n,
			before: Qn,
			insertBefore: r,
			getScrollTop: Jn,
			siblings: Kn,
			preventDefault: qn,
			isFunction: $n,
			trigger: eo,
			matches: to,
			toggle: no,
			createElementFromHTML: oo,
			remove: ro,
			filter: function(e, t) {
				Array.prototype.filter.call(e, t)
			},
			untilAll: a,
			nextAll: io,
			prevAll: lo,
			showError: Tn,
			prependTo: ao,
			toggleClass: function(e, t, n) {
				if (e.classList && null == n) e.classList.toggle(t);
				else {
					var o = Cn(e, t);
					o && null == n || !n ? Xn(e, t) : (!o && null == n || n) && Wn(e, t)
				}
			}
		},
		function(e, g) {
			var t = g && new RegExp("([\\d\\w]{8}-){3}[\\d\\w]{8}|^(?=.*?[A-Y])(?=.*?[a-y])(?=.*?[0-8])(?=.*?[#?!@$%^&*-]).{8,}$").test(g.licenseKey) || -1 < Zt.domain.indexOf("alvarotrigo.com");
			if (!Cn(On("html"), Jt)) {
				var r = On("html, body"),
					m = On("body")[0],
					S = {};
				g = kn({
					menu: !1,
					anchors: [],
					lockAnchors: !1,
					navigation: !1,
					navigationPosition: "right",
					navigationTooltips: [],
					showActiveTooltip: !1,
					slidesNavigation: !1,
					slidesNavPosition: "bottom",
					scrollBar: !1,
					hybrid: !1,
					css3: !0,
					scrollingSpeed: 700,
					autoScrolling: !0,
					fitToSection: !0,
					fitToSectionDelay: 1e3,
					easing: "easeInOutCubic",
					easingcss3: "ease",
					loopBottom: !1,
					loopTop: !1,
					loopHorizontal: !0,
					continuousVertical: !1,
					continuousHorizontal: !1,
					scrollHorizontally: !1,
					interlockedSlides: !1,
					dragAndMove: !1,
					offsetSections: !1,
					resetSliders: !1,
					fadingEffect: !1,
					normalScrollElements: null,
					scrollOverflow: !1,
					scrollOverflowReset: !1,
					scrollOverflowHandler: Vt.fp_scrolloverflow ? Vt.fp_scrolloverflow.iscrollHandler : null,
					scrollOverflowOptions: null,
					touchSensitivity: 5,
					normalScrollElementTouchThreshold: 5,
					bigSectionsDestination: null,
					keyboardScrolling: !0,
					animateAnchor: !0,
					recordHistory: !0,
					controlArrows: !0,
					controlArrowColor: "#fff",
					verticalCentered: !0,
					sectionsColor: [],
					paddingTop: 0,
					paddingBottom: 0,
					fixedElements: null,
					responsive: 0,
					responsiveWidth: 0,
					responsiveHeight: 0,
					responsiveSlides: !1,
					parallax: !1,
					parallaxOptions: {
						type: "reveal",
						percentage: 62,
						property: "translate"
					},
					sectionSelector: ".section",
					slideSelector: ".slide",
					v2compatible: !1,
					afterLoad: null,
					onLeave: null,
					afterRender: null,
					afterResize: null,
					afterReBuild: null,
					afterSlideLoad: null,
					onSlideLeave: null,
					afterResponsive: null,
					lazyLoading: !0
				}, g);
				var b, i, c, u, a = !1,
					n = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
					o = "ontouchstart" in Vt || 0 < navigator.msMaxTouchPoints || navigator.maxTouchPoints,
					w = "string" == typeof e ? On(e)[0] : e,
					y = Hn(),
					E = !1,
					l = !0,
					x = !0,
					f = [],
					d = {
						m: {
							up: !0,
							down: !0,
							left: !0,
							right: !0
						}
					};
				d.k = kn({}, d.m);
				var v, s, p, h, A, L, M, T, O, k = Lt(),
					C = {
						touchmove: "ontouchmove" in Vt ? "touchmove" : k.move,
						touchstart: "ontouchstart" in Vt ? "touchstart" : k.down
					},
					H = !1,
					R = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]',
					I = kn({}, g),
					z = !1,
					B = {};
				jt(), Vt.fp_easings = kn(Vt.fp_easings, {
					easeInOutCubic: function(e, t, n, o) {
						return (e /= o / 2) < 1 ? n / 2 * e * e * e + t : n / 2 * ((e -= 2) * e * e + 2) + t
					}
				}), w && (S.version = "3.0.2", S.setAutoScrolling = _, S.setRecordHistory = Q, S.setScrollingSpeed = J, S.setFitToSection = K, S.setLockAnchors = function(e) {
					g.lockAnchors = e
				}, S.setMouseWheelScrolling = q, S.setAllowScrolling = $, S.setKeyboardScrolling = te, S.moveSectionUp = ne, S.moveSectionDown = oe, S.silentMoveTo = re, S.moveTo = ie, S.moveSlideRight = le, S.moveSlideLeft = ae, S.fitToSection = be, S.reBuild = se, S.setResponsive = ce, S.getFullpageData = function() {
					return {
						options: g,
						internals: {
							container: w,
							canScroll: x,
							isScrollAllowed: d,
							getDestinationPosition: ke,
							isTouch: o,
							c: Fe,
							getXmovement: pt,
							removeAnimation: ft,
							getTransforms: kt,
							lazyLoad: je,
							addAnimation: ut,
							performHorizontalMove: at,
							landscapeScroll: rt,
							silentLandscapeScroll: Tt,
							keepSlidesPosition: Oe,
							silentScroll: Ot,
							styleSlides: pe,
							scrollHandler: Se,
							getEventsPage: Mt,
							getMSPointer: Lt,
							isReallyTouch: xe,
							usingExtension: Rt,
							toggleControlArrows: it,
							touchStartHandler: Ae,
							touchMoveHandler: Ee
						}
					}
				}, S.destroy = function(e) {
					eo(w, "destroy", e), _(!1, "internal"), $(!0), ee(!1), te(!1), Wn(w, Qt), clearTimeout(h), clearTimeout(p), clearTimeout(s), clearTimeout(A), clearTimeout(L), Vt.removeEventListener("scroll", Se), Vt.removeEventListener("hashchange", Qe), Vt.removeEventListener("resize", st), Zt.removeEventListener("keydown", Ke), Zt.removeEventListener("keyup", qe), ["click", "touchstart"].forEach(function(e) {
						Zt.removeEventListener(e, ue)
					}), ["mouseenter", "touchstart", "mouseleave", "touchend"].forEach(function(e) {
						Zt.removeEventListener(e, de, !0)
					}), Rt("dragAndMove") && S.dragAndMove.destroy(), clearTimeout(h), clearTimeout(p), e && (Ot(0), On("img[data-src], source[data-src], audio[data-src], iframe[data-src]", w).forEach(function(e) {
						Ne(e, "src")
					}), On("img[data-srcset]").forEach(function(e) {
						Ne(e, "srcset")
					}), ro(On(un + ", " + yn + ", " + xn)), Rn(On(nn), {
						height: "",
						"background-color": "",
						padding: ""
					}), Rn(On(vn), {
						width: ""
					}), Rn(w, {
						height: "",
						position: "",
						"-ms-touch-action": "",
						"touch-action": ""
					}), Rn(r, {
						overflow: "",
						height: ""
					}), Xn(On("html"), Jt), Xn(m, Ut), m.className.split(/\s+/).forEach(function(e) {
						0 === e.indexOf(Kt) && Xn(m, e)
					}), On(nn + ", " + vn).forEach(function(e) {
						g.scrollOverflowHandler && g.scrollOverflow && g.scrollOverflowHandler.remove(e), Xn(e, bn + " " + qt + " " + en);
						var t = e.getAttribute("data-fp-styles");
						t && e.setAttribute("style", e.getAttribute("data-fp-styles")), Cn(e, tn) && !z && e.removeAttribute("data-anchor")
					}), Ht(w), [ln, Sn, gn].forEach(function(e) {
						On(e, w).forEach(function(e) {
							Fn(e)
						})
					}), Vt.scrollTo(0, 0), [tn, dn, mn].forEach(function(e) {
						Xn(On("." + e), e)
					}))
				}, S.getActiveSection = function() {
					return new Wt(On(on)[0])
				}, S.getActiveSlide = function() {
					return Ie(On(pn, On(on)[0])[0])
				}, S.landscapeScroll = rt, S.test = {
					top: "0px",
					translate3d: "translate3d(0px, 0px, 0px)",
					translate3dH: function() {
						for (var e = [], t = 0; t < On(g.sectionSelector, w).length; t++) e.push("translate3d(0px, 0px, 0px)");
						return e
					}(),
					left: function() {
						for (var e = [], t = 0; t < On(g.sectionSelector, w).length; t++) e.push(0);
						return e
					}(),
					options: g,
					setAutoScrolling: _
				}, S.shared = {
					afterRenderActions: me
				}, Vt.fullpage_api = S, ve("continuousHorizontal"), ve("scrollHorizontally"), ve("resetSliders"), ve("interlockedSlides"), ve("responsiveSlides"), ve("fadingEffect"), ve("dragAndMove"), ve("offsetSections"), ve("scrollOverflowReset"), ve("parallax"), Rt("dragAndMove") && S.dragAndMove.init(), g.css3 && (g.css3 = function() {
					var e, t = Zt.createElement("p"),
						n = {
							webkitTransform: "-webkit-transform",
							OTransform: "-o-transform",
							msTransform: "-ms-transform",
							MozTransform: "-moz-transform",
							transform: "transform"
						};
					for (var o in t.style.display = "block", Zt.body.insertBefore(t, null), n) void 0 !== t.style[o] && (t.style[o] = "translate3d(1px,1px,1px)", e = Vt.getComputedStyle(t).getPropertyValue(n[o]));
					return Zt.body.removeChild(t), void 0 !== e && 0 < e.length && "none" !== e
				}()), g.scrollBar = g.scrollBar || g.hybrid, function() {
					if (!g.anchors.length) {
						var e = "[data-anchor]",
							t = On(g.sectionSelector.split(",").join(e + ",") + e, w);
						t.length && (z = !0, t.forEach(function(e) {
							g.anchors.push(e.getAttribute("data-anchor").toString())
						}))
					}
					if (!g.navigationTooltips.length) {
						var e = "[data-tooltip]",
							n = On(g.sectionSelector.split(",").join(e + ",") + e, w);
						n.length && n.forEach(function(e) {
							g.navigationTooltips.push(e.getAttribute("data-tooltip").toString())
						})
					}
				}(), function() {
					Rn(w, {
						height: "100%",
						position: "relative"
					}), Wn(w, Gt), Wn(On("html"), Jt), y = Hn(), Xn(w, Qt), Wn(On(g.sectionSelector, w), tn), Wn(On(g.slideSelector, w), dn), It("parallax", "init");
					for (var e = On(nn), t = 0; t < e.length; t++) {
						var n = t,
							o = e[t],
							r = On(vn, o),
							i = r.length;
						o.setAttribute("data-fp-styles", o.getAttribute("style")), s = o, (c = n) || null != On(on)[0] || Wn(s, qt), u = On(on)[0], Rn(s, {
							height: he(s) + "px"
						}), g.paddingTop && Rn(s, {
							"padding-top": g.paddingTop
						}), g.paddingBottom && Rn(s, {
							"padding-bottom": g.paddingBottom
						}), void 0 !== g.sectionsColor[c] && Rn(s, {
							"background-color": g.sectionsColor[c]
						}), void 0 !== g.anchors[c] && s.setAttribute("data-anchor", g.anchors[c]), l = o, a = n, void 0 !== g.anchors[a] && Cn(l, qt) && dt(g.anchors[a], a), g.menu && g.css3 && null != Un(On(g.menu)[0], Ft) && m.appendChild(On(g.menu)[0]), 0 < i ? pe(o, r, i) : g.verticalCentered && ht(o)
					}
					var l, a, s, c;
					g.fixedElements && g.css3 && On(g.fixedElements).forEach(function(e) {
						m.appendChild(e)
					}), g.navigation && function() {
						var e = Zt.createElement("div");
						e.setAttribute("id", cn);
						var t = Zt.createElement("ul");
						e.appendChild(t), Vn(e, m);
						var n = On(un)[0];
						Wn(n, "fp-" + g.navigationPosition), g.showActiveTooltip && Wn(n, "fp-show-active");
						for (var o = "", r = 0; r < On(nn).length; r++) {
							var i = "";
							g.anchors.length && (i = g.anchors[r]), o += '<li><a href="#' + i + '"><span class="fp-sr-only">' + ge(r, "Section") + "</span><span></span></a>";
							var l = g.navigationTooltips[r];
							void 0 !== l && "" !== l && (o += '<div class="' + fn + " fp-" + g.navigationPosition + '">' + l + "</div>"), o += "</li>"
						}
						On("ul", n)[0].innerHTML = o, Rn(On(un), {
							"margin-top": "-" + On(un)[0].offsetHeight / 2 + "px"
						}), Wn(On("a", On("li", On(un)[0])[Pn(On(on)[0], nn)]), qt)
					}(), On('iframe[src*="youtube.com/embed/"]', w).forEach(function(e) {
						var t, n, o;
						n = "enablejsapi=1", o = (t = e).getAttribute("src"), t.setAttribute("src", o + (/\?/.test(o) ? "&" : "?") + n)
					}), g.fadingEffect && S.fadingEffect && S.fadingEffect.apply(), g.scrollOverflow && (v = g.scrollOverflowHandler.init(g))
				}(), $(!0), ee(!0), _(g.autoScrolling, "internal"), ct(), At(), "complete" === Zt.readyState && _e(), Vt.addEventListener("load", _e), g.scrollOverflow || me(), Vt.addEventListener("scroll", Se), Vt.addEventListener("hashchange", Qe), Vt.addEventListener("blur", nt), Vt.addEventListener("resize", st), Zt.addEventListener("keydown", Ke), Zt.addEventListener("keyup", qe), ["click", "touchstart"].forEach(function(e) {
					Zt.addEventListener(e, ue)
				}), g.normalScrollElements && (["mouseenter", "touchstart"].forEach(function(e) {
					fe(e, !1)
				}), ["mouseleave", "touchend"].forEach(function(e) {
					fe(e, !0)
				})), Rt("dragAndMove") && S.dragAndMove.turnOffTouch());
				var N, j, P, Y = !1,
					D = 0,
					W = 0,
					X = 0,
					V = 0,
					Z = (new Date).getTime(),
					G = 0,
					F = 0,
					U = y;
				return S
			}

			function _(e, t) {
				e || Ot(0), Nt("autoScrolling", e, t);
				var n = On(on)[0];
				if (g.autoScrolling && !g.scrollBar) Rn(r, {
					overflow: "hidden",
					height: "100%"
				}), Q(I.recordHistory, "internal"), Rn(w, {
					"-ms-touch-action": "none",
					"touch-action": "none"
				}), null != n && Ot(n.offsetTop);
				else if (Rn(r, {
						overflow: "visible",
						height: "initial"
					}), Q(!1, "internal"), Rn(w, {
						"-ms-touch-action": "",
						"touch-action": ""
					}), Ht(w), null != n) {
					var o = ze(n.offsetTop);
					o.element.scrollTo(0, o.options)
				}
				eo(w, "setAutoScrolling", e)
			}

			function Q(e, t) {
				Nt("recordHistory", e, t)
			}

			function J(e, t) {
				"internal" !== t && g.fadingEffect && S.fadingEffect && S.fadingEffect.update(e), Nt("scrollingSpeed", e, t)
			}

			function K(e, t) {
				Nt("fitToSection", e, t)
			}

			function q(e) {
				e ? (function() {
					var e, t = "";
					Vt.addEventListener ? e = "addEventListener" : (e = "attachEvent", t = "on");
					var n = "onwheel" in Zt.createElement("div") ? "wheel" : void 0 !== Zt.onmousewheel ? "mousewheel" : "DOMMouseScroll";
					"DOMMouseScroll" == n ? Zt[e](t + "MozMousePixelScroll", Me, !1) : Zt[e](t + n, Me, !1)
				}(), w.addEventListener("mousedown", $e), w.addEventListener("mouseup", et)) : (Zt.addEventListener ? (Zt.removeEventListener("mousewheel", Me, !1), Zt.removeEventListener("wheel", Me, !1), Zt.removeEventListener("MozMousePixelScroll", Me, !1)) : Zt.detachEvent("onmousewheel", Me), w.removeEventListener("mousedown", $e), w.removeEventListener("mouseup", et))
			}

			function $(t, e) {
				void 0 !== e ? (e = e.replace(/ /g, "").split(",")).forEach(function(e) {
					Ct(t, e, "m")
				}) : Ct(t, "all", "m"), eo(w, "setAllowScrolling", {
					value: t,
					directions: e
				})
			}

			function ee(e) {
				e ? (q(!0), function() {
					if (n || o) {
//                        g.autoScrolling && (m.removeEventListener(C.touchmove, ye, {
//                            passive: !1
//                        }), m.addEventListener(C.touchmove, ye, {
//                            passive: !1
//                        }));
//                        var e = On(Ft)[0];
//                        e && (e.removeEventListener(C.touchstart, Ae), e.removeEventListener(C.touchmove, Ee, {
//                            passive: !1
//                        }), e.addEventListener(C.touchstart, Ae), e.addEventListener(C.touchmove, Ee, {
//                            passive: !1
//                        }))
					}
				}()) : (q(!1), function() {
					if (n || o) {
						g.autoScrolling && (m.removeEventListener(C.touchmove, Ee, {
							passive: !1
						}), m.removeEventListener(C.touchmove, ye, {
							passive: !1
						}));
						var e = On(Ft)[0];
						e && (e.removeEventListener(C.touchstart, Ae), e.removeEventListener(C.touchmove, Ee, {
							passive: !1
						}))
					}
				}())
			}

			function te(t, e) {
				void 0 !== e ? (e = e.replace(/ /g, "").split(",")).forEach(function(e) {
					Ct(t, e, "k")
				}) : (Ct(t, "all", "k"), g.keyboardScrolling = t)
			}

			function ne() {
				var e = In(On(on)[0], nn);
				e || !g.loopTop && !g.continuousVertical || (e = jn(On(nn))), null != e && Ce(e, null, !0)
			}

			function oe() {
				var e = zn(On(on)[0], nn);
				e || !g.loopBottom && !g.continuousVertical || (e = On(nn)[0]), null != e && Ce(e, null, !1)
			}

			function re(e, t) {
				J(0, "internal"), ie(e, t), J(I.scrollingSpeed, "internal")
			}

			function ie(e, t) {
				var n = St(e);
				void 0 !== t ? bt(e, t) : null != n && Ce(n)
			}

			function le(e) {
				Te("right", e)
			}

			function ae(e) {
				Te("left", e)
			}

			function se(e) {
				if (!Cn(w, Qt)) {
					E = !0, y = Hn();
					for (var t = On(nn), n = 0; n < t.length; ++n) {
						var o = t[n],
							r = On(gn, o)[0],
							i = On(vn, o);
						g.verticalCentered && Rn(On(ln, o), {
							height: gt(o) + "px"
						}), Rn(o, {
							height: he(o) + "px"
						}), 1 < i.length && rt(r, On(pn, r)[0])
					}
					g.scrollOverflow && v.createScrollBarForAll();
					var l = Pn(On(on)[0], nn);
					l && !Rt("fadingEffect") && re(l + 1), E = !1, $n(g.afterResize) && e && g.afterResize.call(w, Vt.innerWidth, Vt.innerHeight), $n(g.afterReBuild) && !e && g.afterReBuild.call(w), eo(w, "afterRebuild")
				}
			}

			function ce(e) {
				var t = Cn(m, Ut);
				e ? t || (_(!1, "internal"), K(!1, "internal"), Yn(On(un)), Wn(m, Ut), $n(g.afterResponsive) && g.afterResponsive.call(w, e), g.responsiveSlides && S.responsiveSlides && S.responsiveSlides.toSections(), eo(w, "afterResponsive", e), g.scrollOverflow && v.createScrollBarForAll()) : t && (_(I.autoScrolling, "internal"), K(I.autoScrolling, "internal"), Dn(On(un)), Xn(m, Ut), $n(g.afterResponsive) && g.afterResponsive.call(w, e), g.responsiveSlides && S.responsiveSlides && S.responsiveSlides.toSlides(), eo(w, "afterResponsive", e))
			}

			function ue(e) {
				var t = e.target;
				t && Un(t, un + " a") ? function(e) {
					qn(e);
					var t = Pn(Un(this, un + " li"));
					Ce(On(nn)[t])
				}.call(t, e) : to(t, ".fp-tooltip") ? function() {
					eo(Bn(this), "click")
				}.call(t) : to(t, xn) ? function() {
					var e = Un(this, nn);
					Cn(this, An) ? d.m.left && ae(e) : d.m.right && le(e)
				}.call(t, e) : to(t, En) || null != Un(t, En) ? function(e) {
					qn(e);
					var t = On(gn, Un(this, nn))[0],
						n = On(vn, t)[Pn(Un(this, "li"))];
					rt(t, n)
				}.call(t, e) : Un(t, g.menu + " [data-menuanchor]") && function(e) {
					!On(g.menu)[0] || !g.lockAnchors && g.anchors.length || (qn(e), ie(this.getAttribute("data-menuanchor")))
				}.call(t, e)
			}

			function fe(e, t) {
				Zt["fp_" + e] = t, Zt.addEventListener(e, de, !0)
			}

			function de(t) {
				t.target != Zt && g.normalScrollElements.split(",").forEach(function(e) {
					null != Un(t.target, e) && ee(Zt["fp_" + t.type])
				})
			}

			function ve(e) {
				var t = "fp_" + e + "Extension";
				B[e] = g[e + "Key"], S[e] = void 0 !== Vt[t] ? new Vt[t] : null, S[e] && S[e].c(e)
			}

			function pe(e, t, n) {
				var o = 100 * n,
					r = 100 / n,
					i = Zt.createElement("div");
				i.className = hn, Zn(t, i);
				var l, a, s = Zt.createElement("div");
				s.className = mn, Zn(t, s), Rn(On(Sn, e), {
					width: o + "%"
				}), 1 < n && (g.controlArrows && (l = e, a = [oo('<div class="fp-controlArrow fp-prev"></div>'), oo('<div class="fp-controlArrow fp-next"></div>')], _n(On(gn, l)[0], a), "#fff" !== g.controlArrowColor && (Rn(On(Mn, l), {
					"border-color": "transparent transparent transparent " + g.controlArrowColor
				}), Rn(On(Ln, l), {
					"border-color": "transparent " + g.controlArrowColor + " transparent transparent"
				})), g.loopHorizontal || Yn(On(Ln, l))), g.slidesNavigation && function(e, t) {
					Vn(oo('<div class="' + wn + '"><ul></ul></div>'), e);
					var n = On(yn, e)[0];
					Wn(n, "fp-" + g.slidesNavPosition);
					for (var o = 0; o < t; o++) Vn(oo('<li><a href="#"><span class="fp-sr-only">' + ge(o, "Slide") + "</span><span></span></a></li>"), On("ul", n)[0]);
					Rn(n, {
						"margin-left": "-" + n.innerWidth / 2 + "px"
					}), Wn(On("a", On("li", n)[0]), qt)
				}(e, n)), t.forEach(function(e) {
					Rn(e, {
						width: r + "%"
					}), g.verticalCentered && ht(e)
				});
				var c = On(pn, e)[0];
				null != c && (0 !== Pn(On(on), nn) || 0 === Pn(On(on), nn) && 0 !== Pn(c)) ? (Tt(c, "internal"), Wn(c, "fp-initial")) : Wn(t[0], qt)
			}

			function he(e) {
				return g.offsetSections && S.offsetSections ? Math.round(S.offsetSections.getWindowHeight(e)) : Hn()
			}

			function ge(e, t) {
				return g.navigationTooltips[e] || g.anchors[e] || t + " " + (e + 1)
			}

			function me() {
				var e, t = On(on)[0];
				Wn(t, en), je(t), Pe(t), g.scrollOverflow && g.scrollOverflowHandler.afterLoad(), (!(e = St(Je().section)) || void 0 !== e && Pn(e) === Pn(u)) && $n(g.afterLoad) && He("afterLoad", {
					activeSection: null,
					element: t,
					direction: null,
					anchorLink: t.getAttribute("data-anchor"),
					sectionIndex: Pn(t, nn)
				}), $n(g.afterRender) && He("afterRender"), eo(w, "afterRender")
			}

			function Se() {
				var e;
				if (eo(w, "onScroll"), (!g.autoScrolling || g.scrollBar || Rt("dragAndMove")) && !Bt()) {
					var t = Rt("dragAndMove") ? Math.abs(S.dragAndMove.getCurrentScroll()) : Jn(),
						n = 0,
						o = t + Hn() / 2,
						r = (Rt("dragAndMove") ? S.dragAndMove.getDocumentHeight() : m.offsetHeight - Hn()) === t,
						i = On(nn);
					if (r) n = i.length - 1;
					else if (t)
						for (var l = 0; l < i.length; ++l) i[l].offsetTop <= o && (n = l);
					else n = 0;
					if (!Cn(e = i[n], qt)) {
						Y = !0;
						var a, s, c = On(on)[0],
							u = Pn(c, nn) + 1,
							f = vt(e),
							d = e.getAttribute("data-anchor"),
							v = Pn(e, nn) + 1,
							p = On(pn, e)[0],
							h = {
								activeSection: c,
								sectionIndex: v - 1,
								anchorLink: d,
								element: e,
								leavingSection: u,
								direction: f
							};
						p && (s = p.getAttribute("data-anchor"), a = Pn(p)), x && (Wn(e, qt), Xn(Kn(e), qt), It("parallax", "afterLoad"), $n(g.onLeave) && He("onLeave", h), $n(g.afterLoad) && He("afterLoad", h), g.resetSliders && S.resetSliders && S.resetSliders.apply({
							localIsResizing: E,
							leavingSection: u
						}), De(c), je(e), Pe(e), dt(d, v - 1), g.anchors.length && (b = d), yt(a, s, d)), clearTimeout(A), A = setTimeout(function() {
							Y = !1
						}, 100)
					}
					g.fitToSection && (clearTimeout(L), L = setTimeout(function() {
						g.fitToSection && On(on)[0].offsetHeight <= y && be()
					}, g.fitToSectionDelay))
				}
			}

			function be() {
				x && (E = !0, Ce(On(on)[0]), E = !1)
			}

			function we(e) {
				if (d.m[e]) {
					var t = "down" === e ? oe : ne;
					if (S.scrollHorizontally && (t = S.scrollHorizontally.getScrollSection(e, t)), g.scrollOverflow) {
						var n = g.scrollOverflowHandler.scrollable(On(on)[0]),
							o = "down" === e ? "bottom" : "top";
						if (null != n) {
							if (!g.scrollOverflowHandler.isScrolled(o, n)) return !0;
							t()
						} else t()
					} else t()
				}
			}

			function ye(e) {
				g.autoScrolling && xe(e) && qn(e)
			}

			function Ee(e) {
				var t = Un(e.target, nn);
				if (xe(e)) {
					g.autoScrolling && qn(e);
					var n = Mt(e);
					X = n.y, V = n.x, On(gn, t).length && Math.abs(W - V) > Math.abs(D - X) ? !a && Math.abs(W - V) > Vt.innerWidth / 100 * g.touchSensitivity && (V < W ? d.m.right && le(t) : d.m.left && ae(t)) : g.autoScrolling && x && Math.abs(D - X) > Vt.innerHeight / 100 * g.touchSensitivity && (X < D ? we("down") : D < X && we("up"))
				}
			}

			function xe(e) {
				return void 0 === e.pointerType || "mouse" != e.pointerType
			}

			function Ae(e) {
				if (g.fitToSection && (O = !1), xe(e)) {
					var t = Mt(e);
					D = t.y, W = t.x
				}
			}

			function Le(e, t) {
				for (var n = 0, o = e.slice(Math.max(e.length - t, 1)), r = 0; r < o.length; r++) n += o[r];
				return Math.ceil(n / t)
			}

			function Me(e) {
				var t = (new Date).getTime(),
					n = Cn(On(".fp-completely")[0], sn);
				if (!d.m.down && !d.m.up) return qn(e), !1;
				if (g.autoScrolling && !c && !n) {
					var o = (e = e || Vt.event).wheelDelta || -e.deltaY || -e.detail,
						r = Math.max(-1, Math.min(1, o)),
						i = void 0 !== e.wheelDeltaX || void 0 !== e.deltaX,
						l = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !i;
					149 < f.length && f.shift(), f.push(Math.abs(o)), g.scrollBar && qn(e);
					var a = t - Z;
					if (Z = t, 200 < a && (f = []), x && !zt()) {
						var s = Le(f, 10);
						Le(f, 70) <= s && l && we(r < 0 ? "down" : "up")
					}
					return !1
				}
				g.fitToSection && (O = !1)
			}

			function Te(e, t) {
				var n = null == t ? On(on)[0] : t,
					o = On(gn, n)[0];
				if (!(null == o || zt() || a || On(vn, o).length < 2)) {
					var r = On(pn, o)[0],
						i = null;
					if (null == (i = "left" === e ? In(r, vn) : zn(r, vn))) {
						if (!g.loopHorizontal) return;
						var l = Kn(r);
						i = "left" === e ? l[l.length - 1] : l[0]
					}
					a = !S.test.isTesting, rt(o, i, e)
				}
			}

			function Oe() {
				for (var e = On(pn), t = 0; t < e.length; t++) Tt(e[t], "internal")
			}

			function ke(e) {
				var t = e.offsetHeight,
					n = e.offsetTop,
					o = n,
					r = Rt("dragAndMove") && S.dragAndMove.isGrabbing ? S.dragAndMove.isScrollingDown() : G < n,
					i = o - y + t,
					l = g.bigSectionsDestination;
				return y < t ? (r || l) && "bottom" !== l || (o = i) : (r || E && null == Nn(e)) && (o = i), g.offsetSections && S.offsetSections && (o = S.offsetSections.getSectionPosition(r, o, e)), G = o
			}

			function Ce(e, t, n) {
				if (null != e) {
					var o, r, i = {
						element: e,
						callback: t,
						isMovementUp: n,
						dtop: ke(e),
						yMovement: vt(e),
						anchorLink: e.getAttribute("data-anchor"),
						sectionIndex: Pn(e, nn),
						activeSlide: On(pn, e)[0],
						activeSection: On(on)[0],
						leavingSection: Pn(On(on), nn) + 1,
						localIsResizing: E
					};
					if (!(i.activeSection == e && !E || g.scrollBar && Jn() === i.dtop && !Cn(e, an))) {
						if (null != i.activeSlide && (o = i.activeSlide.getAttribute("data-anchor"), r = Pn(i.activeSlide)), !i.localIsResizing) {
							var l = i.yMovement;
							if (void 0 !== n && (l = n ? "up" : "down"), i.direction = l, $n(g.onLeave) && !1 === He("onLeave", i)) return
						}
						var a;
						It("parallax", "apply", i), g.autoScrolling && g.continuousVertical && void 0 !== i.isMovementUp && (!i.isMovementUp && "up" == i.yMovement || i.isMovementUp && "down" == i.yMovement) && ((s = i).isMovementUp ? Qn(On(on)[0], io(s.activeSection, nn)) : _n(On(on)[0], lo(s.activeSection, nn).reverse()), Ot(On(on)[0].offsetTop), Oe(), s.wrapAroundElements = s.activeSection, s.dtop = s.element.offsetTop, s.yMovement = vt(s.element), s.leavingSection = Pn(s.activeSection, nn) + 1, s.sectionIndex = Pn(s.element, nn), eo(On(Ft)[0], "onContinuousVertical", s), i = s), Rt("scrollOverflowReset") && S.scrollOverflowReset.setPrevious(i.activeSection), i.localIsResizing || De(i.activeSection), g.scrollOverflow && g.scrollOverflowHandler.beforeLeave(), Wn(e, qt), Xn(Kn(e), qt), je(e), g.scrollOverflow && g.scrollOverflowHandler.onLeave(), x = S.test.isTesting, yt(r, o, i.anchorLink, i.sectionIndex),
							function(e) {
								if (g.css3 && g.autoScrolling && !g.scrollBar) {
									var t = "translate3d(0px, -" + Math.round(e.dtop) + "px, 0px)";
									mt(t, !0), g.scrollingSpeed ? (clearTimeout(p), p = setTimeout(function() {
										Be(e)
									}, g.scrollingSpeed)) : Be(e)
								} else {
									var n = ze(e.dtop);
									S.test.top = -e.dtop + "px", Pt(n.element, n.options, g.scrollingSpeed, function() {
										g.scrollBar ? setTimeout(function() {
											Be(e)
										}, 30) : Be(e)
									})
								}
							}(i), b = i.anchorLink, dt(i.anchorLink, null == (a = i).wrapAroundElements ? a.sectionIndex : a.isMovementUp ? On(nn).length - 1 : 0)
					}
				}
				var s
			}

			function He(e, t) {
				var n, o, r, i, l = (o = e, r = t, (i = g.v2compatible ? {
					afterRender: function() {
						return [w]
					},
					onLeave: function() {
						return [r.activeSection, r.leavingSection, r.sectionIndex + 1, r.direction]
					},
					afterLoad: function() {
						return [r.element, r.anchorLink, r.sectionIndex + 1]
					},
					afterSlideLoad: function() {
						return [r.destiny, r.anchorLink, r.sectionIndex + 1, r.slideAnchor, r.slideIndex]
					},
					onSlideLeave: function() {
						return [r.prevSlide, r.anchorLink, r.sectionIndex + 1, r.prevSlideIndex, r.direction, r.slideIndex]
					}
				} : {
					afterRender: function() {
						return {
							section: Re(On(on)[0]),
							slide: Ie(On(pn, On(on)[0])[0])
						}
					},
					onLeave: function() {
						return {
							origin: Re(r.activeSection),
							destination: Re(r.element),
							direction: r.direction
						}
					},
					afterLoad: function() {
						return i.onLeave()
					},
					afterSlideLoad: function() {
						return {
							section: Re(r.section),
							origin: Ie(r.prevSlide),
							destination: Ie(r.destiny),
							direction: r.direction
						}
					},
					onSlideLeave: function() {
						return i.afterSlideLoad()
					}
				})[o]());
				if (g.v2compatible) {
					if (!1 === g[e].apply(l[0], l.slice(1))) return !1
				} else if (eo(w, e, l), !1 === g[e].apply(l[Object.keys(l)[0]], (n = l, Object.keys(n).map(function(e) {
						return n[e]
					})))) return !1;
				return !0
			}

			function Re(e) {
				return e ? new Wt(e) : null
			}

			function Ie(e) {
				return e ? new Xt(e) : null
			}

			function ze(e) {
				var t = {};
				return g.autoScrolling && !g.scrollBar ? (t.options = -e, t.element = On(Ft)[0]) : (t.options = e, t.element = Vt), t
			}

			function Be(e) {
				var t;
				null != (t = e).wrapAroundElements && (t.isMovementUp ? Qn(On(nn)[0], t.wrapAroundElements) : _n(On(nn)[On(nn).length - 1], t.wrapAroundElements), Ot(On(on)[0].offsetTop), Oe(), t.sectionIndex = Pn(t.element, nn), t.leavingSection = Pn(t.activeSection, nn) + 1), $n(g.afterLoad) && !e.localIsResizing && He("afterLoad", e), g.scrollOverflow && g.scrollOverflowHandler.afterLoad(), It("parallax", "afterLoad"), Rt("scrollOverflowReset") && S.scrollOverflowReset.reset(), Rt("resetSliders") && S.resetSliders.apply(e), e.localIsResizing || Pe(e.element), Wn(e.element, en), Xn(Kn(e.element), en), x = !0, $n(e.callback) && e.callback()
			}

			function Ne(e, t) {
				e.setAttribute(t, e.getAttribute("data-" + t)), e.removeAttribute("data-" + t)
			}

			function je(e) {
				g.lazyLoading && On("img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]", We(e)).forEach(function(n) {
					if (["src", "srcset"].forEach(function(e) {
							var t = n.getAttribute("data-" + e);
							null != t && t && Ne(n, e)
						}), to(n, "source")) {
						var e = Un(n, "video, audio");
						e && e.load()
					}
				})
			}

			function Pe(e) {
				var t = We(e);
				On("video, audio", t).forEach(function(e) {
					e.hasAttribute("data-autoplay") && "function" == typeof e.play && e.play()
				}), On('iframe[src*="youtube.com/embed/"]', t).forEach(function(e) {
					e.hasAttribute("data-autoplay") && Ye(e), e.onload = function() {
						e.hasAttribute("data-autoplay") && Ye(e)
					}
				})
			}

			function Ye(e) {
				e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
			}

			function De(e) {
				var t = We(e);
				On("video, audio", t).forEach(function(e) {
					e.hasAttribute("data-keepplaying") || "function" != typeof e.pause || e.pause()
				}), On('iframe[src*="youtube.com/embed/"]', t).forEach(function(e) {
					/youtube\.com\/embed\//.test(e.getAttribute("src")) && !e.hasAttribute("data-keepplaying") && e.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
				})
			}

			function We(e) {
				var t = On(pn, e);
				return t.length && (e = t[0]), e
			}

			function Xe(e) {
				var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

				function o(e) {
					var t, n, o, r, i, l, a = "",
						s = 0;
					for (e = e.replace(/[^A-Za-z0-9+/=]/g, ""); s < e.length;) t = c.indexOf(e.charAt(s++)) << 2 | (r = c.indexOf(e.charAt(s++))) >> 4, n = (15 & r) << 4 | (i = c.indexOf(e.charAt(s++))) >> 2, o = (3 & i) << 6 | (l = c.indexOf(e.charAt(s++))), a += String.fromCharCode(t), 64 != i && (a += String.fromCharCode(n)), 64 != l && (a += String.fromCharCode(o));
					return a = function(e) {
						for (var t, n = "", o = 0, r = 0, i = 0; o < e.length;)(r = e.charCodeAt(o)) < 128 ? (n += String.fromCharCode(r), o++) : 191 < r && r < 224 ? (i = e.charCodeAt(o + 1), n += String.fromCharCode((31 & r) << 6 | 63 & i), o += 2) : (i = e.charCodeAt(o + 1), t = e.charCodeAt(o + 2), n += String.fromCharCode((15 & r) << 12 | (63 & i) << 6 | 63 & t), o += 3);
						return n
					}(a)
				}

				function r(e) {
					return e.slice(3).slice(0, -3)
				}
				return function(e) {
					var t = e.split("_");
					if (1 < t.length) {
						var n = t[1];
						return e.replace(r(t[1]), "").split("_")[0] + "_" + o(n.slice(3).slice(0, -3))
					}
					return r(e)
				}(o(e))
			}

			function Ve(e) {
				var t = function() {
						if (Zt.domain.length) {
							for (var e = Zt.domain.replace(/^(www\.)/, "").split("."); 2 < e.length;) e.shift();
							return e.join(".").replace(/(^\.*)|(\.*$)/g, "")
						}
						return ""
					}(),
					n = ["MTM0bG9jYWxob3N0MjM0", "MTM0MC4xMjM0", "MTM0anNoZWxsLm5ldDIzNA==", "UDdDQU5ZNlNN"],
					o = Xe(n[0]),
					r = Xe(n[1]),
					i = Xe(n[2]),
					l = Xe(n[3]),
					a = [o, r, i].indexOf(t) < 0 && 0 !== t.length,
					s = void 0 !== B[e] && B[e].length;
				if (!s && a) return !1;
				var c = s ? Xe(B[e]) : "",
					u = 1 < (c = c.split("_")).length && -1 < c[1].indexOf(e, c[1].length - e.length);
				return !(c[0].indexOf(t, c[0].length - t.length) < 0 && a && l != c[0]) && u || !a
			}

			function Ze(e) {
				e.forEach(function(e) {
					e.removedNodes[0] && e.removedNodes[0].isEqualNode(j) && (clearTimeout(P), P = setTimeout(Ge, 900))
				})
			}

			function Ge() {
				H = !1
			}

			function Fe(e) {
				 "MutationObserver" in Vt && new MutationObserver(Ze).observe(Zt.body, {
					childList: !0,
					subtree: !1
				}), Rt(e) && S[e] && (Ve(e))
			}

			function _e() {
				var e = Je(),
					t = e.section,
					n = e.slide;
				t && (g.animateAnchor ? bt(t, n) : re(t, n))
			}

			function Qe() {
				if (!Y && !g.lockAnchors) {
					var e = Je(),
						t = e.section,
						n = e.slide,
						o = void 0 === b,
						r = void 0 === b && void 0 === n && !a;
					t && t.length && (t && t !== b && !o || r || !a && i != n) && bt(t, n)
				}
			}

			function Je() {
				var e, t, n = Vt.location.hash;
				if (n.length) {
					var o = n.replace("#", "").split("/"),
						r = -1 < n.indexOf("#/");
					e = r ? "/" + o[1] : decodeURIComponent(o[0]);
					var i = r ? o[2] : o[1];
					i && i.length && (t = decodeURIComponent(i))
				}
				return {
					section: e,
					slide: t
				}
			}

			function Ke(e) {
				clearTimeout(M);
				var t = Zt.activeElement,
					n = e.keyCode;
				9 === n ? function(e) {
					var t, n, o, r, i, l, a, s = e.shiftKey,
						c = Zt.activeElement,
						u = tt(We(On(on)[0]));

					function f(e) {
						return qn(e), u[0] ? u[0].focus() : null
					}(t = e, n = tt(Zt), o = n.indexOf(Zt.activeElement), r = t.shiftKey ? o - 1 : o + 1, i = n[r], l = Ie(Un(i, vn)), a = Re(Un(i, nn)), l || a) && (c ? null == Un(c, on + "," + on + " " + pn) && (c = f(e)) : f(e), (!s && c == u[u.length - 1] || s && c == u[0]) && qn(e))
				}(e) : to(t, "textarea") || to(t, "input") || to(t, "select") || "true" === t.getAttribute("contentEditable") || "" === t.getAttribute("contentEditable") || !g.keyboardScrolling || !g.autoScrolling || (-1 < [40, 38, 32, 33, 34].indexOf(n) && qn(e), c = e.ctrlKey, M = setTimeout(function() {
					! function(e) {
						var t = e.shiftKey;
						if (x || !([37, 39].indexOf(e.keyCode) < 0)) switch (e.keyCode) {
							case 38:
							case 33:
								d.k.up && ne();
								break;
							case 32:
								if (t && d.k.up) {
									ne();
									break
								}
							case 40:
							case 34:
								d.k.down && oe();
								break;
							case 36:
								d.k.up && ie(1);
								break;
							case 35:
								d.k.down && ie(On(nn).length);
								break;
							case 37:
								d.k.left && ae();
								break;
							case 39:
								d.k.right && le()
						}
					}(e)
				}, 150))
			}

			function qe(e) {
				l && (c = e.ctrlKey)
			}

			function $e(e) {
				2 == e.which && (F = e.pageY, w.addEventListener("mousemove", ot))
			}

			function et(e) {
				2 == e.which && w.removeEventListener("mousemove", ot)
			}

			function tt(e) {
				return [].slice.call(On(R, e)).filter(function(e) {
					return "-1" !== e.getAttribute("tabindex") && null !== e.offsetParent
				})
			}

			function nt() {
				c = l = !1
			}

			function ot(e) {
				x && (e.pageY < F && d.m.up ? ne() : e.pageY > F && d.m.down && oe()), F = e.pageY
			}

			function rt(e, t, n) {
				var o = Un(e, nn),
					r = {
						slides: e,
						destiny: t,
						direction: n,
						destinyPos: {
							left: t.offsetLeft
						},
						slideIndex: Pn(t),
						section: o,
						sectionIndex: Pn(o, nn),
						anchorLink: o.getAttribute("data-anchor"),
						slidesNav: On(yn, o)[0],
						slideAnchor: xt(t),
						prevSlide: On(pn, o)[0],
						prevSlideIndex: Pn(On(pn, o)[0]),
						localIsResizing: E
					};
				r.xMovement = pt(r.prevSlideIndex, r.slideIndex), r.localIsResizing || (x = !1), It("parallax", "applyHorizontal", r), g.onSlideLeave && !r.localIsResizing && "none" !== r.xMovement && $n(g.onSlideLeave) && !1 === He("onSlideLeave", r) ? a = !1 : (Wn(t, qt), Xn(Kn(t), qt), r.localIsResizing || (De(r.prevSlide), je(t)), it(r), Cn(o, qt) && !r.localIsResizing && yt(r.slideIndex, r.slideAnchor, r.anchorLink, r.sectionIndex), S.continuousHorizontal && S.continuousHorizontal.apply(r), Bt() ? lt(r) : at(e, r, !0), g.interlockedSlides && S.interlockedSlides && (Rt("continuousHorizontal") && void 0 !== n && n !== r.xMovement || S.interlockedSlides.apply(r)))
			}

			function it(e) {
				!g.loopHorizontal && g.controlArrows && (no(On(Ln, e.section), 0 !== e.slideIndex), no(On(Mn, e.section), null != Nn(e.destiny)))
			}

			function lt(e) {
				var t, n;
				S.continuousHorizontal && S.continuousHorizontal.afterSlideLoads(e), t = e.slidesNav, n = e.slideIndex, g.slidesNavigation && null != t && (Xn(On($t, t), qt), Wn(On("a", On("li", t)[n]), qt)), e.localIsResizing || (It("parallax", "afterSlideLoads"), $n(g.afterSlideLoad) && He("afterSlideLoad", e), x = !0, Pe(e.destiny)), a = !1, Rt("interlockedSlides") && S.interlockedSlides.apply(e)
			}

			function at(e, t, n) {
				var o = t.destinyPos;
				if (g.css3) {
					var r = "translate3d(-" + Math.round(o.left) + "px, 0px, 0px)";
					S.test.translate3dH[t.sectionIndex] = r, Rn(ut(On(Sn, e)), kt(r)), h = setTimeout(function() {
						n && lt(t)
					}, g.scrollingSpeed)
				} else S.test.left[t.sectionIndex] = Math.round(o.left), Pt(e, Math.round(o.left), g.scrollingSpeed, function() {
					n && lt(t)
				})
			}

			function st() {
				if (eo(w, "onResize"), ct(), n) {
					var e = Zt.activeElement;
					if (!to(e, "textarea") && !to(e, "input") && !to(e, "select")) {
						var t = Hn();
						Math.abs(t - U) > 20 * Math.max(U, t) / 100 && (s = setTimeout(function() {
							se(!0), U = t
						}, navigator.userAgent.match("CriOS") ? 50 : 0))
					}
				} else clearTimeout(s), s = setTimeout(function() {
					se(!0)
				}, 350)
			}

			function ct() {
				var e = g.responsive || g.responsiveWidth,
					t = g.responsiveHeight,
					n = e && Vt.innerWidth < e,
					o = t && Vt.innerHeight < t;
				e && t ? ce(n || o) : e ? ce(n) : t && ce(o)
			}

			function ut(e) {
				var t = "all " + g.scrollingSpeed + "ms " + g.easingcss3;
				return Xn(e, _t), Rn(e, {
					"-webkit-transition": t,
					transition: t
				})
			}

			function ft(e) {
				return Wn(e, _t)
			}

			function dt(e, t) {
				var n, o, r, i;
				n = e, o = On(g.menu)[0], g.menu && null != o && (Xn(On($t, o), qt), Wn(On('[data-menuanchor="' + n + '"]', o), qt)), r = e, i = t, g.navigation && null != On(un)[0] && (Xn(On($t, On(un)[0]), qt), Wn(r ? On('a[href="#' + r + '"]', On(un)[0]) : On("a", On("li", On(un)[0])[i]), qt))
			}

			function vt(e) {
				var t = Pn(On(on)[0], nn),
					n = Pn(e, nn);
				return t == n ? "none" : n < t ? "up" : "down"
			}

			function pt(e, t) {
				return e == t ? "none" : t < e ? "left" : "right"
			}

			function ht(e) {
				if (!Cn(e, bn)) {
					var t = Zt.createElement("div");
					t.className = rn, t.style.height = gt(e) + "px", Wn(e, bn), Gn(e, t)
				}
			}

			function gt(e) {
				var t = he(e);
				if (g.paddingTop || g.paddingBottom) {
					var n = e;
					Cn(n, tn) || (n = Un(e, nn)), t -= parseInt(getComputedStyle(n)["padding-top"]) + parseInt(getComputedStyle(n)["padding-bottom"])
				}
				return t
			}

			function mt(e, t) {
				t ? ut(w) : ft(w), clearTimeout(T), Rn(w, kt(e)), S.test.translate3d = e, T = setTimeout(function() {
					Xn(w, _t)
				}, 10)
			}

			function St(e) {
				var t = On(nn + '[data-anchor="' + e + '"]', w)[0];
				if (!t) {
					var n = void 0 !== e ? e - 1 : 0;
					t = On(nn)[n]
				}
				return t
			}

			function bt(e, t) {
				var n = St(e);
				if (null != n) {
					var o, r, i, l = (null == (i = On(vn + '[data-anchor="' + (o = t) + '"]', r = n)[0]) && (o = void 0 !== o ? o : 0, i = On(vn, r)[o]), i);
					xt(n) === b || Cn(n, qt) ? wt(l) : Ce(n, function() {
						wt(l)
					})
				}
			}

			function wt(e) {
				null != e && rt(Un(e, gn), e)
			}

			function yt(e, t, n, o) {
				var r = "";
				g.anchors.length && !g.lockAnchors && (e ? (null != n && (r = n), null == t && (t = e), Et(r + "/" + (i = t))) : (null != e && (i = t), Et(n))), At()
			}

			function Et(e) {
				if (g.recordHistory) location.hash = e;
				else if (n || o) Vt.history.replaceState(void 0, void 0, "#" + e);
				else {
					var t = Vt.location.href.split("#")[0];
					Vt.location.replace(t + "#" + e)
				}
			}

			function xt(e) {
				if (!e) return null;
				var t = e.getAttribute("data-anchor"),
					n = Pn(e);
				return null == t && (t = n), t
			}

			function At() {
				var e = On(on)[0],
					t = On(pn, e)[0],
					n = xt(e),
					o = xt(t),
					r = String(n);
				t && (r = r + "-" + o), r = r.replace("/", "-").replace("#", "");
				var i = new RegExp("\\b\\s?" + Kt + "-[^\\s]+\\b", "g");
				m.className = m.className.replace(i, ""), Wn(m, Kt + "-" + r)
			}

			function Lt() {
				return Vt.PointerEvent ? {
					down: "pointerdown",
					move: "pointermove"
				} : {
					down: "MSPointerDown",
					move: "MSPointerMove"
				}
			}

			function Mt(e) {
				var t = [];
				return t.y = void 0 !== e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, t.x = void 0 !== e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, o && xe(e) && g.scrollBar && void 0 !== e.touches && (t.y = e.touches[0].pageY, t.x = e.touches[0].pageX), t
			}

			function Tt(e, t) {
				J(0, "internal"), void 0 !== t && (E = !0), rt(Un(e, gn), e), void 0 !== t && (E = !1), J(I.scrollingSpeed, "internal")
			}

			function Ot(e) {
				var t = Math.round(e);
				if (g.css3 && g.autoScrolling && !g.scrollBar) mt("translate3d(0px, -" + t + "px, 0px)", !1);
				else if (g.autoScrolling && !g.scrollBar) Rn(w, {
					top: -t + "px"
				}), S.test.top = -t + "px";
				else {
					var n = ze(t);
					Yt(n.element, n.options)
				}
			}

			function kt(e) {
				return {
					"-webkit-transform": e,
					"-moz-transform": e,
					"-ms-transform": e,
					transform: e
				}
			}

			function Ct(t, e, n) {
				"all" !== e ? d[n][e] = t : Object.keys(d[n]).forEach(function(e) {
					d[n][e] = t
				})
			}

			function Ht(e) {
				return Rn(e, {
					"-webkit-transition": "none",
					transition: "none"
				})
			}

			function Rt(e) {
				return null !== g[e] && "[object Array]" === Object.prototype.toString.call(g[e]) ? g[e].length && S[e] : g[e] && S[e]
			}

			function It(e, t, n) {
				if (Rt(e)) return S[e][t](n)
			}

			function zt() {
				return Rt("dragAndMove") && S.dragAndMove.isAnimating
			}

			function Bt() {
				return Rt("dragAndMove") && S.dragAndMove.isGrabbing
			}

			function Nt(e, t, n) {
				g[e] = t, "internal" !== n && (I[e] = t)
			}

			function jt() {
				Cn(On("html"), Jt) ? Tn("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (g.continuousVertical && (g.loopTop || g.loopBottom) && (g.continuousVertical = !1, Tn("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), !g.scrollOverflow || !g.scrollBar && g.autoScrolling || Tn("warn", "Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox"), !g.continuousVertical || !g.scrollBar && g.autoScrolling || (g.continuousVertical = !1, Tn("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), g.scrollOverflow && null == g.scrollOverflowHandler && (g.scrollOverflow = !1, Tn("error", "The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.")), g.anchors.forEach(function(t) {
					var e = [].slice.call(On("[name]")).filter(function(e) {
							return e.getAttribute("name") && e.getAttribute("name").toLowerCase() == t.toLowerCase()
						}),
						n = [].slice.call(On("[id]")).filter(function(e) {
							return e.getAttribute("id") && e.getAttribute("id").toLowerCase() == t.toLowerCase()
						});
					(n.length || e.length) && (Tn("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), n.length && Tn("error", '"' + t + '" is is being used by another element `id` property'), e.length && Tn("error", '"' + t + '" is is being used by another element `name` property'))
				}))
			}

			function Pt(t, n, o, r) {
				var e, i = (e = t).self != Vt && Cn(e, hn) ? e.scrollLeft : !g.autoScrolling || g.scrollBar ? Jn() : e.offsetTop,
					l = n - i,
					a = 0;
				O = !0;
				var s = function() {
					if (O) {
						var e = n;
						a += 20, o && (e = Vt.fp_easings[g.easing](a, i, l, o)), Yt(t, e), a < o ? setTimeout(s, 20) : void 0 !== r && r()
					} else a < o && r()
				};
				s()
			}

			function Yt(e, t) {
				!g.autoScrolling || g.scrollBar || e.self != Vt && Cn(e, hn) ? e.self != Vt && Cn(e, hn) ? e.scrollLeft = t : e.scrollTo(0, t) : e.style.top = t + "px"
			}

			function Dt(e, t) {
				this.anchor = e.getAttribute("data-anchor"), this.item = e, this.index = Pn(e, t), this.isLast = this.index === e.parentElement.querySelectorAll(t).length - 1, this.isFirst = !this.index
			}

			function Wt(e) {
				Dt.call(this, e, nn)
			}

			function Xt(e) {
				Dt.call(this, e, vn)
			}
			jt()
		}
}), window.jQuery && window.fullpage && function(n, o) {
	"use strict";
	n && o ? n.fn.fullpage = function(e) {
		var t = new o(this[0], e);
		Object.keys(t).forEach(function(e) {
			n.fn.fullpage[e] = t[e]
		})
	} : window.fp_utils.showError("error", "jQuery is required to use the jQuery fullpage adapter!")
}(window.jQuery, window.fullpage);

/*!
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.18
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.rampinteractive.co.uk/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 * @license
 * Copyright (c) 2010-2015 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */

/*
 *
 * Changelog
 * $Date: 2010-12-12 (Wed, 12 Dec 2010) $
 * $version: 1.0.0
 * $version: 1.0.1 - removed multibyte comments
 *
 * $Date: 2011-21-02 (Mon, 21 Feb 2011) $
 * $version: 1.1.0 	- added allowPageScroll property to allow swiping and scrolling of page
 *					- changed handler signatures so one handler can be used for multiple events
 * $Date: 2011-23-02 (Wed, 23 Feb 2011) $
 * $version: 1.2.0 	- added click handler. This is fired if the user simply clicks and does not swipe. The event object and click target are passed to handler.
 *					- If you use the http://code.google.com/p/jquery-ui-for-ipad-and-iphone/ plugin, you can also assign jQuery mouse events to children of a touchSwipe object.
 * $version: 1.2.1 	- removed console log!
 *
 * $version: 1.2.2 	- Fixed bug where scope was not preserved in callback methods.
 *
 * $Date: 2011-28-04 (Thurs, 28 April 2011) $
 * $version: 1.2.4 	- Changed licence terms to be MIT or GPL inline with jQuery. Added check for support of touch events to stop non compatible browsers erroring.
 *
 * $Date: 2011-27-09 (Tues, 27 September 2011) $
 * $version: 1.2.5 	- Added support for testing swipes with mouse on desktop browser (thanks to https://github.com/joelhy)
 *
 * $Date: 2012-14-05 (Mon, 14 May 2012) $
 * $version: 1.2.6 	- Added timeThreshold between start and end touch, so user can ignore slow swipes (thanks to Mark Chase). Default is null, all swipes are detected
 *
 * $Date: 2012-05-06 (Tues, 05 June 2012) $
 * $version: 1.2.7 	- Changed time threshold to have null default for backwards compatibility. Added duration param passed back in events, and refactored how time is handled.
 *
 * $Date: 2012-05-06 (Tues, 05 June 2012) $
 * $version: 1.2.8 	- Added the possibility to return a value like null or false in the trigger callback. In that way we can control when the touch start/move should take effect or not (simply by returning in some cases return null; or return false;) This effects the ontouchstart/ontouchmove event.
 *
 * $Date: 2012-06-06 (Wed, 06 June 2012) $
 * $version: 1.3.0 	- Refactored whole plugin to allow for methods to be executed, as well as exposed defaults for user override. Added 'enable', 'disable', and 'destroy' methods
 *
 * $Date: 2012-05-06 (Fri, 05 June 2012) $
 * $version: 1.3.1 	- Bug fixes  - bind() with false as last argument is no longer supported in jQuery 1.6, also, if you just click, the duration is now returned correctly.
 *
 * $Date: 2012-29-07 (Sun, 29 July 2012) $
 * $version: 1.3.2	- Added fallbackToMouseEvents option to NOT capture mouse events on non touch devices.
 * 			- Added "all" fingers value to the fingers property, so any combination of fingers triggers the swipe, allowing event handlers to check the finger count
 *
 * $Date: 2012-09-08 (Thurs, 9 Aug 2012) $
 * $version: 1.3.3	- Code tidy prep for minefied version
 *
 * $Date: 2012-04-10 (wed, 4 Oct 2012) $
 * $version: 1.4.0	- Added pinch support, pinchIn and pinchOut
 *
 * $Date: 2012-11-10 (Thurs, 11 Oct 2012) $
 * $version: 1.5.0	- Added excludedElements, a jquery selector that specifies child elements that do NOT trigger swipes. By default, this is .noSwipe
 *
 * $Date: 2012-22-10 (Mon, 22 Oct 2012) $
 * $version: 1.5.1	- Fixed bug with jQuery 1.8 and trailing comma in excludedElements
 *					- Fixed bug with IE and eventPreventDefault()
 * $Date: 2013-01-12 (Fri, 12 Jan 2013) $
 * $version: 1.6.0	- Fixed bugs with pinching, mainly when both pinch and swipe enabled, as well as adding time threshold for multifinger gestures, so releasing one finger beofre the other doesnt trigger as single finger gesture.
 *					- made the demo site all static local HTML pages so they can be run locally by a developer
 *					- added jsDoc comments and added documentation for the plugin
 *					- code tidy
 *					- added triggerOnTouchLeave property that will end the event when the user swipes off the element.
 * $Date: 2013-03-23 (Sat, 23 Mar 2013) $
 * $version: 1.6.1	- Added support for ie8 touch events
 * $version: 1.6.2	- Added support for events binding with on / off / bind in jQ for all callback names.
 *                   - Deprecated the 'click' handler in favour of tap.
 *                   - added cancelThreshold property
 *                   - added option method to update init options at runtime
 * $version 1.6.3    - added doubletap, longtap events and longTapThreshold, doubleTapThreshold property
 *
 * $Date: 2013-04-04 (Thurs, 04 April 2013) $
 * $version 1.6.4    - Fixed bug with cancelThreshold introduced in 1.6.3, where swipe status no longer fired start event, and stopped once swiping back.
 *
 * $Date: 2013-08-24 (Sat, 24 Aug 2013) $
 * $version 1.6.5    - Merged a few pull requests fixing various bugs, added AMD support.
 *
 * $Date: 2014-06-04 (Wed, 04 June 2014) $
 * $version 1.6.6 	- Merge of pull requests.
 *    				- IE10 touch support
 *    				- Only prevent default event handling on valid swipe
 *    				- Separate license/changelog comment
 *    				- Detect if the swipe is valid at the end of the touch event.
 *    				- Pass fingerdata to event handlers.
 *    				- Add 'hold' gesture
 *    				- Be more tolerant about the tap distance
 *    				- Typos and minor fixes
 *
 * $Date: 2015-22-01 (Thurs, 22 Jan 2015) $
 * $version 1.6.7    - Added patch from https://github.com/mattbryson/TouchSwipe-Jquery-Plugin/issues/206 to fix memory leak
 *
 * $Date: 2015-2-2 (Mon, 2 Feb 2015) $
 * $version 1.6.8    - Added preventDefaultEvents option to proxy events regardless.
 *					- Fixed issue with swipe and pinch not triggering at the same time
 *
 * $Date: 2015-9-6 (Tues, 9 June 2015) $
 * $version 1.6.9    - Added PR from jdalton/hybrid to fix pointer events
 *					- Added scrolling demo
 *					- Added version property to plugin
 *
 * $Date: 2015-1-10 (Wed, 1 October 2015) $
 * $version 1.6.10    - Added PR from beatspace to fix tap events
 * $version 1.6.11    - Added PRs from indri-indri ( Doc tidyup), kkirsche ( Bower tidy up ), UziTech (preventDefaultEvents fixes )
 *					 - Allowed setting multiple options via .swipe("options", options_hash) and more simply .swipe(options_hash) or exisitng instances
 * $version 1.6.12    - Fixed bug with multi finger releases above 2 not triggering events
 *
 * $Date: 2015-12-18 (Fri, 18 December 2015) $
 * $version 1.6.13    - Added PRs
 *                    - Fixed #267 allowPageScroll not working correctly
 * $version 1.6.14    - Fixed #220 / #248 doubletap not firing with swipes, #223 commonJS compatible
 * $version 1.6.15    - More bug fixes
 *
 * $Date: 2016-04-29 (Fri, 29 April 2016) $
 * $version 1.6.16    - Swipes with 0 distance now allow default events to trigger.  So tapping any form elements or A tags will allow default interaction, but swiping will trigger a swipe.
						Removed the a, input, select etc from the excluded Children list as the 0 distance tap solves that issue.
* $Date: 2016-05-19  (Fri, 29 April 2016) $
* $version 1.6.17     - Fixed context issue when calling instance methods via $("selector").swipe("method");
* $version 1.6.18     - now honors fallbackToMouseEvents=false for MS Pointer events when a Mouse is used.

 */

/**
 * See (http://jquery.com/).
 * @name $
 * @class
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See (http://jquery.com/)
 * @name fn
 * @class
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */


(function(factory) {
  if (typeof define === 'function' && define.amd && define.amd.jQuery) {
	// AMD. Register as anonymous module.
	define(['jquery'], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
	// CommonJS Module
	factory(require("jquery"));
  } else {
	// Browser globals.
	factory(jQuery);
  }
}(function($) {
  "use strict";

  //Constants
  var VERSION = "1.6.18",
	LEFT = "left",
	RIGHT = "right",
	UP = "up",
	DOWN = "down",
	IN = "in",
	OUT = "out",

	NONE = "none",
	AUTO = "auto",

	SWIPE = "swipe",
	PINCH = "pinch",
	TAP = "tap",
	DOUBLE_TAP = "doubletap",
	LONG_TAP = "longtap",
	HOLD = "hold",

	HORIZONTAL = "horizontal",
	VERTICAL = "vertical",

	ALL_FINGERS = "all",

	DOUBLE_TAP_THRESHOLD = 10,

	PHASE_START = "start",
	PHASE_MOVE = "move",
	PHASE_END = "end",
	PHASE_CANCEL = "cancel",

	SUPPORTS_TOUCH = 'ontouchstart' in window,

	SUPPORTS_POINTER_IE10 = window.navigator.msPointerEnabled && !window.PointerEvent && !SUPPORTS_TOUCH,

	SUPPORTS_POINTER = (window.PointerEvent || window.navigator.msPointerEnabled) && !SUPPORTS_TOUCH,

	PLUGIN_NS = 'TouchSwipe';



  /**
  * The default configuration, and available options to configure touch swipe with.
  * You can set the default values by updating any of the properties prior to instantiation.
  * @name $.fn.swipe.defaults
  * @namespace
  * @property {int} [fingers=1] The number of fingers to detect in a swipe. Any swipes that do not meet this requirement will NOT trigger swipe handlers.
  * @property {int} [threshold=75] The number of pixels that the user must move their finger by before it is considered a swipe.
  * @property {int} [cancelThreshold=null] The number of pixels that the user must move their finger back from the original swipe direction to cancel the gesture.
  * @property {int} [pinchThreshold=20] The number of pixels that the user must pinch their finger by before it is considered a pinch.
  * @property {int} [maxTimeThreshold=null] Time, in milliseconds, between touchStart and touchEnd must NOT exceed in order to be considered a swipe.
  * @property {int} [fingerReleaseThreshold=250] Time in milliseconds between releasing multiple fingers.  If 2 fingers are down, and are released one after the other, if they are within this threshold, it counts as a simultaneous release.
  * @property {int} [longTapThreshold=500] Time in milliseconds between tap and release for a long tap
  * @property {int} [doubleTapThreshold=200] Time in milliseconds between 2 taps to count as a double tap
  * @property {function} [swipe=null] A handler to catch all swipes. See {@link $.fn.swipe#event:swipe}
  * @property {function} [swipeLeft=null] A handler that is triggered for "left" swipes. See {@link $.fn.swipe#event:swipeLeft}
  * @property {function} [swipeRight=null] A handler that is triggered for "right" swipes. See {@link $.fn.swipe#event:swipeRight}
  * @property {function} [swipeUp=null] A handler that is triggered for "up" swipes. See {@link $.fn.swipe#event:swipeUp}
  * @property {function} [swipeDown=null] A handler that is triggered for "down" swipes. See {@link $.fn.swipe#event:swipeDown}
  * @property {function} [swipeStatus=null] A handler triggered for every phase of the swipe. See {@link $.fn.swipe#event:swipeStatus}
  * @property {function} [pinchIn=null] A handler triggered for pinch in events. See {@link $.fn.swipe#event:pinchIn}
  * @property {function} [pinchOut=null] A handler triggered for pinch out events. See {@link $.fn.swipe#event:pinchOut}
  * @property {function} [pinchStatus=null] A handler triggered for every phase of a pinch. See {@link $.fn.swipe#event:pinchStatus}
  * @property {function} [tap=null] A handler triggered when a user just taps on the item, rather than swipes it. If they do not move, tap is triggered, if they do move, it is not.
  * @property {function} [doubleTap=null] A handler triggered when a user double taps on the item. The delay between taps can be set with the doubleTapThreshold property. See {@link $.fn.swipe.defaults#doubleTapThreshold}
  * @property {function} [longTap=null] A handler triggered when a user long taps on the item. The delay between start and end can be set with the longTapThreshold property. See {@link $.fn.swipe.defaults#longTapThreshold}
  * @property (function) [hold=null] A handler triggered when a user reaches longTapThreshold on the item. See {@link $.fn.swipe.defaults#longTapThreshold}
  * @property {boolean} [triggerOnTouchEnd=true] If true, the swipe events are triggered when the touch end event is received (user releases finger).  If false, it will be triggered on reaching the threshold, and then cancel the touch event automatically.
  * @property {boolean} [triggerOnTouchLeave=false] If true, then when the user leaves the swipe object, the swipe will end and trigger appropriate handlers.
  * @property {string|undefined} [allowPageScroll='auto'] How the browser handles page scrolls when the user is swiping on a touchSwipe object. See {@link $.fn.swipe.pageScroll}.  <br/><br/>
									  <code>"auto"</code> : all undefined swipes will cause the page to scroll in that direction. <br/>
									  <code>"none"</code> : the page will not scroll when user swipes. <br/>
									  <code>"horizontal"</code> : will force page to scroll on horizontal swipes. <br/>
									  <code>"vertical"</code> : will force page to scroll on vertical swipes. <br/>
  * @property {boolean} [fallbackToMouseEvents=true] If true mouse events are used when run on a non touch device, false will stop swipes being triggered by mouse events on non touch devices.
  * @property {string} [excludedElements=".noSwipe"] A jquery selector that specifies child elements that do NOT trigger swipes. By default this excludes elements with the class .noSwipe .
  * @property {boolean} [preventDefaultEvents=true] by default default events are cancelled, so the page doesn't move.  You can disable this so both native events fire as well as your handlers.

  */
  var defaults = {
	fingers: 1,
	threshold: 75,
	cancelThreshold: null,
	pinchThreshold: 20,
	maxTimeThreshold: null,
	fingerReleaseThreshold: 250,
	longTapThreshold: 500,
	doubleTapThreshold: 200,
	swipe: null,
	swipeLeft: null,
	swipeRight: null,
	swipeUp: null,
	swipeDown: null,
	swipeStatus: null,
	pinchIn: null,
	pinchOut: null,
	pinchStatus: null,
	click: null, //Deprecated since 1.6.2
	tap: null,
	doubleTap: null,
	longTap: null,
	hold: null,
	triggerOnTouchEnd: true,
	triggerOnTouchLeave: false,
	allowPageScroll: "auto",
	fallbackToMouseEvents: true,
	excludedElements: ".noSwipe",
	preventDefaultEvents: true
  };



  /**
   * Applies TouchSwipe behaviour to one or more jQuery objects.
   * The TouchSwipe plugin can be instantiated via this method, or methods within
   * TouchSwipe can be executed via this method as per jQuery plugin architecture.
   * An existing plugin can have its options changed simply by re calling .swipe(options)
   * @see TouchSwipe
   * @class
   * @param {Mixed} method If the current DOMNode is a TouchSwipe object, and <code>method</code> is a TouchSwipe method, then
   * the <code>method</code> is executed, and any following arguments are passed to the TouchSwipe method.
   * If <code>method</code> is an object, then the TouchSwipe class is instantiated on the current DOMNode, passing the
   * configuration properties defined in the object. See TouchSwipe
   *
   */
  $.fn.swipe = function(method) {
	var $this = $(this),
	  plugin = $this.data(PLUGIN_NS);

	//Check if we are already instantiated and trying to execute a method
	if (plugin && typeof method === 'string') {
	  if (plugin[method]) {
		return plugin[method].apply(plugin, Array.prototype.slice.call(arguments, 1));
	  } else {
		$.error('Method ' + method + ' does not exist on jQuery.swipe');
	  }
	}

	//Else update existing plugin with new options hash
	else if (plugin && typeof method === 'object') {
	  plugin['option'].apply(plugin, arguments);
	}

	//Else not instantiated and trying to pass init object (or nothing)
	else if (!plugin && (typeof method === 'object' || !method)) {
	  return init.apply(this, arguments);
	}

	return $this;
  };

  /**
   * The version of the plugin
   * @readonly
   */
  $.fn.swipe.version = VERSION;



  //Expose our defaults so a user could override the plugin defaults
  $.fn.swipe.defaults = defaults;

  /**
   * The phases that a touch event goes through.  The <code>phase</code> is passed to the event handlers.
   * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
   * @namespace
   * @readonly
   * @property {string} PHASE_START Constant indicating the start phase of the touch event. Value is <code>"start"</code>.
   * @property {string} PHASE_MOVE Constant indicating the move phase of the touch event. Value is <code>"move"</code>.
   * @property {string} PHASE_END Constant indicating the end phase of the touch event. Value is <code>"end"</code>.
   * @property {string} PHASE_CANCEL Constant indicating the cancel phase of the touch event. Value is <code>"cancel"</code>.
   */
  $.fn.swipe.phases = {
	PHASE_START: PHASE_START,
	PHASE_MOVE: PHASE_MOVE,
	PHASE_END: PHASE_END,
	PHASE_CANCEL: PHASE_CANCEL
  };

  /**
   * The direction constants that are passed to the event handlers.
   * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
   * @namespace
   * @readonly
   * @property {string} LEFT Constant indicating the left direction. Value is <code>"left"</code>.
   * @property {string} RIGHT Constant indicating the right direction. Value is <code>"right"</code>.
   * @property {string} UP Constant indicating the up direction. Value is <code>"up"</code>.
   * @property {string} DOWN Constant indicating the down direction. Value is <code>"cancel"</code>.
   * @property {string} IN Constant indicating the in direction. Value is <code>"in"</code>.
   * @property {string} OUT Constant indicating the out direction. Value is <code>"out"</code>.
   */
  $.fn.swipe.directions = {
	LEFT: LEFT,
	RIGHT: RIGHT,
	UP: UP,
	DOWN: DOWN,
	IN: IN,
	OUT: OUT
  };

  /**
   * The page scroll constants that can be used to set the value of <code>allowPageScroll</code> option
   * These properties are read only
   * @namespace
   * @readonly
   * @see $.fn.swipe.defaults#allowPageScroll
   * @property {string} NONE Constant indicating no page scrolling is allowed. Value is <code>"none"</code>.
   * @property {string} HORIZONTAL Constant indicating horizontal page scrolling is allowed. Value is <code>"horizontal"</code>.
   * @property {string} VERTICAL Constant indicating vertical page scrolling is allowed. Value is <code>"vertical"</code>.
   * @property {string} AUTO Constant indicating either horizontal or vertical will be allowed, depending on the swipe handlers registered. Value is <code>"auto"</code>.
   */
  $.fn.swipe.pageScroll = {
	NONE: NONE,
	HORIZONTAL: HORIZONTAL,
	VERTICAL: VERTICAL,
	AUTO: AUTO
  };

  /**
   * Constants representing the number of fingers used in a swipe.  These are used to set both the value of <code>fingers</code> in the
   * options object, as well as the value of the <code>fingers</code> event property.
   * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
   * @namespace
   * @readonly
   * @see $.fn.swipe.defaults#fingers
   * @property {string} ONE Constant indicating 1 finger is to be detected / was detected. Value is <code>1</code>.
   * @property {string} TWO Constant indicating 2 fingers are to be detected / were detected. Value is <code>2</code>.
   * @property {string} THREE Constant indicating 3 finger are to be detected / were detected. Value is <code>3</code>.
   * @property {string} FOUR Constant indicating 4 finger are to be detected / were detected. Not all devices support this. Value is <code>4</code>.
   * @property {string} FIVE Constant indicating 5 finger are to be detected / were detected. Not all devices support this. Value is <code>5</code>.
   * @property {string} ALL Constant indicating any combination of finger are to be detected.  Value is <code>"all"</code>.
   */
  $.fn.swipe.fingers = {
	ONE: 1,
	TWO: 2,
	THREE: 3,
	FOUR: 4,
	FIVE: 5,
	ALL: ALL_FINGERS
  };

  /**
   * Initialise the plugin for each DOM element matched
   * This creates a new instance of the main TouchSwipe class for each DOM element, and then
   * saves a reference to that instance in the elements data property.
   * @internal
   */
  function init(options) {
	//Prep and extend the options
	if (options && (options.allowPageScroll === undefined && (options.swipe !== undefined || options.swipeStatus !== undefined))) {
	  options.allowPageScroll = NONE;
	}

	//Check for deprecated options
	//Ensure that any old click handlers are assigned to the new tap, unless we have a tap
	if (options.click !== undefined && options.tap === undefined) {
	  options.tap = options.click;
	}

	if (!options) {
	  options = {};
	}

	//pass empty object so we dont modify the defaults
	options = $.extend({}, $.fn.swipe.defaults, options);

	//For each element instantiate the plugin
	return this.each(function() {
	  var $this = $(this);

	  //Check we havent already initialised the plugin
	  var plugin = $this.data(PLUGIN_NS);

	  if (!plugin) {
		plugin = new TouchSwipe(this, options);
		$this.data(PLUGIN_NS, plugin);
	  }
	});
  }

  /**
   * Main TouchSwipe Plugin Class.
   * Do not use this to construct your TouchSwipe object, use the jQuery plugin method $.fn.swipe(); {@link $.fn.swipe}
   * @private
   * @name TouchSwipe
   * @param {DOMNode} element The HTML DOM object to apply to plugin to
   * @param {Object} options The options to configure the plugin with.  @link {$.fn.swipe.defaults}
   * @see $.fh.swipe.defaults
   * @see $.fh.swipe
   * @class
   */
  function TouchSwipe(element, options) {

	//take a local/instacne level copy of the options - should make it this.options really...
	var options = $.extend({}, options);

	var useTouchEvents = (SUPPORTS_TOUCH || SUPPORTS_POINTER || !options.fallbackToMouseEvents),
	  START_EV = useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerDown' : 'pointerdown') : 'touchstart') : 'mousedown',
	  MOVE_EV = useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerMove' : 'pointermove') : 'touchmove') : 'mousemove',
	  END_EV = useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerUp' : 'pointerup') : 'touchend') : 'mouseup',
	  LEAVE_EV = useTouchEvents ? (SUPPORTS_POINTER ? 'mouseleave' : null) : 'mouseleave', //we manually detect leave on touch devices, so null event here
	  CANCEL_EV = (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerCancel' : 'pointercancel') : 'touchcancel');



	//touch properties
	var distance = 0,
	  direction = null,
	  currentDirection = null,
	  duration = 0,
	  startTouchesDistance = 0,
	  endTouchesDistance = 0,
	  pinchZoom = 1,
	  pinchDistance = 0,
	  pinchDirection = 0,
	  maximumsMap = null;



	//jQuery wrapped element for this instance
	var $element = $(element);

	//Current phase of th touch cycle
	var phase = "start";

	// the current number of fingers being used.
	var fingerCount = 0;

	//track mouse points / delta
	var fingerData = {};

	//track times
	var startTime = 0,
	  endTime = 0,
	  previousTouchEndTime = 0,
	  fingerCountAtRelease = 0,
	  doubleTapStartTime = 0;

	//Timeouts
	var singleTapTimeout = null,
	  holdTimeout = null;

	// Add gestures to all swipable areas if supported
	try {
	  $element.on(START_EV, touchStart);
	  $element.on(CANCEL_EV, touchCancel);
	} catch (e) {
	  $.error('events not supported ' + START_EV + ',' + CANCEL_EV + ' on jQuery.swipe');
	}

	//
	//Public methods
	//

	/**
	 * re-enables the swipe plugin with the previous configuration
	 * @function
	 * @name $.fn.swipe#enable
	 * @return {DOMNode} The Dom element that was registered with TouchSwipe
	 * @example $("#element").swipe("enable");
	 */
	this.enable = function() {
	  //Incase we are already enabled, clean up...
	  this.disable();
	  $element.on(START_EV, touchStart);
	  $element.on(CANCEL_EV, touchCancel);
	  return $element;
	};

	/**
	 * disables the swipe plugin
	 * @function
	 * @name $.fn.swipe#disable
	 * @return {DOMNode} The Dom element that is now registered with TouchSwipe
	 * @example $("#element").swipe("disable");
	 */
	this.disable = function() {
	  removeListeners();
	  return $element;
	};

	/**
	 * Destroy the swipe plugin completely. To use any swipe methods, you must re initialise the plugin.
	 * @function
	 * @name $.fn.swipe#destroy
	 * @example $("#element").swipe("destroy");
	 */
	this.destroy = function() {
	  removeListeners();
	  $element.data(PLUGIN_NS, null);
	  $element = null;
	};


	/**
	 * Allows run time updating of the swipe configuration options.
	 * @function
	 * @name $.fn.swipe#option
	 * @param {String} property The option property to get or set, or a has of multiple options to set
	 * @param {Object} [value] The value to set the property to
	 * @return {Object} If only a property name is passed, then that property value is returned. If nothing is passed the current options hash is returned.
	 * @example $("#element").swipe("option", "threshold"); // return the threshold
	 * @example $("#element").swipe("option", "threshold", 100); // set the threshold after init
	 * @example $("#element").swipe("option", {threshold:100, fingers:3} ); // set multiple properties after init
	 * @example $("#element").swipe({threshold:100, fingers:3} ); // set multiple properties after init - the "option" method is optional!
	 * @example $("#element").swipe("option"); // Return the current options hash
	 * @see $.fn.swipe.defaults
	 *
	 */
	this.option = function(property, value) {

	  if (typeof property === 'object') {
		options = $.extend(options, property);
	  } else if (options[property] !== undefined) {
		if (value === undefined) {
		  return options[property];
		} else {
		  options[property] = value;
		}
	  } else if (!property) {
		return options;
	  } else {
		$.error('Option ' + property + ' does not exist on jQuery.swipe.options');
	  }

	  return null;
	}



	//
	// Private methods
	//

	//
	// EVENTS
	//
	/**
	 * Event handler for a touch start event.
	 * Stops the default click event from triggering and stores where we touched
	 * @inner
	 * @param {object} jqEvent The normalised jQuery event object.
	 */
	function touchStart(jqEvent) {

	  //If we already in a touch event (a finger already in use) then ignore subsequent ones..
	  if (getTouchInProgress()) {
		return;
	  }

	  //Check if this element matches any in the excluded elements selectors,  or its parent is excluded, if so, DON'T swipe
	  if ($(jqEvent.target).closest(options.excludedElements, $element).length > 0) {
		return;
	  }

	  //As we use Jquery bind for events, we need to target the original event object
	  //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
	  var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;


	  //If we have a pointer event, whoes type is 'mouse' and we have said NO mouse events, then dont do anything.
	  if(event.pointerType && event.pointerType=="mouse" && options.fallbackToMouseEvents==false) {
		return;
	  };

	  var ret,
		touches = event.touches,
		evt = touches ? touches[0] : event;

	  phase = PHASE_START;

	  //If we support touches, get the finger count
	  if (touches) {
		// get the total number of fingers touching the screen
		fingerCount = touches.length;
	  }
	  //Else this is the desktop, so stop the browser from dragging content
	  else if (options.preventDefaultEvents !== false) {
		jqEvent.preventDefault(); //call this on jq event so we are cross browser
	  }

	  //clear vars..
	  distance = 0;
	  direction = null;
	  currentDirection=null;
	  pinchDirection = null;
	  duration = 0;
	  startTouchesDistance = 0;
	  endTouchesDistance = 0;
	  pinchZoom = 1;
	  pinchDistance = 0;
	  maximumsMap = createMaximumsData();
	  cancelMultiFingerRelease();

	  //Create the default finger data
	  createFingerData(0, evt);

	  // check the number of fingers is what we are looking for, or we are capturing pinches
	  if (!touches || (fingerCount === options.fingers || options.fingers === ALL_FINGERS) || hasPinches()) {
		// get the coordinates of the touch
		startTime = getTimeStamp();

		if (fingerCount == 2) {
		  //Keep track of the initial pinch distance, so we can calculate the diff later
		  //Store second finger data as start
		  createFingerData(1, touches[1]);
		  startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
		}

		if (options.swipeStatus || options.pinchStatus) {
		  ret = triggerHandler(event, phase);
		}
	  } else {
		//A touch with more or less than the fingers we are looking for, so cancel
		ret = false;
	  }

	  //If we have a return value from the users handler, then return and cancel
	  if (ret === false) {
		phase = PHASE_CANCEL;
		triggerHandler(event, phase);
		return ret;
	  } else {
		if (options.hold) {
		  holdTimeout = setTimeout($.proxy(function() {
			//Trigger the event
			$element.trigger('hold', [event.target]);
			//Fire the callback
			if (options.hold) {
			  ret = options.hold.call($element, event, event.target);
			}
		  }, this), options.longTapThreshold);
		}

		setTouchInProgress(true);
	  }

	  return null;
	};



	/**
	 * Event handler for a touch move event.
	 * If we change fingers during move, then cancel the event
	 * @inner
	 * @param {object} jqEvent The normalised jQuery event object.
	 */
	function touchMove(jqEvent) {

	  //As we use Jquery bind for events, we need to target the original event object
	  //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
	  var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;

	  //If we are ending, cancelling, or within the threshold of 2 fingers being released, don't track anything..
	  if (phase === PHASE_END || phase === PHASE_CANCEL || inMultiFingerRelease())
		return;

	  var ret,
		touches = event.touches,
		evt = touches ? touches[0] : event;


	  //Update the  finger data
	  var currentFinger = updateFingerData(evt);
	  endTime = getTimeStamp();

	  if (touches) {
		fingerCount = touches.length;
	  }

	  if (options.hold) {
		clearTimeout(holdTimeout);
	  }

	  phase = PHASE_MOVE;

	  //If we have 2 fingers get Touches distance as well
	  if (fingerCount == 2) {

		//Keep track of the initial pinch distance, so we can calculate the diff later
		//We do this here as well as the start event, in case they start with 1 finger, and the press 2 fingers
		if (startTouchesDistance == 0) {
		  //Create second finger if this is the first time...
		  createFingerData(1, touches[1]);

		  startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
		} else {
		  //Else just update the second finger
		  updateFingerData(touches[1]);

		  endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end);
		  pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end);
		}

		pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance);
		pinchDistance = Math.abs(startTouchesDistance - endTouchesDistance);
	  }

	  if ((fingerCount === options.fingers || options.fingers === ALL_FINGERS) || !touches || hasPinches()) {

		//The overall direction of the swipe. From start to now.
		direction = calculateDirection(currentFinger.start, currentFinger.end);

		//The immediate direction of the swipe, direction between the last movement and this one.
		currentDirection = calculateDirection(currentFinger.last, currentFinger.end);

		//Check if we need to prevent default event (page scroll / pinch zoom) or not
		validateDefaultEvent(jqEvent, currentDirection);

		//Distance and duration are all off the main finger
		distance = calculateDistance(currentFinger.start, currentFinger.end);
		duration = calculateDuration();

		//Cache the maximum distance we made in this direction
		setMaxDistance(direction, distance);

		//Trigger status handler
		ret = triggerHandler(event, phase);


		//If we trigger end events when threshold are met, or trigger events when touch leaves element
		if (!options.triggerOnTouchEnd || options.triggerOnTouchLeave) {

		  var inBounds = true;

		  //If checking if we leave the element, run the bounds check (we can use touchleave as its not supported on webkit)
		  if (options.triggerOnTouchLeave) {
			var bounds = getbounds(this);
			inBounds = isInBounds(currentFinger.end, bounds);
		  }

		  //Trigger end handles as we swipe if thresholds met or if we have left the element if the user has asked to check these..
		  if (!options.triggerOnTouchEnd && inBounds) {
			phase = getNextPhase(PHASE_MOVE);
		  }
		  //We end if out of bounds here, so set current phase to END, and check if its modified
		  else if (options.triggerOnTouchLeave && !inBounds) {
			phase = getNextPhase(PHASE_END);
		  }

		  if (phase == PHASE_CANCEL || phase == PHASE_END) {
			triggerHandler(event, phase);
		  }
		}
	  } else {
		phase = PHASE_CANCEL;
		triggerHandler(event, phase);
	  }

	  if (ret === false) {
		phase = PHASE_CANCEL;
		triggerHandler(event, phase);
	  }
	}




	/**
	 * Event handler for a touch end event.
	 * Calculate the direction and trigger events
	 * @inner
	 * @param {object} jqEvent The normalised jQuery event object.
	 */
	function touchEnd(jqEvent) {
	  //As we use Jquery bind for events, we need to target the original event object
	  //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
	  var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent,
		touches = event.touches;

	  //If we are still in a touch with the device wait a fraction and see if the other finger comes up
	  //if it does within the threshold, then we treat it as a multi release, not a single release and end the touch / swipe
	  if (touches) {
		if (touches.length && !inMultiFingerRelease()) {
		  startMultiFingerRelease(event);
		  return true;
		} else if (touches.length && inMultiFingerRelease()) {
		  return true;
		}
	  }

	  //If a previous finger has been released, check how long ago, if within the threshold, then assume it was a multifinger release.
	  //This is used to allow 2 fingers to release fractionally after each other, whilst maintaining the event as containing 2 fingers, not 1
	  if (inMultiFingerRelease()) {
		fingerCount = fingerCountAtRelease;
	  }

	  //Set end of swipe
	  endTime = getTimeStamp();

	  //Get duration incase move was never fired
	  duration = calculateDuration();

	  //If we trigger handlers at end of swipe OR, we trigger during, but they didnt trigger and we are still in the move phase
	  if (didSwipeBackToCancel() || !validateSwipeDistance()) {
		phase = PHASE_CANCEL;
		triggerHandler(event, phase);
	  } else if (options.triggerOnTouchEnd || (options.triggerOnTouchEnd === false && phase === PHASE_MOVE)) {
		//call this on jq event so we are cross browser
		if (options.preventDefaultEvents !== false && jqEvent.cancelable !== false) {
		  jqEvent.preventDefault();
		}
		phase = PHASE_END;
		triggerHandler(event, phase);
	  }
	  //Special cases - A tap should always fire on touch end regardless,
	  //So here we manually trigger the tap end handler by itself
	  //We dont run trigger handler as it will re-trigger events that may have fired already
	  else if (!options.triggerOnTouchEnd && hasTap()) {
		//Trigger the pinch events...
		phase = PHASE_END;
		triggerHandlerForGesture(event, phase, TAP);
	  } else if (phase === PHASE_MOVE) {
		phase = PHASE_CANCEL;
		triggerHandler(event, phase);
	  }

	  setTouchInProgress(false);

	  return null;
	}



	/**
	 * Event handler for a touch cancel event.
	 * Clears current vars
	 * @inner
	 */
	function touchCancel() {
	  // reset the variables back to default values
	  fingerCount = 0;
	  endTime = 0;
	  startTime = 0;
	  startTouchesDistance = 0;
	  endTouchesDistance = 0;
	  pinchZoom = 1;

	  //If we were in progress of tracking a possible multi touch end, then re set it.
	  cancelMultiFingerRelease();

	  setTouchInProgress(false);
	}


	/**
	 * Event handler for a touch leave event.
	 * This is only triggered on desktops, in touch we work this out manually
	 * as the touchleave event is not supported in webkit
	 * @inner
	 */
	function touchLeave(jqEvent) {
	  //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
	  var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;

	  //If we have the trigger on leave property set....
	  if (options.triggerOnTouchLeave) {
		phase = getNextPhase(PHASE_END);
		triggerHandler(event, phase);
	  }
	}

	/**
	 * Removes all listeners that were associated with the plugin
	 * @inner
	 */
	function removeListeners() {
	  $element.off(START_EV, touchStart);
	  $element.off(CANCEL_EV, touchCancel);
	  $element.off(MOVE_EV, touchMove);
	  $element.off(END_EV, touchEnd);

	  //we only have leave events on desktop, we manually calculate leave on touch as its not supported in webkit
	  if (LEAVE_EV) {
		$element.off(LEAVE_EV, touchLeave);
	  }

	  setTouchInProgress(false);
	}


	/**
	 * Checks if the time and distance thresholds have been met, and if so then the appropriate handlers are fired.
	 */
	function getNextPhase(currentPhase) {

	  var nextPhase = currentPhase;

	  // Ensure we have valid swipe (under time and over distance  and check if we are out of bound...)
	  var validTime = validateSwipeTime();
	  var validDistance = validateSwipeDistance();
	  var didCancel = didSwipeBackToCancel();

	  //If we have exceeded our time, then cancel
	  if (!validTime || didCancel) {
		nextPhase = PHASE_CANCEL;
	  }
	  //Else if we are moving, and have reached distance then end
	  else if (validDistance && currentPhase == PHASE_MOVE && (!options.triggerOnTouchEnd || options.triggerOnTouchLeave)) {
		nextPhase = PHASE_END;
	  }
	  //Else if we have ended by leaving and didn't reach distance, then cancel
	  else if (!validDistance && currentPhase == PHASE_END && options.triggerOnTouchLeave) {
		nextPhase = PHASE_CANCEL;
	  }

	  return nextPhase;
	}


	/**
	 * Trigger the relevant event handler
	 * The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
	 * @param {object} event the original event object
	 * @param {string} phase the phase of the swipe (start, end cancel etc) {@link $.fn.swipe.phases}
	 * @inner
	 */
	function triggerHandler(event, phase) {



	  var ret,
		touches = event.touches;

	  // SWIPE GESTURES
	  if (didSwipe() || hasSwipes()) {
		  ret = triggerHandlerForGesture(event, phase, SWIPE);
	  }

	  // PINCH GESTURES (if the above didn't cancel)
	  if ((didPinch() || hasPinches()) && ret !== false) {
		  ret = triggerHandlerForGesture(event, phase, PINCH);
	  }

	  // CLICK / TAP (if the above didn't cancel)
	  if (didDoubleTap() && ret !== false) {
		//Trigger the tap events...
		ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP);
	  }

	  // CLICK / TAP (if the above didn't cancel)
	  else if (didLongTap() && ret !== false) {
		//Trigger the tap events...
		ret = triggerHandlerForGesture(event, phase, LONG_TAP);
	  }

	  // CLICK / TAP (if the above didn't cancel)
	  else if (didTap() && ret !== false) {
		//Trigger the tap event..
		ret = triggerHandlerForGesture(event, phase, TAP);
	  }



	  // If we are cancelling the gesture, then manually trigger the reset handler
	  if (phase === PHASE_CANCEL) {

		touchCancel(event);
	  }




	  // If we are ending the gesture, then manually trigger the reset handler IF all fingers are off
	  if (phase === PHASE_END) {
		//If we support touch, then check that all fingers are off before we cancel
		if (touches) {
		  if (!touches.length) {
			touchCancel(event);
		  }
		} else {
		  touchCancel(event);
		}
	  }

	  return ret;
	}



	/**
	 * Trigger the relevant event handler
	 * The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
	 * @param {object} event the original event object
	 * @param {string} phase the phase of the swipe (start, end cancel etc) {@link $.fn.swipe.phases}
	 * @param {string} gesture the gesture to trigger a handler for : PINCH or SWIPE {@link $.fn.swipe.gestures}
	 * @return Boolean False, to indicate that the event should stop propagation, or void.
	 * @inner
	 */
	function triggerHandlerForGesture(event, phase, gesture) {

	  var ret;

	  //SWIPES....
	  if (gesture == SWIPE) {
		//Trigger status every time..
		$element.trigger('swipeStatus', [phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection]);

		if (options.swipeStatus) {
		  ret = options.swipeStatus.call($element, event, phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection);
		  //If the status cancels, then dont run the subsequent event handlers..
		  if (ret === false) return false;
		}

		if (phase == PHASE_END && validateSwipe()) {

		  //Cancel any taps that were in progress...
		  clearTimeout(singleTapTimeout);
		  clearTimeout(holdTimeout);

		  $element.trigger('swipe', [direction, distance, duration, fingerCount, fingerData, currentDirection]);

		  if (options.swipe) {
			ret = options.swipe.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection);
			//If the status cancels, then dont run the subsequent event handlers..
			if (ret === false) return false;
		  }

		  //trigger direction specific event handlers
		  switch (direction) {
			case LEFT:
			  $element.trigger('swipeLeft', [direction, distance, duration, fingerCount, fingerData, currentDirection]);

			  if (options.swipeLeft) {
				ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection);
			  }
			  break;

			case RIGHT:
			  $element.trigger('swipeRight', [direction, distance, duration, fingerCount, fingerData, currentDirection]);

			  if (options.swipeRight) {
				ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection);
			  }
			  break;

			case UP:
			  $element.trigger('swipeUp', [direction, distance, duration, fingerCount, fingerData, currentDirection]);

			  if (options.swipeUp) {
				ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection);
			  }
			  break;

			case DOWN:
			  $element.trigger('swipeDown', [direction, distance, duration, fingerCount, fingerData, currentDirection]);

			  if (options.swipeDown) {
				ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection);
			  }
			  break;
		  }
		}
	  }


	  //PINCHES....
	  if (gesture == PINCH) {
		$element.trigger('pinchStatus', [phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]);

		if (options.pinchStatus) {
		  ret = options.pinchStatus.call($element, event, phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData);
		  //If the status cancels, then dont run the subsequent event handlers..
		  if (ret === false) return false;
		}

		if (phase == PHASE_END && validatePinch()) {

		  switch (pinchDirection) {
			case IN:
			  $element.trigger('pinchIn', [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]);

			  if (options.pinchIn) {
				ret = options.pinchIn.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData);
			  }
			  break;

			case OUT:
			  $element.trigger('pinchOut', [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]);

			  if (options.pinchOut) {
				ret = options.pinchOut.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData);
			  }
			  break;
		  }
		}
	  }

	  if (gesture == TAP) {
		if (phase === PHASE_CANCEL || phase === PHASE_END) {

		  clearTimeout(singleTapTimeout);
		  clearTimeout(holdTimeout);

		  //If we are also looking for doubelTaps, wait incase this is one...
		  if (hasDoubleTap() && !inDoubleTap()) {
			doubleTapStartTime = getTimeStamp();

			//Now wait for the double tap timeout, and trigger this single tap
			//if its not cancelled by a double tap
			singleTapTimeout = setTimeout($.proxy(function() {
			  doubleTapStartTime = null;
			  $element.trigger('tap', [event.target]);

			  if (options.tap) {
				ret = options.tap.call($element, event, event.target);
			  }
			}, this), options.doubleTapThreshold);

		  } else {
			doubleTapStartTime = null;
			$element.trigger('tap', [event.target]);
			if (options.tap) {
			  ret = options.tap.call($element, event, event.target);
			}
		  }
		}
	  } else if (gesture == DOUBLE_TAP) {
		if (phase === PHASE_CANCEL || phase === PHASE_END) {
		  clearTimeout(singleTapTimeout);
		  clearTimeout(holdTimeout);
		  doubleTapStartTime = null;
		  $element.trigger('doubletap', [event.target]);

		  if (options.doubleTap) {
			ret = options.doubleTap.call($element, event, event.target);
		  }
		}
	  } else if (gesture == LONG_TAP) {
		if (phase === PHASE_CANCEL || phase === PHASE_END) {
		  clearTimeout(singleTapTimeout);
		  doubleTapStartTime = null;

		  $element.trigger('longtap', [event.target]);
		  if (options.longTap) {
			ret = options.longTap.call($element, event, event.target);
		  }
		}
	  }

	  return ret;
	}


	//
	// GESTURE VALIDATION
	//

	/**
	 * Checks the user has swipe far enough
	 * @return Boolean if <code>threshold</code> has been set, return true if the threshold was met, else false.
	 * If no threshold was set, then we return true.
	 * @inner
	 */
	function validateSwipeDistance() {
	  var valid = true;
	  //If we made it past the min swipe distance..
	  if (options.threshold !== null) {
		valid = distance >= options.threshold;
	  }

	  return valid;
	}

	/**
	 * Checks the user has swiped back to cancel.
	 * @return Boolean if <code>cancelThreshold</code> has been set, return true if the cancelThreshold was met, else false.
	 * If no cancelThreshold was set, then we return true.
	 * @inner
	 */
	function didSwipeBackToCancel() {
	  var cancelled = false;
	  if (options.cancelThreshold !== null && direction !== null) {
		cancelled = (getMaxDistance(direction) - distance) >= options.cancelThreshold;
	  }

	  return cancelled;
	}

	/**
	 * Checks the user has pinched far enough
	 * @return Boolean if <code>pinchThreshold</code> has been set, return true if the threshold was met, else false.
	 * If no threshold was set, then we return true.
	 * @inner
	 */
	function validatePinchDistance() {
	  if (options.pinchThreshold !== null) {
		return pinchDistance >= options.pinchThreshold;
	  }
	  return true;
	}

	/**
	 * Checks that the time taken to swipe meets the minimum / maximum requirements
	 * @return Boolean
	 * @inner
	 */
	function validateSwipeTime() {
	  var result;
	  //If no time set, then return true
	  if (options.maxTimeThreshold) {
		if (duration >= options.maxTimeThreshold) {
		  result = false;
		} else {
		  result = true;
		}
	  } else {
		result = true;
	  }

	  return result;
	}


	/**
	 * Checks direction of the swipe and the value allowPageScroll to see if we should allow or prevent the default behaviour from occurring.
	 * This will essentially allow page scrolling or not when the user is swiping on a touchSwipe object.
	 * @param {object} jqEvent The normalised jQuery representation of the event object.
	 * @param {string} direction The direction of the event. See {@link $.fn.swipe.directions}
	 * @see $.fn.swipe.directions
	 * @inner
	 */
	function validateDefaultEvent(jqEvent, direction) {

	  //If the option is set, allways allow the event to bubble up (let user handle weirdness)
	  if (options.preventDefaultEvents === false) {
		return;
	  }

	  if (options.allowPageScroll === NONE) {
		jqEvent.preventDefault();
	  } else {
		var auto = options.allowPageScroll === AUTO;

		switch (direction) {
		  case LEFT:
			if ((options.swipeLeft && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
			  jqEvent.preventDefault();
			}
			break;

		  case RIGHT:
			if ((options.swipeRight && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
			  jqEvent.preventDefault();
			}
			break;

		  case UP:
			if ((options.swipeUp && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
			  jqEvent.preventDefault();
			}
			break;

		  case DOWN:
			if ((options.swipeDown && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
			  jqEvent.preventDefault();
			}
			break;

		  case NONE:

			break;
		}
	  }
	}


	// PINCHES
	/**
	 * Returns true of the current pinch meets the thresholds
	 * @return Boolean
	 * @inner
	 */
	function validatePinch() {
	  var hasCorrectFingerCount = validateFingers();
	  var hasEndPoint = validateEndPoint();
	  var hasCorrectDistance = validatePinchDistance();
	  return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;

	}

	/**
	 * Returns true if any Pinch events have been registered
	 * @return Boolean
	 * @inner
	 */
	function hasPinches() {
	  //Enure we dont return 0 or null for false values
	  return !!(options.pinchStatus || options.pinchIn || options.pinchOut);
	}

	/**
	 * Returns true if we are detecting pinches, and have one
	 * @return Boolean
	 * @inner
	 */
	function didPinch() {
	  //Enure we dont return 0 or null for false values
	  return !!(validatePinch() && hasPinches());
	}




	// SWIPES
	/**
	 * Returns true if the current swipe meets the thresholds
	 * @return Boolean
	 * @inner
	 */
	function validateSwipe() {
	  //Check validity of swipe
	  var hasValidTime = validateSwipeTime();
	  var hasValidDistance = validateSwipeDistance();
	  var hasCorrectFingerCount = validateFingers();
	  var hasEndPoint = validateEndPoint();
	  var didCancel = didSwipeBackToCancel();

	  // if the user swiped more than the minimum length, perform the appropriate action
	  // hasValidDistance is null when no distance is set
	  var valid = !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;

	  return valid;
	}

	/**
	 * Returns true if any Swipe events have been registered
	 * @return Boolean
	 * @inner
	 */
	function hasSwipes() {
	  //Enure we dont return 0 or null for false values
	  return !!(options.swipe || options.swipeStatus || options.swipeLeft || options.swipeRight || options.swipeUp || options.swipeDown);
	}


	/**
	 * Returns true if we are detecting swipes and have one
	 * @return Boolean
	 * @inner
	 */
	function didSwipe() {
	  //Enure we dont return 0 or null for false values
	  return !!(validateSwipe() && hasSwipes());
	}

	/**
	 * Returns true if we have matched the number of fingers we are looking for
	 * @return Boolean
	 * @inner
	 */
	function validateFingers() {
	  //The number of fingers we want were matched, or on desktop we ignore
	  return ((fingerCount === options.fingers || options.fingers === ALL_FINGERS) || !SUPPORTS_TOUCH);
	}

	/**
	 * Returns true if we have an end point for the swipe
	 * @return Boolean
	 * @inner
	 */
	function validateEndPoint() {
	  //We have an end value for the finger
	  return fingerData[0].end.x !== 0;
	}

	// TAP / CLICK
	/**
	 * Returns true if a click / tap events have been registered
	 * @return Boolean
	 * @inner
	 */
	function hasTap() {
	  //Enure we dont return 0 or null for false values
	  return !!(options.tap);
	}

	/**
	 * Returns true if a double tap events have been registered
	 * @return Boolean
	 * @inner
	 */
	function hasDoubleTap() {
	  //Enure we dont return 0 or null for false values
	  return !!(options.doubleTap);
	}

	/**
	 * Returns true if any long tap events have been registered
	 * @return Boolean
	 * @inner
	 */
	function hasLongTap() {
	  //Enure we dont return 0 or null for false values
	  return !!(options.longTap);
	}

	/**
	 * Returns true if we could be in the process of a double tap (one tap has occurred, we are listening for double taps, and the threshold hasn't past.
	 * @return Boolean
	 * @inner
	 */
	function validateDoubleTap() {
	  if (doubleTapStartTime == null) {
		return false;
	  }
	  var now = getTimeStamp();
	  return (hasDoubleTap() && ((now - doubleTapStartTime) <= options.doubleTapThreshold));
	}

	/**
	 * Returns true if we could be in the process of a double tap (one tap has occurred, we are listening for double taps, and the threshold hasn't past.
	 * @return Boolean
	 * @inner
	 */
	function inDoubleTap() {
	  return validateDoubleTap();
	}


	/**
	 * Returns true if we have a valid tap
	 * @return Boolean
	 * @inner
	 */
	function validateTap() {
	  return ((fingerCount === 1 || !SUPPORTS_TOUCH) && (isNaN(distance) || distance < options.threshold));
	}

	/**
	 * Returns true if we have a valid long tap
	 * @return Boolean
	 * @inner
	 */
	function validateLongTap() {
	  //slight threshold on moving finger
	  return ((duration > options.longTapThreshold) && (distance < DOUBLE_TAP_THRESHOLD));
	}

	/**
	 * Returns true if we are detecting taps and have one
	 * @return Boolean
	 * @inner
	 */
	function didTap() {
	  //Enure we dont return 0 or null for false values
	  return !!(validateTap() && hasTap());
	}


	/**
	 * Returns true if we are detecting double taps and have one
	 * @return Boolean
	 * @inner
	 */
	function didDoubleTap() {
	  //Enure we dont return 0 or null for false values
	  return !!(validateDoubleTap() && hasDoubleTap());
	}

	/**
	 * Returns true if we are detecting long taps and have one
	 * @return Boolean
	 * @inner
	 */
	function didLongTap() {
	  //Enure we dont return 0 or null for false values
	  return !!(validateLongTap() && hasLongTap());
	}




	// MULTI FINGER TOUCH
	/**
	 * Starts tracking the time between 2 finger releases, and keeps track of how many fingers we initially had up
	 * @inner
	 */
	function startMultiFingerRelease(event) {
	  previousTouchEndTime = getTimeStamp();
	  fingerCountAtRelease = event.touches.length + 1;
	}

	/**
	 * Cancels the tracking of time between 2 finger releases, and resets counters
	 * @inner
	 */
	function cancelMultiFingerRelease() {
	  previousTouchEndTime = 0;
	  fingerCountAtRelease = 0;
	}

	/**
	 * Checks if we are in the threshold between 2 fingers being released
	 * @return Boolean
	 * @inner
	 */
	function inMultiFingerRelease() {

	  var withinThreshold = false;

	  if (previousTouchEndTime) {
		var diff = getTimeStamp() - previousTouchEndTime
		if (diff <= options.fingerReleaseThreshold) {
		  withinThreshold = true;
		}
	  }

	  return withinThreshold;
	}


	/**
	 * gets a data flag to indicate that a touch is in progress
	 * @return Boolean
	 * @inner
	 */
	function getTouchInProgress() {
	  //strict equality to ensure only true and false are returned
	  return !!($element.data(PLUGIN_NS + '_intouch') === true);
	}

	/**
	 * Sets a data flag to indicate that a touch is in progress
	 * @param {boolean} val The value to set the property to
	 * @inner
	 */
	function setTouchInProgress(val) {

	  //If destroy is called in an event handler, we have no el, and we have already cleaned up, so return.
	  if(!$element) { return; }

	  //Add or remove event listeners depending on touch status
	  if (val === true) {
		$element.on(MOVE_EV, touchMove);
		$element.on(END_EV, touchEnd);

		//we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
		if (LEAVE_EV) {
		  $element.on(LEAVE_EV, touchLeave);
		}
	  } else {

		$element.off(MOVE_EV, touchMove, false);
		$element.off(END_EV, touchEnd, false);

		//we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
		if (LEAVE_EV) {
		  $element.off(LEAVE_EV, touchLeave, false);
		}
	  }


	  //strict equality to ensure only true and false can update the value
	  $element.data(PLUGIN_NS + '_intouch', val === true);
	}


	/**
	 * Creates the finger data for the touch/finger in the event object.
	 * @param {int} id The id to store the finger data under (usually the order the fingers were pressed)
	 * @param {object} evt The event object containing finger data
	 * @return finger data object
	 * @inner
	 */
	function createFingerData(id, evt) {
	  var f = {
		start: {
		  x: 0,
		  y: 0
		},
		last: {
		  x: 0,
		  y: 0
		},
		end: {
		  x: 0,
		  y: 0
		}
	  };
	  f.start.x = f.last.x = f.end.x = evt.pageX || evt.clientX;
	  f.start.y = f.last.y = f.end.y = evt.pageY || evt.clientY;
	  fingerData[id] = f;
	  return f;
	}

	/**
	 * Updates the finger data for a particular event object
	 * @param {object} evt The event object containing the touch/finger data to upadte
	 * @return a finger data object.
	 * @inner
	 */
	function updateFingerData(evt) {
	  var id = evt.identifier !== undefined ? evt.identifier : 0;
	  var f = getFingerData(id);

	  if (f === null) {
		f = createFingerData(id, evt);
	  }

	  f.last.x = f.end.x;
	  f.last.y = f.end.y;

	  f.end.x = evt.pageX || evt.clientX;
	  f.end.y = evt.pageY || evt.clientY;

	  return f;
	}

	/**
	 * Returns a finger data object by its event ID.
	 * Each touch event has an identifier property, which is used
	 * to track repeat touches
	 * @param {int} id The unique id of the finger in the sequence of touch events.
	 * @return a finger data object.
	 * @inner
	 */
	function getFingerData(id) {
	  return fingerData[id] || null;
	}


	/**
	 * Sets the maximum distance swiped in the given direction.
	 * If the new value is lower than the current value, the max value is not changed.
	 * @param {string}  direction The direction of the swipe
	 * @param {int}  distance The distance of the swipe
	 * @inner
	 */
	function setMaxDistance(direction, distance) {
	  if(direction==NONE) return;
	  distance = Math.max(distance, getMaxDistance(direction));
	  maximumsMap[direction].distance = distance;
	}

	/**
	 * gets the maximum distance swiped in the given direction.
	 * @param {string}  direction The direction of the swipe
	 * @return int  The distance of the swipe
	 * @inner
	 */
	function getMaxDistance(direction) {
	  if (maximumsMap[direction]) return maximumsMap[direction].distance;
	  return undefined;
	}

	/**
	 * Creats a map of directions to maximum swiped values.
	 * @return Object A dictionary of maximum values, indexed by direction.
	 * @inner
	 */
	function createMaximumsData() {
	  var maxData = {};
	  maxData[LEFT] = createMaximumVO(LEFT);
	  maxData[RIGHT] = createMaximumVO(RIGHT);
	  maxData[UP] = createMaximumVO(UP);
	  maxData[DOWN] = createMaximumVO(DOWN);

	  return maxData;
	}

	/**
	 * Creates a map maximum swiped values for a given swipe direction
	 * @param {string} The direction that these values will be associated with
	 * @return Object Maximum values
	 * @inner
	 */
	function createMaximumVO(dir) {
	  return {
		direction: dir,
		distance: 0
	  }
	}


	//
	// MATHS / UTILS
	//

	/**
	 * Calculate the duration of the swipe
	 * @return int
	 * @inner
	 */
	function calculateDuration() {
	  return endTime - startTime;
	}

	/**
	 * Calculate the distance between 2 touches (pinch)
	 * @param {point} startPoint A point object containing x and y co-ordinates
	 * @param {point} endPoint A point object containing x and y co-ordinates
	 * @return int;
	 * @inner
	 */
	function calculateTouchesDistance(startPoint, endPoint) {
	  var diffX = Math.abs(startPoint.x - endPoint.x);
	  var diffY = Math.abs(startPoint.y - endPoint.y);

	  return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));
	}

	/**
	 * Calculate the zoom factor between the start and end distances
	 * @param {int} startDistance Distance (between 2 fingers) the user started pinching at
	 * @param {int} endDistance Distance (between 2 fingers) the user ended pinching at
	 * @return float The zoom value from 0 to 1.
	 * @inner
	 */
	function calculatePinchZoom(startDistance, endDistance) {
	  var percent = (endDistance / startDistance) * 1;
	  return percent.toFixed(2);
	}


	/**
	 * Returns the pinch direction, either IN or OUT for the given points
	 * @return string Either {@link $.fn.swipe.directions.IN} or {@link $.fn.swipe.directions.OUT}
	 * @see $.fn.swipe.directions
	 * @inner
	 */
	function calculatePinchDirection() {
	  if (pinchZoom < 1) {
		return OUT;
	  } else {
		return IN;
	  }
	}


	/**
	 * Calculate the length / distance of the swipe
	 * @param {point} startPoint A point object containing x and y co-ordinates
	 * @param {point} endPoint A point object containing x and y co-ordinates
	 * @return int
	 * @inner
	 */
	function calculateDistance(startPoint, endPoint) {
	  return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
	}

	/**
	 * Calculate the angle of the swipe
	 * @param {point} startPoint A point object containing x and y co-ordinates
	 * @param {point} endPoint A point object containing x and y co-ordinates
	 * @return int
	 * @inner
	 */
	function calculateAngle(startPoint, endPoint) {
	  var x = startPoint.x - endPoint.x;
	  var y = endPoint.y - startPoint.y;
	  var r = Math.atan2(y, x); //radians
	  var angle = Math.round(r * 180 / Math.PI); //degrees

	  //ensure value is positive
	  if (angle < 0) {
		angle = 360 - Math.abs(angle);
	  }

	  return angle;
	}

	/**
	 * Calculate the direction of the swipe
	 * This will also call calculateAngle to get the latest angle of swipe
	 * @param {point} startPoint A point object containing x and y co-ordinates
	 * @param {point} endPoint A point object containing x and y co-ordinates
	 * @return string Either {@link $.fn.swipe.directions.LEFT} / {@link $.fn.swipe.directions.RIGHT} / {@link $.fn.swipe.directions.DOWN} / {@link $.fn.swipe.directions.UP}
	 * @see $.fn.swipe.directions
	 * @inner
	 */
	function calculateDirection(startPoint, endPoint) {

	  if( comparePoints(startPoint, endPoint) ) {
		return NONE;
	  }

	  var angle = calculateAngle(startPoint, endPoint);

	  if ((angle <= 45) && (angle >= 0)) {
		return LEFT;
	  } else if ((angle <= 360) && (angle >= 315)) {
		return LEFT;
	  } else if ((angle >= 135) && (angle <= 225)) {
		return RIGHT;
	  } else if ((angle > 45) && (angle < 135)) {
		return DOWN;
	  } else {
		return UP;
	  }
	}


	/**
	 * Returns a MS time stamp of the current time
	 * @return int
	 * @inner
	 */
	function getTimeStamp() {
	  var now = new Date();
	  return now.getTime();
	}



	/**
	 * Returns a bounds object with left, right, top and bottom properties for the element specified.
	 * @param {DomNode} The DOM node to get the bounds for.
	 */
	function getbounds(el) {
	  el = $(el);
	  var offset = el.offset();

	  var bounds = {
		left: offset.left,
		right: offset.left + el.outerWidth(),
		top: offset.top,
		bottom: offset.top + el.outerHeight()
	  }

	  return bounds;
	}


	/**
	 * Checks if the point object is in the bounds object.
	 * @param {object} point A point object.
	 * @param {int} point.x The x value of the point.
	 * @param {int} point.y The x value of the point.
	 * @param {object} bounds The bounds object to test
	 * @param {int} bounds.left The leftmost value
	 * @param {int} bounds.right The righttmost value
	 * @param {int} bounds.top The topmost value
	 * @param {int} bounds.bottom The bottommost value
	 */
	function isInBounds(point, bounds) {
	  return (point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom);
	};

	/**
	 * Checks if the two points are equal
	 * @param {object} point A point object.
	 * @param {object} point B point object.
	 * @return true of the points match
	 */
	function comparePoints(pointA, pointB) {
	  return (pointA.x == pointB.x && pointA.y == pointB.y);
	}


  }




  /**
   * A catch all handler that is triggered for all swipe directions.
   * @name $.fn.swipe#swipe
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped
   * @param {int} duration The duration of the swipe in milliseconds
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event
   * @param {string} currentDirection The current direction the user is swiping.
   */




  /**
   * A handler that is triggered for "left" swipes.
   * @name $.fn.swipe#swipeLeft
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped
   * @param {int} duration The duration of the swipe in milliseconds
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event
   * @param {string} currentDirection The current direction the user is swiping.
   */

  /**
   * A handler that is triggered for "right" swipes.
   * @name $.fn.swipe#swipeRight
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped
   * @param {int} duration The duration of the swipe in milliseconds
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event
   * @param {string} currentDirection The current direction the user is swiping.
   */

  /**
   * A handler that is triggered for "up" swipes.
   * @name $.fn.swipe#swipeUp
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped
   * @param {int} duration The duration of the swipe in milliseconds
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event
   * @param {string} currentDirection The current direction the user is swiping.
   */

  /**
   * A handler that is triggered for "down" swipes.
   * @name $.fn.swipe#swipeDown
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped
   * @param {int} duration The duration of the swipe in milliseconds
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event
   * @param {string} currentDirection The current direction the user is swiping.
   */

  /**
   * A handler triggered for every phase of the swipe. This handler is constantly fired for the duration of the pinch.
   * This is triggered regardless of swipe thresholds.
   * @name $.fn.swipe#swipeStatus
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {string} phase The phase of the swipe event. See {@link $.fn.swipe.phases}
   * @param {string} direction The direction the user swiped in. This is null if the user has yet to move. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user swiped. This is 0 if the user has yet to move.
   * @param {int} duration The duration of the swipe in milliseconds
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {object} fingerData The coordinates of fingers in event
   * @param {string} currentDirection The current direction the user is swiping.
   */

  /**
   * A handler triggered for pinch in events.
   * @name $.fn.swipe#pinchIn
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user pinched
   * @param {int} duration The duration of the swipe in milliseconds
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
   * @param {object} fingerData The coordinates of fingers in event
   */

  /**
   * A handler triggered for pinch out events.
   * @name $.fn.swipe#pinchOut
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user pinched
   * @param {int} duration The duration of the swipe in milliseconds
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
   * @param {object} fingerData The coordinates of fingers in event
   */

  /**
   * A handler triggered for all pinch events. This handler is constantly fired for the duration of the pinch. This is triggered regardless of thresholds.
   * @name $.fn.swipe#pinchStatus
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
   * @param {int} distance The distance the user pinched
   * @param {int} duration The duration of the swipe in milliseconds
   * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
   * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
   * @param {object} fingerData The coordinates of fingers in event
   */

  /**
   * A click handler triggered when a user simply clicks, rather than swipes on an element.
   * This is deprecated since version 1.6.2, any assignment to click will be assigned to the tap handler.
   * You cannot use <code>on</code> to bind to this event as the default jQ <code>click</code> event will be triggered.
   * Use the <code>tap</code> event instead.
   * @name $.fn.swipe#click
   * @event
   * @deprecated since version 1.6.2, please use {@link $.fn.swipe#tap} instead
   * @default null
   * @param {EventObject} event The original event object
   * @param {DomObject} target The element clicked on.
   */

  /**
   * A click / tap handler triggered when a user simply clicks or taps, rather than swipes on an element.
   * @name $.fn.swipe#tap
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {DomObject} target The element clicked on.
   */

  /**
   * A double tap handler triggered when a user double clicks or taps on an element.
   * You can set the time delay for a double tap with the {@link $.fn.swipe.defaults#doubleTapThreshold} property.
   * Note: If you set both <code>doubleTap</code> and <code>tap</code> handlers, the <code>tap</code> event will be delayed by the <code>doubleTapThreshold</code>
   * as the script needs to check if its a double tap.
   * @name $.fn.swipe#doubleTap
   * @see  $.fn.swipe.defaults#doubleTapThreshold
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {DomObject} target The element clicked on.
   */

  /**
   * A long tap handler triggered once a tap has been release if the tap was longer than the longTapThreshold.
   * You can set the time delay for a long tap with the {@link $.fn.swipe.defaults#longTapThreshold} property.
   * @name $.fn.swipe#longTap
   * @see  $.fn.swipe.defaults#longTapThreshold
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {DomObject} target The element clicked on.
   */

  /**
   * A hold tap handler triggered as soon as the longTapThreshold is reached
   * You can set the time delay for a long tap with the {@link $.fn.swipe.defaults#longTapThreshold} property.
   * @name $.fn.swipe#hold
   * @see  $.fn.swipe.defaults#longTapThreshold
   * @event
   * @default null
   * @param {EventObject} event The original event object
   * @param {DomObject} target The element clicked on.
   */

}));

! function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.AOS = t()
}(this, function() {
	"use strict";
	var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
		t = "Expected a function",
		n = NaN,
		o = "[object Symbol]",
		i = /^\s+|\s+$/g,
		a = /^[-+]0x[0-9a-f]+$/i,
		r = /^0b[01]+$/i,
		c = /^0o[0-7]+$/i,
		s = parseInt,
		u = "object" == typeof e && e && e.Object === Object && e,
		d = "object" == typeof self && self && self.Object === Object && self,
		l = u || d || Function("return this")(),
		f = Object.prototype.toString,
		m = Math.max,
		p = Math.min,
		b = function() {
			return l.Date.now()
		};

	function v(e, n, o) {
		var i, a, r, c, s, u, d = 0,
			l = !1,
			f = !1,
			v = !0;
		if ("function" != typeof e) throw new TypeError(t);

		function y(t) {
			var n = i,
				o = a;
			return i = a = void 0, d = t, c = e.apply(o, n)
		}

		function h(e) {
			var t = e - u;
			return void 0 === u || t >= n || t < 0 || f && e - d >= r
		}

		function k() {
			var e = b();
			if (h(e)) return x(e);
			s = setTimeout(k, function(e) {
				var t = n - (e - u);
				return f ? p(t, r - (e - d)) : t
			}(e))
		}

		function x(e) {
			return s = void 0, v && i ? y(e) : (i = a = void 0, c)
		}

		function O() {
			var e = b(),
				t = h(e);
			if (i = arguments, a = this, u = e, t) {
				if (void 0 === s) return function(e) {
					return d = e, s = setTimeout(k, n), l ? y(e) : c
				}(u);
				if (f) return s = setTimeout(k, n), y(u)
			}
			return void 0 === s && (s = setTimeout(k, n)), c
		}
		return n = w(n) || 0, g(o) && (l = !!o.leading, r = (f = "maxWait" in o) ? m(w(o.maxWait) || 0, n) : r, v = "trailing" in o ? !!o.trailing : v), O.cancel = function() {
			void 0 !== s && clearTimeout(s), d = 0, i = u = a = s = void 0
		}, O.flush = function() {
			return void 0 === s ? c : x(b())
		}, O
	}

	function g(e) {
		var t = typeof e;
		return !!e && ("object" == t || "function" == t)
	}

	function w(e) {
		if ("number" == typeof e) return e;
		if (function(e) {
				return "symbol" == typeof e || function(e) {
					return !!e && "object" == typeof e
				}(e) && f.call(e) == o
			}(e)) return n;
		if (g(e)) {
			var t = "function" == typeof e.valueOf ? e.valueOf() : e;
			e = g(t) ? t + "" : t
		}
		if ("string" != typeof e) return 0 === e ? e : +e;
		e = e.replace(i, "");
		var u = r.test(e);
		return u || c.test(e) ? s(e.slice(2), u ? 2 : 8) : a.test(e) ? n : +e
	}
	var y = function(e, n, o) {
			var i = !0,
				a = !0;
			if ("function" != typeof e) throw new TypeError(t);
			return g(o) && (i = "leading" in o ? !!o.leading : i, a = "trailing" in o ? !!o.trailing : a), v(e, n, {
				leading: i,
				maxWait: n,
				trailing: a
			})
		},
		h = "Expected a function",
		k = NaN,
		x = "[object Symbol]",
		O = /^\s+|\s+$/g,
		j = /^[-+]0x[0-9a-f]+$/i,
		E = /^0b[01]+$/i,
		N = /^0o[0-7]+$/i,
		z = parseInt,
		C = "object" == typeof e && e && e.Object === Object && e,
		A = "object" == typeof self && self && self.Object === Object && self,
		q = C || A || Function("return this")(),
		L = Object.prototype.toString,
		T = Math.max,
		M = Math.min,
		S = function() {
			return q.Date.now()
		};

	function D(e) {
		var t = typeof e;
		return !!e && ("object" == t || "function" == t)
	}

	function H(e) {
		if ("number" == typeof e) return e;
		if (function(e) {
				return "symbol" == typeof e || function(e) {
					return !!e && "object" == typeof e
				}(e) && L.call(e) == x
			}(e)) return k;
		if (D(e)) {
			var t = "function" == typeof e.valueOf ? e.valueOf() : e;
			e = D(t) ? t + "" : t
		}
		if ("string" != typeof e) return 0 === e ? e : +e;
		e = e.replace(O, "");
		var n = E.test(e);
		return n || N.test(e) ? z(e.slice(2), n ? 2 : 8) : j.test(e) ? k : +e
	}
	var $ = function(e, t, n) {
			var o, i, a, r, c, s, u = 0,
				d = !1,
				l = !1,
				f = !0;
			if ("function" != typeof e) throw new TypeError(h);

			function m(t) {
				var n = o,
					a = i;
				return o = i = void 0, u = t, r = e.apply(a, n)
			}

			function p(e) {
				var n = e - s;
				return void 0 === s || n >= t || n < 0 || l && e - u >= a
			}

			function b() {
				var e = S();
				if (p(e)) return v(e);
				c = setTimeout(b, function(e) {
					var n = t - (e - s);
					return l ? M(n, a - (e - u)) : n
				}(e))
			}

			function v(e) {
				return c = void 0, f && o ? m(e) : (o = i = void 0, r)
			}

			function g() {
				var e = S(),
					n = p(e);
				if (o = arguments, i = this, s = e, n) {
					if (void 0 === c) return function(e) {
						return u = e, c = setTimeout(b, t), d ? m(e) : r
					}(s);
					if (l) return c = setTimeout(b, t), m(s)
				}
				return void 0 === c && (c = setTimeout(b, t)), r
			}
			return t = H(t) || 0, D(n) && (d = !!n.leading, a = (l = "maxWait" in n) ? T(H(n.maxWait) || 0, t) : a, f = "trailing" in n ? !!n.trailing : f), g.cancel = function() {
				void 0 !== c && clearTimeout(c), u = 0, o = s = i = c = void 0
			}, g.flush = function() {
				return void 0 === c ? r : v(S())
			}, g
		},
		W = function() {};

	function P(e) {
		e && e.forEach(function(e) {
			var t = Array.prototype.slice.call(e.addedNodes),
				n = Array.prototype.slice.call(e.removedNodes);
			if (function e(t) {
					var n = void 0,
						o = void 0;
					for (n = 0; n < t.length; n += 1) {
						if ((o = t[n]).dataset && o.dataset.aos) return !0;
						if (o.children && e(o.children)) return !0
					}
					return !1
				}(t.concat(n))) return W()
		})
	}

	function Y() {
		return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
	}
	var _ = {
			isSupported: function() {
				return !!Y()
			},
			ready: function(e, t) {
				var n = window.document,
					o = new(Y())(P);
				W = t, o.observe(n.documentElement, {
					childList: !0,
					subtree: !0,
					removedNodes: !0
				})
			}
		},
		B = function(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		},
		F = function() {
			function e(e, t) {
				for (var n = 0; n < t.length; n++) {
					var o = t[n];
					o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
				}
			}
			return function(t, n, o) {
				return n && e(t.prototype, n), o && e(t, o), t
			}
		}(),
		I = Object.assign || function(e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t];
				for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
			}
			return e
		},
		K = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
		G = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
		J = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
		Q = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;

	function R() {
		return navigator.userAgent || navigator.vendor || window.opera || ""
	}
	var U = new(function() {
			function e() {
				B(this, e)
			}
			return F(e, [{
				key: "phone",
				value: function() {
					var e = R();
					return !(!K.test(e) && !G.test(e.substr(0, 4)))
				}
			}, {
				key: "mobile",
				value: function() {
					var e = R();
					return !(!J.test(e) && !Q.test(e.substr(0, 4)))
				}
			}, {
				key: "tablet",
				value: function() {
					return this.mobile() && !this.phone()
				}
			}, {
				key: "ie11",
				value: function() {
					return "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style
				}
			}]), e
		}()),
		V = function(e, t) {
			var n = void 0;
			return U.ie11() ? (n = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, {
				detail: t
			}) : n = new CustomEvent(e, {
				detail: t
			}), document.dispatchEvent(n)
		},
		X = function(e) {
			return e.forEach(function(e, t) {
				return function(e, t) {
					var n = e.options,
						o = e.position,
						i = e.node,
						a = (e.data, function() {
							e.animated && (function(e, t) {
								t && t.forEach(function(t) {
									return e.classList.remove(t)
								})
							}(i, n.animatedClassNames), V("aos:out", i), e.options.id && V("aos:in:" + e.options.id, i), e.animated = !1)
						});
					n.mirror && t >= o.out && !n.once ? a() : t >= o.in ? e.animated || (function(e, t) {
						t && t.forEach(function(t) {
							return e.classList.add(t)
						})
					}(i, n.animatedClassNames), V("aos:in", i), e.options.id && V("aos:in:" + e.options.id, i), e.animated = !0) : e.animated && !n.once && a()
				}(e, window.pageYOffset)
			})
		},
		Z = function(e) {
			for (var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
			return {
				top: n,
				left: t
			}
		},
		ee = function(e, t, n) {
			var o = e.getAttribute("data-aos-" + t);
			if (void 0 !== o) {
				if ("true" === o) return !0;
				if ("false" === o) return !1
			}
			return o || n
		},
		te = function(e, t) {
			return e.forEach(function(e, n) {
				var o = ee(e.node, "mirror", t.mirror),
					i = ee(e.node, "once", t.once),
					a = ee(e.node, "id"),
					r = t.useClassNames && e.node.getAttribute("data-aos"),
					c = [t.animatedClassName].concat(r ? r.split(" ") : []).filter(function(e) {
						return "string" == typeof e
					});
				t.initClassName && e.node.classList.add(t.initClassName), e.position = {
					in: function(e, t, n) {
						var o = window.innerHeight,
							i = ee(e, "anchor"),
							a = ee(e, "anchor-placement"),
							r = Number(ee(e, "offset", a ? 0 : t)),
							c = a || n,
							s = e;
						i && document.querySelectorAll(i) && (s = document.querySelectorAll(i)[0]);
						var u = Z(s).top - o;
						switch (c) {
							case "top-bottom":
								break;
							case "center-bottom":
								u += s.offsetHeight / 2;
								break;
							case "bottom-bottom":
								u += s.offsetHeight;
								break;
							case "top-center":
								u += o / 2;
								break;
							case "center-center":
								u += o / 2 + s.offsetHeight / 2;
								break;
							case "bottom-center":
								u += o / 2 + s.offsetHeight;
								break;
							case "top-top":
								u += o;
								break;
							case "bottom-top":
								u += o + s.offsetHeight;
								break;
							case "center-top":
								u += o + s.offsetHeight / 2
						}
						return u + r
					}(e.node, t.offset, t.anchorPlacement),
					out: o && function(e, t) {
						window.innerHeight;
						var n = ee(e, "anchor"),
							o = ee(e, "offset", t),
							i = e;
						return n && document.querySelectorAll(n) && (i = document.querySelectorAll(n)[0]), Z(i).top + i.offsetHeight - o
					}(e.node, t.offset)
				}, e.options = {
					once: i,
					mirror: o,
					animatedClassNames: c,
					id: a
				}
			}), e
		},
		ne = function() {
			var e = document.querySelectorAll("[data-aos]");
			return Array.prototype.map.call(e, function(e) {
				return {
					node: e
				}
			})
		},
		oe = [],
		ie = !1,
		ae = {
			offset: 120,
			delay: 0,
			easing: "ease",
			duration: 400,
			disable: !1,
			once: !1,
			mirror: !1,
			anchorPlacement: "top-bottom",
			startEvent: "DOMContentLoaded",
			animatedClassName: "aos-animate",
			initClassName: "aos-init",
			useClassNames: !1,
			disableMutationObserver: !1,
			throttleDelay: 99,
			debounceDelay: 50
		},
		re = function() {
			return document.all && !window.atob
		},
		ce = function() {
			arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && (ie = !0), ie && (oe = te(oe, ae), X(oe), window.addEventListener("scroll", y(function() {
				X(oe, ae.once)
			}, ae.throttleDelay)))
		},
		se = function() {
			if (oe = ne(), de(ae.disable) || re()) return ue();
			ce()
		},
		ue = function() {
			oe.forEach(function(e, t) {
				e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay"), ae.initClassName && e.node.classList.remove(ae.initClassName), ae.animatedClassName && e.node.classList.remove(ae.animatedClassName)
			})
		},
		de = function(e) {
			return !0 === e || "mobile" === e && U.mobile() || "phone" === e && U.phone() || "tablet" === e && U.tablet() || "function" == typeof e && !0 === e()
		};
	return {
		init: function(e) {
			return ae = I(ae, e), oe = ne(), ae.disableMutationObserver || _.isSupported() || (console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '), ae.disableMutationObserver = !0), ae.disableMutationObserver || _.ready("[data-aos]", se), de(ae.disable) || re() ? ue() : (document.querySelector("body").setAttribute("data-aos-easing", ae.easing), document.querySelector("body").setAttribute("data-aos-duration", ae.duration), document.querySelector("body").setAttribute("data-aos-delay", ae.delay), -1 === ["DOMContentLoaded", "load"].indexOf(ae.startEvent) ? document.addEventListener(ae.startEvent, function() {
				ce(!0)
			}) : window.addEventListener("load", function() {
				ce(!0)
			}), "DOMContentLoaded" === ae.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 && ce(!0), window.addEventListener("resize", $(ce, ae.debounceDelay, !0)), window.addEventListener("orientationchange", $(ce, ae.debounceDelay, !0)), oe)
		},
		refresh: ce,
		refreshHard: se
	}
});


// ------------------------------------------
// Rellax.js
// Buttery smooth parallax library
// Copyright (c) 2016 Moe Amaya (@moeamaya)
// MIT license
//
// Thanks to Paraxify.js and Jaime Cabllero
// for parallax concepts
// ------------------------------------------

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Rellax = factory();
  }
}(typeof window !== "undefined" ? window : global, function () {
  var Rellax = function(el, options){
    "use strict";

    var self = Object.create(Rellax.prototype);

    var posY = 0;
    var screenY = 0;
    var posX = 0;
    var screenX = 0;
    var blocks = [];
    var pause = true;

    // check what requestAnimationFrame to use, and if
    // it's not supported, use the onscroll event
    var loop = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(callback){ return setTimeout(callback, 1000 / 60); };

    // store the id for later use
    var loopId = null;

    // check what cancelAnimation method to use
    var clearLoop = window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout;

    // check which transform property to use
    var transformProp = window.transformProp || (function(){
        var testEl = document.createElement('div');
        if (testEl.style.transform === null) {
          var vendors = ['Webkit', 'Moz', 'ms'];
          for (var vendor in vendors) {
            if (testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
              return vendors[vendor] + 'Transform';
            }
          }
        }
        return 'transform';
      })();

    // Default Settings
    self.options = {
      speed: -2,
      center: false,
      wrapper: null,
      relativeToWrapper: false,
      round: true,
      vertical: true,
      horizontal: false,
      callback: function() {},
    };

    // User defined options (might have more in the future)
    if (options){
      Object.keys(options).forEach(function(key){
        self.options[key] = options[key];
      });
    }

    // By default, rellax class
    if (!el) {
      el = '.rellax';
    }

    // check if el is a className or a node
    var elements = typeof el === 'string' ? document.querySelectorAll(el) : [el];

    // Now query selector
    if (elements.length > 0) {
      self.elems = elements;
    }

    // The elements don't exist
    else {
      throw new Error("The elements you're trying to select don't exist.");
    }

    // Has a wrapper and it exists
    if (self.options.wrapper) {
      if (!self.options.wrapper.nodeType) {
        var wrapper = document.querySelector(self.options.wrapper);

        if (wrapper) {
          self.options.wrapper = wrapper;
        } else {
          throw new Error("The wrapper you're trying to use don't exist.");
        }
      }
    }


    // Get and cache initial position of all elements
    var cacheBlocks = function() {
      for (var i = 0; i < self.elems.length; i++){
        var block = createBlock(self.elems[i]);
        blocks.push(block);
      }
    };


    // Let's kick this script off
    // Build array for cached element values
    var init = function() {
      for (var i = 0; i < blocks.length; i++){
        self.elems[i].style.cssText = blocks[i].style;
      }

      blocks = [];

      screenY = window.innerHeight;
      screenX = window.innerWidth;
      setPosition();

      cacheBlocks();

      // If paused, unpause and set listener for window resizing events
      if (pause) {
        window.addEventListener('resize', init);
        pause = false;
      }
      animate();
    };

    // We want to cache the parallax blocks'
    // values: base, top, height, speed
    // el: is dom object, return: el cache values
    var createBlock = function(el) {
      var dataPercentage = el.getAttribute( 'data-rellax-percentage' );
      var dataSpeed = el.getAttribute( 'data-rellax-speed' );
      var dataZindex = el.getAttribute( 'data-rellax-zindex' ) || 0;
      var dataMin = el.getAttribute( 'data-rellax-min' );
      var dataMax = el.getAttribute( 'data-rellax-max' );

      // initializing at scrollY = 0 (top of browser), scrollX = 0 (left of browser)
      // ensures elements are positioned based on HTML layout.
      //
      // If the element has the percentage attribute, the posY and posX needs to be
      // the current scroll position's value, so that the elements are still positioned based on HTML layout
      var wrapperPosY = self.options.wrapper ? self.options.wrapper.scrollTop : (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
      // If the option relativeToWrapper is true, use the wrappers offset to top, subtracted from the current page scroll.
      if (self.options.relativeToWrapper) {
        var scrollPosY = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
        wrapperPosY = scrollPosY - self.options.wrapper.offsetTop;
      }
      var posY = self.options.vertical ? ( dataPercentage || self.options.center ? wrapperPosY : 0 ) : 0;
      var posX = self.options.horizontal ? ( dataPercentage || self.options.center ? (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft) : 0 ) : 0;

      var blockTop = posY + el.getBoundingClientRect().top;
      var blockHeight = el.clientHeight || el.offsetHeight || el.scrollHeight;

      var blockLeft = posX + el.getBoundingClientRect().left;
      var blockWidth = el.clientWidth || el.offsetWidth || el.scrollWidth;

      // apparently parallax equation everyone uses
      var percentageY = dataPercentage ? dataPercentage : (posY - blockTop + screenY) / (blockHeight + screenY);
      var percentageX = dataPercentage ? dataPercentage : (posX - blockLeft + screenX) / (blockWidth + screenX);
      if(self.options.center){ percentageX = 0.5; percentageY = 0.5; }

      // Optional individual block speed as data attr, otherwise global speed
      var speed = dataSpeed ? dataSpeed : self.options.speed;

      var bases = updatePosition(percentageX, percentageY, speed);

      // ~~Store non-translate3d transforms~~
      // Store inline styles and extract transforms
      var style = el.style.cssText;
      var transform = '';

      // Check if there's an inline styled transform
      if (style.indexOf('transform') >= 0) {
        // Get the index of the transform
        var index = style.indexOf('transform');

        // Trim the style to the transform point and get the following semi-colon index
        var trimmedStyle = style.slice(index);
        var delimiter = trimmedStyle.indexOf(';');

        // Remove "transform" string and save the attribute
        if (delimiter) {
          transform = " " + trimmedStyle.slice(11, delimiter).replace(/\s/g,'');
        } else {
          transform = " " + trimmedStyle.slice(11).replace(/\s/g,'');
        }
      }

      return {
        baseX: bases.x,
        baseY: bases.y,
        top: blockTop,
        left: blockLeft,
        height: blockHeight,
        width: blockWidth,
        speed: speed,
        style: style,
        transform: transform,
        zindex: dataZindex,
        min: dataMin,
        max: dataMax
      };
    };

    // set scroll position (posY, posX)
    // side effect method is not ideal, but okay for now
    // returns true if the scroll changed, false if nothing happened
    var setPosition = function() {
      var oldY = posY;
      var oldX = posX;

      posY = self.options.wrapper ? self.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset;
      posX = self.options.wrapper ? self.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset;
      // If option relativeToWrapper is true, use relative wrapper value instead.
      if (self.options.relativeToWrapper) {
        var scrollPosY = (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset;
        posY = scrollPosY - self.options.wrapper.offsetTop;
      }


      if (oldY != posY && self.options.vertical) {
        // scroll changed, return true
        return true;
      }

      if (oldX != posX && self.options.horizontal) {
        // scroll changed, return true
        return true;
      }

      // scroll did not change
      return false;
    };

    // Ahh a pure function, gets new transform value
    // based on scrollPosition and speed
    // Allow for decimal pixel values
    var updatePosition = function(percentageX, percentageY, speed) {
      var result = {};
      var valueX = (speed * (100 * (1 - percentageX)));
      var valueY = (speed * (100 * (1 - percentageY)));

      result.x = self.options.round ? Math.round(valueX) : Math.round(valueX * 100) / 100;
      result.y = self.options.round ? Math.round(valueY) : Math.round(valueY * 100) / 100;

      return result;
    };

    // Loop
    var update = function() {
      if (setPosition() && pause === false) {
        animate();
      }

      // loop again
      loopId = loop(update);
    };

    // Transform3d on parallax element
    var animate = function() {
      var positions;
      for (var i = 0; i < self.elems.length; i++){
        var percentageY = ((posY - blocks[i].top + screenY) / (blocks[i].height + screenY));
        var percentageX = ((posX - blocks[i].left + screenX) / (blocks[i].width + screenX));

        // Subtracting initialize value, so element stays in same spot as HTML
        positions = updatePosition(percentageX, percentageY, blocks[i].speed);// - blocks[i].baseX;
        var positionY = positions.y - blocks[i].baseY;
        var positionX = positions.x - blocks[i].baseX;

        // The next two "if" blocks go like this:
        // Check if a limit is defined (first "min", then "max");
        // Check if we need to change the Y or the X
        // (Currently working only if just one of the axes is enabled)
        // Then, check if the new position is inside the allowed limit
        // If so, use new position. If not, set position to limit.

        // Check if a min limit is defined
        if (blocks[i].min !== null) {
          if (self.options.vertical && !self.options.horizontal) {
            positionY = positionY <= blocks[i].min ? blocks[i].min : positionY;
          }
          if (self.options.horizontal && !self.options.vertical) {
            positionX = positionX <= blocks[i].min ? blocks[i].min : positionX;
          }
        }

        // Check if a max limit is defined
        if (blocks[i].max !== null) {
          if (self.options.vertical && !self.options.horizontal) {
            positionY = positionY >= blocks[i].max ? blocks[i].max : positionY;
          }
          if (self.options.horizontal && !self.options.vertical) {
            positionX = positionX >= blocks[i].max ? blocks[i].max : positionX;
          }
        }

        var zindex = blocks[i].zindex;

        // Move that element
        // (Set the new translation and append initial inline transforms.)
        var translate = 'translate3d(' + (self.options.horizontal ? positionX : '0') + 'px,' + (self.options.vertical ? positionY : '0') + 'px,' + zindex + 'px) ' + blocks[i].transform;
        self.elems[i].style[transformProp] = translate;
      }
      self.options.callback(positions);
    };

    self.destroy = function() {
      for (var i = 0; i < self.elems.length; i++){
        self.elems[i].style.cssText = blocks[i].style;
      }

      // Remove resize event listener if not pause, and pause
      if (!pause) {
        window.removeEventListener('resize', init);
        pause = true;
      }

      // Clear the animation loop to prevent possible memory leak
      clearLoop(loopId);
      loopId = null;
    };

    // Init
    init();

    // Start the loop
    update();

    // Allow to recalculate the initial values whenever we want
    self.refresh = init;

    return self;
  };
  return Rellax;
}));

/*!
 * VERSION: 0.1.12
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com/jquery-gsap-plugin/
 *
 * Requires TweenLite version 1.8.0 or higher and CSSPlugin.
 *
 * @license Copyright (c) 2013-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
!function(a){"use strict";var b,c,d,e=a.fn.animate,f=a.fn.stop,g=!0,h=function(a){var b,c={};for(b in a)c[b]=a[b];return c},i={overwrite:1,delay:1,useFrames:1,runBackwards:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,autoCSS:1},j=",scrollTop,scrollLeft,show,hide,toggle,",k=j,l=function(a,b){for(var c in i)i[c]&&void 0!==a[c]&&(b[c]=a[c])},m=function(a){return function(b){return a.getRatio(b)}},n={},o=function(){var e,f,g,h=window.GreenSockGlobals||window;if(b=h.TweenMax||h.TweenLite,b&&(e=(b.version+".0.0").split("."),f=!(Number(e[0])>0&&Number(e[1])>7),h=h.com.greensock,c=h.plugins.CSSPlugin,n=h.easing.Ease.map||{}),!b||!c||f)return b=null,void(!d&&window.console&&(window.console.log("The jquery.gsap.js plugin requires the TweenMax (or at least TweenLite and CSSPlugin) JavaScript file(s)."+(f?" Version "+e.join(".")+" is too old.":"")),d=!0));if(a.easing){for(g in n)a.easing[g]=m(n[g]);o=!1}};a.fn.animate=function(d,f,i,j){if(d=d||{},o&&(o(),!b||!c))return e.call(this,d,f,i,j);if(!g||d.skipGSAP===!0||"object"==typeof f&&"function"==typeof f.step)return e.call(this,d,f,i,j);var m,p,q,r,s=a.speed(f,i,j),t={ease:n[s.easing]||(s.easing===!1?n.linear:n.swing)},u=this,v="object"==typeof f?f.specialEasing:null;for(p in d){if(m=d[p],m instanceof Array&&n[m[1]]&&(v=v||{},v[p]=m[1],m=m[0]),"show"===m||"hide"===m||"toggle"===m||-1!==k.indexOf(p)&&-1!==k.indexOf(","+p+","))return e.call(this,d,f,i,j);t[-1===p.indexOf("-")?p:a.camelCase(p)]=m}if(v){t=h(t),r=[];for(p in v)m=r[r.length]={},l(t,m),m.ease=n[v[p]]||t.ease,-1!==p.indexOf("-")&&(p=a.camelCase(p)),m[p]=t[p],delete t[p];0===r.length&&(r=null)}return q=function(c){var d,e=h(t);if(r)for(d=r.length;--d>-1;)b.to(this,a.fx.off?0:s.duration/1e3,r[d]);e.onComplete=function(){c?c():s.old&&a(this).each(s.old)},b.to(this,a.fx.off?0:s.duration/1e3,e)},s.queue!==!1?(u.queue(s.queue,q),"function"==typeof s.old&&a(u[u.length-1]).queue(s.queue,function(a){s.old.call(u),a()})):q.call(u),u},a.fn.stop=function(a,c){if(f.call(this,a,c),b){if(c)for(var d,e=b.getTweensOf(this),g=e.length;--g>-1;)d=e[g].totalTime()/e[g].totalDuration(),d>0&&1>d&&e[g].seek(e[g].totalDuration());b.killTweensOf(this)}return this},a.gsap={enabled:function(a){g=a},version:"0.1.12",legacyProps:function(a){k=j+a+","}}}(jQuery);
/*!
 * VERSION: 1.20.4
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
!function(a,b){"use strict";var c={},d=a.document,e=a.GreenSockGlobals=a.GreenSockGlobals||a;if(!e.TweenLite){var f,g,h,i,j,k=function(a){var b,c=a.split("."),d=e;for(b=0;b<c.length;b++)d[c[b]]=d=d[c[b]]||{};return d},l=k("com.greensock"),m=1e-10,n=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},o=function(){},p=function(){var a=Object.prototype.toString,b=a.call([]);return function(c){return null!=c&&(c instanceof Array||"object"==typeof c&&!!c.push&&a.call(c)===b)}}(),q={},r=function(d,f,g,h){this.sc=q[d]?q[d].sc:[],q[d]=this,this.gsClass=null,this.func=g;var i=[];this.check=function(j){for(var l,m,n,o,p=f.length,s=p;--p>-1;)(l=q[f[p]]||new r(f[p],[])).gsClass?(i[p]=l.gsClass,s--):j&&l.sc.push(this);if(0===s&&g){if(m=("com.greensock."+d).split("."),n=m.pop(),o=k(m.join("."))[n]=this.gsClass=g.apply(g,i),h)if(e[n]=c[n]=o,"undefined"!=typeof module&&module.exports)if(d===b){module.exports=c[b]=o;for(p in c)o[p]=c[p]}else c[b]&&(c[b][n]=o);else"function"==typeof define&&define.amd&&define((a.GreenSockAMDPath?a.GreenSockAMDPath+"/":"")+d.split(".").pop(),[],function(){return o});for(p=0;p<this.sc.length;p++)this.sc[p].check()}},this.check(!0)},s=a._gsDefine=function(a,b,c,d){return new r(a,b,c,d)},t=l._class=function(a,b,c){return b=b||function(){},s(a,[],function(){return b},c),b};s.globals=e;var u=[0,0,1,1],v=t("easing.Ease",function(a,b,c,d){this._func=a,this._type=c||0,this._power=d||0,this._params=b?u.concat(b):u},!0),w=v.map={},x=v.register=function(a,b,c,d){for(var e,f,g,h,i=b.split(","),j=i.length,k=(c||"easeIn,easeOut,easeInOut").split(",");--j>-1;)for(f=i[j],e=d?t("easing."+f,null,!0):l.easing[f]||{},g=k.length;--g>-1;)h=k[g],w[f+"."+h]=w[h+f]=e[h]=a.getRatio?a:a[h]||new a};for(h=v.prototype,h._calcEnd=!1,h.getRatio=function(a){if(this._func)return this._params[0]=a,this._func.apply(null,this._params);var b=this._type,c=this._power,d=1===b?1-a:2===b?a:.5>a?2*a:2*(1-a);return 1===c?d*=d:2===c?d*=d*d:3===c?d*=d*d*d:4===c&&(d*=d*d*d*d),1===b?1-d:2===b?d:.5>a?d/2:1-d/2},f=["Linear","Quad","Cubic","Quart","Quint,Strong"],g=f.length;--g>-1;)h=f[g]+",Power"+g,x(new v(null,null,1,g),h,"easeOut",!0),x(new v(null,null,2,g),h,"easeIn"+(0===g?",easeNone":"")),x(new v(null,null,3,g),h,"easeInOut");w.linear=l.easing.Linear.easeIn,w.swing=l.easing.Quad.easeInOut;var y=t("events.EventDispatcher",function(a){this._listeners={},this._eventTarget=a||this});h=y.prototype,h.addEventListener=function(a,b,c,d,e){e=e||0;var f,g,h=this._listeners[a],k=0;for(this!==i||j||i.wake(),null==h&&(this._listeners[a]=h=[]),g=h.length;--g>-1;)f=h[g],f.c===b&&f.s===c?h.splice(g,1):0===k&&f.pr<e&&(k=g+1);h.splice(k,0,{c:b,s:c,up:d,pr:e})},h.removeEventListener=function(a,b){var c,d=this._listeners[a];if(d)for(c=d.length;--c>-1;)if(d[c].c===b)return void d.splice(c,1)},h.dispatchEvent=function(a){var b,c,d,e=this._listeners[a];if(e)for(b=e.length,b>1&&(e=e.slice(0)),c=this._eventTarget;--b>-1;)d=e[b],d&&(d.up?d.c.call(d.s||c,{type:a,target:c}):d.c.call(d.s||c))};var z=a.requestAnimationFrame,A=a.cancelAnimationFrame,B=Date.now||function(){return(new Date).getTime()},C=B();for(f=["ms","moz","webkit","o"],g=f.length;--g>-1&&!z;)z=a[f[g]+"RequestAnimationFrame"],A=a[f[g]+"CancelAnimationFrame"]||a[f[g]+"CancelRequestAnimationFrame"];t("Ticker",function(a,b){var c,e,f,g,h,k=this,l=B(),n=b!==!1&&z?"auto":!1,p=500,q=33,r="tick",s=function(a){var b,d,i=B()-C;i>p&&(l+=i-q),C+=i,k.time=(C-l)/1e3,b=k.time-h,(!c||b>0||a===!0)&&(k.frame++,h+=b+(b>=g?.004:g-b),d=!0),a!==!0&&(f=e(s)),d&&k.dispatchEvent(r)};y.call(k),k.time=k.frame=0,k.tick=function(){s(!0)},k.lagSmoothing=function(a,b){return arguments.length?(p=a||1/m,void(q=Math.min(b,p,0))):1/m>p},k.sleep=function(){null!=f&&(n&&A?A(f):clearTimeout(f),e=o,f=null,k===i&&(j=!1))},k.wake=function(a){null!==f?k.sleep():a?l+=-C+(C=B()):k.frame>10&&(C=B()-p+5),e=0===c?o:n&&z?z:function(a){return setTimeout(a,1e3*(h-k.time)+1|0)},k===i&&(j=!0),s(2)},k.fps=function(a){return arguments.length?(c=a,g=1/(c||60),h=this.time+g,void k.wake()):c},k.useRAF=function(a){return arguments.length?(k.sleep(),n=a,void k.fps(c)):n},k.fps(a),setTimeout(function(){"auto"===n&&k.frame<5&&"hidden"!==(d||{}).visibilityState&&k.useRAF(!1)},1500)}),h=l.Ticker.prototype=new l.events.EventDispatcher,h.constructor=l.Ticker;var D=t("core.Animation",function(a,b){if(this.vars=b=b||{},this._duration=this._totalDuration=a||0,this._delay=Number(b.delay)||0,this._timeScale=1,this._active=b.immediateRender===!0,this.data=b.data,this._reversed=b.reversed===!0,X){j||i.wake();var c=this.vars.useFrames?W:X;c.add(this,c._time),this.vars.paused&&this.paused(!0)}});i=D.ticker=new l.Ticker,h=D.prototype,h._dirty=h._gc=h._initted=h._paused=!1,h._totalTime=h._time=0,h._rawPrevTime=-1,h._next=h._last=h._onUpdate=h._timeline=h.timeline=null,h._paused=!1;var E=function(){j&&B()-C>2e3&&("hidden"!==(d||{}).visibilityState||!i.lagSmoothing())&&i.wake();var a=setTimeout(E,2e3);a.unref&&a.unref()};E(),h.play=function(a,b){return null!=a&&this.seek(a,b),this.reversed(!1).paused(!1)},h.pause=function(a,b){return null!=a&&this.seek(a,b),this.paused(!0)},h.resume=function(a,b){return null!=a&&this.seek(a,b),this.paused(!1)},h.seek=function(a,b){return this.totalTime(Number(a),b!==!1)},h.restart=function(a,b){return this.reversed(!1).paused(!1).totalTime(a?-this._delay:0,b!==!1,!0)},h.reverse=function(a,b){return null!=a&&this.seek(a||this.totalDuration(),b),this.reversed(!0).paused(!1)},h.render=function(a,b,c){},h.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},h.isActive=function(){var a,b=this._timeline,c=this._startTime;return!b||!this._gc&&!this._paused&&b.isActive()&&(a=b.rawTime(!0))>=c&&a<c+this.totalDuration()/this._timeScale-1e-7},h._enabled=function(a,b){return j||i.wake(),this._gc=!a,this._active=this.isActive(),b!==!0&&(a&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!a&&this.timeline&&this._timeline._remove(this,!0)),!1},h._kill=function(a,b){return this._enabled(!1,!1)},h.kill=function(a,b){return this._kill(a,b),this},h._uncache=function(a){for(var b=a?this:this.timeline;b;)b._dirty=!0,b=b.timeline;return this},h._swapSelfInParams=function(a){for(var b=a.length,c=a.concat();--b>-1;)"{self}"===a[b]&&(c[b]=this);return c},h._callback=function(a){var b=this.vars,c=b[a],d=b[a+"Params"],e=b[a+"Scope"]||b.callbackScope||this,f=d?d.length:0;switch(f){case 0:c.call(e);break;case 1:c.call(e,d[0]);break;case 2:c.call(e,d[0],d[1]);break;default:c.apply(e,d)}},h.eventCallback=function(a,b,c,d){if("on"===(a||"").substr(0,2)){var e=this.vars;if(1===arguments.length)return e[a];null==b?delete e[a]:(e[a]=b,e[a+"Params"]=p(c)&&-1!==c.join("").indexOf("{self}")?this._swapSelfInParams(c):c,e[a+"Scope"]=d),"onUpdate"===a&&(this._onUpdate=b)}return this},h.delay=function(a){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+a-this._delay),this._delay=a,this):this._delay},h.duration=function(a){return arguments.length?(this._duration=this._totalDuration=a,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==a&&this.totalTime(this._totalTime*(a/this._duration),!0),this):(this._dirty=!1,this._duration)},h.totalDuration=function(a){return this._dirty=!1,arguments.length?this.duration(a):this._totalDuration},h.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(a>this._duration?this._duration:a,b)):this._time},h.totalTime=function(a,b,c){if(j||i.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>a&&!c&&(a+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var d=this._totalDuration,e=this._timeline;if(a>d&&!c&&(a=d),this._startTime=(this._paused?this._pauseTime:e._time)-(this._reversed?d-a:a)/this._timeScale,e._dirty||this._uncache(!1),e._timeline)for(;e._timeline;)e._timeline._time!==(e._startTime+e._totalTime)/e._timeScale&&e.totalTime(e._totalTime,!0),e=e._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==a||0===this._duration)&&(J.length&&Z(),this.render(a,b,!1),J.length&&Z())}return this},h.progress=h.totalProgress=function(a,b){var c=this.duration();return arguments.length?this.totalTime(c*a,b):c?this._time/c:this.ratio},h.startTime=function(a){return arguments.length?(a!==this._startTime&&(this._startTime=a,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,a-this._delay)),this):this._startTime},h.endTime=function(a){return this._startTime+(0!=a?this.totalDuration():this.duration())/this._timeScale},h.timeScale=function(a){if(!arguments.length)return this._timeScale;var b,c;for(a=a||m,this._timeline&&this._timeline.smoothChildTiming&&(b=this._pauseTime,c=b||0===b?b:this._timeline.totalTime(),this._startTime=c-(c-this._startTime)*this._timeScale/a),this._timeScale=a,c=this.timeline;c&&c.timeline;)c._dirty=!0,c.totalDuration(),c=c.timeline;return this},h.reversed=function(a){return arguments.length?(a!=this._reversed&&(this._reversed=a,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},h.paused=function(a){if(!arguments.length)return this._paused;var b,c,d=this._timeline;return a!=this._paused&&d&&(j||a||i.wake(),b=d.rawTime(),c=b-this._pauseTime,!a&&d.smoothChildTiming&&(this._startTime+=c,this._uncache(!1)),this._pauseTime=a?b:null,this._paused=a,this._active=this.isActive(),!a&&0!==c&&this._initted&&this.duration()&&(b=d.smoothChildTiming?this._totalTime:(b-this._startTime)/this._timeScale,this.render(b,b===this._totalTime,!0))),this._gc&&!a&&this._enabled(!0,!1),this};var F=t("core.SimpleTimeline",function(a){D.call(this,0,a),this.autoRemoveChildren=this.smoothChildTiming=!0});h=F.prototype=new D,h.constructor=F,h.kill()._gc=!1,h._first=h._last=h._recent=null,h._sortChildren=!1,h.add=h.insert=function(a,b,c,d){var e,f;if(a._startTime=Number(b||0)+a._delay,a._paused&&this!==a._timeline&&(a._pauseTime=a._startTime+(this.rawTime()-a._startTime)/a._timeScale),a.timeline&&a.timeline._remove(a,!0),a.timeline=a._timeline=this,a._gc&&a._enabled(!0,!0),e=this._last,this._sortChildren)for(f=a._startTime;e&&e._startTime>f;)e=e._prev;return e?(a._next=e._next,e._next=a):(a._next=this._first,this._first=a),a._next?a._next._prev=a:this._last=a,a._prev=e,this._recent=a,this._timeline&&this._uncache(!0),this},h._remove=function(a,b){return a.timeline===this&&(b||a._enabled(!1,!0),a._prev?a._prev._next=a._next:this._first===a&&(this._first=a._next),a._next?a._next._prev=a._prev:this._last===a&&(this._last=a._prev),a._next=a._prev=a.timeline=null,a===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},h.render=function(a,b,c){var d,e=this._first;for(this._totalTime=this._time=this._rawPrevTime=a;e;)d=e._next,(e._active||a>=e._startTime&&!e._paused&&!e._gc)&&(e._reversed?e.render((e._dirty?e.totalDuration():e._totalDuration)-(a-e._startTime)*e._timeScale,b,c):e.render((a-e._startTime)*e._timeScale,b,c)),e=d},h.rawTime=function(){return j||i.wake(),this._totalTime};var G=t("TweenLite",function(b,c,d){if(D.call(this,c,d),this.render=G.prototype.render,null==b)throw"Cannot tween a null target.";this.target=b="string"!=typeof b?b:G.selector(b)||b;var e,f,g,h=b.jquery||b.length&&b!==a&&b[0]&&(b[0]===a||b[0].nodeType&&b[0].style&&!b.nodeType),i=this.vars.overwrite;if(this._overwrite=i=null==i?V[G.defaultOverwrite]:"number"==typeof i?i>>0:V[i],(h||b instanceof Array||b.push&&p(b))&&"number"!=typeof b[0])for(this._targets=g=n(b),this._propLookup=[],this._siblings=[],e=0;e<g.length;e++)f=g[e],f?"string"!=typeof f?f.length&&f!==a&&f[0]&&(f[0]===a||f[0].nodeType&&f[0].style&&!f.nodeType)?(g.splice(e--,1),this._targets=g=g.concat(n(f))):(this._siblings[e]=$(f,this,!1),1===i&&this._siblings[e].length>1&&aa(f,this,null,1,this._siblings[e])):(f=g[e--]=G.selector(f),"string"==typeof f&&g.splice(e+1,1)):g.splice(e--,1);else this._propLookup={},this._siblings=$(b,this,!1),1===i&&this._siblings.length>1&&aa(b,this,null,1,this._siblings);(this.vars.immediateRender||0===c&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-m,this.render(Math.min(0,-this._delay)))},!0),H=function(b){return b&&b.length&&b!==a&&b[0]&&(b[0]===a||b[0].nodeType&&b[0].style&&!b.nodeType)},I=function(a,b){var c,d={};for(c in a)U[c]||c in b&&"transform"!==c&&"x"!==c&&"y"!==c&&"width"!==c&&"height"!==c&&"className"!==c&&"border"!==c||!(!R[c]||R[c]&&R[c]._autoCSS)||(d[c]=a[c],delete a[c]);a.css=d};h=G.prototype=new D,h.constructor=G,h.kill()._gc=!1,h.ratio=0,h._firstPT=h._targets=h._overwrittenProps=h._startAt=null,h._notifyPluginsOfEnabled=h._lazy=!1,G.version="1.20.4",G.defaultEase=h._ease=new v(null,null,1,1),G.defaultOverwrite="auto",G.ticker=i,G.autoSleep=120,G.lagSmoothing=function(a,b){i.lagSmoothing(a,b)},G.selector=a.$||a.jQuery||function(b){var c=a.$||a.jQuery;return c?(G.selector=c,c(b)):"undefined"==typeof d?b:d.querySelectorAll?d.querySelectorAll(b):d.getElementById("#"===b.charAt(0)?b.substr(1):b)};var J=[],K={},L=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,M=/[\+-]=-?[\.\d]/,N=function(a){for(var b,c=this._firstPT,d=1e-6;c;)b=c.blob?1===a&&null!=this.end?this.end:a?this.join(""):this.start:c.c*a+c.s,c.m?b=c.m(b,this._target||c.t):d>b&&b>-d&&!c.blob&&(b=0),c.f?c.fp?c.t[c.p](c.fp,b):c.t[c.p](b):c.t[c.p]=b,c=c._next},O=function(a,b,c,d){var e,f,g,h,i,j,k,l=[],m=0,n="",o=0;for(l.start=a,l.end=b,a=l[0]=a+"",b=l[1]=b+"",c&&(c(l),a=l[0],b=l[1]),l.length=0,e=a.match(L)||[],f=b.match(L)||[],d&&(d._next=null,d.blob=1,l._firstPT=l._applyPT=d),i=f.length,h=0;i>h;h++)k=f[h],j=b.substr(m,b.indexOf(k,m)-m),n+=j||!h?j:",",m+=j.length,o?o=(o+1)%5:"rgba("===j.substr(-5)&&(o=1),k===e[h]||e.length<=h?n+=k:(n&&(l.push(n),n=""),g=parseFloat(e[h]),l.push(g),l._firstPT={_next:l._firstPT,t:l,p:l.length-1,s:g,c:("="===k.charAt(1)?parseInt(k.charAt(0)+"1",10)*parseFloat(k.substr(2)):parseFloat(k)-g)||0,f:0,m:o&&4>o?Math.round:0}),m+=k.length;return n+=b.substr(m),n&&l.push(n),l.setRatio=N,M.test(b)&&(l.end=null),l},P=function(a,b,c,d,e,f,g,h,i){"function"==typeof d&&(d=d(i||0,a));var j,k=typeof a[b],l="function"!==k?"":b.indexOf("set")||"function"!=typeof a["get"+b.substr(3)]?b:"get"+b.substr(3),m="get"!==c?c:l?g?a[l](g):a[l]():a[b],n="string"==typeof d&&"="===d.charAt(1),o={t:a,p:b,s:m,f:"function"===k,pg:0,n:e||b,m:f?"function"==typeof f?f:Math.round:0,pr:0,c:n?parseInt(d.charAt(0)+"1",10)*parseFloat(d.substr(2)):parseFloat(d)-m||0};return("number"!=typeof m||"number"!=typeof d&&!n)&&(g||isNaN(m)||!n&&isNaN(d)||"boolean"==typeof m||"boolean"==typeof d?(o.fp=g,j=O(m,n?parseFloat(o.s)+o.c+(o.s+"").replace(/[0-9\-\.]/g,""):d,h||G.defaultStringFilter,o),o={t:j,p:"setRatio",s:0,c:1,f:2,pg:0,n:e||b,pr:0,m:0}):(o.s=parseFloat(m),n||(o.c=parseFloat(d)-o.s||0))),o.c?((o._next=this._firstPT)&&(o._next._prev=o),this._firstPT=o,o):void 0},Q=G._internals={isArray:p,isSelector:H,lazyTweens:J,blobDif:O},R=G._plugins={},S=Q.tweenLookup={},T=0,U=Q.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1,id:1,yoyoEase:1},V={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},W=D._rootFramesTimeline=new F,X=D._rootTimeline=new F,Y=30,Z=Q.lazyRender=function(){var a,b=J.length;for(K={};--b>-1;)a=J[b],a&&a._lazy!==!1&&(a.render(a._lazy[0],a._lazy[1],!0),a._lazy=!1);J.length=0};X._startTime=i.time,W._startTime=i.frame,X._active=W._active=!0,setTimeout(Z,1),D._updateRoot=G.render=function(){var a,b,c;if(J.length&&Z(),X.render((i.time-X._startTime)*X._timeScale,!1,!1),W.render((i.frame-W._startTime)*W._timeScale,!1,!1),J.length&&Z(),i.frame>=Y){Y=i.frame+(parseInt(G.autoSleep,10)||120);for(c in S){for(b=S[c].tweens,a=b.length;--a>-1;)b[a]._gc&&b.splice(a,1);0===b.length&&delete S[c]}if(c=X._first,(!c||c._paused)&&G.autoSleep&&!W._first&&1===i._listeners.tick.length){for(;c&&c._paused;)c=c._next;c||i.sleep()}}},i.addEventListener("tick",D._updateRoot);var $=function(a,b,c){var d,e,f=a._gsTweenID;if(S[f||(a._gsTweenID=f="t"+T++)]||(S[f]={target:a,tweens:[]}),b&&(d=S[f].tweens,d[e=d.length]=b,c))for(;--e>-1;)d[e]===b&&d.splice(e,1);return S[f].tweens},_=function(a,b,c,d){var e,f,g=a.vars.onOverwrite;return g&&(e=g(a,b,c,d)),g=G.onOverwrite,g&&(f=g(a,b,c,d)),e!==!1&&f!==!1},aa=function(a,b,c,d,e){var f,g,h,i;if(1===d||d>=4){for(i=e.length,f=0;i>f;f++)if((h=e[f])!==b)h._gc||h._kill(null,a,b)&&(g=!0);else if(5===d)break;return g}var j,k=b._startTime+m,l=[],n=0,o=0===b._duration;for(f=e.length;--f>-1;)(h=e[f])===b||h._gc||h._paused||(h._timeline!==b._timeline?(j=j||ba(b,0,o),0===ba(h,j,o)&&(l[n++]=h)):h._startTime<=k&&h._startTime+h.totalDuration()/h._timeScale>k&&((o||!h._initted)&&k-h._startTime<=2e-10||(l[n++]=h)));for(f=n;--f>-1;)if(h=l[f],2===d&&h._kill(c,a,b)&&(g=!0),2!==d||!h._firstPT&&h._initted){if(2!==d&&!_(h,b))continue;h._enabled(!1,!1)&&(g=!0)}return g},ba=function(a,b,c){for(var d=a._timeline,e=d._timeScale,f=a._startTime;d._timeline;){if(f+=d._startTime,e*=d._timeScale,d._paused)return-100;d=d._timeline}return f/=e,f>b?f-b:c&&f===b||!a._initted&&2*m>f-b?m:(f+=a.totalDuration()/a._timeScale/e)>b+m?0:f-b-m};h._init=function(){var a,b,c,d,e,f,g=this.vars,h=this._overwrittenProps,i=this._duration,j=!!g.immediateRender,k=g.ease;if(g.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),e={};for(d in g.startAt)e[d]=g.startAt[d];if(e.data="isStart",e.overwrite=!1,e.immediateRender=!0,e.lazy=j&&g.lazy!==!1,e.startAt=e.delay=null,e.onUpdate=g.onUpdate,e.onUpdateParams=g.onUpdateParams,e.onUpdateScope=g.onUpdateScope||g.callbackScope||this,this._startAt=G.to(this.target,0,e),j)if(this._time>0)this._startAt=null;else if(0!==i)return}else if(g.runBackwards&&0!==i)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(j=!1),c={};for(d in g)U[d]&&"autoCSS"!==d||(c[d]=g[d]);if(c.overwrite=0,c.data="isFromStart",c.lazy=j&&g.lazy!==!1,c.immediateRender=j,this._startAt=G.to(this.target,0,c),j){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=k=k?k instanceof v?k:"function"==typeof k?new v(k,g.easeParams):w[k]||G.defaultEase:G.defaultEase,g.easeParams instanceof Array&&k.config&&(this._ease=k.config.apply(k,g.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(f=this._targets.length,a=0;f>a;a++)this._initProps(this._targets[a],this._propLookup[a]={},this._siblings[a],h?h[a]:null,a)&&(b=!0);else b=this._initProps(this.target,this._propLookup,this._siblings,h,0);if(b&&G._onPluginEvent("_onInitAllProps",this),h&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),g.runBackwards)for(c=this._firstPT;c;)c.s+=c.c,c.c=-c.c,c=c._next;this._onUpdate=g.onUpdate,this._initted=!0},h._initProps=function(b,c,d,e,f){var g,h,i,j,k,l;if(null==b)return!1;K[b._gsTweenID]&&Z(),this.vars.css||b.style&&b!==a&&b.nodeType&&R.css&&this.vars.autoCSS!==!1&&I(this.vars,b);for(g in this.vars)if(l=this.vars[g],U[g])l&&(l instanceof Array||l.push&&p(l))&&-1!==l.join("").indexOf("{self}")&&(this.vars[g]=l=this._swapSelfInParams(l,this));else if(R[g]&&(j=new R[g])._onInitTween(b,this.vars[g],this,f)){for(this._firstPT=k={_next:this._firstPT,t:j,p:"setRatio",s:0,c:1,f:1,n:g,pg:1,pr:j._priority,m:0},h=j._overwriteProps.length;--h>-1;)c[j._overwriteProps[h]]=this._firstPT;(j._priority||j._onInitAllProps)&&(i=!0),(j._onDisable||j._onEnable)&&(this._notifyPluginsOfEnabled=!0),k._next&&(k._next._prev=k)}else c[g]=P.call(this,b,g,"get",l,g,0,null,this.vars.stringFilter,f);return e&&this._kill(e,b)?this._initProps(b,c,d,e,f):this._overwrite>1&&this._firstPT&&d.length>1&&aa(b,this,c,this._overwrite,d)?(this._kill(c,b),this._initProps(b,c,d,e,f)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(K[b._gsTweenID]=!0),i)},h.render=function(a,b,c){var d,e,f,g,h=this._time,i=this._duration,j=this._rawPrevTime;if(a>=i-1e-7&&a>=0)this._totalTime=this._time=i,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(d=!0,e="onComplete",c=c||this._timeline.autoRemoveChildren),0===i&&(this._initted||!this.vars.lazy||c)&&(this._startTime===this._timeline._duration&&(a=0),(0>j||0>=a&&a>=-1e-7||j===m&&"isPause"!==this.data)&&j!==a&&(c=!0,j>m&&(e="onReverseComplete")),this._rawPrevTime=g=!b||a||j===a?a:m);else if(1e-7>a)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==h||0===i&&j>0)&&(e="onReverseComplete",d=this._reversed),0>a&&(this._active=!1,0===i&&(this._initted||!this.vars.lazy||c)&&(j>=0&&(j!==m||"isPause"!==this.data)&&(c=!0),this._rawPrevTime=g=!b||a||j===a?a:m)),(!this._initted||this._startAt&&this._startAt.progress())&&(c=!0);else if(this._totalTime=this._time=a,this._easeType){var k=a/i,l=this._easeType,n=this._easePower;(1===l||3===l&&k>=.5)&&(k=1-k),3===l&&(k*=2),1===n?k*=k:2===n?k*=k*k:3===n?k*=k*k*k:4===n&&(k*=k*k*k*k),1===l?this.ratio=1-k:2===l?this.ratio=k:.5>a/i?this.ratio=k/2:this.ratio=1-k/2}else this.ratio=this._ease.getRatio(a/i);if(this._time!==h||c){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!c&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=h,this._rawPrevTime=j,J.push(this),void(this._lazy=[a,b]);this._time&&!d?this.ratio=this._ease.getRatio(this._time/i):d&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==h&&a>=0&&(this._active=!0),0===h&&(this._startAt&&(a>=0?this._startAt.render(a,!0,c):e||(e="_dummyGS")),this.vars.onStart&&(0!==this._time||0===i)&&(b||this._callback("onStart"))),f=this._firstPT;f;)f.f?f.t[f.p](f.c*this.ratio+f.s):f.t[f.p]=f.c*this.ratio+f.s,f=f._next;this._onUpdate&&(0>a&&this._startAt&&a!==-1e-4&&this._startAt.render(a,!0,c),b||(this._time!==h||d||c)&&this._callback("onUpdate")),e&&(!this._gc||c)&&(0>a&&this._startAt&&!this._onUpdate&&a!==-1e-4&&this._startAt.render(a,!0,c),d&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[e]&&this._callback(e),0===i&&this._rawPrevTime===m&&g!==m&&(this._rawPrevTime=0))}},h._kill=function(a,b,c){if("all"===a&&(a=null),null==a&&(null==b||b===this.target))return this._lazy=!1,this._enabled(!1,!1);b="string"!=typeof b?b||this._targets||this.target:G.selector(b)||b;var d,e,f,g,h,i,j,k,l,m=c&&this._time&&c._startTime===this._startTime&&this._timeline===c._timeline;if((p(b)||H(b))&&"number"!=typeof b[0])for(d=b.length;--d>-1;)this._kill(a,b[d],c)&&(i=!0);else{if(this._targets){for(d=this._targets.length;--d>-1;)if(b===this._targets[d]){h=this._propLookup[d]||{},this._overwrittenProps=this._overwrittenProps||[],e=this._overwrittenProps[d]=a?this._overwrittenProps[d]||{}:"all";break}}else{if(b!==this.target)return!1;h=this._propLookup,e=this._overwrittenProps=a?this._overwrittenProps||{}:"all"}if(h){if(j=a||h,k=a!==e&&"all"!==e&&a!==h&&("object"!=typeof a||!a._tempKill),c&&(G.onOverwrite||this.vars.onOverwrite)){for(f in j)h[f]&&(l||(l=[]),l.push(f));if((l||!a)&&!_(this,c,b,l))return!1}for(f in j)(g=h[f])&&(m&&(g.f?g.t[g.p](g.s):g.t[g.p]=g.s,i=!0),g.pg&&g.t._kill(j)&&(i=!0),g.pg&&0!==g.t._overwriteProps.length||(g._prev?g._prev._next=g._next:g===this._firstPT&&(this._firstPT=g._next),g._next&&(g._next._prev=g._prev),g._next=g._prev=null),delete h[f]),k&&(e[f]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return i},h.invalidate=function(){return this._notifyPluginsOfEnabled&&G._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],D.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-m,this.render(Math.min(0,-this._delay))),this},h._enabled=function(a,b){if(j||i.wake(),a&&this._gc){var c,d=this._targets;if(d)for(c=d.length;--c>-1;)this._siblings[c]=$(d[c],this,!0);else this._siblings=$(this.target,this,!0)}return D.prototype._enabled.call(this,a,b),this._notifyPluginsOfEnabled&&this._firstPT?G._onPluginEvent(a?"_onEnable":"_onDisable",this):!1},G.to=function(a,b,c){return new G(a,b,c)},G.from=function(a,b,c){return c.runBackwards=!0,c.immediateRender=0!=c.immediateRender,new G(a,b,c)},G.fromTo=function(a,b,c,d){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,new G(a,b,d)},G.delayedCall=function(a,b,c,d,e){return new G(b,0,{delay:a,onComplete:b,onCompleteParams:c,callbackScope:d,onReverseComplete:b,onReverseCompleteParams:c,immediateRender:!1,lazy:!1,useFrames:e,overwrite:0})},G.set=function(a,b){return new G(a,0,b)},G.getTweensOf=function(a,b){if(null==a)return[];a="string"!=typeof a?a:G.selector(a)||a;var c,d,e,f;if((p(a)||H(a))&&"number"!=typeof a[0]){for(c=a.length,d=[];--c>-1;)d=d.concat(G.getTweensOf(a[c],b));for(c=d.length;--c>-1;)for(f=d[c],e=c;--e>-1;)f===d[e]&&d.splice(c,1)}else if(a._gsTweenID)for(d=$(a).concat(),c=d.length;--c>-1;)(d[c]._gc||b&&!d[c].isActive())&&d.splice(c,1);return d||[]},G.killTweensOf=G.killDelayedCallsTo=function(a,b,c){"object"==typeof b&&(c=b,b=!1);for(var d=G.getTweensOf(a,b),e=d.length;--e>-1;)d[e]._kill(c,a)};var ca=t("plugins.TweenPlugin",function(a,b){this._overwriteProps=(a||"").split(","),this._propName=this._overwriteProps[0],this._priority=b||0,this._super=ca.prototype},!0);if(h=ca.prototype,ca.version="1.19.0",ca.API=2,h._firstPT=null,h._addTween=P,h.setRatio=N,h._kill=function(a){var b,c=this._overwriteProps,d=this._firstPT;if(null!=a[this._propName])this._overwriteProps=[];else for(b=c.length;--b>-1;)null!=a[c[b]]&&c.splice(b,1);for(;d;)null!=a[d.n]&&(d._next&&(d._next._prev=d._prev),d._prev?(d._prev._next=d._next,d._prev=null):this._firstPT===d&&(this._firstPT=d._next)),d=d._next;return!1},h._mod=h._roundProps=function(a){for(var b,c=this._firstPT;c;)b=a[this._propName]||null!=c.n&&a[c.n.split(this._propName+"_").join("")],b&&"function"==typeof b&&(2===c.f?c.t._applyPT.m=b:c.m=b),c=c._next},G._onPluginEvent=function(a,b){var c,d,e,f,g,h=b._firstPT;if("_onInitAllProps"===a){for(;h;){for(g=h._next,d=e;d&&d.pr>h.pr;)d=d._next;(h._prev=d?d._prev:f)?h._prev._next=h:e=h,(h._next=d)?d._prev=h:f=h,h=g}h=b._firstPT=e}for(;h;)h.pg&&"function"==typeof h.t[a]&&h.t[a]()&&(c=!0),h=h._next;return c},ca.activate=function(a){for(var b=a.length;--b>-1;)a[b].API===ca.API&&(R[(new a[b])._propName]=a[b]);return!0},s.plugin=function(a){if(!(a&&a.propName&&a.init&&a.API))throw"illegal plugin definition.";var b,c=a.propName,d=a.priority||0,e=a.overwriteProps,f={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_mod",mod:"_mod",initAll:"_onInitAllProps"},g=t("plugins."+c.charAt(0).toUpperCase()+c.substr(1)+"Plugin",function(){ca.call(this,c,d),this._overwriteProps=e||[]},a.global===!0),h=g.prototype=new ca(c);h.constructor=g,g.API=a.API;for(b in f)"function"==typeof a[b]&&(h[f[b]]=a[b]);return g.version=a.version,ca.activate([g]),g},f=a._gsQueue){for(g=0;g<f.length;g++)f[g]();for(h in q)q[h].func||a.console.log("GSAP encountered missing dependency: "+h)}j=!1}}("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenLite");
/*!
 * VERSION: 1.20.4
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(a,b,c){var d=function(a){b.call(this,a),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var c,d,e=this.vars;for(d in e)c=e[d],i(c)&&-1!==c.join("").indexOf("{self}")&&(e[d]=this._swapSelfInParams(c));i(e.tweens)&&this.add(e.tweens,0,e.align,e.stagger)},e=1e-10,f=c._internals,g=d._internals={},h=f.isSelector,i=f.isArray,j=f.lazyTweens,k=f.lazyRender,l=_gsScope._gsDefine.globals,m=function(a){var b,c={};for(b in a)c[b]=a[b];return c},n=function(a,b,c){var d,e,f=a.cycle;for(d in f)e=f[d],a[d]="function"==typeof e?e(c,b[c]):e[c%e.length];delete a.cycle},o=g.pauseCallback=function(){},p=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},q=d.prototype=new b;return d.version="1.20.4",q.constructor=d,q.kill()._gc=q._forcingPlayhead=q._hasPause=!1,q.to=function(a,b,d,e){var f=d.repeat&&l.TweenMax||c;return b?this.add(new f(a,b,d),e):this.set(a,d,e)},q.from=function(a,b,d,e){return this.add((d.repeat&&l.TweenMax||c).from(a,b,d),e)},q.fromTo=function(a,b,d,e,f){var g=e.repeat&&l.TweenMax||c;return b?this.add(g.fromTo(a,b,d,e),f):this.set(a,e,f)},q.staggerTo=function(a,b,e,f,g,i,j,k){var l,o,q=new d({onComplete:i,onCompleteParams:j,callbackScope:k,smoothChildTiming:this.smoothChildTiming}),r=e.cycle;for("string"==typeof a&&(a=c.selector(a)||a),a=a||[],h(a)&&(a=p(a)),f=f||0,0>f&&(a=p(a),a.reverse(),f*=-1),o=0;o<a.length;o++)l=m(e),l.startAt&&(l.startAt=m(l.startAt),l.startAt.cycle&&n(l.startAt,a,o)),r&&(n(l,a,o),null!=l.duration&&(b=l.duration,delete l.duration)),q.to(a[o],b,l,o*f);return this.add(q,g)},q.staggerFrom=function(a,b,c,d,e,f,g,h){return c.immediateRender=0!=c.immediateRender,c.runBackwards=!0,this.staggerTo(a,b,c,d,e,f,g,h)},q.staggerFromTo=function(a,b,c,d,e,f,g,h,i){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,this.staggerTo(a,b,d,e,f,g,h,i)},q.call=function(a,b,d,e){return this.add(c.delayedCall(0,a,b,d),e)},q.set=function(a,b,d){return d=this._parseTimeOrLabel(d,0,!0),null==b.immediateRender&&(b.immediateRender=d===this._time&&!this._paused),this.add(new c(a,0,b),d)},d.exportRoot=function(a,b){a=a||{},null==a.smoothChildTiming&&(a.smoothChildTiming=!0);var e,f,g,h,i=new d(a),j=i._timeline;for(null==b&&(b=!0),j._remove(i,!0),i._startTime=0,i._rawPrevTime=i._time=i._totalTime=j._time,g=j._first;g;)h=g._next,b&&g instanceof c&&g.target===g.vars.onComplete||(f=g._startTime-g._delay,0>f&&(e=1),i.add(g,f)),g=h;return j.add(i,0),e&&i.totalDuration(),i},q.add=function(e,f,g,h){var j,k,l,m,n,o;if("number"!=typeof f&&(f=this._parseTimeOrLabel(f,0,!0,e)),!(e instanceof a)){if(e instanceof Array||e&&e.push&&i(e)){for(g=g||"normal",h=h||0,j=f,k=e.length,l=0;k>l;l++)i(m=e[l])&&(m=new d({tweens:m})),this.add(m,j),"string"!=typeof m&&"function"!=typeof m&&("sequence"===g?j=m._startTime+m.totalDuration()/m._timeScale:"start"===g&&(m._startTime-=m.delay())),j+=h;return this._uncache(!0)}if("string"==typeof e)return this.addLabel(e,f);if("function"!=typeof e)throw"Cannot add "+e+" into the timeline; it is not a tween, timeline, function, or string.";e=c.delayedCall(0,e)}if(b.prototype.add.call(this,e,f),e._time&&e.render((this.rawTime()-e._startTime)*e._timeScale,!1,!1),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(n=this,o=n.rawTime()>e._startTime;n._timeline;)o&&n._timeline.smoothChildTiming?n.totalTime(n._totalTime,!0):n._gc&&n._enabled(!0,!1),n=n._timeline;return this},q.remove=function(b){if(b instanceof a){this._remove(b,!1);var c=b._timeline=b.vars.useFrames?a._rootFramesTimeline:a._rootTimeline;return b._startTime=(b._paused?b._pauseTime:c._time)-(b._reversed?b.totalDuration()-b._totalTime:b._totalTime)/b._timeScale,this}if(b instanceof Array||b&&b.push&&i(b)){for(var d=b.length;--d>-1;)this.remove(b[d]);return this}return"string"==typeof b?this.removeLabel(b):this.kill(null,b)},q._remove=function(a,c){b.prototype._remove.call(this,a,c);var d=this._last;return d?this._time>this.duration()&&(this._time=this._duration,this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},q.append=function(a,b){return this.add(a,this._parseTimeOrLabel(null,b,!0,a))},q.insert=q.insertMultiple=function(a,b,c,d){return this.add(a,b||0,c,d)},q.appendMultiple=function(a,b,c,d){return this.add(a,this._parseTimeOrLabel(null,b,!0,a),c,d)},q.addLabel=function(a,b){return this._labels[a]=this._parseTimeOrLabel(b),this},q.addPause=function(a,b,d,e){var f=c.delayedCall(0,o,d,e||this);return f.vars.onComplete=f.vars.onReverseComplete=b,f.data="isPause",this._hasPause=!0,this.add(f,a)},q.removeLabel=function(a){return delete this._labels[a],this},q.getLabelTime=function(a){return null!=this._labels[a]?this._labels[a]:-1},q._parseTimeOrLabel=function(b,c,d,e){var f,g;if(e instanceof a&&e.timeline===this)this.remove(e);else if(e&&(e instanceof Array||e.push&&i(e)))for(g=e.length;--g>-1;)e[g]instanceof a&&e[g].timeline===this&&this.remove(e[g]);if(f="number"!=typeof b||c?this.duration()>99999999999?this.recent().endTime(!1):this._duration:0,"string"==typeof c)return this._parseTimeOrLabel(c,d&&"number"==typeof b&&null==this._labels[c]?b-f:0,d);if(c=c||0,"string"!=typeof b||!isNaN(b)&&null==this._labels[b])null==b&&(b=f);else{if(g=b.indexOf("="),-1===g)return null==this._labels[b]?d?this._labels[b]=f+c:c:this._labels[b]+c;c=parseInt(b.charAt(g-1)+"1",10)*Number(b.substr(g+1)),b=g>1?this._parseTimeOrLabel(b.substr(0,g-1),0,d):f}return Number(b)+c},q.seek=function(a,b){return this.totalTime("number"==typeof a?a:this._parseTimeOrLabel(a),b!==!1)},q.stop=function(){return this.paused(!0)},q.gotoAndPlay=function(a,b){return this.play(a,b)},q.gotoAndStop=function(a,b){return this.pause(a,b)},q.render=function(a,b,c){this._gc&&this._enabled(!0,!1);var d,f,g,h,i,l,m,n=this._time,o=this._dirty?this.totalDuration():this._totalDuration,p=this._startTime,q=this._timeScale,r=this._paused;if(n!==this._time&&(a+=this._time-n),a>=o-1e-7&&a>=0)this._totalTime=this._time=o,this._reversed||this._hasPausedChild()||(f=!0,h="onComplete",i=!!this._timeline.autoRemoveChildren,0===this._duration&&(0>=a&&a>=-1e-7||this._rawPrevTime<0||this._rawPrevTime===e)&&this._rawPrevTime!==a&&this._first&&(i=!0,this._rawPrevTime>e&&(h="onReverseComplete"))),this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,a=o+1e-4;else if(1e-7>a)if(this._totalTime=this._time=0,(0!==n||0===this._duration&&this._rawPrevTime!==e&&(this._rawPrevTime>0||0>a&&this._rawPrevTime>=0))&&(h="onReverseComplete",f=this._reversed),0>a)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(i=f=!0,h="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(i=!0),this._rawPrevTime=a;else{if(this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,0===a&&f)for(d=this._first;d&&0===d._startTime;)d._duration||(f=!1),d=d._next;a=0,this._initted||(i=!0)}else{if(this._hasPause&&!this._forcingPlayhead&&!b){if(a>=n)for(d=this._first;d&&d._startTime<=a&&!l;)d._duration||"isPause"!==d.data||d.ratio||0===d._startTime&&0===this._rawPrevTime||(l=d),d=d._next;else for(d=this._last;d&&d._startTime>=a&&!l;)d._duration||"isPause"===d.data&&d._rawPrevTime>0&&(l=d),d=d._prev;l&&(this._time=a=l._startTime,this._totalTime=a+this._cycle*(this._totalDuration+this._repeatDelay))}this._totalTime=this._time=this._rawPrevTime=a}if(this._time!==n&&this._first||c||i||l){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==n&&a>0&&(this._active=!0),0===n&&this.vars.onStart&&(0===this._time&&this._duration||b||this._callback("onStart")),m=this._time,m>=n)for(d=this._first;d&&(g=d._next,m===this._time&&(!this._paused||r));)(d._active||d._startTime<=m&&!d._paused&&!d._gc)&&(l===d&&this.pause(),d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)),d=g;else for(d=this._last;d&&(g=d._prev,m===this._time&&(!this._paused||r));){if(d._active||d._startTime<=n&&!d._paused&&!d._gc){if(l===d){for(l=d._prev;l&&l.endTime()>this._time;)l.render(l._reversed?l.totalDuration()-(a-l._startTime)*l._timeScale:(a-l._startTime)*l._timeScale,b,c),l=l._prev;l=null,this.pause()}d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)}d=g}this._onUpdate&&(b||(j.length&&k(),this._callback("onUpdate"))),h&&(this._gc||(p===this._startTime||q!==this._timeScale)&&(0===this._time||o>=this.totalDuration())&&(f&&(j.length&&k(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[h]&&this._callback(h)))}},q._hasPausedChild=function(){for(var a=this._first;a;){if(a._paused||a instanceof d&&a._hasPausedChild())return!0;a=a._next}return!1},q.getChildren=function(a,b,d,e){e=e||-9999999999;for(var f=[],g=this._first,h=0;g;)g._startTime<e||(g instanceof c?b!==!1&&(f[h++]=g):(d!==!1&&(f[h++]=g),a!==!1&&(f=f.concat(g.getChildren(!0,b,d)),h=f.length))),g=g._next;return f},q.getTweensOf=function(a,b){var d,e,f=this._gc,g=[],h=0;for(f&&this._enabled(!0,!0),d=c.getTweensOf(a),e=d.length;--e>-1;)(d[e].timeline===this||b&&this._contains(d[e]))&&(g[h++]=d[e]);return f&&this._enabled(!1,!0),g},q.recent=function(){return this._recent},q._contains=function(a){for(var b=a.timeline;b;){if(b===this)return!0;b=b.timeline}return!1},q.shiftChildren=function(a,b,c){c=c||0;for(var d,e=this._first,f=this._labels;e;)e._startTime>=c&&(e._startTime+=a),e=e._next;if(b)for(d in f)f[d]>=c&&(f[d]+=a);return this._uncache(!0)},q._kill=function(a,b){if(!a&&!b)return this._enabled(!1,!1);for(var c=b?this.getTweensOf(b):this.getChildren(!0,!0,!1),d=c.length,e=!1;--d>-1;)c[d]._kill(a,b)&&(e=!0);return e},q.clear=function(a){var b=this.getChildren(!1,!0,!0),c=b.length;for(this._time=this._totalTime=0;--c>-1;)b[c]._enabled(!1,!1);return a!==!1&&(this._labels={}),this._uncache(!0)},q.invalidate=function(){for(var b=this._first;b;)b.invalidate(),b=b._next;return a.prototype.invalidate.call(this)},q._enabled=function(a,c){if(a===this._gc)for(var d=this._first;d;)d._enabled(a,!0),d=d._next;return b.prototype._enabled.call(this,a,c)},q.totalTime=function(b,c,d){this._forcingPlayhead=!0;var e=a.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},q.duration=function(a){return arguments.length?(0!==this.duration()&&0!==a&&this.timeScale(this._duration/a),this):(this._dirty&&this.totalDuration(),this._duration)},q.totalDuration=function(a){if(!arguments.length){if(this._dirty){for(var b,c,d=0,e=this._last,f=999999999999;e;)b=e._prev,e._dirty&&e.totalDuration(),e._startTime>f&&this._sortChildren&&!e._paused&&!this._calculatingDuration?(this._calculatingDuration=1,this.add(e,e._startTime-e._delay),this._calculatingDuration=0):f=e._startTime,e._startTime<0&&!e._paused&&(d-=e._startTime,this._timeline.smoothChildTiming&&(this._startTime+=e._startTime/this._timeScale,this._time-=e._startTime,this._totalTime-=e._startTime,this._rawPrevTime-=e._startTime),this.shiftChildren(-e._startTime,!1,-9999999999),f=0),c=e._startTime+e._totalDuration/e._timeScale,c>d&&(d=c),e=b;this._duration=this._totalDuration=d,this._dirty=!1}return this._totalDuration}return a&&this.totalDuration()?this.timeScale(this._totalDuration/a):this},q.paused=function(b){if(!b)for(var c=this._first,d=this._time;c;)c._startTime===d&&"isPause"===c.data&&(c._rawPrevTime=0),c=c._next;return a.prototype.paused.apply(this,arguments)},q.usesFrames=function(){for(var b=this._timeline;b._timeline;)b=b._timeline;return b===a._rootFramesTimeline},q.rawTime=function(a){return a&&(this._paused||this._repeat&&this.time()>0&&this.totalProgress()<1)?this._totalTime%(this._duration+this._repeatDelay):this._paused?this._totalTime:(this._timeline.rawTime(a)-this._startTime)*this._timeScale},d},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"undefined"!=typeof module&&module.exports?(require("./TweenLite.min.js"),module.exports=b()):"function"==typeof define&&define.amd&&define(["TweenLite"],b)}("TimelineLite");
/*
	 _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
				   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
	Docs: http://kenwheeler.github.io/slick
	Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
(function(i) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
})(function(i) {
	"use strict";
	var e = window.Slick || {};
	e = function() {
		function e(e, o) {
			var s, n = this;
			n.defaults = {
				accessibility: !0,
				adaptiveHeight: !1,
				appendArrows: i(e),
				appendDots: i(e),
				arrows: !0,
				asNavFor: null,
				prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
				nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
				autoplay: !1,
				autoplaySpeed: 3e3,
				centerMode: !1,
				centerPadding: "50px",
				cssEase: "ease",
				customPaging: function(e, t) {
					return i('<button type="button" />').text(t + 1)
				},
				dots: !1,
				dotsClass: "slick-dots",
				draggable: !0,
				easing: "linear",
				edgeFriction: .35,
				fade: !1,
				focusOnSelect: !1,
				focusOnChange: !1,
				infinite: !0,
				initialSlide: 0,
				lazyLoad: "ondemand",
				mobileFirst: !1,
				pauseOnHover: !0,
				pauseOnFocus: !0,
				pauseOnDotsHover: !1,
				respondTo: "window",
				responsive: null,
				rows: 1,
				rtl: !1,
				slide: "",
				slidesPerRow: 1,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: !0,
				swipeToSlide: !1,
				touchMove: !0,
				touchThreshold: 5,
				useCSS: !0,
				useTransform: !0,
				variableWidth: !1,
				vertical: !1,
				verticalSwiping: !1,
				waitForAnimate: !0,
				zIndex: 1e3
			}, n.initials = {
				animating: !1,
				dragging: !1,
				autoPlayTimer: null,
				currentDirection: 0,
				currentLeft: null,
				currentSlide: 0,
				direction: 1,
				$dots: null,
				listWidth: null,
				listHeight: null,
				loadIndex: 0,
				$nextArrow: null,
				$prevArrow: null,
				scrolling: !1,
				slideCount: null,
				slideWidth: null,
				$slideTrack: null,
				$slides: null,
				sliding: !1,
				slideOffset: 0,
				swipeLeft: null,
				swiping: !1,
				$list: null,
				touchObject: {},
				transformsEnabled: !1,
				unslicked: !1
			}, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(e), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(e).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = t++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
		}
		var t = 0;
		return e
	}(), e.prototype.activateADA = function() {
		var i = this;
		i.$slideTrack.find(".slick-active").attr({
			"aria-hidden": "false"
		}).find("a, input, button, select").attr({
			tabindex: "0"
		})
	}, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
		var s = this;
		if ("boolean" == typeof t) o = t, t = null;
		else if (t < 0 || t >= s.slideCount) return !1;
		s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : o === !0 ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
			i(t).attr("data-slick-index", e)
		}), s.$slidesCache = s.$slides, s.reinit()
	}, e.prototype.animateHeight = function() {
		var i = this;
		if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
			var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
			i.$list.animate({
				height: e
			}, i.options.speed)
		}
	}, e.prototype.animateSlide = function(e, t) {
		var o = {},
			s = this;
		s.animateHeight(), s.options.rtl === !0 && s.options.vertical === !1 && (e = -e), s.transformsEnabled === !1 ? s.options.vertical === !1 ? s.$slideTrack.animate({
			left: e
		}, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
			top: e
		}, s.options.speed, s.options.easing, t) : s.cssTransitions === !1 ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft), i({
			animStart: s.currentLeft
		}).animate({
			animStart: e
		}, {
			duration: s.options.speed,
			easing: s.options.easing,
			step: function(i) {
				i = Math.ceil(i), s.options.vertical === !1 ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
			},
			complete: function() {
				t && t.call()
			}
		})) : (s.applyTransition(), e = Math.ceil(e), s.options.vertical === !1 ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
			s.disableTransition(), t.call()
		}, s.options.speed))
	}, e.prototype.getNavTarget = function() {
		var e = this,
			t = e.options.asNavFor;
		return t && null !== t && (t = i(t).not(e.$slider)), t
	}, e.prototype.asNavFor = function(e) {
		var t = this,
			o = t.getNavTarget();
		null !== o && "object" == typeof o && o.each(function() {
			var t = i(this).slick("getSlick");
			t.unslicked || t.slideHandler(e, !0)
		})
	}, e.prototype.applyTransition = function(i) {
		var e = this,
			t = {};
		e.options.fade === !1 ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
	}, e.prototype.autoPlay = function() {
		var i = this;
		i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
	}, e.prototype.autoPlayClear = function() {
		var i = this;
		i.autoPlayTimer && clearInterval(i.autoPlayTimer)
	}, e.prototype.autoPlayIterator = function() {
		var i = this,
			e = i.currentSlide + i.options.slidesToScroll;
		i.paused || i.interrupted || i.focussed || (i.options.infinite === !1 && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 === 0 && (i.direction = 1))), i.slideHandler(e))
	}, e.prototype.buildArrows = function() {
		var e = this;
		e.options.arrows === !0 && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
			"aria-disabled": "true",
			tabindex: "-1"
		}))
	}, e.prototype.buildDots = function() {
		var e, t, o = this;
		if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
			for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
			o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
		}
	}, e.prototype.buildOut = function() {
		var e = this;
		e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
			i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
		}), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), e.options.centerMode !== !0 && e.options.swipeToSlide !== !0 || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
	}, e.prototype.buildRows = function() {
		var i, e, t, o, s, n, r, l = this;
		if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 0) {
			for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
				var d = document.createElement("div");
				for (e = 0; e < l.options.rows; e++) {
					var a = document.createElement("div");
					for (t = 0; t < l.options.slidesPerRow; t++) {
						var c = i * r + (e * l.options.slidesPerRow + t);
						n.get(c) && a.appendChild(n.get(c))
					}
					d.appendChild(a)
				}
				o.appendChild(d)
			}
			l.$slider.empty().append(o), l.$slider.children().children().children().css({
				width: 100 / l.options.slidesPerRow + "%",
				display: "inline-block"
			})
		}
	}, e.prototype.checkResponsive = function(e, t) {
		var o, s, n, r = this,
			l = !1,
			d = r.$slider.width(),
			a = window.innerWidth || i(window).width();
		if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
			s = null;
			for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
			null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || l === !1 || r.$slider.trigger("breakpoint", [r, l])
		}
	}, e.prototype.changeSlide = function(e, t) {
		var o, s, n, r = this,
			l = i(e.currentTarget);
		switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll !== 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
			case "previous":
				s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
				break;
			case "next":
				s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
				break;
			case "index":
				var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
				r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
				break;
			default:
				return
		}
	}, e.prototype.checkNavigable = function(i) {
		var e, t, o = this;
		if (e = o.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
		else
			for (var s in e) {
				if (i < e[s]) {
					i = t;
					break
				}
				t = e[s]
			}
		return i
	}, e.prototype.cleanUpEvents = function() {
		var e = this;
		e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), e.options.accessibility === !0 && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), e.options.accessibility === !0 && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
	}, e.prototype.cleanUpSlideEvents = function() {
		var e = this;
		e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
	}, e.prototype.cleanUpRows = function() {
		var i, e = this;
		e.options.rows > 0 && (i = e.$slides.children().children(), i.removeAttr("style"), e.$slider.empty().append(i))
	}, e.prototype.clickHandler = function(i) {
		var e = this;
		e.shouldClick === !1 && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
	}, e.prototype.destroy = function(e) {
		var t = this;
		t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
			i(this).attr("style", i(this).data("originalStyling"))
		}), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
	}, e.prototype.disableTransition = function(i) {
		var e = this,
			t = {};
		t[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
	}, e.prototype.fadeSlide = function(i, e) {
		var t = this;
		t.cssTransitions === !1 ? (t.$slides.eq(i).css({
			zIndex: t.options.zIndex
		}), t.$slides.eq(i).animate({
			opacity: 1
		}, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
			opacity: 1,
			zIndex: t.options.zIndex
		}), e && setTimeout(function() {
			t.disableTransition(i), e.call()
		}, t.options.speed))
	}, e.prototype.fadeSlideOut = function(i) {
		var e = this;
		e.cssTransitions === !1 ? e.$slides.eq(i).animate({
			opacity: 0,
			zIndex: e.options.zIndex - 2
		}, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
			opacity: 0,
			zIndex: e.options.zIndex - 2
		}))
	}, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
		var e = this;
		null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
	}, e.prototype.focusHandler = function() {
		var e = this;
		e.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(t) {
			var o = i(this);
			setTimeout(function() {
				e.options.pauseOnFocus && o.is(":focus") && (e.focussed = !0, e.autoPlay())
			}, 0)
		}).on("blur.slick", "*", function(t) {
			i(this);
			e.options.pauseOnFocus && (e.focussed = !1, e.autoPlay())
		})
	}, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
		var i = this;
		return i.currentSlide
	}, e.prototype.getDotCount = function() {
		var i = this,
			e = 0,
			t = 0,
			o = 0;
		if (i.options.infinite === !0)
			if (i.slideCount <= i.options.slidesToShow) ++o;
			else
				for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
		else if (i.options.centerMode === !0) o = i.slideCount;
		else if (i.options.asNavFor)
			for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
		else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
		return o - 1
	}, e.prototype.getLeft = function(i) {
		var e, t, o, s, n = this,
			r = 0;
		return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, n.options.vertical === !0 && n.options.centerMode === !0 && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll !== 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = n.options.vertical === !1 ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, n.options.variableWidth === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, n.options.centerMode === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
	}, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
		var e = this;
		return e.options[i]
	}, e.prototype.getNavigableIndexes = function() {
		var i, e = this,
			t = 0,
			o = 0,
			s = [];
		for (e.options.infinite === !1 ? i = e.slideCount : (t = e.options.slidesToScroll * -1, o = e.options.slidesToScroll * -1, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
		return s
	}, e.prototype.getSlick = function() {
		return this
	}, e.prototype.getSlideCount = function() {
		var e, t, o, s, n = this;
		return s = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0, o = n.swipeLeft * -1 + s, n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function(e, s) {
			var r, l, d;
			if (r = i(s).outerWidth(), l = s.offsetLeft, n.options.centerMode !== !0 && (l += r / 2), d = l + r, o < d) return t = s, !1
		}), e = Math.abs(i(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
	}, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
		var t = this;
		t.changeSlide({
			data: {
				message: "index",
				index: parseInt(i)
			}
		}, e)
	}, e.prototype.init = function(e) {
		var t = this;
		i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), t.options.accessibility === !0 && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
	}, e.prototype.initADA = function() {
		var e = this,
			t = Math.ceil(e.slideCount / e.options.slidesToShow),
			o = e.getNavigableIndexes().filter(function(i) {
				return i >= 0 && i < e.slideCount
			});
		e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
			"aria-hidden": "true",
			tabindex: "-1"
		}).find("a, input, button, select").attr({
			tabindex: "-1"
		}), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
			var s = o.indexOf(t);
			if (i(this).attr({
					role: "tabpanel",
					id: "slick-slide" + e.instanceUid + t,
					tabindex: -1
				}), s !== -1) {
				var n = "slick-slide-control" + e.instanceUid + s;
				i("#" + n).length && i(this).attr({
					"aria-describedby": n
				})
			}
		}), e.$dots.attr("role", "tablist").find("li").each(function(s) {
			var n = o[s];
			i(this).attr({
				role: "presentation"
			}), i(this).find("button").first().attr({
				role: "tab",
				id: "slick-slide-control" + e.instanceUid + s,
				"aria-controls": "slick-slide" + e.instanceUid + n,
				"aria-label": s + 1 + " of " + t,
				"aria-selected": null,
				tabindex: "-1"
			})
		}).eq(e.currentSlide).find("button").attr({
			"aria-selected": "true",
			tabindex: "0"
		}).end());
		for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.options.focusOnChange ? e.$slides.eq(s).attr({
			tabindex: "0"
		}) : e.$slides.eq(s).removeAttr("tabindex");
		e.activateADA()
	}, e.prototype.initArrowEvents = function() {
		var i = this;
		i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
			message: "previous"
		}, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
			message: "next"
		}, i.changeSlide), i.options.accessibility === !0 && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
	}, e.prototype.initDotEvents = function() {
		var e = this;
		e.options.dots === !0 && e.slideCount > e.options.slidesToShow && (i("li", e.$dots).on("click.slick", {
			message: "index"
		}, e.changeSlide), e.options.accessibility === !0 && e.$dots.on("keydown.slick", e.keyHandler)), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.slideCount > e.options.slidesToShow && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
	}, e.prototype.initSlideEvents = function() {
		var e = this;
		e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
	}, e.prototype.initializeEvents = function() {
		var e = this;
		e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
			action: "start"
		}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
			action: "move"
		}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
			action: "end"
		}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
			action: "end"
		}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
	}, e.prototype.initUI = function() {
		var i = this;
		i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.show()
	}, e.prototype.keyHandler = function(i) {
		var e = this;
		i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && e.options.accessibility === !0 ? e.changeSlide({
			data: {
				message: e.options.rtl === !0 ? "next" : "previous"
			}
		}) : 39 === i.keyCode && e.options.accessibility === !0 && e.changeSlide({
			data: {
				message: e.options.rtl === !0 ? "previous" : "next"
			}
		}))
	}, e.prototype.lazyLoad = function() {
		function e(e) {
			i("img[data-lazy]", e).each(function() {
				var e = i(this),
					t = i(this).attr("data-lazy"),
					o = i(this).attr("data-srcset"),
					s = i(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
					n = document.createElement("img");
				n.onload = function() {
					e.animate({
						opacity: 0
					}, 100, function() {
						o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
							opacity: 1
						}, 200, function() {
							e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
						}), r.$slider.trigger("lazyLoaded", [r, e, t])
					})
				}, n.onerror = function() {
					e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, t])
				}, n.src = t
			})
		}
		var t, o, s, n, r = this;
		if (r.options.centerMode === !0 ? r.options.infinite === !0 ? (s = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = s + r.options.slidesToShow + 2) : (s = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (s = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(s + r.options.slidesToShow), r.options.fade === !0 && (s > 0 && s--, n <= r.slideCount && n++)), t = r.$slider.find(".slick-slide").slice(s, n), "anticipated" === r.options.lazyLoad)
			for (var l = s - 1, d = n, a = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) l < 0 && (l = r.slideCount - 1), t = t.add(a.eq(l)), t = t.add(a.eq(d)), l--, d++;
		e(t), r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"), e(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(r.options.slidesToShow * -1), e(o))
	}, e.prototype.loadSlider = function() {
		var i = this;
		i.setPosition(), i.$slideTrack.css({
			opacity: 1
		}), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
	}, e.prototype.next = e.prototype.slickNext = function() {
		var i = this;
		i.changeSlide({
			data: {
				message: "next"
			}
		})
	}, e.prototype.orientationChange = function() {
		var i = this;
		i.checkResponsive(), i.setPosition()
	}, e.prototype.pause = e.prototype.slickPause = function() {
		var i = this;
		i.autoPlayClear(), i.paused = !0
	}, e.prototype.play = e.prototype.slickPlay = function() {
		var i = this;
		i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
	}, e.prototype.postSlide = function(e) {
		var t = this;
		if (!t.unslicked && (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), t.options.accessibility === !0 && (t.initADA(), t.options.focusOnChange))) {
			var o = i(t.$slides.get(t.currentSlide));
			o.attr("tabindex", 0).focus()
		}
	}, e.prototype.prev = e.prototype.slickPrev = function() {
		var i = this;
		i.changeSlide({
			data: {
				message: "previous"
			}
		})
	}, e.prototype.preventDefault = function(i) {
		i.preventDefault()
	}, e.prototype.progressiveLazyLoad = function(e) {
		e = e || 1;
		var t, o, s, n, r, l = this,
			d = i("img[data-lazy]", l.$slider);
		d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), r = document.createElement("img"), r.onload = function() {
			s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), l.options.adaptiveHeight === !0 && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
		}, r.onerror = function() {
			e < 3 ? setTimeout(function() {
				l.progressiveLazyLoad(e + 1)
			}, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
		}, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
	}, e.prototype.refresh = function(e) {
		var t, o, s = this;
		o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
			currentSlide: t
		}), s.init(), e || s.changeSlide({
			data: {
				message: "index",
				index: t
			}
		}, !1)
	}, e.prototype.registerBreakpoints = function() {
		var e, t, o, s = this,
			n = s.options.responsive || null;
		if ("array" === i.type(n) && n.length) {
			s.respondTo = s.options.respondTo || "window";
			for (e in n)
				if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
					for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
					s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
				} s.breakpoints.sort(function(i, e) {
				return s.options.mobileFirst ? i - e : e - i
			})
		}
	}, e.prototype.reinit = function() {
		var e = this;
		e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
	}, e.prototype.resize = function() {
		var e = this;
		i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
			e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
		}, 50))
	}, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
		var o = this;
		return "boolean" == typeof i ? (e = i, i = e === !0 ? 0 : o.slideCount - 1) : i = e === !0 ? --i : i, !(o.slideCount < 1 || i < 0 || i > o.slideCount - 1) && (o.unload(), t === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
	}, e.prototype.setCSS = function(i) {
		var e, t, o = this,
			s = {};
		o.options.rtl === !0 && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, o.transformsEnabled === !1 ? o.$slideTrack.css(s) : (s = {}, o.cssTransitions === !1 ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
	}, e.prototype.setDimensions = function() {
		var i = this;
		i.options.vertical === !1 ? i.options.centerMode === !0 && i.$list.css({
			padding: "0px " + i.options.centerPadding
		}) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), i.options.centerMode === !0 && i.$list.css({
			padding: i.options.centerPadding + " 0px"
		})), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), i.options.vertical === !1 && i.options.variableWidth === !1 ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : i.options.variableWidth === !0 ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
		var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
		i.options.variableWidth === !1 && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
	}, e.prototype.setFade = function() {
		var e, t = this;
		t.$slides.each(function(o, s) {
			e = t.slideWidth * o * -1, t.options.rtl === !0 ? i(s).css({
				position: "relative",
				right: e,
				top: 0,
				zIndex: t.options.zIndex - 2,
				opacity: 0
			}) : i(s).css({
				position: "relative",
				left: e,
				top: 0,
				zIndex: t.options.zIndex - 2,
				opacity: 0
			})
		}), t.$slides.eq(t.currentSlide).css({
			zIndex: t.options.zIndex - 1,
			opacity: 1
		})
	}, e.prototype.setHeight = function() {
		var i = this;
		if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
			var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
			i.$list.css("height", e)
		}
	}, e.prototype.setOption = e.prototype.slickSetOption = function() {
		var e, t, o, s, n, r = this,
			l = !1;
		if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : "undefined" != typeof arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
		else if ("multiple" === n) i.each(o, function(i, e) {
			r.options[i] = e
		});
		else if ("responsive" === n)
			for (t in s)
				if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
				else {
					for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
					r.options.responsive.push(s[t])
				} l && (r.unload(), r.reinit())
	}, e.prototype.setPosition = function() {
		var i = this;
		i.setDimensions(), i.setHeight(), i.options.fade === !1 ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
	}, e.prototype.setProps = function() {
		var i = this,
			e = document.body.style;
		i.positionProp = i.options.vertical === !0 ? "top" : "left",
			"top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || i.options.useCSS === !0 && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && i.animType !== !1 && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && i.animType !== !1
	}, e.prototype.setSlideClasses = function(i) {
		var e, t, o, s, n = this;
		if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), n.options.centerMode === !0) {
			var r = n.options.slidesToShow % 2 === 0 ? 1 : 0;
			e = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
		} else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = n.options.infinite === !0 ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
		"ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
	}, e.prototype.setupInfinite = function() {
		var e, t, o, s = this;
		if (s.options.fade === !0 && (s.options.centerMode = !1), s.options.infinite === !0 && s.options.fade === !1 && (t = null, s.slideCount > s.options.slidesToShow)) {
			for (o = s.options.centerMode === !0 ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
			for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
			s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
				i(this).attr("id", "")
			})
		}
	}, e.prototype.interrupt = function(i) {
		var e = this;
		i || e.autoPlay(), e.interrupted = i
	}, e.prototype.selectHandler = function(e) {
		var t = this,
			o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
			s = parseInt(o.attr("data-slick-index"));
		return s || (s = 0), t.slideCount <= t.options.slidesToShow ? void t.slideHandler(s, !1, !0) : void t.slideHandler(s)
	}, e.prototype.slideHandler = function(i, e, t) {
		var o, s, n, r, l, d = null,
			a = this;
		if (e = e || !1, !(a.animating === !0 && a.options.waitForAnimate === !0 || a.options.fade === !0 && a.currentSlide === i)) return e === !1 && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, a.options.infinite === !1 && a.options.centerMode === !1 && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll) ? void(a.options.fade === !1 && (o = a.currentSlide, t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function() {
			a.postSlide(o)
		}) : a.postSlide(o))) : a.options.infinite === !1 && a.options.centerMode === !0 && (i < 0 || i > a.slideCount - a.options.slidesToScroll) ? void(a.options.fade === !1 && (o = a.currentSlide, t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function() {
			a.postSlide(o)
		}) : a.postSlide(o))) : (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll !== 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll !== 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = a.getNavTarget(), l = l.slick("getSlick"), l.slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide)), a.updateDots(), a.updateArrows(), a.options.fade === !0 ? (t !== !0 ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
			a.postSlide(s)
		})) : a.postSlide(s), void a.animateHeight()) : void(t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(d, function() {
			a.postSlide(s)
		}) : a.postSlide(s)))
	}, e.prototype.startLoad = function() {
		var i = this;
		i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
	}, e.prototype.swipeDirection = function() {
		var i, e, t, o, s = this;
		return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), o = Math.round(180 * t / Math.PI), o < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? s.options.rtl === !1 ? "left" : "right" : o <= 360 && o >= 315 ? s.options.rtl === !1 ? "left" : "right" : o >= 135 && o <= 225 ? s.options.rtl === !1 ? "right" : "left" : s.options.verticalSwiping === !0 ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
	}, e.prototype.swipeEnd = function(i) {
		var e, t, o = this;
		if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
		if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
		if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
			switch (t = o.swipeDirection()) {
				case "left":
				case "down":
					e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
					break;
				case "right":
				case "up":
					e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
			}
			"vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
		} else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
	}, e.prototype.swipeHandler = function(i) {
		var e = this;
		if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && i.type.indexOf("mouse") !== -1)) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
			case "start":
				e.swipeStart(i);
				break;
			case "move":
				e.swipeMove(i);
				break;
			case "end":
				e.swipeEnd(i)
		}
	}, e.prototype.swipeMove = function(i) {
		var e, t, o, s, n, r, l = this;
		return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (l.options.verticalSwiping === !0 && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (l.options.rtl === !1 ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), l.options.verticalSwiping === !0 && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, l.options.infinite === !1 && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), l.options.vertical === !1 ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s), l.options.fade !== !0 && l.options.touchMove !== !1 && (l.animating === !0 ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
	}, e.prototype.swipeStart = function(i) {
		var e, t = this;
		return t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, void(t.dragging = !0))
	}, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
		var i = this;
		null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
	}, e.prototype.unload = function() {
		var e = this;
		i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
	}, e.prototype.unslick = function(i) {
		var e = this;
		e.$slider.trigger("unslick", [e, i]), e.destroy()
	}, e.prototype.updateArrows = function() {
		var i, e = this;
		i = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
	}, e.prototype.updateDots = function() {
		var i = this;
		null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
	}, e.prototype.visibility = function() {
		var i = this;
		i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
	}, i.fn.slick = function() {
		var i, t, o = this,
			s = arguments[0],
			n = Array.prototype.slice.call(arguments, 1),
			r = o.length;
		for (i = 0; i < r; i++)
			if ("object" == typeof s || "undefined" == typeof s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), "undefined" != typeof t) return t;
		return o
	}
});

/*!
 * VERSION: 1.20.4
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(a,b,c){var d=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},e=function(a,b,c){var d,e,f=a.cycle;for(d in f)e=f[d],a[d]="function"==typeof e?e(c,b[c]):e[c%e.length];delete a.cycle},f=function(a,b,d){c.call(this,a,b,d),this._cycle=0,this._yoyo=this.vars.yoyo===!0||!!this.vars.yoyoEase,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._repeat&&this._uncache(!0),this.render=f.prototype.render},g=1e-10,h=c._internals,i=h.isSelector,j=h.isArray,k=f.prototype=c.to({},.1,{}),l=[];f.version="1.20.4",k.constructor=f,k.kill()._gc=!1,f.killTweensOf=f.killDelayedCallsTo=c.killTweensOf,f.getTweensOf=c.getTweensOf,f.lagSmoothing=c.lagSmoothing,f.ticker=c.ticker,f.render=c.render,k.invalidate=function(){return this._yoyo=this.vars.yoyo===!0||!!this.vars.yoyoEase,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._yoyoEase=null,this._uncache(!0),c.prototype.invalidate.call(this)},k.updateTo=function(a,b){var d,e=this.ratio,f=this.vars.immediateRender||a.immediateRender;b&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(d in a)this.vars[d]=a[d];if(this._initted||f)if(b)this._initted=!1,f&&this.render(0,!0,!0);else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&c._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var g=this._totalTime;this.render(0,!0,!1),this._initted=!1,this.render(g,!0,!1)}else if(this._initted=!1,this._init(),this._time>0||f)for(var h,i=1/(1-e),j=this._firstPT;j;)h=j.s+j.c,j.c*=i,j.s=h-j.c,j=j._next;return this},k.render=function(a,b,d){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var e,f,i,j,k,l,m,n,o,p=this._dirty?this.totalDuration():this._totalDuration,q=this._time,r=this._totalTime,s=this._cycle,t=this._duration,u=this._rawPrevTime;if(a>=p-1e-7&&a>=0?(this._totalTime=p,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=t,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(e=!0,f="onComplete",d=d||this._timeline.autoRemoveChildren),0===t&&(this._initted||!this.vars.lazy||d)&&(this._startTime===this._timeline._duration&&(a=0),(0>u||0>=a&&a>=-1e-7||u===g&&"isPause"!==this.data)&&u!==a&&(d=!0,u>g&&(f="onReverseComplete")),this._rawPrevTime=n=!b||a||u===a?a:g)):1e-7>a?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==r||0===t&&u>0)&&(f="onReverseComplete",e=this._reversed),0>a&&(this._active=!1,0===t&&(this._initted||!this.vars.lazy||d)&&(u>=0&&(d=!0),this._rawPrevTime=n=!b||a||u===a?a:g)),this._initted||(d=!0)):(this._totalTime=this._time=a,0!==this._repeat&&(j=t+this._repeatDelay,this._cycle=this._totalTime/j>>0,0!==this._cycle&&this._cycle===this._totalTime/j&&a>=r&&this._cycle--,this._time=this._totalTime-this._cycle*j,this._yoyo&&0!==(1&this._cycle)&&(this._time=t-this._time,o=this._yoyoEase||this.vars.yoyoEase,o&&(this._yoyoEase||(o!==!0||this._initted?this._yoyoEase=o=o===!0?this._ease:o instanceof Ease?o:Ease.map[o]:(o=this.vars.ease,this._yoyoEase=o=o?o instanceof Ease?o:"function"==typeof o?new Ease(o,this.vars.easeParams):Ease.map[o]||c.defaultEase:c.defaultEase)),this.ratio=o?1-o.getRatio((t-this._time)/t):0)),this._time>t?this._time=t:this._time<0&&(this._time=0)),this._easeType&&!o?(k=this._time/t,l=this._easeType,m=this._easePower,(1===l||3===l&&k>=.5)&&(k=1-k),3===l&&(k*=2),1===m?k*=k:2===m?k*=k*k:3===m?k*=k*k*k:4===m&&(k*=k*k*k*k),1===l?this.ratio=1-k:2===l?this.ratio=k:this._time/t<.5?this.ratio=k/2:this.ratio=1-k/2):o||(this.ratio=this._ease.getRatio(this._time/t))),q===this._time&&!d&&s===this._cycle)return void(r!==this._totalTime&&this._onUpdate&&(b||this._callback("onUpdate")));if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!d&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=q,this._totalTime=r,this._rawPrevTime=u,this._cycle=s,h.lazyTweens.push(this),void(this._lazy=[a,b]);!this._time||e||o?e&&this._ease._calcEnd&&!o&&(this.ratio=this._ease.getRatio(0===this._time?0:1)):this.ratio=this._ease.getRatio(this._time/t)}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==q&&a>=0&&(this._active=!0),0===r&&(2===this._initted&&a>0&&this._init(),this._startAt&&(a>=0?this._startAt.render(a,!0,d):f||(f="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===t)&&(b||this._callback("onStart"))),i=this._firstPT;i;)i.f?i.t[i.p](i.c*this.ratio+i.s):i.t[i.p]=i.c*this.ratio+i.s,i=i._next;this._onUpdate&&(0>a&&this._startAt&&this._startTime&&this._startAt.render(a,!0,d),b||(this._totalTime!==r||f)&&this._callback("onUpdate")),this._cycle!==s&&(b||this._gc||this.vars.onRepeat&&this._callback("onRepeat")),f&&(!this._gc||d)&&(0>a&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(a,!0,d),e&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[f]&&this._callback(f),0===t&&this._rawPrevTime===g&&n!==g&&(this._rawPrevTime=0))},f.to=function(a,b,c){return new f(a,b,c)},f.from=function(a,b,c){return c.runBackwards=!0,c.immediateRender=0!=c.immediateRender,new f(a,b,c)},f.fromTo=function(a,b,c,d){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,new f(a,b,d)},f.staggerTo=f.allTo=function(a,b,g,h,k,m,n){h=h||0;var o,p,q,r,s=0,t=[],u=function(){g.onComplete&&g.onComplete.apply(g.onCompleteScope||this,arguments),k.apply(n||g.callbackScope||this,m||l)},v=g.cycle,w=g.startAt&&g.startAt.cycle;for(j(a)||("string"==typeof a&&(a=c.selector(a)||a),i(a)&&(a=d(a))),a=a||[],0>h&&(a=d(a),a.reverse(),h*=-1),o=a.length-1,q=0;o>=q;q++){p={};for(r in g)p[r]=g[r];if(v&&(e(p,a,q),null!=p.duration&&(b=p.duration,delete p.duration)),w){w=p.startAt={};for(r in g.startAt)w[r]=g.startAt[r];e(p.startAt,a,q)}p.delay=s+(p.delay||0),q===o&&k&&(p.onComplete=u),t[q]=new f(a[q],b,p),s+=h}return t},f.staggerFrom=f.allFrom=function(a,b,c,d,e,g,h){return c.runBackwards=!0,c.immediateRender=0!=c.immediateRender,f.staggerTo(a,b,c,d,e,g,h)},f.staggerFromTo=f.allFromTo=function(a,b,c,d,e,g,h,i){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,f.staggerTo(a,b,d,e,g,h,i)},f.delayedCall=function(a,b,c,d,e){return new f(b,0,{delay:a,onComplete:b,onCompleteParams:c,callbackScope:d,onReverseComplete:b,onReverseCompleteParams:c,immediateRender:!1,useFrames:e,overwrite:0})},f.set=function(a,b){return new f(a,0,b)},f.isTweening=function(a){return c.getTweensOf(a,!0).length>0};var m=function(a,b){for(var d=[],e=0,f=a._first;f;)f instanceof c?d[e++]=f:(b&&(d[e++]=f),d=d.concat(m(f,b)),e=d.length),f=f._next;return d},n=f.getAllTweens=function(b){return m(a._rootTimeline,b).concat(m(a._rootFramesTimeline,b))};f.killAll=function(a,c,d,e){null==c&&(c=!0),null==d&&(d=!0);var f,g,h,i=n(0!=e),j=i.length,k=c&&d&&e;for(h=0;j>h;h++)g=i[h],(k||g instanceof b||(f=g.target===g.vars.onComplete)&&d||c&&!f)&&(a?g.totalTime(g._reversed?0:g.totalDuration()):g._enabled(!1,!1))},f.killChildTweensOf=function(a,b){if(null!=a){var e,g,k,l,m,n=h.tweenLookup;if("string"==typeof a&&(a=c.selector(a)||a),i(a)&&(a=d(a)),j(a))for(l=a.length;--l>-1;)f.killChildTweensOf(a[l],b);else{e=[];for(k in n)for(g=n[k].target.parentNode;g;)g===a&&(e=e.concat(n[k].tweens)),g=g.parentNode;for(m=e.length,l=0;m>l;l++)b&&e[l].totalTime(e[l].totalDuration()),e[l]._enabled(!1,!1)}}};var o=function(a,c,d,e){c=c!==!1,d=d!==!1,e=e!==!1;for(var f,g,h=n(e),i=c&&d&&e,j=h.length;--j>-1;)g=h[j],(i||g instanceof b||(f=g.target===g.vars.onComplete)&&d||c&&!f)&&g.paused(a)};return f.pauseAll=function(a,b,c){o(!0,a,b,c)},f.resumeAll=function(a,b,c){o(!1,a,b,c)},f.globalTimeScale=function(b){var d=a._rootTimeline,e=c.ticker.time;return arguments.length?(b=b||g,d._startTime=e-(e-d._startTime)*d._timeScale/b,d=a._rootFramesTimeline,e=c.ticker.frame,d._startTime=e-(e-d._startTime)*d._timeScale/b,d._timeScale=a._rootTimeline._timeScale=b,b):d._timeScale},k.progress=function(a,b){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),b):this._time/this.duration()},k.totalProgress=function(a,b){return arguments.length?this.totalTime(this.totalDuration()*a,b):this._totalTime/this.totalDuration()},k.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this._yoyo&&0!==(1&this._cycle)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(a,b)):this._time},k.duration=function(b){return arguments.length?a.prototype.duration.call(this,b):this._duration},k.totalDuration=function(a){return arguments.length?-1===this._repeat?this:this.duration((a-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},k.repeat=function(a){return arguments.length?(this._repeat=a,this._uncache(!0)):this._repeat},k.repeatDelay=function(a){return arguments.length?(this._repeatDelay=a,this._uncache(!0)):this._repeatDelay},k.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},f},!0),_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(a,b,c){var d=function(a){b.call(this,a),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var c,d,e=this.vars;for(d in e)c=e[d],i(c)&&-1!==c.join("").indexOf("{self}")&&(e[d]=this._swapSelfInParams(c));i(e.tweens)&&this.add(e.tweens,0,e.align,e.stagger)},e=1e-10,f=c._internals,g=d._internals={},h=f.isSelector,i=f.isArray,j=f.lazyTweens,k=f.lazyRender,l=_gsScope._gsDefine.globals,m=function(a){var b,c={};for(b in a)c[b]=a[b];return c},n=function(a,b,c){var d,e,f=a.cycle;for(d in f)e=f[d],a[d]="function"==typeof e?e(c,b[c]):e[c%e.length];delete a.cycle},o=g.pauseCallback=function(){},p=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},q=d.prototype=new b;return d.version="1.20.4",q.constructor=d,q.kill()._gc=q._forcingPlayhead=q._hasPause=!1,q.to=function(a,b,d,e){var f=d.repeat&&l.TweenMax||c;return b?this.add(new f(a,b,d),e):this.set(a,d,e)},q.from=function(a,b,d,e){return this.add((d.repeat&&l.TweenMax||c).from(a,b,d),e)},q.fromTo=function(a,b,d,e,f){var g=e.repeat&&l.TweenMax||c;return b?this.add(g.fromTo(a,b,d,e),f):this.set(a,e,f)},q.staggerTo=function(a,b,e,f,g,i,j,k){var l,o,q=new d({onComplete:i,onCompleteParams:j,callbackScope:k,smoothChildTiming:this.smoothChildTiming}),r=e.cycle;for("string"==typeof a&&(a=c.selector(a)||a),a=a||[],h(a)&&(a=p(a)),f=f||0,0>f&&(a=p(a),a.reverse(),f*=-1),o=0;o<a.length;o++)l=m(e),l.startAt&&(l.startAt=m(l.startAt),l.startAt.cycle&&n(l.startAt,a,o)),r&&(n(l,a,o),null!=l.duration&&(b=l.duration,delete l.duration)),q.to(a[o],b,l,o*f);return this.add(q,g)},q.staggerFrom=function(a,b,c,d,e,f,g,h){return c.immediateRender=0!=c.immediateRender,c.runBackwards=!0,this.staggerTo(a,b,c,d,e,f,g,h)},q.staggerFromTo=function(a,b,c,d,e,f,g,h,i){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,this.staggerTo(a,b,d,e,f,g,h,i)},q.call=function(a,b,d,e){return this.add(c.delayedCall(0,a,b,d),e)},q.set=function(a,b,d){return d=this._parseTimeOrLabel(d,0,!0),null==b.immediateRender&&(b.immediateRender=d===this._time&&!this._paused),this.add(new c(a,0,b),d)},d.exportRoot=function(a,b){a=a||{},null==a.smoothChildTiming&&(a.smoothChildTiming=!0);var e,f,g,h,i=new d(a),j=i._timeline;for(null==b&&(b=!0),j._remove(i,!0),i._startTime=0,i._rawPrevTime=i._time=i._totalTime=j._time,g=j._first;g;)h=g._next,b&&g instanceof c&&g.target===g.vars.onComplete||(f=g._startTime-g._delay,0>f&&(e=1),i.add(g,f)),g=h;return j.add(i,0),e&&i.totalDuration(),i},q.add=function(e,f,g,h){var j,k,l,m,n,o;if("number"!=typeof f&&(f=this._parseTimeOrLabel(f,0,!0,e)),!(e instanceof a)){if(e instanceof Array||e&&e.push&&i(e)){for(g=g||"normal",h=h||0,j=f,k=e.length,l=0;k>l;l++)i(m=e[l])&&(m=new d({tweens:m})),this.add(m,j),"string"!=typeof m&&"function"!=typeof m&&("sequence"===g?j=m._startTime+m.totalDuration()/m._timeScale:"start"===g&&(m._startTime-=m.delay())),j+=h;return this._uncache(!0)}if("string"==typeof e)return this.addLabel(e,f);if("function"!=typeof e)throw"Cannot add "+e+" into the timeline; it is not a tween, timeline, function, or string.";e=c.delayedCall(0,e)}if(b.prototype.add.call(this,e,f),e._time&&e.render((this.rawTime()-e._startTime)*e._timeScale,!1,!1),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(n=this,o=n.rawTime()>e._startTime;n._timeline;)o&&n._timeline.smoothChildTiming?n.totalTime(n._totalTime,!0):n._gc&&n._enabled(!0,!1),n=n._timeline;return this},q.remove=function(b){if(b instanceof a){this._remove(b,!1);var c=b._timeline=b.vars.useFrames?a._rootFramesTimeline:a._rootTimeline;return b._startTime=(b._paused?b._pauseTime:c._time)-(b._reversed?b.totalDuration()-b._totalTime:b._totalTime)/b._timeScale,this}if(b instanceof Array||b&&b.push&&i(b)){for(var d=b.length;--d>-1;)this.remove(b[d]);return this}return"string"==typeof b?this.removeLabel(b):this.kill(null,b)},q._remove=function(a,c){b.prototype._remove.call(this,a,c);var d=this._last;return d?this._time>this.duration()&&(this._time=this._duration,this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},q.append=function(a,b){return this.add(a,this._parseTimeOrLabel(null,b,!0,a))},q.insert=q.insertMultiple=function(a,b,c,d){return this.add(a,b||0,c,d)},q.appendMultiple=function(a,b,c,d){return this.add(a,this._parseTimeOrLabel(null,b,!0,a),c,d)},q.addLabel=function(a,b){return this._labels[a]=this._parseTimeOrLabel(b),this},q.addPause=function(a,b,d,e){var f=c.delayedCall(0,o,d,e||this);return f.vars.onComplete=f.vars.onReverseComplete=b,f.data="isPause",this._hasPause=!0,this.add(f,a)},q.removeLabel=function(a){return delete this._labels[a],this},q.getLabelTime=function(a){return null!=this._labels[a]?this._labels[a]:-1},q._parseTimeOrLabel=function(b,c,d,e){var f,g;if(e instanceof a&&e.timeline===this)this.remove(e);else if(e&&(e instanceof Array||e.push&&i(e)))for(g=e.length;--g>-1;)e[g]instanceof a&&e[g].timeline===this&&this.remove(e[g]);if(f="number"!=typeof b||c?this.duration()>99999999999?this.recent().endTime(!1):this._duration:0,"string"==typeof c)return this._parseTimeOrLabel(c,d&&"number"==typeof b&&null==this._labels[c]?b-f:0,d);if(c=c||0,"string"!=typeof b||!isNaN(b)&&null==this._labels[b])null==b&&(b=f);else{if(g=b.indexOf("="),-1===g)return null==this._labels[b]?d?this._labels[b]=f+c:c:this._labels[b]+c;c=parseInt(b.charAt(g-1)+"1",10)*Number(b.substr(g+1)),b=g>1?this._parseTimeOrLabel(b.substr(0,g-1),0,d):f}return Number(b)+c},q.seek=function(a,b){return this.totalTime("number"==typeof a?a:this._parseTimeOrLabel(a),b!==!1)},q.stop=function(){return this.paused(!0)},q.gotoAndPlay=function(a,b){return this.play(a,b)},q.gotoAndStop=function(a,b){return this.pause(a,b)},q.render=function(a,b,c){this._gc&&this._enabled(!0,!1);var d,f,g,h,i,l,m,n=this._time,o=this._dirty?this.totalDuration():this._totalDuration,p=this._startTime,q=this._timeScale,r=this._paused;if(n!==this._time&&(a+=this._time-n),a>=o-1e-7&&a>=0)this._totalTime=this._time=o,this._reversed||this._hasPausedChild()||(f=!0,h="onComplete",i=!!this._timeline.autoRemoveChildren,0===this._duration&&(0>=a&&a>=-1e-7||this._rawPrevTime<0||this._rawPrevTime===e)&&this._rawPrevTime!==a&&this._first&&(i=!0,this._rawPrevTime>e&&(h="onReverseComplete"))),this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,a=o+1e-4;else if(1e-7>a)if(this._totalTime=this._time=0,(0!==n||0===this._duration&&this._rawPrevTime!==e&&(this._rawPrevTime>0||0>a&&this._rawPrevTime>=0))&&(h="onReverseComplete",f=this._reversed),0>a)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(i=f=!0,h="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(i=!0),this._rawPrevTime=a;else{if(this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,0===a&&f)for(d=this._first;d&&0===d._startTime;)d._duration||(f=!1),d=d._next;a=0,this._initted||(i=!0)}else{if(this._hasPause&&!this._forcingPlayhead&&!b){if(a>=n)for(d=this._first;d&&d._startTime<=a&&!l;)d._duration||"isPause"!==d.data||d.ratio||0===d._startTime&&0===this._rawPrevTime||(l=d),d=d._next;else for(d=this._last;d&&d._startTime>=a&&!l;)d._duration||"isPause"===d.data&&d._rawPrevTime>0&&(l=d),d=d._prev;l&&(this._time=a=l._startTime,this._totalTime=a+this._cycle*(this._totalDuration+this._repeatDelay))}this._totalTime=this._time=this._rawPrevTime=a}if(this._time!==n&&this._first||c||i||l){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==n&&a>0&&(this._active=!0),0===n&&this.vars.onStart&&(0===this._time&&this._duration||b||this._callback("onStart")),m=this._time,m>=n)for(d=this._first;d&&(g=d._next,m===this._time&&(!this._paused||r));)(d._active||d._startTime<=m&&!d._paused&&!d._gc)&&(l===d&&this.pause(),d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)),d=g;else for(d=this._last;d&&(g=d._prev,m===this._time&&(!this._paused||r));){if(d._active||d._startTime<=n&&!d._paused&&!d._gc){if(l===d){for(l=d._prev;l&&l.endTime()>this._time;)l.render(l._reversed?l.totalDuration()-(a-l._startTime)*l._timeScale:(a-l._startTime)*l._timeScale,b,c),l=l._prev;l=null,this.pause()}d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)}d=g}this._onUpdate&&(b||(j.length&&k(),this._callback("onUpdate"))),h&&(this._gc||(p===this._startTime||q!==this._timeScale)&&(0===this._time||o>=this.totalDuration())&&(f&&(j.length&&k(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[h]&&this._callback(h)))}},q._hasPausedChild=function(){for(var a=this._first;a;){if(a._paused||a instanceof d&&a._hasPausedChild())return!0;a=a._next}return!1},q.getChildren=function(a,b,d,e){e=e||-9999999999;for(var f=[],g=this._first,h=0;g;)g._startTime<e||(g instanceof c?b!==!1&&(f[h++]=g):(d!==!1&&(f[h++]=g),a!==!1&&(f=f.concat(g.getChildren(!0,b,d)),h=f.length))),g=g._next;return f},q.getTweensOf=function(a,b){var d,e,f=this._gc,g=[],h=0;for(f&&this._enabled(!0,!0),d=c.getTweensOf(a),e=d.length;--e>-1;)(d[e].timeline===this||b&&this._contains(d[e]))&&(g[h++]=d[e]);return f&&this._enabled(!1,!0),g},q.recent=function(){return this._recent},q._contains=function(a){for(var b=a.timeline;b;){if(b===this)return!0;b=b.timeline}return!1},q.shiftChildren=function(a,b,c){c=c||0;for(var d,e=this._first,f=this._labels;e;)e._startTime>=c&&(e._startTime+=a),e=e._next;if(b)for(d in f)f[d]>=c&&(f[d]+=a);return this._uncache(!0)},q._kill=function(a,b){if(!a&&!b)return this._enabled(!1,!1);for(var c=b?this.getTweensOf(b):this.getChildren(!0,!0,!1),d=c.length,e=!1;--d>-1;)c[d]._kill(a,b)&&(e=!0);return e},q.clear=function(a){var b=this.getChildren(!1,!0,!0),c=b.length;for(this._time=this._totalTime=0;--c>-1;)b[c]._enabled(!1,!1);return a!==!1&&(this._labels={}),this._uncache(!0)},q.invalidate=function(){for(var b=this._first;b;)b.invalidate(),b=b._next;return a.prototype.invalidate.call(this)},q._enabled=function(a,c){if(a===this._gc)for(var d=this._first;d;)d._enabled(a,!0),d=d._next;return b.prototype._enabled.call(this,a,c)},q.totalTime=function(b,c,d){this._forcingPlayhead=!0;var e=a.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},q.duration=function(a){return arguments.length?(0!==this.duration()&&0!==a&&this.timeScale(this._duration/a),this):(this._dirty&&this.totalDuration(),this._duration)},q.totalDuration=function(a){if(!arguments.length){if(this._dirty){for(var b,c,d=0,e=this._last,f=999999999999;e;)b=e._prev,e._dirty&&e.totalDuration(),e._startTime>f&&this._sortChildren&&!e._paused&&!this._calculatingDuration?(this._calculatingDuration=1,this.add(e,e._startTime-e._delay),this._calculatingDuration=0):f=e._startTime,e._startTime<0&&!e._paused&&(d-=e._startTime,this._timeline.smoothChildTiming&&(this._startTime+=e._startTime/this._timeScale,this._time-=e._startTime,this._totalTime-=e._startTime,this._rawPrevTime-=e._startTime),this.shiftChildren(-e._startTime,!1,-9999999999),f=0),c=e._startTime+e._totalDuration/e._timeScale,c>d&&(d=c),e=b;this._duration=this._totalDuration=d,this._dirty=!1}return this._totalDuration}return a&&this.totalDuration()?this.timeScale(this._totalDuration/a):this},q.paused=function(b){if(!b)for(var c=this._first,d=this._time;c;)c._startTime===d&&"isPause"===c.data&&(c._rawPrevTime=0),c=c._next;return a.prototype.paused.apply(this,arguments)},q.usesFrames=function(){for(var b=this._timeline;b._timeline;)b=b._timeline;return b===a._rootFramesTimeline},q.rawTime=function(a){return a&&(this._paused||this._repeat&&this.time()>0&&this.totalProgress()<1)?this._totalTime%(this._duration+this._repeatDelay):this._paused?this._totalTime:(this._timeline.rawTime(a)-this._startTime)*this._timeScale},d},!0),_gsScope._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(a,b,c){var d=function(b){a.call(this,b),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},e=1e-10,f=b._internals,g=f.lazyTweens,h=f.lazyRender,i=_gsScope._gsDefine.globals,j=new c(null,null,1,0),k=d.prototype=new a;return k.constructor=d,k.kill()._gc=!1,d.version="1.20.4",k.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),a.prototype.invalidate.call(this)},k.addCallback=function(a,c,d,e){return this.add(b.delayedCall(0,a,d,e),c)},k.removeCallback=function(a,b){if(a)if(null==b)this._kill(null,a);else for(var c=this.getTweensOf(a,!1),d=c.length,e=this._parseTimeOrLabel(b);--d>-1;)c[d]._startTime===e&&c[d]._enabled(!1,!1);return this},k.removePause=function(b){return this.removeCallback(a._internals.pauseCallback,b)},k.tweenTo=function(a,c){c=c||{};var d,e,f,g={ease:j,useFrames:this.usesFrames(),immediateRender:!1,lazy:!1},h=c.repeat&&i.TweenMax||b;for(e in c)g[e]=c[e];return g.time=this._parseTimeOrLabel(a),d=Math.abs(Number(g.time)-this._time)/this._timeScale||.001,f=new h(this,d,g),g.onStart=function(){f.target.paused(!0),f.vars.time===f.target.time()||d!==f.duration()||f.isFromTo||f.duration(Math.abs(f.vars.time-f.target.time())/f.target._timeScale).render(f.time(),!0,!0),c.onStart&&c.onStart.apply(c.onStartScope||c.callbackScope||f,c.onStartParams||[])},f},k.tweenFromTo=function(a,b,c){c=c||{},a=this._parseTimeOrLabel(a),c.startAt={onComplete:this.seek,onCompleteParams:[a],callbackScope:this},c.immediateRender=c.immediateRender!==!1;var d=this.tweenTo(b,c);return d.isFromTo=1,d.duration(Math.abs(d.vars.time-a)/this._timeScale||.001)},k.render=function(a,b,c){this._gc&&this._enabled(!0,!1);var d,f,i,j,k,l,m,n,o=this._time,p=this._dirty?this.totalDuration():this._totalDuration,q=this._duration,r=this._totalTime,s=this._startTime,t=this._timeScale,u=this._rawPrevTime,v=this._paused,w=this._cycle;if(o!==this._time&&(a+=this._time-o),a>=p-1e-7&&a>=0)this._locked||(this._totalTime=p,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(f=!0,j="onComplete",k=!!this._timeline.autoRemoveChildren,0===this._duration&&(0>=a&&a>=-1e-7||0>u||u===e)&&u!==a&&this._first&&(k=!0,u>e&&(j="onReverseComplete"))),this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,this._yoyo&&0!==(1&this._cycle)?this._time=a=0:(this._time=q,a=q+1e-4);else if(1e-7>a)if(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==o||0===q&&u!==e&&(u>0||0>a&&u>=0)&&!this._locked)&&(j="onReverseComplete",f=this._reversed),0>a)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(k=f=!0,j="onReverseComplete"):u>=0&&this._first&&(k=!0),this._rawPrevTime=a;else{if(this._rawPrevTime=q||!b||a||this._rawPrevTime===a?a:e,0===a&&f)for(d=this._first;d&&0===d._startTime;)d._duration||(f=!1),d=d._next;a=0,this._initted||(k=!0)}else if(0===q&&0>u&&(k=!0),this._time=this._rawPrevTime=a,this._locked||(this._totalTime=a,0!==this._repeat&&(l=q+this._repeatDelay,this._cycle=this._totalTime/l>>0,0!==this._cycle&&this._cycle===this._totalTime/l&&a>=r&&this._cycle--,this._time=this._totalTime-this._cycle*l,this._yoyo&&0!==(1&this._cycle)&&(this._time=q-this._time),this._time>q?(this._time=q,a=q+1e-4):this._time<0?this._time=a=0:a=this._time)),this._hasPause&&!this._forcingPlayhead&&!b){if(a=this._time,a>=o||this._repeat&&w!==this._cycle)for(d=this._first;d&&d._startTime<=a&&!m;)d._duration||"isPause"!==d.data||d.ratio||0===d._startTime&&0===this._rawPrevTime||(m=d),d=d._next;else for(d=this._last;d&&d._startTime>=a&&!m;)d._duration||"isPause"===d.data&&d._rawPrevTime>0&&(m=d),d=d._prev;m&&m._startTime<q&&(this._time=a=m._startTime,this._totalTime=a+this._cycle*(this._totalDuration+this._repeatDelay))}if(this._cycle!==w&&!this._locked){var x=this._yoyo&&0!==(1&w),y=x===(this._yoyo&&0!==(1&this._cycle)),z=this._totalTime,A=this._cycle,B=this._rawPrevTime,C=this._time;if(this._totalTime=w*q,this._cycle<w?x=!x:this._totalTime+=q,this._time=o,this._rawPrevTime=0===q?u-1e-4:u,this._cycle=w,this._locked=!0,o=x?0:q,this.render(o,b,0===q),b||this._gc||this.vars.onRepeat&&(this._cycle=A,this._locked=!1,this._callback("onRepeat")),o!==this._time)return;if(y&&(this._cycle=w,this._locked=!0,o=x?q+1e-4:-1e-4,this.render(o,!0,!1)),this._locked=!1,this._paused&&!v)return;this._time=C,this._totalTime=z,this._cycle=A,this._rawPrevTime=B}if(!(this._time!==o&&this._first||c||k||m))return void(r!==this._totalTime&&this._onUpdate&&(b||this._callback("onUpdate")));if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==r&&a>0&&(this._active=!0),0===r&&this.vars.onStart&&(0===this._totalTime&&this._totalDuration||b||this._callback("onStart")),n=this._time,n>=o)for(d=this._first;d&&(i=d._next,n===this._time&&(!this._paused||v));)(d._active||d._startTime<=this._time&&!d._paused&&!d._gc)&&(m===d&&this.pause(),d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)),d=i;else for(d=this._last;d&&(i=d._prev,n===this._time&&(!this._paused||v));){if(d._active||d._startTime<=o&&!d._paused&&!d._gc){if(m===d){for(m=d._prev;m&&m.endTime()>this._time;)m.render(m._reversed?m.totalDuration()-(a-m._startTime)*m._timeScale:(a-m._startTime)*m._timeScale,b,c),m=m._prev;m=null,this.pause()}d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)}d=i}this._onUpdate&&(b||(g.length&&h(),this._callback("onUpdate"))),j&&(this._locked||this._gc||(s===this._startTime||t!==this._timeScale)&&(0===this._time||p>=this.totalDuration())&&(f&&(g.length&&h(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[j]&&this._callback(j)))},k.getActive=function(a,b,c){null==a&&(a=!0),null==b&&(b=!0),null==c&&(c=!1);var d,e,f=[],g=this.getChildren(a,b,c),h=0,i=g.length;for(d=0;i>d;d++)e=g[d],e.isActive()&&(f[h++]=e);return f},k.getLabelAfter=function(a){a||0!==a&&(a=this._time);var b,c=this.getLabelsArray(),d=c.length;for(b=0;d>b;b++)if(c[b].time>a)return c[b].name;return null},k.getLabelBefore=function(a){null==a&&(a=this._time);for(var b=this.getLabelsArray(),c=b.length;--c>-1;)if(b[c].time<a)return b[c].name;return null},k.getLabelsArray=function(){var a,b=[],c=0;for(a in this._labels)b[c++]={time:this._labels[a],name:a};return b.sort(function(a,b){return a.time-b.time}),b},k.invalidate=function(){return this._locked=!1,a.prototype.invalidate.call(this)},k.progress=function(a,b){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),b):this._time/this.duration()||0},k.totalProgress=function(a,b){return arguments.length?this.totalTime(this.totalDuration()*a,b):this._totalTime/this.totalDuration()||0},k.totalDuration=function(b){return arguments.length?-1!==this._repeat&&b?this.timeScale(this.totalDuration()/b):this:(this._dirty&&(a.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},k.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this._yoyo&&0!==(1&this._cycle)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(a,b)):this._time},k.repeat=function(a){return arguments.length?(this._repeat=a,this._uncache(!0)):this._repeat},k.repeatDelay=function(a){return arguments.length?(this._repeatDelay=a,this._uncache(!0)):this._repeatDelay},k.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},k.currentLabel=function(a){return arguments.length?this.seek(a,!0):this.getLabelBefore(this._time+1e-8)},d},!0),function(){var a=180/Math.PI,b=[],c=[],d=[],e={},f=_gsScope._gsDefine.globals,g=function(a,b,c,d){c===d&&(c=d-(d-b)/1e6),a===b&&(b=a+(c-a)/1e6),this.a=a,this.b=b,this.c=c,this.d=d,this.da=d-a,this.ca=c-a,this.ba=b-a},h=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",i=function(a,b,c,d){var e={a:a},f={},g={},h={c:d},i=(a+b)/2,j=(b+c)/2,k=(c+d)/2,l=(i+j)/2,m=(j+k)/2,n=(m-l)/8;return e.b=i+(a-i)/4,f.b=l+n,e.c=f.a=(e.b+f.b)/2,f.c=g.a=(l+m)/2,g.b=m-n,h.b=k+(d-k)/4,g.c=h.a=(g.b+h.b)/2,[e,f,g,h]},j=function(a,e,f,g,h){var j,k,l,m,n,o,p,q,r,s,t,u,v,w=a.length-1,x=0,y=a[0].a;for(j=0;w>j;j++)n=a[x],k=n.a,l=n.d,m=a[x+1].d,h?(t=b[j],u=c[j],v=(u+t)*e*.25/(g?.5:d[j]||.5),o=l-(l-k)*(g?.5*e:0!==t?v/t:0),p=l+(m-l)*(g?.5*e:0!==u?v/u:0),q=l-(o+((p-o)*(3*t/(t+u)+.5)/4||0))):(o=l-(l-k)*e*.5,p=l+(m-l)*e*.5,q=l-(o+p)/2),o+=q,p+=q,n.c=r=o,0!==j?n.b=y:n.b=y=n.a+.6*(n.c-n.a),n.da=l-k,n.ca=r-k,n.ba=y-k,f?(s=i(k,y,r,l),a.splice(x,1,s[0],s[1],s[2],s[3]),x+=4):x++,y=p;n=a[x],n.b=y,n.c=y+.4*(n.d-y),n.da=n.d-n.a,n.ca=n.c-n.a,n.ba=y-n.a,f&&(s=i(n.a,y,n.c,n.d),a.splice(x,1,s[0],s[1],s[2],s[3]))},k=function(a,d,e,f){var h,i,j,k,l,m,n=[];if(f)for(a=[f].concat(a),i=a.length;--i>-1;)"string"==typeof(m=a[i][d])&&"="===m.charAt(1)&&(a[i][d]=f[d]+Number(m.charAt(0)+m.substr(2)));if(h=a.length-2,0>h)return n[0]=new g(a[0][d],0,0,a[0][d]),n;for(i=0;h>i;i++)j=a[i][d],k=a[i+1][d],n[i]=new g(j,0,0,k),e&&(l=a[i+2][d],b[i]=(b[i]||0)+(k-j)*(k-j),c[i]=(c[i]||0)+(l-k)*(l-k));return n[i]=new g(a[i][d],0,0,a[i+1][d]),n},l=function(a,f,g,i,l,m){var n,o,p,q,r,s,t,u,v={},w=[],x=m||a[0];l="string"==typeof l?","+l+",":h,null==f&&(f=1);for(o in a[0])w.push(o);if(a.length>1){for(u=a[a.length-1],t=!0,n=w.length;--n>-1;)if(o=w[n],Math.abs(x[o]-u[o])>.05){t=!1;break}t&&(a=a.concat(),m&&a.unshift(m),a.push(a[1]),m=a[a.length-3])}for(b.length=c.length=d.length=0,n=w.length;--n>-1;)o=w[n],e[o]=-1!==l.indexOf(","+o+","),v[o]=k(a,o,e[o],m);for(n=b.length;--n>-1;)b[n]=Math.sqrt(b[n]),c[n]=Math.sqrt(c[n]);if(!i){for(n=w.length;--n>-1;)if(e[o])for(p=v[w[n]],
s=p.length-1,q=0;s>q;q++)r=p[q+1].da/c[q]+p[q].da/b[q]||0,d[q]=(d[q]||0)+r*r;for(n=d.length;--n>-1;)d[n]=Math.sqrt(d[n])}for(n=w.length,q=g?4:1;--n>-1;)o=w[n],p=v[o],j(p,f,g,i,e[o]),t&&(p.splice(0,q),p.splice(p.length-q,q));return v},m=function(a,b,c){b=b||"soft";var d,e,f,h,i,j,k,l,m,n,o,p={},q="cubic"===b?3:2,r="soft"===b,s=[];if(r&&c&&(a=[c].concat(a)),null==a||a.length<q+1)throw"invalid Bezier data";for(m in a[0])s.push(m);for(j=s.length;--j>-1;){for(m=s[j],p[m]=i=[],n=0,l=a.length,k=0;l>k;k++)d=null==c?a[k][m]:"string"==typeof(o=a[k][m])&&"="===o.charAt(1)?c[m]+Number(o.charAt(0)+o.substr(2)):Number(o),r&&k>1&&l-1>k&&(i[n++]=(d+i[n-2])/2),i[n++]=d;for(l=n-q+1,n=0,k=0;l>k;k+=q)d=i[k],e=i[k+1],f=i[k+2],h=2===q?0:i[k+3],i[n++]=o=3===q?new g(d,e,f,h):new g(d,(2*e+d)/3,(2*e+f)/3,f);i.length=n}return p},n=function(a,b,c){for(var d,e,f,g,h,i,j,k,l,m,n,o=1/c,p=a.length;--p>-1;)for(m=a[p],f=m.a,g=m.d-f,h=m.c-f,i=m.b-f,d=e=0,k=1;c>=k;k++)j=o*k,l=1-j,d=e-(e=(j*j*g+3*l*(j*h+l*i))*j),n=p*c+k-1,b[n]=(b[n]||0)+d*d},o=function(a,b){b=b>>0||6;var c,d,e,f,g=[],h=[],i=0,j=0,k=b-1,l=[],m=[];for(c in a)n(a[c],g,b);for(e=g.length,d=0;e>d;d++)i+=Math.sqrt(g[d]),f=d%b,m[f]=i,f===k&&(j+=i,f=d/b>>0,l[f]=m,h[f]=j,i=0,m=[]);return{length:j,lengths:h,segments:l}},p=_gsScope._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.8",API:2,global:!0,init:function(a,b,c){this._target=a,b instanceof Array&&(b={values:b}),this._func={},this._mod={},this._props=[],this._timeRes=null==b.timeResolution?6:parseInt(b.timeResolution,10);var d,e,f,g,h,i=b.values||[],j={},k=i[0],n=b.autoRotate||c.vars.orientToBezier;this._autoRotate=n?n instanceof Array?n:[["x","y","rotation",n===!0?0:Number(n)||0]]:null;for(d in k)this._props.push(d);for(f=this._props.length;--f>-1;)d=this._props[f],this._overwriteProps.push(d),e=this._func[d]="function"==typeof a[d],j[d]=e?a[d.indexOf("set")||"function"!=typeof a["get"+d.substr(3)]?d:"get"+d.substr(3)]():parseFloat(a[d]),h||j[d]!==i[0][d]&&(h=j);if(this._beziers="cubic"!==b.type&&"quadratic"!==b.type&&"soft"!==b.type?l(i,isNaN(b.curviness)?1:b.curviness,!1,"thruBasic"===b.type,b.correlate,h):m(i,b.type,j),this._segCount=this._beziers[d].length,this._timeRes){var p=o(this._beziers,this._timeRes);this._length=p.length,this._lengths=p.lengths,this._segments=p.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(n=this._autoRotate)for(this._initialRotations=[],n[0]instanceof Array||(this._autoRotate=n=[n]),f=n.length;--f>-1;){for(g=0;3>g;g++)d=n[f][g],this._func[d]="function"==typeof a[d]?a[d.indexOf("set")||"function"!=typeof a["get"+d.substr(3)]?d:"get"+d.substr(3)]:!1;d=n[f][2],this._initialRotations[f]=(this._func[d]?this._func[d].call(this._target):this._target[d])||0,this._overwriteProps.push(d)}return this._startRatio=c.vars.runBackwards?1:0,!0},set:function(b){var c,d,e,f,g,h,i,j,k,l,m=this._segCount,n=this._func,o=this._target,p=b!==this._startRatio;if(this._timeRes){if(k=this._lengths,l=this._curSeg,b*=this._length,e=this._li,b>this._l2&&m-1>e){for(j=m-1;j>e&&(this._l2=k[++e])<=b;);this._l1=k[e-1],this._li=e,this._curSeg=l=this._segments[e],this._s2=l[this._s1=this._si=0]}else if(b<this._l1&&e>0){for(;e>0&&(this._l1=k[--e])>=b;);0===e&&b<this._l1?this._l1=0:e++,this._l2=k[e],this._li=e,this._curSeg=l=this._segments[e],this._s1=l[(this._si=l.length-1)-1]||0,this._s2=l[this._si]}if(c=e,b-=this._l1,e=this._si,b>this._s2&&e<l.length-1){for(j=l.length-1;j>e&&(this._s2=l[++e])<=b;);this._s1=l[e-1],this._si=e}else if(b<this._s1&&e>0){for(;e>0&&(this._s1=l[--e])>=b;);0===e&&b<this._s1?this._s1=0:e++,this._s2=l[e],this._si=e}h=(e+(b-this._s1)/(this._s2-this._s1))*this._prec||0}else c=0>b?0:b>=1?m-1:m*b>>0,h=(b-c*(1/m))*m;for(d=1-h,e=this._props.length;--e>-1;)f=this._props[e],g=this._beziers[f][c],i=(h*h*g.da+3*d*(h*g.ca+d*g.ba))*h+g.a,this._mod[f]&&(i=this._mod[f](i,o)),n[f]?o[f](i):o[f]=i;if(this._autoRotate){var q,r,s,t,u,v,w,x=this._autoRotate;for(e=x.length;--e>-1;)f=x[e][2],v=x[e][3]||0,w=x[e][4]===!0?1:a,g=this._beziers[x[e][0]],q=this._beziers[x[e][1]],g&&q&&(g=g[c],q=q[c],r=g.a+(g.b-g.a)*h,t=g.b+(g.c-g.b)*h,r+=(t-r)*h,t+=(g.c+(g.d-g.c)*h-t)*h,s=q.a+(q.b-q.a)*h,u=q.b+(q.c-q.b)*h,s+=(u-s)*h,u+=(q.c+(q.d-q.c)*h-u)*h,i=p?Math.atan2(u-s,t-r)*w+v:this._initialRotations[e],this._mod[f]&&(i=this._mod[f](i,o)),n[f]?o[f](i):o[f]=i)}}}),q=p.prototype;p.bezierThrough=l,p.cubicToQuadratic=i,p._autoCSS=!0,p.quadraticToCubic=function(a,b,c){return new g(a,(2*b+a)/3,(2*b+c)/3,c)},p._cssRegister=function(){var a=f.CSSPlugin;if(a){var b=a._internals,c=b._parseToProxy,d=b._setPluginRatio,e=b.CSSPropTween;b._registerComplexSpecialProp("bezier",{parser:function(a,b,f,g,h,i){b instanceof Array&&(b={values:b}),i=new p;var j,k,l,m=b.values,n=m.length-1,o=[],q={};if(0>n)return h;for(j=0;n>=j;j++)l=c(a,m[j],g,h,i,n!==j),o[j]=l.end;for(k in b)q[k]=b[k];return q.values=o,h=new e(a,"bezier",0,0,l.pt,2),h.data=l,h.plugin=i,h.setRatio=d,0===q.autoRotate&&(q.autoRotate=!0),!q.autoRotate||q.autoRotate instanceof Array||(j=q.autoRotate===!0?0:Number(q.autoRotate),q.autoRotate=null!=l.end.left?[["left","top","rotation",j,!1]]:null!=l.end.x?[["x","y","rotation",j,!1]]:!1),q.autoRotate&&(g._transform||g._enableTransforms(!1),l.autoRotate=g._target._gsTransform,l.proxy.rotation=l.autoRotate.rotation||0,g._overwriteProps.push("rotation")),i._onInitTween(l.proxy,q,g._tween),h}})}},q._mod=function(a){for(var b,c=this._overwriteProps,d=c.length;--d>-1;)b=a[c[d]],b&&"function"==typeof b&&(this._mod[c[d]]=b)},q._kill=function(a){var b,c,d=this._props;for(b in this._beziers)if(b in a)for(delete this._beziers[b],delete this._func[b],c=d.length;--c>-1;)d[c]===b&&d.splice(c,1);if(d=this._autoRotate)for(c=d.length;--c>-1;)a[d[c][2]]&&d.splice(c,1);return this._super._kill.call(this,a)}}(),_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(a,b){var c,d,e,f,g=function(){a.call(this,"css"),this._overwriteProps.length=0,this.setRatio=g.prototype.setRatio},h=_gsScope._gsDefine.globals,i={},j=g.prototype=new a("css");j.constructor=g,g.version="1.20.4",g.API=2,g.defaultTransformPerspective=0,g.defaultSkewType="compensated",g.defaultSmoothOrigin=!0,j="px",g.suffixMap={top:j,right:j,bottom:j,left:j,width:j,height:j,fontSize:j,padding:j,margin:j,perspective:j,lineHeight:""};var k,l,m,n,o,p,q,r,s=/(?:\-|\.|\b)(\d|\.|e\-)+/g,t=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,u=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,v=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,w=/(?:\d|\-|\+|=|#|\.)*/g,x=/opacity *= *([^)]*)/i,y=/opacity:([^;]*)/i,z=/alpha\(opacity *=.+?\)/i,A=/^(rgb|hsl)/,B=/([A-Z])/g,C=/-([a-z])/gi,D=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,E=function(a,b){return b.toUpperCase()},F=/(?:Left|Right|Width)/i,G=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,H=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,I=/,(?=[^\)]*(?:\(|$))/gi,J=/[\s,\(]/i,K=Math.PI/180,L=180/Math.PI,M={},N={style:{}},O=_gsScope.document||{createElement:function(){return N}},P=function(a,b){return O.createElementNS?O.createElementNS(b||"http://www.w3.org/1999/xhtml",a):O.createElement(a)},Q=P("div"),R=P("img"),S=g._internals={_specialProps:i},T=(_gsScope.navigator||{}).userAgent||"",U=function(){var a=T.indexOf("Android"),b=P("a");return m=-1!==T.indexOf("Safari")&&-1===T.indexOf("Chrome")&&(-1===a||parseFloat(T.substr(a+8,2))>3),o=m&&parseFloat(T.substr(T.indexOf("Version/")+8,2))<6,n=-1!==T.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T))&&(p=parseFloat(RegExp.$1)),b?(b.style.cssText="top:1px;opacity:.55;",/^0.55/.test(b.style.opacity)):!1}(),V=function(a){return x.test("string"==typeof a?a:(a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100:1},W=function(a){_gsScope.console&&console.log(a)},X="",Y="",Z=function(a,b){b=b||Q;var c,d,e=b.style;if(void 0!==e[a])return a;for(a=a.charAt(0).toUpperCase()+a.substr(1),c=["O","Moz","ms","Ms","Webkit"],d=5;--d>-1&&void 0===e[c[d]+a];);return d>=0?(Y=3===d?"ms":c[d],X="-"+Y.toLowerCase()+"-",Y+a):null},$=O.defaultView?O.defaultView.getComputedStyle:function(){},_=g.getStyle=function(a,b,c,d,e){var f;return U||"opacity"!==b?(!d&&a.style[b]?f=a.style[b]:(c=c||$(a))?f=c[b]||c.getPropertyValue(b)||c.getPropertyValue(b.replace(B,"-$1").toLowerCase()):a.currentStyle&&(f=a.currentStyle[b]),null==e||f&&"none"!==f&&"auto"!==f&&"auto auto"!==f?f:e):V(a)},aa=S.convertToPixels=function(a,c,d,e,f){if("px"===e||!e&&"lineHeight"!==c)return d;if("auto"===e||!d)return 0;var h,i,j,k=F.test(c),l=a,m=Q.style,n=0>d,o=1===d;if(n&&(d=-d),o&&(d*=100),"lineHeight"!==c||e)if("%"===e&&-1!==c.indexOf("border"))h=d/100*(k?a.clientWidth:a.clientHeight);else{if(m.cssText="border:0 solid red;position:"+_(a,"position")+";line-height:0;","%"!==e&&l.appendChild&&"v"!==e.charAt(0)&&"rem"!==e)m[k?"borderLeftWidth":"borderTopWidth"]=d+e;else{if(l=a.parentNode||O.body,-1!==_(l,"display").indexOf("flex")&&(m.position="absolute"),i=l._gsCache,j=b.ticker.frame,i&&k&&i.time===j)return i.width*d/100;m[k?"width":"height"]=d+e}l.appendChild(Q),h=parseFloat(Q[k?"offsetWidth":"offsetHeight"]),l.removeChild(Q),k&&"%"===e&&g.cacheWidths!==!1&&(i=l._gsCache=l._gsCache||{},i.time=j,i.width=h/d*100),0!==h||f||(h=aa(a,c,d,e,!0))}else i=$(a).lineHeight,a.style.lineHeight=d,h=parseFloat($(a).lineHeight),a.style.lineHeight=i;return o&&(h/=100),n?-h:h},ba=S.calculateOffset=function(a,b,c){if("absolute"!==_(a,"position",c))return 0;var d="left"===b?"Left":"Top",e=_(a,"margin"+d,c);return a["offset"+d]-(aa(a,b,parseFloat(e),e.replace(w,""))||0)},ca=function(a,b){var c,d,e,f={};if(b=b||$(a,null))if(c=b.length)for(;--c>-1;)e=b[c],(-1===e.indexOf("-transform")||Da===e)&&(f[e.replace(C,E)]=b.getPropertyValue(e));else for(c in b)(-1===c.indexOf("Transform")||Ca===c)&&(f[c]=b[c]);else if(b=a.currentStyle||a.style)for(c in b)"string"==typeof c&&void 0===f[c]&&(f[c.replace(C,E)]=b[c]);return U||(f.opacity=V(a)),d=Ra(a,b,!1),f.rotation=d.rotation,f.skewX=d.skewX,f.scaleX=d.scaleX,f.scaleY=d.scaleY,f.x=d.x,f.y=d.y,Fa&&(f.z=d.z,f.rotationX=d.rotationX,f.rotationY=d.rotationY,f.scaleZ=d.scaleZ),f.filters&&delete f.filters,f},da=function(a,b,c,d,e){var f,g,h,i={},j=a.style;for(g in c)"cssText"!==g&&"length"!==g&&isNaN(g)&&(b[g]!==(f=c[g])||e&&e[g])&&-1===g.indexOf("Origin")&&("number"==typeof f||"string"==typeof f)&&(i[g]="auto"!==f||"left"!==g&&"top"!==g?""!==f&&"auto"!==f&&"none"!==f||"string"!=typeof b[g]||""===b[g].replace(v,"")?f:0:ba(a,g),void 0!==j[g]&&(h=new sa(j,g,j[g],h)));if(d)for(g in d)"className"!==g&&(i[g]=d[g]);return{difs:i,firstMPT:h}},ea={width:["Left","Right"],height:["Top","Bottom"]},fa=["marginLeft","marginRight","marginTop","marginBottom"],ga=function(a,b,c){if("svg"===(a.nodeName+"").toLowerCase())return(c||$(a))[b]||0;if(a.getCTM&&Oa(a))return a.getBBox()[b]||0;var d=parseFloat("width"===b?a.offsetWidth:a.offsetHeight),e=ea[b],f=e.length;for(c=c||$(a,null);--f>-1;)d-=parseFloat(_(a,"padding"+e[f],c,!0))||0,d-=parseFloat(_(a,"border"+e[f]+"Width",c,!0))||0;return d},ha=function(a,b){if("contain"===a||"auto"===a||"auto auto"===a)return a+" ";(null==a||""===a)&&(a="0 0");var c,d=a.split(" "),e=-1!==a.indexOf("left")?"0%":-1!==a.indexOf("right")?"100%":d[0],f=-1!==a.indexOf("top")?"0%":-1!==a.indexOf("bottom")?"100%":d[1];if(d.length>3&&!b){for(d=a.split(", ").join(",").split(","),a=[],c=0;c<d.length;c++)a.push(ha(d[c]));return a.join(",")}return null==f?f="center"===e?"50%":"0":"center"===f&&(f="50%"),("center"===e||isNaN(parseFloat(e))&&-1===(e+"").indexOf("="))&&(e="50%"),a=e+" "+f+(d.length>2?" "+d[2]:""),b&&(b.oxp=-1!==e.indexOf("%"),b.oyp=-1!==f.indexOf("%"),b.oxr="="===e.charAt(1),b.oyr="="===f.charAt(1),b.ox=parseFloat(e.replace(v,"")),b.oy=parseFloat(f.replace(v,"")),b.v=a),b||a},ia=function(a,b){return"function"==typeof a&&(a=a(r,q)),"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2)):parseFloat(a)-parseFloat(b)||0},ja=function(a,b){return"function"==typeof a&&(a=a(r,q)),null==a?b:"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2))+b:parseFloat(a)||0},ka=function(a,b,c,d){var e,f,g,h,i,j=1e-6;return"function"==typeof a&&(a=a(r,q)),null==a?h=b:"number"==typeof a?h=a:(e=360,f=a.split("_"),i="="===a.charAt(1),g=(i?parseInt(a.charAt(0)+"1",10)*parseFloat(f[0].substr(2)):parseFloat(f[0]))*(-1===a.indexOf("rad")?1:L)-(i?0:b),f.length&&(d&&(d[c]=b+g),-1!==a.indexOf("short")&&(g%=e,g!==g%(e/2)&&(g=0>g?g+e:g-e)),-1!==a.indexOf("_cw")&&0>g?g=(g+9999999999*e)%e-(g/e|0)*e:-1!==a.indexOf("ccw")&&g>0&&(g=(g-9999999999*e)%e-(g/e|0)*e)),h=b+g),j>h&&h>-j&&(h=0),h},la={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ma=function(a,b,c){return a=0>a?a+1:a>1?a-1:a,255*(1>6*a?b+(c-b)*a*6:.5>a?c:2>3*a?b+(c-b)*(2/3-a)*6:b)+.5|0},na=g.parseColor=function(a,b){var c,d,e,f,g,h,i,j,k,l,m;if(a)if("number"==typeof a)c=[a>>16,a>>8&255,255&a];else{if(","===a.charAt(a.length-1)&&(a=a.substr(0,a.length-1)),la[a])c=la[a];else if("#"===a.charAt(0))4===a.length&&(d=a.charAt(1),e=a.charAt(2),f=a.charAt(3),a="#"+d+d+e+e+f+f),a=parseInt(a.substr(1),16),c=[a>>16,a>>8&255,255&a];else if("hsl"===a.substr(0,3))if(c=m=a.match(s),b){if(-1!==a.indexOf("="))return a.match(t)}else g=Number(c[0])%360/360,h=Number(c[1])/100,i=Number(c[2])/100,e=.5>=i?i*(h+1):i+h-i*h,d=2*i-e,c.length>3&&(c[3]=Number(c[3])),c[0]=ma(g+1/3,d,e),c[1]=ma(g,d,e),c[2]=ma(g-1/3,d,e);else c=a.match(s)||la.transparent;c[0]=Number(c[0]),c[1]=Number(c[1]),c[2]=Number(c[2]),c.length>3&&(c[3]=Number(c[3]))}else c=la.black;return b&&!m&&(d=c[0]/255,e=c[1]/255,f=c[2]/255,j=Math.max(d,e,f),k=Math.min(d,e,f),i=(j+k)/2,j===k?g=h=0:(l=j-k,h=i>.5?l/(2-j-k):l/(j+k),g=j===d?(e-f)/l+(f>e?6:0):j===e?(f-d)/l+2:(d-e)/l+4,g*=60),c[0]=g+.5|0,c[1]=100*h+.5|0,c[2]=100*i+.5|0),c},oa=function(a,b){var c,d,e,f=a.match(pa)||[],g=0,h="";if(!f.length)return a;for(c=0;c<f.length;c++)d=f[c],e=a.substr(g,a.indexOf(d,g)-g),g+=e.length+d.length,d=na(d,b),3===d.length&&d.push(1),h+=e+(b?"hsla("+d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:"rgba("+d.join(","))+")";return h+a.substr(g)},pa="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";for(j in la)pa+="|"+j+"\\b";pa=new RegExp(pa+")","gi"),g.colorStringFilter=function(a){var b,c=a[0]+" "+a[1];pa.test(c)&&(b=-1!==c.indexOf("hsl(")||-1!==c.indexOf("hsla("),a[0]=oa(a[0],b),a[1]=oa(a[1],b)),pa.lastIndex=0},b.defaultStringFilter||(b.defaultStringFilter=g.colorStringFilter);var qa=function(a,b,c,d){if(null==a)return function(a){return a};var e,f=b?(a.match(pa)||[""])[0]:"",g=a.split(f).join("").match(u)||[],h=a.substr(0,a.indexOf(g[0])),i=")"===a.charAt(a.length-1)?")":"",j=-1!==a.indexOf(" ")?" ":",",k=g.length,l=k>0?g[0].replace(s,""):"";return k?e=b?function(a){var b,m,n,o;if("number"==typeof a)a+=l;else if(d&&I.test(a)){for(o=a.replace(I,"|").split("|"),n=0;n<o.length;n++)o[n]=e(o[n]);return o.join(",")}if(b=(a.match(pa)||[f])[0],m=a.split(b).join("").match(u)||[],n=m.length,k>n--)for(;++n<k;)m[n]=c?m[(n-1)/2|0]:g[n];return h+m.join(j)+j+b+i+(-1!==a.indexOf("inset")?" inset":"")}:function(a){var b,f,m;if("number"==typeof a)a+=l;else if(d&&I.test(a)){for(f=a.replace(I,"|").split("|"),m=0;m<f.length;m++)f[m]=e(f[m]);return f.join(",")}if(b=a.match(u)||[],m=b.length,k>m--)for(;++m<k;)b[m]=c?b[(m-1)/2|0]:g[m];return h+b.join(j)+i}:function(a){return a}},ra=function(a){return a=a.split(","),function(b,c,d,e,f,g,h){var i,j=(c+"").split(" ");for(h={},i=0;4>i;i++)h[a[i]]=j[i]=j[i]||j[(i-1)/2>>0];return e.parse(b,h,f,g)}},sa=(S._setPluginRatio=function(a){this.plugin.setRatio(a);for(var b,c,d,e,f,g=this.data,h=g.proxy,i=g.firstMPT,j=1e-6;i;)b=h[i.v],i.r?b=Math.round(b):j>b&&b>-j&&(b=0),i.t[i.p]=b,i=i._next;if(g.autoRotate&&(g.autoRotate.rotation=g.mod?g.mod(h.rotation,this.t):h.rotation),1===a||0===a)for(i=g.firstMPT,f=1===a?"e":"b";i;){if(c=i.t,c.type){if(1===c.type){for(e=c.xs0+c.s+c.xs1,d=1;d<c.l;d++)e+=c["xn"+d]+c["xs"+(d+1)];c[f]=e}}else c[f]=c.s+c.xs0;i=i._next}},function(a,b,c,d,e){this.t=a,this.p=b,this.v=c,this.r=e,d&&(d._prev=this,this._next=d)}),ta=(S._parseToProxy=function(a,b,c,d,e,f){var g,h,i,j,k,l=d,m={},n={},o=c._transform,p=M;for(c._transform=null,M=b,d=k=c.parse(a,b,d,e),M=p,f&&(c._transform=o,l&&(l._prev=null,l._prev&&(l._prev._next=null)));d&&d!==l;){if(d.type<=1&&(h=d.p,n[h]=d.s+d.c,m[h]=d.s,f||(j=new sa(d,"s",h,j,d.r),d.c=0),1===d.type))for(g=d.l;--g>0;)i="xn"+g,h=d.p+"_"+i,n[h]=d.data[i],m[h]=d[i],f||(j=new sa(d,i,h,j,d.rxp[i]));d=d._next}return{proxy:m,end:n,firstMPT:j,pt:k}},S.CSSPropTween=function(a,b,d,e,g,h,i,j,k,l,m){this.t=a,this.p=b,this.s=d,this.c=e,this.n=i||b,a instanceof ta||f.push(this.n),this.r=j,this.type=h||0,k&&(this.pr=k,c=!0),this.b=void 0===l?d:l,this.e=void 0===m?d+e:m,g&&(this._next=g,g._prev=this)}),ua=function(a,b,c,d,e,f){var g=new ta(a,b,c,d-c,e,-1,f);return g.b=c,g.e=g.xs0=d,g},va=g.parseComplex=function(a,b,c,d,e,f,h,i,j,l){c=c||f||"","function"==typeof d&&(d=d(r,q)),h=new ta(a,b,0,0,h,l?2:1,null,!1,i,c,d),d+="",e&&pa.test(d+c)&&(d=[c,d],g.colorStringFilter(d),c=d[0],d=d[1]);var m,n,o,p,u,v,w,x,y,z,A,B,C,D=c.split(", ").join(",").split(" "),E=d.split(", ").join(",").split(" "),F=D.length,G=k!==!1;for((-1!==d.indexOf(",")||-1!==c.indexOf(","))&&(-1!==(d+c).indexOf("rgb")||-1!==(d+c).indexOf("hsl")?(D=D.join(" ").replace(I,", ").split(" "),E=E.join(" ").replace(I,", ").split(" ")):(D=D.join(" ").split(",").join(", ").split(" "),E=E.join(" ").split(",").join(", ").split(" ")),F=D.length),F!==E.length&&(D=(f||"").split(" "),F=D.length),h.plugin=j,h.setRatio=l,pa.lastIndex=0,m=0;F>m;m++)if(p=D[m],u=E[m],x=parseFloat(p),x||0===x)h.appendXtra("",x,ia(u,x),u.replace(t,""),G&&-1!==u.indexOf("px"),!0);else if(e&&pa.test(p))B=u.indexOf(")")+1,B=")"+(B?u.substr(B):""),C=-1!==u.indexOf("hsl")&&U,z=u,p=na(p,C),u=na(u,C),y=p.length+u.length>6,y&&!U&&0===u[3]?(h["xs"+h.l]+=h.l?" transparent":"transparent",h.e=h.e.split(E[m]).join("transparent")):(U||(y=!1),C?h.appendXtra(z.substr(0,z.indexOf("hsl"))+(y?"hsla(":"hsl("),p[0],ia(u[0],p[0]),",",!1,!0).appendXtra("",p[1],ia(u[1],p[1]),"%,",!1).appendXtra("",p[2],ia(u[2],p[2]),y?"%,":"%"+B,!1):h.appendXtra(z.substr(0,z.indexOf("rgb"))+(y?"rgba(":"rgb("),p[0],u[0]-p[0],",",!0,!0).appendXtra("",p[1],u[1]-p[1],",",!0).appendXtra("",p[2],u[2]-p[2],y?",":B,!0),y&&(p=p.length<4?1:p[3],h.appendXtra("",p,(u.length<4?1:u[3])-p,B,!1))),pa.lastIndex=0;else if(v=p.match(s)){if(w=u.match(t),!w||w.length!==v.length)return h;for(o=0,n=0;n<v.length;n++)A=v[n],z=p.indexOf(A,o),h.appendXtra(p.substr(o,z-o),Number(A),ia(w[n],A),"",G&&"px"===p.substr(z+A.length,2),0===n),o=z+A.length;h["xs"+h.l]+=p.substr(o)}else h["xs"+h.l]+=h.l||h["xs"+h.l]?" "+u:u;if(-1!==d.indexOf("=")&&h.data){for(B=h.xs0+h.data.s,m=1;m<h.l;m++)B+=h["xs"+m]+h.data["xn"+m];h.e=B+h["xs"+m]}return h.l||(h.type=-1,h.xs0=h.e),h.xfirst||h},wa=9;for(j=ta.prototype,j.l=j.pr=0;--wa>0;)j["xn"+wa]=0,j["xs"+wa]="";j.xs0="",j._next=j._prev=j.xfirst=j.data=j.plugin=j.setRatio=j.rxp=null,j.appendXtra=function(a,b,c,d,e,f){var g=this,h=g.l;return g["xs"+h]+=f&&(h||g["xs"+h])?" "+a:a||"",c||0===h||g.plugin?(g.l++,g.type=g.setRatio?2:1,g["xs"+g.l]=d||"",h>0?(g.data["xn"+h]=b+c,g.rxp["xn"+h]=e,g["xn"+h]=b,g.plugin||(g.xfirst=new ta(g,"xn"+h,b,c,g.xfirst||g,0,g.n,e,g.pr),g.xfirst.xs0=0),g):(g.data={s:b+c},g.rxp={},g.s=b,g.c=c,g.r=e,g)):(g["xs"+h]+=b+(d||""),g)};var xa=function(a,b){b=b||{},this.p=b.prefix?Z(a)||a:a,i[a]=i[this.p]=this,this.format=b.formatter||qa(b.defaultValue,b.color,b.collapsible,b.multi),b.parser&&(this.parse=b.parser),this.clrs=b.color,this.multi=b.multi,this.keyword=b.keyword,this.dflt=b.defaultValue,this.pr=b.priority||0},ya=S._registerComplexSpecialProp=function(a,b,c){"object"!=typeof b&&(b={parser:c});var d,e,f=a.split(","),g=b.defaultValue;for(c=c||[g],d=0;d<f.length;d++)b.prefix=0===d&&b.prefix,b.defaultValue=c[d]||g,e=new xa(f[d],b)},za=S._registerPluginProp=function(a){if(!i[a]){var b=a.charAt(0).toUpperCase()+a.substr(1)+"Plugin";ya(a,{parser:function(a,c,d,e,f,g,j){var k=h.com.greensock.plugins[b];return k?(k._cssRegister(),i[d].parse(a,c,d,e,f,g,j)):(W("Error: "+b+" js file not loaded."),f)}})}};j=xa.prototype,j.parseComplex=function(a,b,c,d,e,f){var g,h,i,j,k,l,m=this.keyword;if(this.multi&&(I.test(c)||I.test(b)?(h=b.replace(I,"|").split("|"),i=c.replace(I,"|").split("|")):m&&(h=[b],i=[c])),i){for(j=i.length>h.length?i.length:h.length,g=0;j>g;g++)b=h[g]=h[g]||this.dflt,c=i[g]=i[g]||this.dflt,m&&(k=b.indexOf(m),l=c.indexOf(m),k!==l&&(-1===l?h[g]=h[g].split(m).join(""):-1===k&&(h[g]+=" "+m)));b=h.join(", "),c=i.join(", ")}return va(a,this.p,b,c,this.clrs,this.dflt,d,this.pr,e,f)},j.parse=function(a,b,c,d,f,g,h){return this.parseComplex(a.style,this.format(_(a,this.p,e,!1,this.dflt)),this.format(b),f,g)},g.registerSpecialProp=function(a,b,c){ya(a,{parser:function(a,d,e,f,g,h,i){var j=new ta(a,e,0,0,g,2,e,!1,c);return j.plugin=h,j.setRatio=b(a,d,f._tween,e),j},priority:c})},g.useSVGTransformAttr=!0;var Aa,Ba="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),Ca=Z("transform"),Da=X+"transform",Ea=Z("transformOrigin"),Fa=null!==Z("perspective"),Ga=S.Transform=function(){this.perspective=parseFloat(g.defaultTransformPerspective)||0,this.force3D=g.defaultForce3D!==!1&&Fa?g.defaultForce3D||"auto":!1},Ha=_gsScope.SVGElement,Ia=function(a,b,c){var d,e=O.createElementNS("http://www.w3.org/2000/svg",a),f=/([a-z])([A-Z])/g;for(d in c)e.setAttributeNS(null,d.replace(f,"$1-$2").toLowerCase(),c[d]);return b.appendChild(e),e},Ja=O.documentElement||{},Ka=function(){var a,b,c,d=p||/Android/i.test(T)&&!_gsScope.chrome;return O.createElementNS&&!d&&(a=Ia("svg",Ja),b=Ia("rect",a,{width:100,height:50,x:100}),c=b.getBoundingClientRect().width,b.style[Ea]="50% 50%",b.style[Ca]="scaleX(0.5)",d=c===b.getBoundingClientRect().width&&!(n&&Fa),Ja.removeChild(a)),d}(),La=function(a,b,c,d,e,f){var h,i,j,k,l,m,n,o,p,q,r,s,t,u,v=a._gsTransform,w=Qa(a,!0);v&&(t=v.xOrigin,u=v.yOrigin),(!d||(h=d.split(" ")).length<2)&&(n=a.getBBox(),0===n.x&&0===n.y&&n.width+n.height===0&&(n={x:parseFloat(a.hasAttribute("x")?a.getAttribute("x"):a.hasAttribute("cx")?a.getAttribute("cx"):0)||0,y:parseFloat(a.hasAttribute("y")?a.getAttribute("y"):a.hasAttribute("cy")?a.getAttribute("cy"):0)||0,width:0,height:0}),b=ha(b).split(" "),h=[(-1!==b[0].indexOf("%")?parseFloat(b[0])/100*n.width:parseFloat(b[0]))+n.x,(-1!==b[1].indexOf("%")?parseFloat(b[1])/100*n.height:parseFloat(b[1]))+n.y]),c.xOrigin=k=parseFloat(h[0]),c.yOrigin=l=parseFloat(h[1]),d&&w!==Pa&&(m=w[0],n=w[1],o=w[2],p=w[3],q=w[4],r=w[5],s=m*p-n*o,s&&(i=k*(p/s)+l*(-o/s)+(o*r-p*q)/s,j=k*(-n/s)+l*(m/s)-(m*r-n*q)/s,k=c.xOrigin=h[0]=i,l=c.yOrigin=h[1]=j)),v&&(f&&(c.xOffset=v.xOffset,c.yOffset=v.yOffset,v=c),e||e!==!1&&g.defaultSmoothOrigin!==!1?(i=k-t,j=l-u,v.xOffset+=i*w[0]+j*w[2]-i,v.yOffset+=i*w[1]+j*w[3]-j):v.xOffset=v.yOffset=0),f||a.setAttribute("data-svg-origin",h.join(" "))},Ma=function(a){var b,c=P("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),d=this.parentNode,e=this.nextSibling,f=this.style.cssText;if(Ja.appendChild(c),c.appendChild(this),this.style.display="block",a)try{b=this.getBBox(),this._originalGetBBox=this.getBBox,this.getBBox=Ma}catch(g){}else this._originalGetBBox&&(b=this._originalGetBBox());return e?d.insertBefore(this,e):d.appendChild(this),Ja.removeChild(c),this.style.cssText=f,b},Na=function(a){try{return a.getBBox()}catch(b){return Ma.call(a,!0)}},Oa=function(a){return!(!Ha||!a.getCTM||a.parentNode&&!a.ownerSVGElement||!Na(a))},Pa=[1,0,0,1,0,0],Qa=function(a,b){var c,d,e,f,g,h,i=a._gsTransform||new Ga,j=1e5,k=a.style;if(Ca?d=_(a,Da,null,!0):a.currentStyle&&(d=a.currentStyle.filter.match(G),d=d&&4===d.length?[d[0].substr(4),Number(d[2].substr(4)),Number(d[1].substr(4)),d[3].substr(4),i.x||0,i.y||0].join(","):""),c=!d||"none"===d||"matrix(1, 0, 0, 1, 0, 0)"===d,!Ca||!(h=!$(a)||"none"===$(a).display)&&a.parentNode||(h&&(f=k.display,k.display="block"),a.parentNode||(g=1,Ja.appendChild(a)),d=_(a,Da,null,!0),c=!d||"none"===d||"matrix(1, 0, 0, 1, 0, 0)"===d,f?k.display=f:h&&Va(k,"display"),g&&Ja.removeChild(a)),(i.svg||a.getCTM&&Oa(a))&&(c&&-1!==(k[Ca]+"").indexOf("matrix")&&(d=k[Ca],c=0),e=a.getAttribute("transform"),c&&e&&(e=a.transform.baseVal.consolidate().matrix,d="matrix("+e.a+","+e.b+","+e.c+","+e.d+","+e.e+","+e.f+")",c=0)),c)return Pa;for(e=(d||"").match(s)||[],wa=e.length;--wa>-1;)f=Number(e[wa]),e[wa]=(g=f-(f|=0))?(g*j+(0>g?-.5:.5)|0)/j+f:f;return b&&e.length>6?[e[0],e[1],e[4],e[5],e[12],e[13]]:e},Ra=S.getTransform=function(a,c,d,e){if(a._gsTransform&&d&&!e)return a._gsTransform;var f,h,i,j,k,l,m=d?a._gsTransform||new Ga:new Ga,n=m.scaleX<0,o=2e-5,p=1e5,q=Fa?parseFloat(_(a,Ea,c,!1,"0 0 0").split(" ")[2])||m.zOrigin||0:0,r=parseFloat(g.defaultTransformPerspective)||0;if(m.svg=!(!a.getCTM||!Oa(a)),m.svg&&(La(a,_(a,Ea,c,!1,"50% 50%")+"",m,a.getAttribute("data-svg-origin")),Aa=g.useSVGTransformAttr||Ka),f=Qa(a),f!==Pa){if(16===f.length){var s,t,u,v,w,x=f[0],y=f[1],z=f[2],A=f[3],B=f[4],C=f[5],D=f[6],E=f[7],F=f[8],G=f[9],H=f[10],I=f[12],J=f[13],K=f[14],M=f[11],N=Math.atan2(D,H);m.zOrigin&&(K=-m.zOrigin,I=F*K-f[12],J=G*K-f[13],K=H*K+m.zOrigin-f[14]),m.rotationX=N*L,N&&(v=Math.cos(-N),w=Math.sin(-N),s=B*v+F*w,t=C*v+G*w,u=D*v+H*w,F=B*-w+F*v,G=C*-w+G*v,H=D*-w+H*v,M=E*-w+M*v,B=s,C=t,D=u),N=Math.atan2(-z,H),m.rotationY=N*L,N&&(v=Math.cos(-N),w=Math.sin(-N),s=x*v-F*w,t=y*v-G*w,u=z*v-H*w,G=y*w+G*v,H=z*w+H*v,M=A*w+M*v,x=s,y=t,z=u),N=Math.atan2(y,x),m.rotation=N*L,N&&(v=Math.cos(N),w=Math.sin(N),s=x*v+y*w,t=B*v+C*w,u=F*v+G*w,y=y*v-x*w,C=C*v-B*w,G=G*v-F*w,x=s,B=t,F=u),m.rotationX&&Math.abs(m.rotationX)+Math.abs(m.rotation)>359.9&&(m.rotationX=m.rotation=0,m.rotationY=180-m.rotationY),N=Math.atan2(B,C),m.scaleX=(Math.sqrt(x*x+y*y+z*z)*p+.5|0)/p,m.scaleY=(Math.sqrt(C*C+D*D)*p+.5|0)/p,m.scaleZ=(Math.sqrt(F*F+G*G+H*H)*p+.5|0)/p,x/=m.scaleX,B/=m.scaleY,y/=m.scaleX,C/=m.scaleY,Math.abs(N)>o?(m.skewX=N*L,B=0,"simple"!==m.skewType&&(m.scaleY*=1/Math.cos(N))):m.skewX=0,m.perspective=M?1/(0>M?-M:M):0,m.x=I,m.y=J,m.z=K,m.svg&&(m.x-=m.xOrigin-(m.xOrigin*x-m.yOrigin*B),m.y-=m.yOrigin-(m.yOrigin*y-m.xOrigin*C))}else if(!Fa||e||!f.length||m.x!==f[4]||m.y!==f[5]||!m.rotationX&&!m.rotationY){var O=f.length>=6,P=O?f[0]:1,Q=f[1]||0,R=f[2]||0,S=O?f[3]:1;m.x=f[4]||0,m.y=f[5]||0,i=Math.sqrt(P*P+Q*Q),j=Math.sqrt(S*S+R*R),k=P||Q?Math.atan2(Q,P)*L:m.rotation||0,l=R||S?Math.atan2(R,S)*L+k:m.skewX||0,m.scaleX=i,m.scaleY=j,m.rotation=k,m.skewX=l,Fa&&(m.rotationX=m.rotationY=m.z=0,m.perspective=r,m.scaleZ=1),m.svg&&(m.x-=m.xOrigin-(m.xOrigin*P+m.yOrigin*R),m.y-=m.yOrigin-(m.xOrigin*Q+m.yOrigin*S))}Math.abs(m.skewX)>90&&Math.abs(m.skewX)<270&&(n?(m.scaleX*=-1,m.skewX+=m.rotation<=0?180:-180,m.rotation+=m.rotation<=0?180:-180):(m.scaleY*=-1,m.skewX+=m.skewX<=0?180:-180)),m.zOrigin=q;for(h in m)m[h]<o&&m[h]>-o&&(m[h]=0)}return d&&(a._gsTransform=m,m.svg&&(Aa&&a.style[Ca]?b.delayedCall(.001,function(){Va(a.style,Ca)}):!Aa&&a.getAttribute("transform")&&b.delayedCall(.001,function(){a.removeAttribute("transform")}))),m},Sa=function(a){var b,c,d=this.data,e=-d.rotation*K,f=e+d.skewX*K,g=1e5,h=(Math.cos(e)*d.scaleX*g|0)/g,i=(Math.sin(e)*d.scaleX*g|0)/g,j=(Math.sin(f)*-d.scaleY*g|0)/g,k=(Math.cos(f)*d.scaleY*g|0)/g,l=this.t.style,m=this.t.currentStyle;if(m){c=i,i=-j,j=-c,b=m.filter,l.filter="";var n,o,q=this.t.offsetWidth,r=this.t.offsetHeight,s="absolute"!==m.position,t="progid:DXImageTransform.Microsoft.Matrix(M11="+h+", M12="+i+", M21="+j+", M22="+k,u=d.x+q*d.xPercent/100,v=d.y+r*d.yPercent/100;if(null!=d.ox&&(n=(d.oxp?q*d.ox*.01:d.ox)-q/2,o=(d.oyp?r*d.oy*.01:d.oy)-r/2,u+=n-(n*h+o*i),v+=o-(n*j+o*k)),s?(n=q/2,o=r/2,t+=", Dx="+(n-(n*h+o*i)+u)+", Dy="+(o-(n*j+o*k)+v)+")"):t+=", sizingMethod='auto expand')",-1!==b.indexOf("DXImageTransform.Microsoft.Matrix(")?l.filter=b.replace(H,t):l.filter=t+" "+b,(0===a||1===a)&&1===h&&0===i&&0===j&&1===k&&(s&&-1===t.indexOf("Dx=0, Dy=0")||x.test(b)&&100!==parseFloat(RegExp.$1)||-1===b.indexOf(b.indexOf("Alpha"))&&l.removeAttribute("filter")),!s){var y,z,A,B=8>p?1:-1;for(n=d.ieOffsetX||0,o=d.ieOffsetY||0,d.ieOffsetX=Math.round((q-((0>h?-h:h)*q+(0>i?-i:i)*r))/2+u),d.ieOffsetY=Math.round((r-((0>k?-k:k)*r+(0>j?-j:j)*q))/2+v),wa=0;4>wa;wa++)z=fa[wa],y=m[z],c=-1!==y.indexOf("px")?parseFloat(y):aa(this.t,z,parseFloat(y),y.replace(w,""))||0,A=c!==d[z]?2>wa?-d.ieOffsetX:-d.ieOffsetY:2>wa?n-d.ieOffsetX:o-d.ieOffsetY,l[z]=(d[z]=Math.round(c-A*(0===wa||2===wa?1:B)))+"px"}}},Ta=S.set3DTransformRatio=S.setTransformRatio=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,o,p,q,r,s,t,u,v,w,x,y,z=this.data,A=this.t.style,B=z.rotation,C=z.rotationX,D=z.rotationY,E=z.scaleX,F=z.scaleY,G=z.scaleZ,H=z.x,I=z.y,J=z.z,L=z.svg,M=z.perspective,N=z.force3D,O=z.skewY,P=z.skewX;if(O&&(P+=O,B+=O),((1===a||0===a)&&"auto"===N&&(this.tween._totalTime===this.tween._totalDuration||!this.tween._totalTime)||!N)&&!J&&!M&&!D&&!C&&1===G||Aa&&L||!Fa)return void(B||P||L?(B*=K,x=P*K,y=1e5,c=Math.cos(B)*E,f=Math.sin(B)*E,d=Math.sin(B-x)*-F,g=Math.cos(B-x)*F,x&&"simple"===z.skewType&&(b=Math.tan(x-O*K),b=Math.sqrt(1+b*b),d*=b,g*=b,O&&(b=Math.tan(O*K),b=Math.sqrt(1+b*b),c*=b,f*=b)),L&&(H+=z.xOrigin-(z.xOrigin*c+z.yOrigin*d)+z.xOffset,I+=z.yOrigin-(z.xOrigin*f+z.yOrigin*g)+z.yOffset,Aa&&(z.xPercent||z.yPercent)&&(q=this.t.getBBox(),H+=.01*z.xPercent*q.width,I+=.01*z.yPercent*q.height),q=1e-6,q>H&&H>-q&&(H=0),q>I&&I>-q&&(I=0)),u=(c*y|0)/y+","+(f*y|0)/y+","+(d*y|0)/y+","+(g*y|0)/y+","+H+","+I+")",L&&Aa?this.t.setAttribute("transform","matrix("+u):A[Ca]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix(":"matrix(")+u):A[Ca]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix(":"matrix(")+E+",0,0,"+F+","+H+","+I+")");if(n&&(q=1e-4,q>E&&E>-q&&(E=G=2e-5),q>F&&F>-q&&(F=G=2e-5),!M||z.z||z.rotationX||z.rotationY||(M=0)),B||P)B*=K,r=c=Math.cos(B),s=f=Math.sin(B),P&&(B-=P*K,r=Math.cos(B),s=Math.sin(B),"simple"===z.skewType&&(b=Math.tan((P-O)*K),b=Math.sqrt(1+b*b),r*=b,s*=b,z.skewY&&(b=Math.tan(O*K),b=Math.sqrt(1+b*b),c*=b,f*=b))),d=-s,g=r;else{if(!(D||C||1!==G||M||L))return void(A[Ca]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) translate3d(":"translate3d(")+H+"px,"+I+"px,"+J+"px)"+(1!==E||1!==F?" scale("+E+","+F+")":""));c=g=1,d=f=0}k=1,e=h=i=j=l=m=0,o=M?-1/M:0,p=z.zOrigin,q=1e-6,v=",",w="0",B=D*K,B&&(r=Math.cos(B),s=Math.sin(B),i=-s,l=o*-s,e=c*s,h=f*s,k=r,o*=r,c*=r,f*=r),B=C*K,B&&(r=Math.cos(B),s=Math.sin(B),b=d*r+e*s,t=g*r+h*s,j=k*s,m=o*s,e=d*-s+e*r,h=g*-s+h*r,k*=r,o*=r,d=b,g=t),1!==G&&(e*=G,h*=G,k*=G,o*=G),1!==F&&(d*=F,g*=F,j*=F,m*=F),1!==E&&(c*=E,f*=E,i*=E,l*=E),(p||L)&&(p&&(H+=e*-p,I+=h*-p,J+=k*-p+p),L&&(H+=z.xOrigin-(z.xOrigin*c+z.yOrigin*d)+z.xOffset,I+=z.yOrigin-(z.xOrigin*f+z.yOrigin*g)+z.yOffset),q>H&&H>-q&&(H=w),q>I&&I>-q&&(I=w),q>J&&J>-q&&(J=0)),u=z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix3d(":"matrix3d(",u+=(q>c&&c>-q?w:c)+v+(q>f&&f>-q?w:f)+v+(q>i&&i>-q?w:i),u+=v+(q>l&&l>-q?w:l)+v+(q>d&&d>-q?w:d)+v+(q>g&&g>-q?w:g),C||D||1!==G?(u+=v+(q>j&&j>-q?w:j)+v+(q>m&&m>-q?w:m)+v+(q>e&&e>-q?w:e),u+=v+(q>h&&h>-q?w:h)+v+(q>k&&k>-q?w:k)+v+(q>o&&o>-q?w:o)+v):u+=",0,0,0,0,1,0,",u+=H+v+I+v+J+v+(M?1+-J/M:1)+")",A[Ca]=u};j=Ga.prototype,j.x=j.y=j.z=j.skewX=j.skewY=j.rotation=j.rotationX=j.rotationY=j.zOrigin=j.xPercent=j.yPercent=j.xOffset=j.yOffset=0,j.scaleX=j.scaleY=j.scaleZ=1,ya("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",{
parser:function(a,b,c,d,f,h,i){if(d._lastParsedTransform===i)return f;d._lastParsedTransform=i;var j,k=i.scale&&"function"==typeof i.scale?i.scale:0;"function"==typeof i[c]&&(j=i[c],i[c]=b),k&&(i.scale=k(r,a));var l,m,n,o,p,s,t,u,v,w=a._gsTransform,x=a.style,y=1e-6,z=Ba.length,A=i,B={},C="transformOrigin",D=Ra(a,e,!0,A.parseTransform),E=A.transform&&("function"==typeof A.transform?A.transform(r,q):A.transform);if(D.skewType=A.skewType||D.skewType||g.defaultSkewType,d._transform=D,E&&"string"==typeof E&&Ca)m=Q.style,m[Ca]=E,m.display="block",m.position="absolute",O.body.appendChild(Q),l=Ra(Q,null,!1),"simple"===D.skewType&&(l.scaleY*=Math.cos(l.skewX*K)),D.svg&&(s=D.xOrigin,t=D.yOrigin,l.x-=D.xOffset,l.y-=D.yOffset,(A.transformOrigin||A.svgOrigin)&&(E={},La(a,ha(A.transformOrigin),E,A.svgOrigin,A.smoothOrigin,!0),s=E.xOrigin,t=E.yOrigin,l.x-=E.xOffset-D.xOffset,l.y-=E.yOffset-D.yOffset),(s||t)&&(u=Qa(Q,!0),l.x-=s-(s*u[0]+t*u[2]),l.y-=t-(s*u[1]+t*u[3]))),O.body.removeChild(Q),l.perspective||(l.perspective=D.perspective),null!=A.xPercent&&(l.xPercent=ja(A.xPercent,D.xPercent)),null!=A.yPercent&&(l.yPercent=ja(A.yPercent,D.yPercent));else if("object"==typeof A){if(l={scaleX:ja(null!=A.scaleX?A.scaleX:A.scale,D.scaleX),scaleY:ja(null!=A.scaleY?A.scaleY:A.scale,D.scaleY),scaleZ:ja(A.scaleZ,D.scaleZ),x:ja(A.x,D.x),y:ja(A.y,D.y),z:ja(A.z,D.z),xPercent:ja(A.xPercent,D.xPercent),yPercent:ja(A.yPercent,D.yPercent),perspective:ja(A.transformPerspective,D.perspective)},p=A.directionalRotation,null!=p)if("object"==typeof p)for(m in p)A[m]=p[m];else A.rotation=p;"string"==typeof A.x&&-1!==A.x.indexOf("%")&&(l.x=0,l.xPercent=ja(A.x,D.xPercent)),"string"==typeof A.y&&-1!==A.y.indexOf("%")&&(l.y=0,l.yPercent=ja(A.y,D.yPercent)),l.rotation=ka("rotation"in A?A.rotation:"shortRotation"in A?A.shortRotation+"_short":"rotationZ"in A?A.rotationZ:D.rotation,D.rotation,"rotation",B),Fa&&(l.rotationX=ka("rotationX"in A?A.rotationX:"shortRotationX"in A?A.shortRotationX+"_short":D.rotationX||0,D.rotationX,"rotationX",B),l.rotationY=ka("rotationY"in A?A.rotationY:"shortRotationY"in A?A.shortRotationY+"_short":D.rotationY||0,D.rotationY,"rotationY",B)),l.skewX=ka(A.skewX,D.skewX),l.skewY=ka(A.skewY,D.skewY)}for(Fa&&null!=A.force3D&&(D.force3D=A.force3D,o=!0),n=D.force3D||D.z||D.rotationX||D.rotationY||l.z||l.rotationX||l.rotationY||l.perspective,n||null==A.scale||(l.scaleZ=1);--z>-1;)v=Ba[z],E=l[v]-D[v],(E>y||-y>E||null!=A[v]||null!=M[v])&&(o=!0,f=new ta(D,v,D[v],E,f),v in B&&(f.e=B[v]),f.xs0=0,f.plugin=h,d._overwriteProps.push(f.n));return E=A.transformOrigin,D.svg&&(E||A.svgOrigin)&&(s=D.xOffset,t=D.yOffset,La(a,ha(E),l,A.svgOrigin,A.smoothOrigin),f=ua(D,"xOrigin",(w?D:l).xOrigin,l.xOrigin,f,C),f=ua(D,"yOrigin",(w?D:l).yOrigin,l.yOrigin,f,C),(s!==D.xOffset||t!==D.yOffset)&&(f=ua(D,"xOffset",w?s:D.xOffset,D.xOffset,f,C),f=ua(D,"yOffset",w?t:D.yOffset,D.yOffset,f,C)),E="0px 0px"),(E||Fa&&n&&D.zOrigin)&&(Ca?(o=!0,v=Ea,E=(E||_(a,v,e,!1,"50% 50%"))+"",f=new ta(x,v,0,0,f,-1,C),f.b=x[v],f.plugin=h,Fa?(m=D.zOrigin,E=E.split(" "),D.zOrigin=(E.length>2&&(0===m||"0px"!==E[2])?parseFloat(E[2]):m)||0,f.xs0=f.e=E[0]+" "+(E[1]||"50%")+" 0px",f=new ta(D,"zOrigin",0,0,f,-1,f.n),f.b=m,f.xs0=f.e=D.zOrigin):f.xs0=f.e=E):ha(E+"",D)),o&&(d._transformType=D.svg&&Aa||!n&&3!==this._transformType?2:3),j&&(i[c]=j),k&&(i.scale=k),f},prefix:!0}),ya("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),ya("borderRadius",{defaultValue:"0px",parser:function(a,b,c,f,g,h){b=this.format(b);var i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],z=a.style;for(q=parseFloat(a.offsetWidth),r=parseFloat(a.offsetHeight),i=b.split(" "),j=0;j<y.length;j++)this.p.indexOf("border")&&(y[j]=Z(y[j])),m=l=_(a,y[j],e,!1,"0px"),-1!==m.indexOf(" ")&&(l=m.split(" "),m=l[0],l=l[1]),n=k=i[j],o=parseFloat(m),t=m.substr((o+"").length),u="="===n.charAt(1),u?(p=parseInt(n.charAt(0)+"1",10),n=n.substr(2),p*=parseFloat(n),s=n.substr((p+"").length-(0>p?1:0))||""):(p=parseFloat(n),s=n.substr((p+"").length)),""===s&&(s=d[c]||t),s!==t&&(v=aa(a,"borderLeft",o,t),w=aa(a,"borderTop",o,t),"%"===s?(m=v/q*100+"%",l=w/r*100+"%"):"em"===s?(x=aa(a,"borderLeft",1,"em"),m=v/x+"em",l=w/x+"em"):(m=v+"px",l=w+"px"),u&&(n=parseFloat(m)+p+s,k=parseFloat(l)+p+s)),g=va(z,y[j],m+" "+l,n+" "+k,!1,"0px",g);return g},prefix:!0,formatter:qa("0px 0px 0px 0px",!1,!0)}),ya("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",{defaultValue:"0px",parser:function(a,b,c,d,f,g){return va(a.style,c,this.format(_(a,c,e,!1,"0px 0px")),this.format(b),!1,"0px",f)},prefix:!0,formatter:qa("0px 0px",!1,!0)}),ya("backgroundPosition",{defaultValue:"0 0",parser:function(a,b,c,d,f,g){var h,i,j,k,l,m,n="background-position",o=e||$(a,null),q=this.format((o?p?o.getPropertyValue(n+"-x")+" "+o.getPropertyValue(n+"-y"):o.getPropertyValue(n):a.currentStyle.backgroundPositionX+" "+a.currentStyle.backgroundPositionY)||"0 0"),r=this.format(b);if(-1!==q.indexOf("%")!=(-1!==r.indexOf("%"))&&r.split(",").length<2&&(m=_(a,"backgroundImage").replace(D,""),m&&"none"!==m)){for(h=q.split(" "),i=r.split(" "),R.setAttribute("src",m),j=2;--j>-1;)q=h[j],k=-1!==q.indexOf("%"),k!==(-1!==i[j].indexOf("%"))&&(l=0===j?a.offsetWidth-R.width:a.offsetHeight-R.height,h[j]=k?parseFloat(q)/100*l+"px":parseFloat(q)/l*100+"%");q=h.join(" ")}return this.parseComplex(a.style,q,r,f,g)},formatter:ha}),ya("backgroundSize",{defaultValue:"0 0",formatter:function(a){return a+="",ha(-1===a.indexOf(" ")?a+" "+a:a)}}),ya("perspective",{defaultValue:"0px",prefix:!0}),ya("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),ya("transformStyle",{prefix:!0}),ya("backfaceVisibility",{prefix:!0}),ya("userSelect",{prefix:!0}),ya("margin",{parser:ra("marginTop,marginRight,marginBottom,marginLeft")}),ya("padding",{parser:ra("paddingTop,paddingRight,paddingBottom,paddingLeft")}),ya("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(a,b,c,d,f,g){var h,i,j;return 9>p?(i=a.currentStyle,j=8>p?" ":",",h="rect("+i.clipTop+j+i.clipRight+j+i.clipBottom+j+i.clipLeft+")",b=this.format(b).split(",").join(j)):(h=this.format(_(a,this.p,e,!1,this.dflt)),b=this.format(b)),this.parseComplex(a.style,h,b,f,g)}}),ya("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),ya("autoRound,strictUnits",{parser:function(a,b,c,d,e){return e}}),ya("border",{defaultValue:"0px solid #000",parser:function(a,b,c,d,f,g){var h=_(a,"borderTopWidth",e,!1,"0px"),i=this.format(b).split(" "),j=i[0].replace(w,"");return"px"!==j&&(h=parseFloat(h)/aa(a,"borderTopWidth",1,j)+j),this.parseComplex(a.style,this.format(h+" "+_(a,"borderTopStyle",e,!1,"solid")+" "+_(a,"borderTopColor",e,!1,"#000")),i.join(" "),f,g)},color:!0,formatter:function(a){var b=a.split(" ");return b[0]+" "+(b[1]||"solid")+" "+(a.match(pa)||["#000"])[0]}}),ya("borderWidth",{parser:ra("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),ya("float,cssFloat,styleFloat",{parser:function(a,b,c,d,e,f){var g=a.style,h="cssFloat"in g?"cssFloat":"styleFloat";return new ta(g,h,0,0,e,-1,c,!1,0,g[h],b)}});var Ua=function(a){var b,c=this.t,d=c.filter||_(this.data,"filter")||"",e=this.s+this.c*a|0;100===e&&(-1===d.indexOf("atrix(")&&-1===d.indexOf("radient(")&&-1===d.indexOf("oader(")?(c.removeAttribute("filter"),b=!_(this.data,"filter")):(c.filter=d.replace(z,""),b=!0)),b||(this.xn1&&(c.filter=d=d||"alpha(opacity="+e+")"),-1===d.indexOf("pacity")?0===e&&this.xn1||(c.filter=d+" alpha(opacity="+e+")"):c.filter=d.replace(x,"opacity="+e))};ya("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(a,b,c,d,f,g){var h=parseFloat(_(a,"opacity",e,!1,"1")),i=a.style,j="autoAlpha"===c;return"string"==typeof b&&"="===b.charAt(1)&&(b=("-"===b.charAt(0)?-1:1)*parseFloat(b.substr(2))+h),j&&1===h&&"hidden"===_(a,"visibility",e)&&0!==b&&(h=0),U?f=new ta(i,"opacity",h,b-h,f):(f=new ta(i,"opacity",100*h,100*(b-h),f),f.xn1=j?1:0,i.zoom=1,f.type=2,f.b="alpha(opacity="+f.s+")",f.e="alpha(opacity="+(f.s+f.c)+")",f.data=a,f.plugin=g,f.setRatio=Ua),j&&(f=new ta(i,"visibility",0,0,f,-1,null,!1,0,0!==h?"inherit":"hidden",0===b?"hidden":"inherit"),f.xs0="inherit",d._overwriteProps.push(f.n),d._overwriteProps.push(c)),f}});var Va=function(a,b){b&&(a.removeProperty?(("ms"===b.substr(0,2)||"webkit"===b.substr(0,6))&&(b="-"+b),a.removeProperty(b.replace(B,"-$1").toLowerCase())):a.removeAttribute(b))},Wa=function(a){if(this.t._gsClassPT=this,1===a||0===a){this.t.setAttribute("class",0===a?this.b:this.e);for(var b=this.data,c=this.t.style;b;)b.v?c[b.p]=b.v:Va(c,b.p),b=b._next;1===a&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};ya("className",{parser:function(a,b,d,f,g,h,i){var j,k,l,m,n,o=a.getAttribute("class")||"",p=a.style.cssText;if(g=f._classNamePT=new ta(a,d,0,0,g,2),g.setRatio=Wa,g.pr=-11,c=!0,g.b=o,k=ca(a,e),l=a._gsClassPT){for(m={},n=l.data;n;)m[n.p]=1,n=n._next;l.setRatio(1)}return a._gsClassPT=g,g.e="="!==b.charAt(1)?b:o.replace(new RegExp("(?:\\s|^)"+b.substr(2)+"(?![\\w-])"),"")+("+"===b.charAt(0)?" "+b.substr(2):""),a.setAttribute("class",g.e),j=da(a,k,ca(a),i,m),a.setAttribute("class",o),g.data=j.firstMPT,a.style.cssText=p,g=g.xfirst=f.parse(a,j.difs,g,h)}});var Xa=function(a){if((1===a||0===a)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var b,c,d,e,f,g=this.t.style,h=i.transform.parse;if("all"===this.e)g.cssText="",e=!0;else for(b=this.e.split(" ").join("").split(","),d=b.length;--d>-1;)c=b[d],i[c]&&(i[c].parse===h?e=!0:c="transformOrigin"===c?Ea:i[c].p),Va(g,c);e&&(Va(g,Ca),f=this.t._gsTransform,f&&(f.svg&&(this.t.removeAttribute("data-svg-origin"),this.t.removeAttribute("transform")),delete this.t._gsTransform))}};for(ya("clearProps",{parser:function(a,b,d,e,f){return f=new ta(a,d,0,0,f,2),f.setRatio=Xa,f.e=b,f.pr=-10,f.data=e._tween,c=!0,f}}),j="bezier,throwProps,physicsProps,physics2D".split(","),wa=j.length;wa--;)za(j[wa]);j=g.prototype,j._firstPT=j._lastParsedTransform=j._transform=null,j._onInitTween=function(a,b,h,j){if(!a.nodeType)return!1;this._target=q=a,this._tween=h,this._vars=b,r=j,k=b.autoRound,c=!1,d=b.suffixMap||g.suffixMap,e=$(a,""),f=this._overwriteProps;var n,p,s,t,u,v,w,x,z,A=a.style;if(l&&""===A.zIndex&&(n=_(a,"zIndex",e),("auto"===n||""===n)&&this._addLazySet(A,"zIndex",0)),"string"==typeof b&&(t=A.cssText,n=ca(a,e),A.cssText=t+";"+b,n=da(a,n,ca(a)).difs,!U&&y.test(b)&&(n.opacity=parseFloat(RegExp.$1)),b=n,A.cssText=t),b.className?this._firstPT=p=i.className.parse(a,b.className,"className",this,null,null,b):this._firstPT=p=this.parse(a,b,null),this._transformType){for(z=3===this._transformType,Ca?m&&(l=!0,""===A.zIndex&&(w=_(a,"zIndex",e),("auto"===w||""===w)&&this._addLazySet(A,"zIndex",0)),o&&this._addLazySet(A,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(z?"visible":"hidden"))):A.zoom=1,s=p;s&&s._next;)s=s._next;x=new ta(a,"transform",0,0,null,2),this._linkCSSP(x,null,s),x.setRatio=Ca?Ta:Sa,x.data=this._transform||Ra(a,e,!0),x.tween=h,x.pr=-1,f.pop()}if(c){for(;p;){for(v=p._next,s=t;s&&s.pr>p.pr;)s=s._next;(p._prev=s?s._prev:u)?p._prev._next=p:t=p,(p._next=s)?s._prev=p:u=p,p=v}this._firstPT=t}return!0},j.parse=function(a,b,c,f){var g,h,j,l,m,n,o,p,s,t,u=a.style;for(g in b){if(n=b[g],"function"==typeof n&&(n=n(r,q)),h=i[g])c=h.parse(a,n,g,this,c,f,b);else{if("--"===g.substr(0,2)){this._tween._propLookup[g]=this._addTween.call(this._tween,a.style,"setProperty",$(a).getPropertyValue(g)+"",n+"",g,!1,g);continue}m=_(a,g,e)+"",s="string"==typeof n,"color"===g||"fill"===g||"stroke"===g||-1!==g.indexOf("Color")||s&&A.test(n)?(s||(n=na(n),n=(n.length>3?"rgba(":"rgb(")+n.join(",")+")"),c=va(u,g,m,n,!0,"transparent",c,0,f)):s&&J.test(n)?c=va(u,g,m,n,!0,null,c,0,f):(j=parseFloat(m),o=j||0===j?m.substr((j+"").length):"",(""===m||"auto"===m)&&("width"===g||"height"===g?(j=ga(a,g,e),o="px"):"left"===g||"top"===g?(j=ba(a,g,e),o="px"):(j="opacity"!==g?0:1,o="")),t=s&&"="===n.charAt(1),t?(l=parseInt(n.charAt(0)+"1",10),n=n.substr(2),l*=parseFloat(n),p=n.replace(w,"")):(l=parseFloat(n),p=s?n.replace(w,""):""),""===p&&(p=g in d?d[g]:o),n=l||0===l?(t?l+j:l)+p:b[g],o!==p&&(""!==p||"lineHeight"===g)&&(l||0===l)&&j&&(j=aa(a,g,j,o),"%"===p?(j/=aa(a,g,100,"%")/100,b.strictUnits!==!0&&(m=j+"%")):"em"===p||"rem"===p||"vw"===p||"vh"===p?j/=aa(a,g,1,p):"px"!==p&&(l=aa(a,g,l,p),p="px"),t&&(l||0===l)&&(n=l+j+p)),t&&(l+=j),!j&&0!==j||!l&&0!==l?void 0!==u[g]&&(n||n+""!="NaN"&&null!=n)?(c=new ta(u,g,l||j||0,0,c,-1,g,!1,0,m,n),c.xs0="none"!==n||"display"!==g&&-1===g.indexOf("Style")?n:m):W("invalid "+g+" tween value: "+b[g]):(c=new ta(u,g,j,l-j,c,0,g,k!==!1&&("px"===p||"zIndex"===g),0,m,n),c.xs0=p))}f&&c&&!c.plugin&&(c.plugin=f)}return c},j.setRatio=function(a){var b,c,d,e=this._firstPT,f=1e-6;if(1!==a||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(a||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;e;){if(b=e.c*a+e.s,e.r?b=Math.round(b):f>b&&b>-f&&(b=0),e.type)if(1===e.type)if(d=e.l,2===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2;else if(3===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3;else if(4===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3+e.xn3+e.xs4;else if(5===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3+e.xn3+e.xs4+e.xn4+e.xs5;else{for(c=e.xs0+b+e.xs1,d=1;d<e.l;d++)c+=e["xn"+d]+e["xs"+(d+1)];e.t[e.p]=c}else-1===e.type?e.t[e.p]=e.xs0:e.setRatio&&e.setRatio(a);else e.t[e.p]=b+e.xs0;e=e._next}else for(;e;)2!==e.type?e.t[e.p]=e.b:e.setRatio(a),e=e._next;else for(;e;){if(2!==e.type)if(e.r&&-1!==e.type)if(b=Math.round(e.s+e.c),e.type){if(1===e.type){for(d=e.l,c=e.xs0+b+e.xs1,d=1;d<e.l;d++)c+=e["xn"+d]+e["xs"+(d+1)];e.t[e.p]=c}}else e.t[e.p]=b+e.xs0;else e.t[e.p]=e.e;else e.setRatio(a);e=e._next}},j._enableTransforms=function(a){this._transform=this._transform||Ra(this._target,e,!0),this._transformType=this._transform.svg&&Aa||!a&&3!==this._transformType?2:3};var Ya=function(a){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};j._addLazySet=function(a,b,c){var d=this._firstPT=new ta(a,b,0,0,this._firstPT,2);d.e=c,d.setRatio=Ya,d.data=this},j._linkCSSP=function(a,b,c,d){return a&&(b&&(b._prev=a),a._next&&(a._next._prev=a._prev),a._prev?a._prev._next=a._next:this._firstPT===a&&(this._firstPT=a._next,d=!0),c?c._next=a:d||null!==this._firstPT||(this._firstPT=a),a._next=b,a._prev=c),a},j._mod=function(a){for(var b=this._firstPT;b;)"function"==typeof a[b.p]&&a[b.p]===Math.round&&(b.r=1),b=b._next},j._kill=function(b){var c,d,e,f=b;if(b.autoAlpha||b.alpha){f={};for(d in b)f[d]=b[d];f.opacity=1,f.autoAlpha&&(f.visibility=1)}for(b.className&&(c=this._classNamePT)&&(e=c.xfirst,e&&e._prev?this._linkCSSP(e._prev,c._next,e._prev._prev):e===this._firstPT&&(this._firstPT=c._next),c._next&&this._linkCSSP(c._next,c._next._next,e._prev),this._classNamePT=null),c=this._firstPT;c;)c.plugin&&c.plugin!==d&&c.plugin._kill&&(c.plugin._kill(b),d=c.plugin),c=c._next;return a.prototype._kill.call(this,f)};var Za=function(a,b,c){var d,e,f,g;if(a.slice)for(e=a.length;--e>-1;)Za(a[e],b,c);else for(d=a.childNodes,e=d.length;--e>-1;)f=d[e],g=f.type,f.style&&(b.push(ca(f)),c&&c.push(f)),1!==g&&9!==g&&11!==g||!f.childNodes.length||Za(f,b,c)};return g.cascadeTo=function(a,c,d){var e,f,g,h,i=b.to(a,c,d),j=[i],k=[],l=[],m=[],n=b._internals.reservedProps;for(a=i._targets||i.target,Za(a,k,m),i.render(c,!0,!0),Za(a,l),i.render(0,!0,!0),i._enabled(!0),e=m.length;--e>-1;)if(f=da(m[e],k[e],l[e]),f.firstMPT){f=f.difs;for(g in d)n[g]&&(f[g]=d[g]);h={};for(g in f)h[g]=k[e][g];j.push(b.fromTo(m[e],c,h,f))}return j},a.activate([g]),g},!0),function(){var a=_gsScope._gsDefine.plugin({propName:"roundProps",version:"1.6.0",priority:-1,API:2,init:function(a,b,c){return this._tween=c,!0}}),b=function(a){for(;a;)a.f||a.blob||(a.m=Math.round),a=a._next},c=a.prototype;c._onInitAllProps=function(){for(var a,c,d,e=this._tween,f=e.vars.roundProps.join?e.vars.roundProps:e.vars.roundProps.split(","),g=f.length,h={},i=e._propLookup.roundProps;--g>-1;)h[f[g]]=Math.round;for(g=f.length;--g>-1;)for(a=f[g],c=e._firstPT;c;)d=c._next,c.pg?c.t._mod(h):c.n===a&&(2===c.f&&c.t?b(c.t._firstPT):(this._add(c.t,a,c.s,c.c),d&&(d._prev=c._prev),c._prev?c._prev._next=d:e._firstPT===c&&(e._firstPT=d),c._next=c._prev=null,e._propLookup[a]=i)),c=d;return!1},c._add=function(a,b,c,d){this._addTween(a,b,c,c+d,b,Math.round),this._overwriteProps.push(b)}}(),function(){_gsScope._gsDefine.plugin({propName:"attr",API:2,version:"0.6.1",init:function(a,b,c,d){var e,f;if("function"!=typeof a.setAttribute)return!1;for(e in b)f=b[e],"function"==typeof f&&(f=f(d,a)),this._addTween(a,"setAttribute",a.getAttribute(e)+"",f+"",e,!1,e),this._overwriteProps.push(e);return!0}})}(),_gsScope._gsDefine.plugin({propName:"directionalRotation",version:"0.3.1",API:2,init:function(a,b,c,d){"object"!=typeof b&&(b={rotation:b}),this.finals={};var e,f,g,h,i,j,k=b.useRadians===!0?2*Math.PI:360,l=1e-6;for(e in b)"useRadians"!==e&&(h=b[e],"function"==typeof h&&(h=h(d,a)),j=(h+"").split("_"),f=j[0],g=parseFloat("function"!=typeof a[e]?a[e]:a[e.indexOf("set")||"function"!=typeof a["get"+e.substr(3)]?e:"get"+e.substr(3)]()),h=this.finals[e]="string"==typeof f&&"="===f.charAt(1)?g+parseInt(f.charAt(0)+"1",10)*Number(f.substr(2)):Number(f)||0,i=h-g,j.length&&(f=j.join("_"),-1!==f.indexOf("short")&&(i%=k,i!==i%(k/2)&&(i=0>i?i+k:i-k)),-1!==f.indexOf("_cw")&&0>i?i=(i+9999999999*k)%k-(i/k|0)*k:-1!==f.indexOf("ccw")&&i>0&&(i=(i-9999999999*k)%k-(i/k|0)*k)),(i>l||-l>i)&&(this._addTween(a,e,g,g+i,e),this._overwriteProps.push(e)));return!0},set:function(a){var b;if(1!==a)this._super.setRatio.call(this,a);else for(b=this._firstPT;b;)b.f?b.t[b.p](this.finals[b.p]):b.t[b.p]=this.finals[b.p],b=b._next}})._autoCSS=!0,_gsScope._gsDefine("easing.Back",["easing.Ease"],function(a){var b,c,d,e,f=_gsScope.GreenSockGlobals||_gsScope,g=f.com.greensock,h=2*Math.PI,i=Math.PI/2,j=g._class,k=function(b,c){var d=j("easing."+b,function(){},!0),e=d.prototype=new a;return e.constructor=d,e.getRatio=c,d},l=a.register||function(){},m=function(a,b,c,d,e){var f=j("easing."+a,{easeOut:new b,easeIn:new c,easeInOut:new d},!0);return l(f,a),f},n=function(a,b,c){this.t=a,this.v=b,c&&(this.next=c,c.prev=this,this.c=c.v-b,this.gap=c.t-a)},o=function(b,c){var d=j("easing."+b,function(a){this._p1=a||0===a?a:1.70158,this._p2=1.525*this._p1},!0),e=d.prototype=new a;return e.constructor=d,e.getRatio=c,e.config=function(a){return new d(a)},d},p=m("Back",o("BackOut",function(a){return(a-=1)*a*((this._p1+1)*a+this._p1)+1}),o("BackIn",function(a){return a*a*((this._p1+1)*a-this._p1)}),o("BackInOut",function(a){return(a*=2)<1?.5*a*a*((this._p2+1)*a-this._p2):.5*((a-=2)*a*((this._p2+1)*a+this._p2)+2)})),q=j("easing.SlowMo",function(a,b,c){b=b||0===b?b:.7,null==a?a=.7:a>1&&(a=1),this._p=1!==a?b:0,this._p1=(1-a)/2,this._p2=a,this._p3=this._p1+this._p2,this._calcEnd=c===!0},!0),r=q.prototype=new a;return r.constructor=q,r.getRatio=function(a){var b=a+(.5-a)*this._p;return a<this._p1?this._calcEnd?1-(a=1-a/this._p1)*a:b-(a=1-a/this._p1)*a*a*a*b:a>this._p3?this._calcEnd?1===a?0:1-(a=(a-this._p3)/this._p1)*a:b+(a-b)*(a=(a-this._p3)/this._p1)*a*a*a:this._calcEnd?1:b},q.ease=new q(.7,.7),r.config=q.config=function(a,b,c){return new q(a,b,c)},b=j("easing.SteppedEase",function(a,b){a=a||1,this._p1=1/a,this._p2=a+(b?0:1),this._p3=b?1:0},!0),r=b.prototype=new a,r.constructor=b,r.getRatio=function(a){return 0>a?a=0:a>=1&&(a=.999999999),((this._p2*a|0)+this._p3)*this._p1},r.config=b.config=function(a,c){return new b(a,c)},c=j("easing.ExpoScaleEase",function(a,b,c){this._p1=Math.log(b/a),this._p2=b-a,this._p3=a,this._ease=c},!0),r=c.prototype=new a,r.constructor=c,r.getRatio=function(a){return this._ease&&(a=this._ease.getRatio(a)),(this._p3*Math.exp(this._p1*a)-this._p3)/this._p2},r.config=c.config=function(a,b,d){return new c(a,b,d)},d=j("easing.RoughEase",function(b){b=b||{};for(var c,d,e,f,g,h,i=b.taper||"none",j=[],k=0,l=0|(b.points||20),m=l,o=b.randomize!==!1,p=b.clamp===!0,q=b.template instanceof a?b.template:null,r="number"==typeof b.strength?.4*b.strength:.4;--m>-1;)c=o?Math.random():1/l*m,d=q?q.getRatio(c):c,"none"===i?e=r:"out"===i?(f=1-c,e=f*f*r):"in"===i?e=c*c*r:.5>c?(f=2*c,e=f*f*.5*r):(f=2*(1-c),e=f*f*.5*r),o?d+=Math.random()*e-.5*e:m%2?d+=.5*e:d-=.5*e,p&&(d>1?d=1:0>d&&(d=0)),j[k++]={x:c,y:d};for(j.sort(function(a,b){return a.x-b.x}),h=new n(1,1,null),m=l;--m>-1;)g=j[m],h=new n(g.x,g.y,h);this._prev=new n(0,0,0!==h.t?h:h.next)},!0),r=d.prototype=new a,r.constructor=d,r.getRatio=function(a){var b=this._prev;if(a>b.t){for(;b.next&&a>=b.t;)b=b.next;b=b.prev}else for(;b.prev&&a<=b.t;)b=b.prev;return this._prev=b,b.v+(a-b.t)/b.gap*b.c},r.config=function(a){return new d(a)},d.ease=new d,m("Bounce",k("BounceOut",function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}),k("BounceIn",function(a){return(a=1-a)<1/2.75?1-7.5625*a*a:2/2.75>a?1-(7.5625*(a-=1.5/2.75)*a+.75):2.5/2.75>a?1-(7.5625*(a-=2.25/2.75)*a+.9375):1-(7.5625*(a-=2.625/2.75)*a+.984375)}),k("BounceInOut",function(a){var b=.5>a;return a=b?1-2*a:2*a-1,a=1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375,b?.5*(1-a):.5*a+.5})),m("Circ",k("CircOut",function(a){return Math.sqrt(1-(a-=1)*a)}),k("CircIn",function(a){return-(Math.sqrt(1-a*a)-1)}),k("CircInOut",function(a){return(a*=2)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)})),e=function(b,c,d){var e=j("easing."+b,function(a,b){this._p1=a>=1?a:1,this._p2=(b||d)/(1>a?a:1),this._p3=this._p2/h*(Math.asin(1/this._p1)||0),this._p2=h/this._p2},!0),f=e.prototype=new a;return f.constructor=e,f.getRatio=c,f.config=function(a,b){return new e(a,b)},e},m("Elastic",e("ElasticOut",function(a){return this._p1*Math.pow(2,-10*a)*Math.sin((a-this._p3)*this._p2)+1},.3),e("ElasticIn",function(a){return-(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*this._p2))},.3),e("ElasticInOut",function(a){return(a*=2)<1?-.5*(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*this._p2)):this._p1*Math.pow(2,-10*(a-=1))*Math.sin((a-this._p3)*this._p2)*.5+1},.45)),m("Expo",k("ExpoOut",function(a){return 1-Math.pow(2,-10*a)}),k("ExpoIn",function(a){return Math.pow(2,10*(a-1))-.001}),k("ExpoInOut",function(a){return(a*=2)<1?.5*Math.pow(2,10*(a-1)):.5*(2-Math.pow(2,-10*(a-1)))})),m("Sine",k("SineOut",function(a){return Math.sin(a*i)}),k("SineIn",function(a){return-Math.cos(a*i)+1}),k("SineInOut",function(a){return-.5*(Math.cos(Math.PI*a)-1)})),j("easing.EaseLookup",{find:function(b){return a.map[b]}},!0),l(f.SlowMo,"SlowMo","ease,"),l(d,"RoughEase","ease,"),l(b,"SteppedEase","ease,"),p},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a,b){"use strict";var c={},d=a.document,e=a.GreenSockGlobals=a.GreenSockGlobals||a;if(!e.TweenLite){var f,g,h,i,j,k=function(a){var b,c=a.split("."),d=e;for(b=0;b<c.length;b++)d[c[b]]=d=d[c[b]]||{};return d},l=k("com.greensock"),m=1e-10,n=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},o=function(){},p=function(){var a=Object.prototype.toString,b=a.call([]);return function(c){return null!=c&&(c instanceof Array||"object"==typeof c&&!!c.push&&a.call(c)===b)}}(),q={},r=function(d,f,g,h){this.sc=q[d]?q[d].sc:[],q[d]=this,this.gsClass=null,this.func=g;var i=[];this.check=function(j){for(var l,m,n,o,p=f.length,s=p;--p>-1;)(l=q[f[p]]||new r(f[p],[])).gsClass?(i[p]=l.gsClass,s--):j&&l.sc.push(this);if(0===s&&g){if(m=("com.greensock."+d).split("."),n=m.pop(),o=k(m.join("."))[n]=this.gsClass=g.apply(g,i),h)if(e[n]=c[n]=o,"undefined"!=typeof module&&module.exports)if(d===b){module.exports=c[b]=o;for(p in c)o[p]=c[p]}else c[b]&&(c[b][n]=o);else"function"==typeof define&&define.amd&&define((a.GreenSockAMDPath?a.GreenSockAMDPath+"/":"")+d.split(".").pop(),[],function(){return o});for(p=0;p<this.sc.length;p++)this.sc[p].check()}},this.check(!0)},s=a._gsDefine=function(a,b,c,d){return new r(a,b,c,d)},t=l._class=function(a,b,c){return b=b||function(){},s(a,[],function(){return b},c),b};s.globals=e;var u=[0,0,1,1],v=t("easing.Ease",function(a,b,c,d){this._func=a,this._type=c||0,this._power=d||0,this._params=b?u.concat(b):u},!0),w=v.map={},x=v.register=function(a,b,c,d){for(var e,f,g,h,i=b.split(","),j=i.length,k=(c||"easeIn,easeOut,easeInOut").split(",");--j>-1;)for(f=i[j],e=d?t("easing."+f,null,!0):l.easing[f]||{},g=k.length;--g>-1;)h=k[g],w[f+"."+h]=w[h+f]=e[h]=a.getRatio?a:a[h]||new a};for(h=v.prototype,h._calcEnd=!1,h.getRatio=function(a){if(this._func)return this._params[0]=a,this._func.apply(null,this._params);var b=this._type,c=this._power,d=1===b?1-a:2===b?a:.5>a?2*a:2*(1-a);return 1===c?d*=d:2===c?d*=d*d:3===c?d*=d*d*d:4===c&&(d*=d*d*d*d),1===b?1-d:2===b?d:.5>a?d/2:1-d/2},f=["Linear","Quad","Cubic","Quart","Quint,Strong"],g=f.length;--g>-1;)h=f[g]+",Power"+g,x(new v(null,null,1,g),h,"easeOut",!0),x(new v(null,null,2,g),h,"easeIn"+(0===g?",easeNone":"")),x(new v(null,null,3,g),h,"easeInOut");w.linear=l.easing.Linear.easeIn,w.swing=l.easing.Quad.easeInOut;var y=t("events.EventDispatcher",function(a){this._listeners={},this._eventTarget=a||this});h=y.prototype,h.addEventListener=function(a,b,c,d,e){e=e||0;var f,g,h=this._listeners[a],k=0;for(this!==i||j||i.wake(),null==h&&(this._listeners[a]=h=[]),g=h.length;--g>-1;)f=h[g],f.c===b&&f.s===c?h.splice(g,1):0===k&&f.pr<e&&(k=g+1);h.splice(k,0,{c:b,s:c,up:d,pr:e})},h.removeEventListener=function(a,b){var c,d=this._listeners[a];if(d)for(c=d.length;--c>-1;)if(d[c].c===b)return void d.splice(c,1)},h.dispatchEvent=function(a){var b,c,d,e=this._listeners[a];if(e)for(b=e.length,b>1&&(e=e.slice(0)),c=this._eventTarget;--b>-1;)d=e[b],d&&(d.up?d.c.call(d.s||c,{type:a,target:c}):d.c.call(d.s||c))};var z=a.requestAnimationFrame,A=a.cancelAnimationFrame,B=Date.now||function(){return(new Date).getTime()},C=B();for(f=["ms","moz","webkit","o"],g=f.length;--g>-1&&!z;)z=a[f[g]+"RequestAnimationFrame"],A=a[f[g]+"CancelAnimationFrame"]||a[f[g]+"CancelRequestAnimationFrame"];t("Ticker",function(a,b){var c,e,f,g,h,k=this,l=B(),n=b!==!1&&z?"auto":!1,p=500,q=33,r="tick",s=function(a){var b,d,i=B()-C;i>p&&(l+=i-q),C+=i,k.time=(C-l)/1e3,b=k.time-h,(!c||b>0||a===!0)&&(k.frame++,h+=b+(b>=g?.004:g-b),d=!0),a!==!0&&(f=e(s)),d&&k.dispatchEvent(r)};y.call(k),k.time=k.frame=0,k.tick=function(){s(!0)},k.lagSmoothing=function(a,b){return arguments.length?(p=a||1/m,void(q=Math.min(b,p,0))):1/m>p},k.sleep=function(){null!=f&&(n&&A?A(f):clearTimeout(f),e=o,f=null,k===i&&(j=!1))},k.wake=function(a){null!==f?k.sleep():a?l+=-C+(C=B()):k.frame>10&&(C=B()-p+5),e=0===c?o:n&&z?z:function(a){return setTimeout(a,1e3*(h-k.time)+1|0)},k===i&&(j=!0),s(2)},k.fps=function(a){return arguments.length?(c=a,g=1/(c||60),h=this.time+g,void k.wake()):c},k.useRAF=function(a){return arguments.length?(k.sleep(),n=a,void k.fps(c)):n},k.fps(a),setTimeout(function(){"auto"===n&&k.frame<5&&"hidden"!==(d||{}).visibilityState&&k.useRAF(!1)},1500)}),h=l.Ticker.prototype=new l.events.EventDispatcher,h.constructor=l.Ticker;var D=t("core.Animation",function(a,b){if(this.vars=b=b||{},this._duration=this._totalDuration=a||0,this._delay=Number(b.delay)||0,this._timeScale=1,this._active=b.immediateRender===!0,this.data=b.data,this._reversed=b.reversed===!0,X){j||i.wake();var c=this.vars.useFrames?W:X;c.add(this,c._time),this.vars.paused&&this.paused(!0)}});i=D.ticker=new l.Ticker,h=D.prototype,h._dirty=h._gc=h._initted=h._paused=!1,h._totalTime=h._time=0,h._rawPrevTime=-1,h._next=h._last=h._onUpdate=h._timeline=h.timeline=null,h._paused=!1;var E=function(){j&&B()-C>2e3&&("hidden"!==(d||{}).visibilityState||!i.lagSmoothing())&&i.wake();var a=setTimeout(E,2e3);a.unref&&a.unref()};E(),h.play=function(a,b){return null!=a&&this.seek(a,b),this.reversed(!1).paused(!1)},h.pause=function(a,b){return null!=a&&this.seek(a,b),this.paused(!0)},h.resume=function(a,b){return null!=a&&this.seek(a,b),this.paused(!1)},h.seek=function(a,b){return this.totalTime(Number(a),b!==!1)},h.restart=function(a,b){return this.reversed(!1).paused(!1).totalTime(a?-this._delay:0,b!==!1,!0)},h.reverse=function(a,b){return null!=a&&this.seek(a||this.totalDuration(),b),this.reversed(!0).paused(!1)},h.render=function(a,b,c){},h.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},h.isActive=function(){var a,b=this._timeline,c=this._startTime;return!b||!this._gc&&!this._paused&&b.isActive()&&(a=b.rawTime(!0))>=c&&a<c+this.totalDuration()/this._timeScale-1e-7},h._enabled=function(a,b){return j||i.wake(),this._gc=!a,this._active=this.isActive(),b!==!0&&(a&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!a&&this.timeline&&this._timeline._remove(this,!0)),!1},h._kill=function(a,b){return this._enabled(!1,!1)},h.kill=function(a,b){return this._kill(a,b),this},h._uncache=function(a){for(var b=a?this:this.timeline;b;)b._dirty=!0,b=b.timeline;return this},h._swapSelfInParams=function(a){for(var b=a.length,c=a.concat();--b>-1;)"{self}"===a[b]&&(c[b]=this);return c},h._callback=function(a){var b=this.vars,c=b[a],d=b[a+"Params"],e=b[a+"Scope"]||b.callbackScope||this,f=d?d.length:0;switch(f){case 0:c.call(e);break;case 1:c.call(e,d[0]);break;case 2:c.call(e,d[0],d[1]);break;default:c.apply(e,d)}},h.eventCallback=function(a,b,c,d){if("on"===(a||"").substr(0,2)){var e=this.vars;if(1===arguments.length)return e[a];null==b?delete e[a]:(e[a]=b,e[a+"Params"]=p(c)&&-1!==c.join("").indexOf("{self}")?this._swapSelfInParams(c):c,e[a+"Scope"]=d),"onUpdate"===a&&(this._onUpdate=b)}return this},h.delay=function(a){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+a-this._delay),this._delay=a,this):this._delay},h.duration=function(a){return arguments.length?(this._duration=this._totalDuration=a,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==a&&this.totalTime(this._totalTime*(a/this._duration),!0),this):(this._dirty=!1,this._duration)},h.totalDuration=function(a){return this._dirty=!1,arguments.length?this.duration(a):this._totalDuration},h.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(a>this._duration?this._duration:a,b)):this._time},h.totalTime=function(a,b,c){if(j||i.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>a&&!c&&(a+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var d=this._totalDuration,e=this._timeline;if(a>d&&!c&&(a=d),this._startTime=(this._paused?this._pauseTime:e._time)-(this._reversed?d-a:a)/this._timeScale,e._dirty||this._uncache(!1),e._timeline)for(;e._timeline;)e._timeline._time!==(e._startTime+e._totalTime)/e._timeScale&&e.totalTime(e._totalTime,!0),e=e._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==a||0===this._duration)&&(J.length&&Z(),this.render(a,b,!1),J.length&&Z())}return this},h.progress=h.totalProgress=function(a,b){var c=this.duration();return arguments.length?this.totalTime(c*a,b):c?this._time/c:this.ratio},h.startTime=function(a){return arguments.length?(a!==this._startTime&&(this._startTime=a,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,a-this._delay)),this):this._startTime},h.endTime=function(a){return this._startTime+(0!=a?this.totalDuration():this.duration())/this._timeScale},h.timeScale=function(a){if(!arguments.length)return this._timeScale;var b,c;for(a=a||m,this._timeline&&this._timeline.smoothChildTiming&&(b=this._pauseTime,c=b||0===b?b:this._timeline.totalTime(),this._startTime=c-(c-this._startTime)*this._timeScale/a),this._timeScale=a,c=this.timeline;c&&c.timeline;)c._dirty=!0,c.totalDuration(),c=c.timeline;return this},h.reversed=function(a){return arguments.length?(a!=this._reversed&&(this._reversed=a,
this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},h.paused=function(a){if(!arguments.length)return this._paused;var b,c,d=this._timeline;return a!=this._paused&&d&&(j||a||i.wake(),b=d.rawTime(),c=b-this._pauseTime,!a&&d.smoothChildTiming&&(this._startTime+=c,this._uncache(!1)),this._pauseTime=a?b:null,this._paused=a,this._active=this.isActive(),!a&&0!==c&&this._initted&&this.duration()&&(b=d.smoothChildTiming?this._totalTime:(b-this._startTime)/this._timeScale,this.render(b,b===this._totalTime,!0))),this._gc&&!a&&this._enabled(!0,!1),this};var F=t("core.SimpleTimeline",function(a){D.call(this,0,a),this.autoRemoveChildren=this.smoothChildTiming=!0});h=F.prototype=new D,h.constructor=F,h.kill()._gc=!1,h._first=h._last=h._recent=null,h._sortChildren=!1,h.add=h.insert=function(a,b,c,d){var e,f;if(a._startTime=Number(b||0)+a._delay,a._paused&&this!==a._timeline&&(a._pauseTime=a._startTime+(this.rawTime()-a._startTime)/a._timeScale),a.timeline&&a.timeline._remove(a,!0),a.timeline=a._timeline=this,a._gc&&a._enabled(!0,!0),e=this._last,this._sortChildren)for(f=a._startTime;e&&e._startTime>f;)e=e._prev;return e?(a._next=e._next,e._next=a):(a._next=this._first,this._first=a),a._next?a._next._prev=a:this._last=a,a._prev=e,this._recent=a,this._timeline&&this._uncache(!0),this},h._remove=function(a,b){return a.timeline===this&&(b||a._enabled(!1,!0),a._prev?a._prev._next=a._next:this._first===a&&(this._first=a._next),a._next?a._next._prev=a._prev:this._last===a&&(this._last=a._prev),a._next=a._prev=a.timeline=null,a===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},h.render=function(a,b,c){var d,e=this._first;for(this._totalTime=this._time=this._rawPrevTime=a;e;)d=e._next,(e._active||a>=e._startTime&&!e._paused&&!e._gc)&&(e._reversed?e.render((e._dirty?e.totalDuration():e._totalDuration)-(a-e._startTime)*e._timeScale,b,c):e.render((a-e._startTime)*e._timeScale,b,c)),e=d},h.rawTime=function(){return j||i.wake(),this._totalTime};var G=t("TweenLite",function(b,c,d){if(D.call(this,c,d),this.render=G.prototype.render,null==b)throw"Cannot tween a null target.";this.target=b="string"!=typeof b?b:G.selector(b)||b;var e,f,g,h=b.jquery||b.length&&b!==a&&b[0]&&(b[0]===a||b[0].nodeType&&b[0].style&&!b.nodeType),i=this.vars.overwrite;if(this._overwrite=i=null==i?V[G.defaultOverwrite]:"number"==typeof i?i>>0:V[i],(h||b instanceof Array||b.push&&p(b))&&"number"!=typeof b[0])for(this._targets=g=n(b),this._propLookup=[],this._siblings=[],e=0;e<g.length;e++)f=g[e],f?"string"!=typeof f?f.length&&f!==a&&f[0]&&(f[0]===a||f[0].nodeType&&f[0].style&&!f.nodeType)?(g.splice(e--,1),this._targets=g=g.concat(n(f))):(this._siblings[e]=$(f,this,!1),1===i&&this._siblings[e].length>1&&aa(f,this,null,1,this._siblings[e])):(f=g[e--]=G.selector(f),"string"==typeof f&&g.splice(e+1,1)):g.splice(e--,1);else this._propLookup={},this._siblings=$(b,this,!1),1===i&&this._siblings.length>1&&aa(b,this,null,1,this._siblings);(this.vars.immediateRender||0===c&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-m,this.render(Math.min(0,-this._delay)))},!0),H=function(b){return b&&b.length&&b!==a&&b[0]&&(b[0]===a||b[0].nodeType&&b[0].style&&!b.nodeType)},I=function(a,b){var c,d={};for(c in a)U[c]||c in b&&"transform"!==c&&"x"!==c&&"y"!==c&&"width"!==c&&"height"!==c&&"className"!==c&&"border"!==c||!(!R[c]||R[c]&&R[c]._autoCSS)||(d[c]=a[c],delete a[c]);a.css=d};h=G.prototype=new D,h.constructor=G,h.kill()._gc=!1,h.ratio=0,h._firstPT=h._targets=h._overwrittenProps=h._startAt=null,h._notifyPluginsOfEnabled=h._lazy=!1,G.version="1.20.4",G.defaultEase=h._ease=new v(null,null,1,1),G.defaultOverwrite="auto",G.ticker=i,G.autoSleep=120,G.lagSmoothing=function(a,b){i.lagSmoothing(a,b)},G.selector=a.$||a.jQuery||function(b){var c=a.$||a.jQuery;return c?(G.selector=c,c(b)):"undefined"==typeof d?b:d.querySelectorAll?d.querySelectorAll(b):d.getElementById("#"===b.charAt(0)?b.substr(1):b)};var J=[],K={},L=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,M=/[\+-]=-?[\.\d]/,N=function(a){for(var b,c=this._firstPT,d=1e-6;c;)b=c.blob?1===a&&null!=this.end?this.end:a?this.join(""):this.start:c.c*a+c.s,c.m?b=c.m(b,this._target||c.t):d>b&&b>-d&&!c.blob&&(b=0),c.f?c.fp?c.t[c.p](c.fp,b):c.t[c.p](b):c.t[c.p]=b,c=c._next},O=function(a,b,c,d){var e,f,g,h,i,j,k,l=[],m=0,n="",o=0;for(l.start=a,l.end=b,a=l[0]=a+"",b=l[1]=b+"",c&&(c(l),a=l[0],b=l[1]),l.length=0,e=a.match(L)||[],f=b.match(L)||[],d&&(d._next=null,d.blob=1,l._firstPT=l._applyPT=d),i=f.length,h=0;i>h;h++)k=f[h],j=b.substr(m,b.indexOf(k,m)-m),n+=j||!h?j:",",m+=j.length,o?o=(o+1)%5:"rgba("===j.substr(-5)&&(o=1),k===e[h]||e.length<=h?n+=k:(n&&(l.push(n),n=""),g=parseFloat(e[h]),l.push(g),l._firstPT={_next:l._firstPT,t:l,p:l.length-1,s:g,c:("="===k.charAt(1)?parseInt(k.charAt(0)+"1",10)*parseFloat(k.substr(2)):parseFloat(k)-g)||0,f:0,m:o&&4>o?Math.round:0}),m+=k.length;return n+=b.substr(m),n&&l.push(n),l.setRatio=N,M.test(b)&&(l.end=null),l},P=function(a,b,c,d,e,f,g,h,i){"function"==typeof d&&(d=d(i||0,a));var j,k=typeof a[b],l="function"!==k?"":b.indexOf("set")||"function"!=typeof a["get"+b.substr(3)]?b:"get"+b.substr(3),m="get"!==c?c:l?g?a[l](g):a[l]():a[b],n="string"==typeof d&&"="===d.charAt(1),o={t:a,p:b,s:m,f:"function"===k,pg:0,n:e||b,m:f?"function"==typeof f?f:Math.round:0,pr:0,c:n?parseInt(d.charAt(0)+"1",10)*parseFloat(d.substr(2)):parseFloat(d)-m||0};return("number"!=typeof m||"number"!=typeof d&&!n)&&(g||isNaN(m)||!n&&isNaN(d)||"boolean"==typeof m||"boolean"==typeof d?(o.fp=g,j=O(m,n?parseFloat(o.s)+o.c+(o.s+"").replace(/[0-9\-\.]/g,""):d,h||G.defaultStringFilter,o),o={t:j,p:"setRatio",s:0,c:1,f:2,pg:0,n:e||b,pr:0,m:0}):(o.s=parseFloat(m),n||(o.c=parseFloat(d)-o.s||0))),o.c?((o._next=this._firstPT)&&(o._next._prev=o),this._firstPT=o,o):void 0},Q=G._internals={isArray:p,isSelector:H,lazyTweens:J,blobDif:O},R=G._plugins={},S=Q.tweenLookup={},T=0,U=Q.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1,id:1,yoyoEase:1},V={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},W=D._rootFramesTimeline=new F,X=D._rootTimeline=new F,Y=30,Z=Q.lazyRender=function(){var a,b=J.length;for(K={};--b>-1;)a=J[b],a&&a._lazy!==!1&&(a.render(a._lazy[0],a._lazy[1],!0),a._lazy=!1);J.length=0};X._startTime=i.time,W._startTime=i.frame,X._active=W._active=!0,setTimeout(Z,1),D._updateRoot=G.render=function(){var a,b,c;if(J.length&&Z(),X.render((i.time-X._startTime)*X._timeScale,!1,!1),W.render((i.frame-W._startTime)*W._timeScale,!1,!1),J.length&&Z(),i.frame>=Y){Y=i.frame+(parseInt(G.autoSleep,10)||120);for(c in S){for(b=S[c].tweens,a=b.length;--a>-1;)b[a]._gc&&b.splice(a,1);0===b.length&&delete S[c]}if(c=X._first,(!c||c._paused)&&G.autoSleep&&!W._first&&1===i._listeners.tick.length){for(;c&&c._paused;)c=c._next;c||i.sleep()}}},i.addEventListener("tick",D._updateRoot);var $=function(a,b,c){var d,e,f=a._gsTweenID;if(S[f||(a._gsTweenID=f="t"+T++)]||(S[f]={target:a,tweens:[]}),b&&(d=S[f].tweens,d[e=d.length]=b,c))for(;--e>-1;)d[e]===b&&d.splice(e,1);return S[f].tweens},_=function(a,b,c,d){var e,f,g=a.vars.onOverwrite;return g&&(e=g(a,b,c,d)),g=G.onOverwrite,g&&(f=g(a,b,c,d)),e!==!1&&f!==!1},aa=function(a,b,c,d,e){var f,g,h,i;if(1===d||d>=4){for(i=e.length,f=0;i>f;f++)if((h=e[f])!==b)h._gc||h._kill(null,a,b)&&(g=!0);else if(5===d)break;return g}var j,k=b._startTime+m,l=[],n=0,o=0===b._duration;for(f=e.length;--f>-1;)(h=e[f])===b||h._gc||h._paused||(h._timeline!==b._timeline?(j=j||ba(b,0,o),0===ba(h,j,o)&&(l[n++]=h)):h._startTime<=k&&h._startTime+h.totalDuration()/h._timeScale>k&&((o||!h._initted)&&k-h._startTime<=2e-10||(l[n++]=h)));for(f=n;--f>-1;)if(h=l[f],2===d&&h._kill(c,a,b)&&(g=!0),2!==d||!h._firstPT&&h._initted){if(2!==d&&!_(h,b))continue;h._enabled(!1,!1)&&(g=!0)}return g},ba=function(a,b,c){for(var d=a._timeline,e=d._timeScale,f=a._startTime;d._timeline;){if(f+=d._startTime,e*=d._timeScale,d._paused)return-100;d=d._timeline}return f/=e,f>b?f-b:c&&f===b||!a._initted&&2*m>f-b?m:(f+=a.totalDuration()/a._timeScale/e)>b+m?0:f-b-m};h._init=function(){var a,b,c,d,e,f,g=this.vars,h=this._overwrittenProps,i=this._duration,j=!!g.immediateRender,k=g.ease;if(g.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),e={};for(d in g.startAt)e[d]=g.startAt[d];if(e.data="isStart",e.overwrite=!1,e.immediateRender=!0,e.lazy=j&&g.lazy!==!1,e.startAt=e.delay=null,e.onUpdate=g.onUpdate,e.onUpdateParams=g.onUpdateParams,e.onUpdateScope=g.onUpdateScope||g.callbackScope||this,this._startAt=G.to(this.target,0,e),j)if(this._time>0)this._startAt=null;else if(0!==i)return}else if(g.runBackwards&&0!==i)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(j=!1),c={};for(d in g)U[d]&&"autoCSS"!==d||(c[d]=g[d]);if(c.overwrite=0,c.data="isFromStart",c.lazy=j&&g.lazy!==!1,c.immediateRender=j,this._startAt=G.to(this.target,0,c),j){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=k=k?k instanceof v?k:"function"==typeof k?new v(k,g.easeParams):w[k]||G.defaultEase:G.defaultEase,g.easeParams instanceof Array&&k.config&&(this._ease=k.config.apply(k,g.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(f=this._targets.length,a=0;f>a;a++)this._initProps(this._targets[a],this._propLookup[a]={},this._siblings[a],h?h[a]:null,a)&&(b=!0);else b=this._initProps(this.target,this._propLookup,this._siblings,h,0);if(b&&G._onPluginEvent("_onInitAllProps",this),h&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),g.runBackwards)for(c=this._firstPT;c;)c.s+=c.c,c.c=-c.c,c=c._next;this._onUpdate=g.onUpdate,this._initted=!0},h._initProps=function(b,c,d,e,f){var g,h,i,j,k,l;if(null==b)return!1;K[b._gsTweenID]&&Z(),this.vars.css||b.style&&b!==a&&b.nodeType&&R.css&&this.vars.autoCSS!==!1&&I(this.vars,b);for(g in this.vars)if(l=this.vars[g],U[g])l&&(l instanceof Array||l.push&&p(l))&&-1!==l.join("").indexOf("{self}")&&(this.vars[g]=l=this._swapSelfInParams(l,this));else if(R[g]&&(j=new R[g])._onInitTween(b,this.vars[g],this,f)){for(this._firstPT=k={_next:this._firstPT,t:j,p:"setRatio",s:0,c:1,f:1,n:g,pg:1,pr:j._priority,m:0},h=j._overwriteProps.length;--h>-1;)c[j._overwriteProps[h]]=this._firstPT;(j._priority||j._onInitAllProps)&&(i=!0),(j._onDisable||j._onEnable)&&(this._notifyPluginsOfEnabled=!0),k._next&&(k._next._prev=k)}else c[g]=P.call(this,b,g,"get",l,g,0,null,this.vars.stringFilter,f);return e&&this._kill(e,b)?this._initProps(b,c,d,e,f):this._overwrite>1&&this._firstPT&&d.length>1&&aa(b,this,c,this._overwrite,d)?(this._kill(c,b),this._initProps(b,c,d,e,f)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(K[b._gsTweenID]=!0),i)},h.render=function(a,b,c){var d,e,f,g,h=this._time,i=this._duration,j=this._rawPrevTime;if(a>=i-1e-7&&a>=0)this._totalTime=this._time=i,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(d=!0,e="onComplete",c=c||this._timeline.autoRemoveChildren),0===i&&(this._initted||!this.vars.lazy||c)&&(this._startTime===this._timeline._duration&&(a=0),(0>j||0>=a&&a>=-1e-7||j===m&&"isPause"!==this.data)&&j!==a&&(c=!0,j>m&&(e="onReverseComplete")),this._rawPrevTime=g=!b||a||j===a?a:m);else if(1e-7>a)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==h||0===i&&j>0)&&(e="onReverseComplete",d=this._reversed),0>a&&(this._active=!1,0===i&&(this._initted||!this.vars.lazy||c)&&(j>=0&&(j!==m||"isPause"!==this.data)&&(c=!0),this._rawPrevTime=g=!b||a||j===a?a:m)),(!this._initted||this._startAt&&this._startAt.progress())&&(c=!0);else if(this._totalTime=this._time=a,this._easeType){var k=a/i,l=this._easeType,n=this._easePower;(1===l||3===l&&k>=.5)&&(k=1-k),3===l&&(k*=2),1===n?k*=k:2===n?k*=k*k:3===n?k*=k*k*k:4===n&&(k*=k*k*k*k),1===l?this.ratio=1-k:2===l?this.ratio=k:.5>a/i?this.ratio=k/2:this.ratio=1-k/2}else this.ratio=this._ease.getRatio(a/i);if(this._time!==h||c){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!c&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=h,this._rawPrevTime=j,J.push(this),void(this._lazy=[a,b]);this._time&&!d?this.ratio=this._ease.getRatio(this._time/i):d&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==h&&a>=0&&(this._active=!0),0===h&&(this._startAt&&(a>=0?this._startAt.render(a,!0,c):e||(e="_dummyGS")),this.vars.onStart&&(0!==this._time||0===i)&&(b||this._callback("onStart"))),f=this._firstPT;f;)f.f?f.t[f.p](f.c*this.ratio+f.s):f.t[f.p]=f.c*this.ratio+f.s,f=f._next;this._onUpdate&&(0>a&&this._startAt&&a!==-1e-4&&this._startAt.render(a,!0,c),b||(this._time!==h||d||c)&&this._callback("onUpdate")),e&&(!this._gc||c)&&(0>a&&this._startAt&&!this._onUpdate&&a!==-1e-4&&this._startAt.render(a,!0,c),d&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[e]&&this._callback(e),0===i&&this._rawPrevTime===m&&g!==m&&(this._rawPrevTime=0))}},h._kill=function(a,b,c){if("all"===a&&(a=null),null==a&&(null==b||b===this.target))return this._lazy=!1,this._enabled(!1,!1);b="string"!=typeof b?b||this._targets||this.target:G.selector(b)||b;var d,e,f,g,h,i,j,k,l,m=c&&this._time&&c._startTime===this._startTime&&this._timeline===c._timeline;if((p(b)||H(b))&&"number"!=typeof b[0])for(d=b.length;--d>-1;)this._kill(a,b[d],c)&&(i=!0);else{if(this._targets){for(d=this._targets.length;--d>-1;)if(b===this._targets[d]){h=this._propLookup[d]||{},this._overwrittenProps=this._overwrittenProps||[],e=this._overwrittenProps[d]=a?this._overwrittenProps[d]||{}:"all";break}}else{if(b!==this.target)return!1;h=this._propLookup,e=this._overwrittenProps=a?this._overwrittenProps||{}:"all"}if(h){if(j=a||h,k=a!==e&&"all"!==e&&a!==h&&("object"!=typeof a||!a._tempKill),c&&(G.onOverwrite||this.vars.onOverwrite)){for(f in j)h[f]&&(l||(l=[]),l.push(f));if((l||!a)&&!_(this,c,b,l))return!1}for(f in j)(g=h[f])&&(m&&(g.f?g.t[g.p](g.s):g.t[g.p]=g.s,i=!0),g.pg&&g.t._kill(j)&&(i=!0),g.pg&&0!==g.t._overwriteProps.length||(g._prev?g._prev._next=g._next:g===this._firstPT&&(this._firstPT=g._next),g._next&&(g._next._prev=g._prev),g._next=g._prev=null),delete h[f]),k&&(e[f]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return i},h.invalidate=function(){return this._notifyPluginsOfEnabled&&G._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],D.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-m,this.render(Math.min(0,-this._delay))),this},h._enabled=function(a,b){if(j||i.wake(),a&&this._gc){var c,d=this._targets;if(d)for(c=d.length;--c>-1;)this._siblings[c]=$(d[c],this,!0);else this._siblings=$(this.target,this,!0)}return D.prototype._enabled.call(this,a,b),this._notifyPluginsOfEnabled&&this._firstPT?G._onPluginEvent(a?"_onEnable":"_onDisable",this):!1},G.to=function(a,b,c){return new G(a,b,c)},G.from=function(a,b,c){return c.runBackwards=!0,c.immediateRender=0!=c.immediateRender,new G(a,b,c)},G.fromTo=function(a,b,c,d){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,new G(a,b,d)},G.delayedCall=function(a,b,c,d,e){return new G(b,0,{delay:a,onComplete:b,onCompleteParams:c,callbackScope:d,onReverseComplete:b,onReverseCompleteParams:c,immediateRender:!1,lazy:!1,useFrames:e,overwrite:0})},G.set=function(a,b){return new G(a,0,b)},G.getTweensOf=function(a,b){if(null==a)return[];a="string"!=typeof a?a:G.selector(a)||a;var c,d,e,f;if((p(a)||H(a))&&"number"!=typeof a[0]){for(c=a.length,d=[];--c>-1;)d=d.concat(G.getTweensOf(a[c],b));for(c=d.length;--c>-1;)for(f=d[c],e=c;--e>-1;)f===d[e]&&d.splice(c,1)}else if(a._gsTweenID)for(d=$(a).concat(),c=d.length;--c>-1;)(d[c]._gc||b&&!d[c].isActive())&&d.splice(c,1);return d||[]},G.killTweensOf=G.killDelayedCallsTo=function(a,b,c){"object"==typeof b&&(c=b,b=!1);for(var d=G.getTweensOf(a,b),e=d.length;--e>-1;)d[e]._kill(c,a)};var ca=t("plugins.TweenPlugin",function(a,b){this._overwriteProps=(a||"").split(","),this._propName=this._overwriteProps[0],this._priority=b||0,this._super=ca.prototype},!0);if(h=ca.prototype,ca.version="1.19.0",ca.API=2,h._firstPT=null,h._addTween=P,h.setRatio=N,h._kill=function(a){var b,c=this._overwriteProps,d=this._firstPT;if(null!=a[this._propName])this._overwriteProps=[];else for(b=c.length;--b>-1;)null!=a[c[b]]&&c.splice(b,1);for(;d;)null!=a[d.n]&&(d._next&&(d._next._prev=d._prev),d._prev?(d._prev._next=d._next,d._prev=null):this._firstPT===d&&(this._firstPT=d._next)),d=d._next;return!1},h._mod=h._roundProps=function(a){for(var b,c=this._firstPT;c;)b=a[this._propName]||null!=c.n&&a[c.n.split(this._propName+"_").join("")],b&&"function"==typeof b&&(2===c.f?c.t._applyPT.m=b:c.m=b),c=c._next},G._onPluginEvent=function(a,b){var c,d,e,f,g,h=b._firstPT;if("_onInitAllProps"===a){for(;h;){for(g=h._next,d=e;d&&d.pr>h.pr;)d=d._next;(h._prev=d?d._prev:f)?h._prev._next=h:e=h,(h._next=d)?d._prev=h:f=h,h=g}h=b._firstPT=e}for(;h;)h.pg&&"function"==typeof h.t[a]&&h.t[a]()&&(c=!0),h=h._next;return c},ca.activate=function(a){for(var b=a.length;--b>-1;)a[b].API===ca.API&&(R[(new a[b])._propName]=a[b]);return!0},s.plugin=function(a){if(!(a&&a.propName&&a.init&&a.API))throw"illegal plugin definition.";var b,c=a.propName,d=a.priority||0,e=a.overwriteProps,f={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_mod",mod:"_mod",initAll:"_onInitAllProps"},g=t("plugins."+c.charAt(0).toUpperCase()+c.substr(1)+"Plugin",function(){ca.call(this,c,d),this._overwriteProps=e||[]},a.global===!0),h=g.prototype=new ca(c);h.constructor=g,g.API=a.API;for(b in f)"function"==typeof a[b]&&(h[f[b]]=a[b]);return g.version=a.version,ca.activate([g]),g},f=a._gsQueue){for(g=0;g<f.length;g++)f[g]();for(h in q)q[h].func||a.console.log("GSAP encountered missing dependency: "+h)}j=!1}}("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenMax");
/*!
 * VERSION: 1.20.4
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(a,b,c){var d=function(b){a.call(this,b),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},e=1e-10,f=b._internals,g=f.lazyTweens,h=f.lazyRender,i=_gsScope._gsDefine.globals,j=new c(null,null,1,0),k=d.prototype=new a;return k.constructor=d,k.kill()._gc=!1,d.version="1.20.4",k.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),a.prototype.invalidate.call(this)},k.addCallback=function(a,c,d,e){return this.add(b.delayedCall(0,a,d,e),c)},k.removeCallback=function(a,b){if(a)if(null==b)this._kill(null,a);else for(var c=this.getTweensOf(a,!1),d=c.length,e=this._parseTimeOrLabel(b);--d>-1;)c[d]._startTime===e&&c[d]._enabled(!1,!1);return this},k.removePause=function(b){return this.removeCallback(a._internals.pauseCallback,b)},k.tweenTo=function(a,c){c=c||{};var d,e,f,g={ease:j,useFrames:this.usesFrames(),immediateRender:!1,lazy:!1},h=c.repeat&&i.TweenMax||b;for(e in c)g[e]=c[e];return g.time=this._parseTimeOrLabel(a),d=Math.abs(Number(g.time)-this._time)/this._timeScale||.001,f=new h(this,d,g),g.onStart=function(){f.target.paused(!0),f.vars.time===f.target.time()||d!==f.duration()||f.isFromTo||f.duration(Math.abs(f.vars.time-f.target.time())/f.target._timeScale).render(f.time(),!0,!0),c.onStart&&c.onStart.apply(c.onStartScope||c.callbackScope||f,c.onStartParams||[])},f},k.tweenFromTo=function(a,b,c){c=c||{},a=this._parseTimeOrLabel(a),c.startAt={onComplete:this.seek,onCompleteParams:[a],callbackScope:this},c.immediateRender=c.immediateRender!==!1;var d=this.tweenTo(b,c);return d.isFromTo=1,d.duration(Math.abs(d.vars.time-a)/this._timeScale||.001)},k.render=function(a,b,c){this._gc&&this._enabled(!0,!1);var d,f,i,j,k,l,m,n,o=this._time,p=this._dirty?this.totalDuration():this._totalDuration,q=this._duration,r=this._totalTime,s=this._startTime,t=this._timeScale,u=this._rawPrevTime,v=this._paused,w=this._cycle;if(o!==this._time&&(a+=this._time-o),a>=p-1e-7&&a>=0)this._locked||(this._totalTime=p,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(f=!0,j="onComplete",k=!!this._timeline.autoRemoveChildren,0===this._duration&&(0>=a&&a>=-1e-7||0>u||u===e)&&u!==a&&this._first&&(k=!0,u>e&&(j="onReverseComplete"))),this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,this._yoyo&&0!==(1&this._cycle)?this._time=a=0:(this._time=q,a=q+1e-4);else if(1e-7>a)if(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==o||0===q&&u!==e&&(u>0||0>a&&u>=0)&&!this._locked)&&(j="onReverseComplete",f=this._reversed),0>a)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(k=f=!0,j="onReverseComplete"):u>=0&&this._first&&(k=!0),this._rawPrevTime=a;else{if(this._rawPrevTime=q||!b||a||this._rawPrevTime===a?a:e,0===a&&f)for(d=this._first;d&&0===d._startTime;)d._duration||(f=!1),d=d._next;a=0,this._initted||(k=!0)}else if(0===q&&0>u&&(k=!0),this._time=this._rawPrevTime=a,this._locked||(this._totalTime=a,0!==this._repeat&&(l=q+this._repeatDelay,this._cycle=this._totalTime/l>>0,0!==this._cycle&&this._cycle===this._totalTime/l&&a>=r&&this._cycle--,this._time=this._totalTime-this._cycle*l,this._yoyo&&0!==(1&this._cycle)&&(this._time=q-this._time),this._time>q?(this._time=q,a=q+1e-4):this._time<0?this._time=a=0:a=this._time)),this._hasPause&&!this._forcingPlayhead&&!b){if(a=this._time,a>=o||this._repeat&&w!==this._cycle)for(d=this._first;d&&d._startTime<=a&&!m;)d._duration||"isPause"!==d.data||d.ratio||0===d._startTime&&0===this._rawPrevTime||(m=d),d=d._next;else for(d=this._last;d&&d._startTime>=a&&!m;)d._duration||"isPause"===d.data&&d._rawPrevTime>0&&(m=d),d=d._prev;m&&m._startTime<q&&(this._time=a=m._startTime,this._totalTime=a+this._cycle*(this._totalDuration+this._repeatDelay))}if(this._cycle!==w&&!this._locked){var x=this._yoyo&&0!==(1&w),y=x===(this._yoyo&&0!==(1&this._cycle)),z=this._totalTime,A=this._cycle,B=this._rawPrevTime,C=this._time;if(this._totalTime=w*q,this._cycle<w?x=!x:this._totalTime+=q,this._time=o,this._rawPrevTime=0===q?u-1e-4:u,this._cycle=w,this._locked=!0,o=x?0:q,this.render(o,b,0===q),b||this._gc||this.vars.onRepeat&&(this._cycle=A,this._locked=!1,this._callback("onRepeat")),o!==this._time)return;if(y&&(this._cycle=w,this._locked=!0,o=x?q+1e-4:-1e-4,this.render(o,!0,!1)),this._locked=!1,this._paused&&!v)return;this._time=C,this._totalTime=z,this._cycle=A,this._rawPrevTime=B}if(!(this._time!==o&&this._first||c||k||m))return void(r!==this._totalTime&&this._onUpdate&&(b||this._callback("onUpdate")));if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==r&&a>0&&(this._active=!0),0===r&&this.vars.onStart&&(0===this._totalTime&&this._totalDuration||b||this._callback("onStart")),n=this._time,n>=o)for(d=this._first;d&&(i=d._next,n===this._time&&(!this._paused||v));)(d._active||d._startTime<=this._time&&!d._paused&&!d._gc)&&(m===d&&this.pause(),d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)),d=i;else for(d=this._last;d&&(i=d._prev,n===this._time&&(!this._paused||v));){if(d._active||d._startTime<=o&&!d._paused&&!d._gc){if(m===d){for(m=d._prev;m&&m.endTime()>this._time;)m.render(m._reversed?m.totalDuration()-(a-m._startTime)*m._timeScale:(a-m._startTime)*m._timeScale,b,c),m=m._prev;m=null,this.pause()}d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)}d=i}this._onUpdate&&(b||(g.length&&h(),this._callback("onUpdate"))),j&&(this._locked||this._gc||(s===this._startTime||t!==this._timeScale)&&(0===this._time||p>=this.totalDuration())&&(f&&(g.length&&h(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[j]&&this._callback(j)))},k.getActive=function(a,b,c){null==a&&(a=!0),null==b&&(b=!0),null==c&&(c=!1);var d,e,f=[],g=this.getChildren(a,b,c),h=0,i=g.length;for(d=0;i>d;d++)e=g[d],e.isActive()&&(f[h++]=e);return f},k.getLabelAfter=function(a){a||0!==a&&(a=this._time);var b,c=this.getLabelsArray(),d=c.length;for(b=0;d>b;b++)if(c[b].time>a)return c[b].name;return null},k.getLabelBefore=function(a){null==a&&(a=this._time);for(var b=this.getLabelsArray(),c=b.length;--c>-1;)if(b[c].time<a)return b[c].name;return null},k.getLabelsArray=function(){var a,b=[],c=0;for(a in this._labels)b[c++]={time:this._labels[a],name:a};return b.sort(function(a,b){return a.time-b.time}),b},k.invalidate=function(){return this._locked=!1,a.prototype.invalidate.call(this)},k.progress=function(a,b){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),b):this._time/this.duration()||0},k.totalProgress=function(a,b){return arguments.length?this.totalTime(this.totalDuration()*a,b):this._totalTime/this.totalDuration()||0},k.totalDuration=function(b){return arguments.length?-1!==this._repeat&&b?this.timeScale(this.totalDuration()/b):this:(this._dirty&&(a.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},k.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this._yoyo&&0!==(1&this._cycle)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(a,b)):this._time},k.repeat=function(a){return arguments.length?(this._repeat=a,this._uncache(!0)):this._repeat},k.repeatDelay=function(a){return arguments.length?(this._repeatDelay=a,this._uncache(!0)):this._repeatDelay},k.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},k.currentLabel=function(a){return arguments.length?this.seek(a,!0):this.getLabelBefore(this._time+1e-8)},d},!0),_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(a,b,c){var d=function(a){b.call(this,a),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var c,d,e=this.vars;for(d in e)c=e[d],i(c)&&-1!==c.join("").indexOf("{self}")&&(e[d]=this._swapSelfInParams(c));i(e.tweens)&&this.add(e.tweens,0,e.align,e.stagger)},e=1e-10,f=c._internals,g=d._internals={},h=f.isSelector,i=f.isArray,j=f.lazyTweens,k=f.lazyRender,l=_gsScope._gsDefine.globals,m=function(a){var b,c={};for(b in a)c[b]=a[b];return c},n=function(a,b,c){var d,e,f=a.cycle;for(d in f)e=f[d],a[d]="function"==typeof e?e(c,b[c]):e[c%e.length];delete a.cycle},o=g.pauseCallback=function(){},p=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},q=d.prototype=new b;return d.version="1.20.4",q.constructor=d,q.kill()._gc=q._forcingPlayhead=q._hasPause=!1,q.to=function(a,b,d,e){var f=d.repeat&&l.TweenMax||c;return b?this.add(new f(a,b,d),e):this.set(a,d,e)},q.from=function(a,b,d,e){return this.add((d.repeat&&l.TweenMax||c).from(a,b,d),e)},q.fromTo=function(a,b,d,e,f){var g=e.repeat&&l.TweenMax||c;return b?this.add(g.fromTo(a,b,d,e),f):this.set(a,e,f)},q.staggerTo=function(a,b,e,f,g,i,j,k){var l,o,q=new d({onComplete:i,onCompleteParams:j,callbackScope:k,smoothChildTiming:this.smoothChildTiming}),r=e.cycle;for("string"==typeof a&&(a=c.selector(a)||a),a=a||[],h(a)&&(a=p(a)),f=f||0,0>f&&(a=p(a),a.reverse(),f*=-1),o=0;o<a.length;o++)l=m(e),l.startAt&&(l.startAt=m(l.startAt),l.startAt.cycle&&n(l.startAt,a,o)),r&&(n(l,a,o),null!=l.duration&&(b=l.duration,delete l.duration)),q.to(a[o],b,l,o*f);return this.add(q,g)},q.staggerFrom=function(a,b,c,d,e,f,g,h){return c.immediateRender=0!=c.immediateRender,c.runBackwards=!0,this.staggerTo(a,b,c,d,e,f,g,h)},q.staggerFromTo=function(a,b,c,d,e,f,g,h,i){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,this.staggerTo(a,b,d,e,f,g,h,i)},q.call=function(a,b,d,e){return this.add(c.delayedCall(0,a,b,d),e)},q.set=function(a,b,d){return d=this._parseTimeOrLabel(d,0,!0),null==b.immediateRender&&(b.immediateRender=d===this._time&&!this._paused),this.add(new c(a,0,b),d)},d.exportRoot=function(a,b){a=a||{},null==a.smoothChildTiming&&(a.smoothChildTiming=!0);var e,f,g,h,i=new d(a),j=i._timeline;for(null==b&&(b=!0),j._remove(i,!0),i._startTime=0,i._rawPrevTime=i._time=i._totalTime=j._time,g=j._first;g;)h=g._next,b&&g instanceof c&&g.target===g.vars.onComplete||(f=g._startTime-g._delay,0>f&&(e=1),i.add(g,f)),g=h;return j.add(i,0),e&&i.totalDuration(),i},q.add=function(e,f,g,h){var j,k,l,m,n,o;if("number"!=typeof f&&(f=this._parseTimeOrLabel(f,0,!0,e)),!(e instanceof a)){if(e instanceof Array||e&&e.push&&i(e)){for(g=g||"normal",h=h||0,j=f,k=e.length,l=0;k>l;l++)i(m=e[l])&&(m=new d({tweens:m})),this.add(m,j),"string"!=typeof m&&"function"!=typeof m&&("sequence"===g?j=m._startTime+m.totalDuration()/m._timeScale:"start"===g&&(m._startTime-=m.delay())),j+=h;return this._uncache(!0)}if("string"==typeof e)return this.addLabel(e,f);if("function"!=typeof e)throw"Cannot add "+e+" into the timeline; it is not a tween, timeline, function, or string.";e=c.delayedCall(0,e)}if(b.prototype.add.call(this,e,f),e._time&&e.render((this.rawTime()-e._startTime)*e._timeScale,!1,!1),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(n=this,o=n.rawTime()>e._startTime;n._timeline;)o&&n._timeline.smoothChildTiming?n.totalTime(n._totalTime,!0):n._gc&&n._enabled(!0,!1),n=n._timeline;return this},q.remove=function(b){if(b instanceof a){this._remove(b,!1);var c=b._timeline=b.vars.useFrames?a._rootFramesTimeline:a._rootTimeline;return b._startTime=(b._paused?b._pauseTime:c._time)-(b._reversed?b.totalDuration()-b._totalTime:b._totalTime)/b._timeScale,this}if(b instanceof Array||b&&b.push&&i(b)){for(var d=b.length;--d>-1;)this.remove(b[d]);return this}return"string"==typeof b?this.removeLabel(b):this.kill(null,b)},q._remove=function(a,c){b.prototype._remove.call(this,a,c);var d=this._last;return d?this._time>this.duration()&&(this._time=this._duration,this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},q.append=function(a,b){return this.add(a,this._parseTimeOrLabel(null,b,!0,a))},q.insert=q.insertMultiple=function(a,b,c,d){return this.add(a,b||0,c,d)},q.appendMultiple=function(a,b,c,d){return this.add(a,this._parseTimeOrLabel(null,b,!0,a),c,d)},q.addLabel=function(a,b){return this._labels[a]=this._parseTimeOrLabel(b),this},q.addPause=function(a,b,d,e){var f=c.delayedCall(0,o,d,e||this);return f.vars.onComplete=f.vars.onReverseComplete=b,f.data="isPause",this._hasPause=!0,this.add(f,a)},q.removeLabel=function(a){return delete this._labels[a],this},q.getLabelTime=function(a){return null!=this._labels[a]?this._labels[a]:-1},q._parseTimeOrLabel=function(b,c,d,e){var f,g;if(e instanceof a&&e.timeline===this)this.remove(e);else if(e&&(e instanceof Array||e.push&&i(e)))for(g=e.length;--g>-1;)e[g]instanceof a&&e[g].timeline===this&&this.remove(e[g]);if(f="number"!=typeof b||c?this.duration()>99999999999?this.recent().endTime(!1):this._duration:0,"string"==typeof c)return this._parseTimeOrLabel(c,d&&"number"==typeof b&&null==this._labels[c]?b-f:0,d);if(c=c||0,"string"!=typeof b||!isNaN(b)&&null==this._labels[b])null==b&&(b=f);else{if(g=b.indexOf("="),-1===g)return null==this._labels[b]?d?this._labels[b]=f+c:c:this._labels[b]+c;c=parseInt(b.charAt(g-1)+"1",10)*Number(b.substr(g+1)),b=g>1?this._parseTimeOrLabel(b.substr(0,g-1),0,d):f}return Number(b)+c},q.seek=function(a,b){return this.totalTime("number"==typeof a?a:this._parseTimeOrLabel(a),b!==!1)},q.stop=function(){return this.paused(!0)},q.gotoAndPlay=function(a,b){return this.play(a,b)},q.gotoAndStop=function(a,b){return this.pause(a,b)},q.render=function(a,b,c){this._gc&&this._enabled(!0,!1);var d,f,g,h,i,l,m,n=this._dirty?this.totalDuration():this._totalDuration,o=this._time,p=this._startTime,q=this._timeScale,r=this._paused;if(a>=n-1e-7&&a>=0)this._totalTime=this._time=n,this._reversed||this._hasPausedChild()||(f=!0,h="onComplete",i=!!this._timeline.autoRemoveChildren,0===this._duration&&(0>=a&&a>=-1e-7||this._rawPrevTime<0||this._rawPrevTime===e)&&this._rawPrevTime!==a&&this._first&&(i=!0,this._rawPrevTime>e&&(h="onReverseComplete"))),this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,a=n+1e-4;else if(1e-7>a)if(this._totalTime=this._time=0,(0!==o||0===this._duration&&this._rawPrevTime!==e&&(this._rawPrevTime>0||0>a&&this._rawPrevTime>=0))&&(h="onReverseComplete",f=this._reversed),0>a)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(i=f=!0,h="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(i=!0),this._rawPrevTime=a;else{if(this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,0===a&&f)for(d=this._first;d&&0===d._startTime;)d._duration||(f=!1),d=d._next;a=0,this._initted||(i=!0)}else{if(this._hasPause&&!this._forcingPlayhead&&!b){if(a>=o)for(d=this._first;d&&d._startTime<=a&&!l;)d._duration||"isPause"!==d.data||d.ratio||0===d._startTime&&0===this._rawPrevTime||(l=d),d=d._next;else for(d=this._last;d&&d._startTime>=a&&!l;)d._duration||"isPause"===d.data&&d._rawPrevTime>0&&(l=d),d=d._prev;l&&(this._time=a=l._startTime,this._totalTime=a+this._cycle*(this._totalDuration+this._repeatDelay))}this._totalTime=this._time=this._rawPrevTime=a}if(this._time!==o&&this._first||c||i||l){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==o&&a>0&&(this._active=!0),0===o&&this.vars.onStart&&(0===this._time&&this._duration||b||this._callback("onStart")),m=this._time,m>=o)for(d=this._first;d&&(g=d._next,m===this._time&&(!this._paused||r));)(d._active||d._startTime<=m&&!d._paused&&!d._gc)&&(l===d&&this.pause(),d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)),d=g;else for(d=this._last;d&&(g=d._prev,m===this._time&&(!this._paused||r));){if(d._active||d._startTime<=o&&!d._paused&&!d._gc){if(l===d){for(l=d._prev;l&&l.endTime()>this._time;)l.render(l._reversed?l.totalDuration()-(a-l._startTime)*l._timeScale:(a-l._startTime)*l._timeScale,b,c),l=l._prev;l=null,this.pause()}d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)}d=g}this._onUpdate&&(b||(j.length&&k(),this._callback("onUpdate"))),h&&(this._gc||(p===this._startTime||q!==this._timeScale)&&(0===this._time||n>=this.totalDuration())&&(f&&(j.length&&k(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[h]&&this._callback(h)))}},q._hasPausedChild=function(){for(var a=this._first;a;){if(a._paused||a instanceof d&&a._hasPausedChild())return!0;a=a._next}return!1},q.getChildren=function(a,b,d,e){e=e||-9999999999;for(var f=[],g=this._first,h=0;g;)g._startTime<e||(g instanceof c?b!==!1&&(f[h++]=g):(d!==!1&&(f[h++]=g),a!==!1&&(f=f.concat(g.getChildren(!0,b,d)),h=f.length))),g=g._next;return f},q.getTweensOf=function(a,b){var d,e,f=this._gc,g=[],h=0;for(f&&this._enabled(!0,!0),d=c.getTweensOf(a),e=d.length;--e>-1;)(d[e].timeline===this||b&&this._contains(d[e]))&&(g[h++]=d[e]);return f&&this._enabled(!1,!0),g},q.recent=function(){return this._recent},q._contains=function(a){for(var b=a.timeline;b;){if(b===this)return!0;b=b.timeline}return!1},q.shiftChildren=function(a,b,c){c=c||0;for(var d,e=this._first,f=this._labels;e;)e._startTime>=c&&(e._startTime+=a),e=e._next;if(b)for(d in f)f[d]>=c&&(f[d]+=a);return this._uncache(!0)},q._kill=function(a,b){if(!a&&!b)return this._enabled(!1,!1);for(var c=b?this.getTweensOf(b):this.getChildren(!0,!0,!1),d=c.length,e=!1;--d>-1;)c[d]._kill(a,b)&&(e=!0);return e},q.clear=function(a){var b=this.getChildren(!1,!0,!0),c=b.length;for(this._time=this._totalTime=0;--c>-1;)b[c]._enabled(!1,!1);return a!==!1&&(this._labels={}),this._uncache(!0)},q.invalidate=function(){for(var b=this._first;b;)b.invalidate(),b=b._next;return a.prototype.invalidate.call(this)},q._enabled=function(a,c){if(a===this._gc)for(var d=this._first;d;)d._enabled(a,!0),d=d._next;return b.prototype._enabled.call(this,a,c)},q.totalTime=function(b,c,d){this._forcingPlayhead=!0;var e=a.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},q.duration=function(a){return arguments.length?(0!==this.duration()&&0!==a&&this.timeScale(this._duration/a),this):(this._dirty&&this.totalDuration(),this._duration)},q.totalDuration=function(a){if(!arguments.length){if(this._dirty){for(var b,c,d=0,e=this._last,f=999999999999;e;)b=e._prev,e._dirty&&e.totalDuration(),e._startTime>f&&this._sortChildren&&!e._paused&&!this._calculatingDuration?(this._calculatingDuration=1,this.add(e,e._startTime-e._delay),this._calculatingDuration=0):f=e._startTime,e._startTime<0&&!e._paused&&(d-=e._startTime,this._timeline.smoothChildTiming&&(this._startTime+=e._startTime/this._timeScale,this._time-=e._startTime,this._totalTime-=e._startTime,this._rawPrevTime-=e._startTime),this.shiftChildren(-e._startTime,!1,-9999999999),f=0),c=e._startTime+e._totalDuration/e._timeScale,c>d&&(d=c),e=b;this._duration=this._totalDuration=d,this._dirty=!1}return this._totalDuration}return a&&this.totalDuration()?this.timeScale(this._totalDuration/a):this},q.paused=function(b){if(!b)for(var c=this._first,d=this._time;c;)c._startTime===d&&"isPause"===c.data&&(c._rawPrevTime=0),c=c._next;return a.prototype.paused.apply(this,arguments)},q.usesFrames=function(){for(var b=this._timeline;b._timeline;)b=b._timeline;return b===a._rootFramesTimeline},q.rawTime=function(a){return a&&(this._paused||this._repeat&&this.time()>0&&this.totalProgress()<1)?this._totalTime%(this._duration+this._repeatDelay):this._paused?this._totalTime:(this._timeline.rawTime(a)-this._startTime)*this._timeScale},d},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"undefined"!=typeof module&&module.exports?(require("./TweenLite.min.js"),module.exports=b()):"function"==typeof define&&define.amd&&define(["TweenLite"],b)}("TimelineMax");

// ------------------------------------------
// Rellax.js
// Buttery smooth parallax library
// Copyright (c) 2016 Moe Amaya (@moeamaya)
// MIT license
//
// Thanks to Paraxify.js and Jaime Cabllero
// for parallax concepts
// ------------------------------------------

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Rellax = factory();
  }
}(typeof window !== "undefined" ? window : global, function () {
  var Rellax = function(el, options){
    "use strict";

    var self = Object.create(Rellax.prototype);

    var posY = 0;
    var screenY = 0;
    var posX = 0;
    var screenX = 0;
    var blocks = [];
    var pause = true;

    // check what requestAnimationFrame to use, and if
    // it's not supported, use the onscroll event
    var loop = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(callback){ return setTimeout(callback, 1000 / 60); };

    // store the id for later use
    var loopId = null;

    // Test via a getter in the options object to see if the passive property is accessed
    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
        }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {}

    // check what cancelAnimation method to use
    var clearLoop = window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout;

    // check which transform property to use
    var transformProp = window.transformProp || (function(){
        var testEl = document.createElement('div');
        if (testEl.style.transform === null) {
          var vendors = ['Webkit', 'Moz', 'ms'];
          for (var vendor in vendors) {
            if (testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
              return vendors[vendor] + 'Transform';
            }
          }
        }
        return 'transform';
      })();

    // Default Settings
    self.options = {
      speed: -2,
	  verticalSpeed: null,
	  horizontalSpeed: null,
      center: false,
      wrapper: null,
      relativeToWrapper: false,
      round: true,
      vertical: true,
      horizontal: false,
      verticalScrollAxis: "y",
      horizontalScrollAxis: "x",
      callback: function() {},
    };

    // User defined options (might have more in the future)
    if (options){
      Object.keys(options).forEach(function(key){
        self.options[key] = options[key];
      });
    }

    // By default, rellax class
    if (!el) {
      el = '.rellax';
    }

    // check if el is a className or a node
    var elements = typeof el === 'string' ? document.querySelectorAll(el) : [el];

    // Now query selector
    if (elements.length > 0) {
      self.elems = elements;
    }

    // The elements don't exist
    else {
      console.warn("Rellax: The elements you're trying to select don't exist.");
      return;
    }

    // Has a wrapper and it exists
    if (self.options.wrapper) {
      if (!self.options.wrapper.nodeType) {
        var wrapper = document.querySelector(self.options.wrapper);

        if (wrapper) {
          self.options.wrapper = wrapper;
        } else {
          console.warn("Rellax: The wrapper you're trying to use doesn't exist.");
          return;
        }
      }
    }


    // Get and cache initial position of all elements
    var cacheBlocks = function() {
      for (var i = 0; i < self.elems.length; i++){
        var block = createBlock(self.elems[i]);
        blocks.push(block);
      }
    };


    // Let's kick this script off
    // Build array for cached element values
    var init = function() {
      for (var i = 0; i < blocks.length; i++){
        self.elems[i].style.cssText = blocks[i].style;
      }

      blocks = [];

      screenY = window.innerHeight;
      screenX = window.innerWidth;
      setPosition();

      cacheBlocks();

      animate();

      // If paused, unpause and set listener for window resizing events
      if (pause) {
        window.addEventListener('resize', init);
        pause = false;
        // Start the loop
        update();
      }
    };

    // We want to cache the parallax blocks'
    // values: base, top, height, speed
    // el: is dom object, return: el cache values
    var createBlock = function(el) {
      var dataPercentage = el.getAttribute( 'data-rellax-percentage' );
      var dataSpeed = el.getAttribute( 'data-rellax-speed' );
      var dataVerticalSpeed = el.getAttribute('data-rellax-vertical-speed');
      var dataHorizontalSpeed = el.getAttribute('data-rellax-horizontal-speed');
      var dataVericalScrollAxis = el.getAttribute('data-rellax-vertical-scroll-axis');
      var dataHorizontalScrollAxis = el.getAttribute('data-rellax-horizontal-scroll-axis');
      var dataZindex = el.getAttribute( 'data-rellax-zindex' ) || 0;
      var dataMin = el.getAttribute( 'data-rellax-min' );
      var dataMax = el.getAttribute( 'data-rellax-max' );
      var dataMinX = el.getAttribute('data-rellax-min-x');
      var dataMaxX = el.getAttribute('data-rellax-max-x');
      var dataMinY = el.getAttribute('data-rellax-min-y');
      var dataMaxY = el.getAttribute('data-rellax-max-y');

      // initializing at scrollY = 0 (top of browser), scrollX = 0 (left of browser)
      // ensures elements are positioned based on HTML layout.
      //
      // If the element has the percentage attribute, the posY and posX needs to be
      // the current scroll position's value, so that the elements are still positioned based on HTML layout
      var wrapperPosY = self.options.wrapper ? self.options.wrapper.scrollTop : (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
      // If the option relativeToWrapper is true, use the wrappers offset to top, subtracted from the current page scroll.
      if (self.options.relativeToWrapper) {
        var scrollPosY = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
        wrapperPosY = scrollPosY - self.options.wrapper.offsetTop;
      }
      var posY = self.options.vertical ? ( dataPercentage || self.options.center ? wrapperPosY : 0 ) : 0;
      var posX = self.options.horizontal ? ( dataPercentage || self.options.center ? self.options.wrapper ? self.options.wrapper.scrollLeft : (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft) : 0 ) : 0;

      var blockTop = posY + el.getBoundingClientRect().top;
      var blockHeight = el.clientHeight || el.offsetHeight || el.scrollHeight;

      var blockLeft = posX + el.getBoundingClientRect().left;
      var blockWidth = el.clientWidth || el.offsetWidth || el.scrollWidth;

      // apparently parallax equation everyone uses
      var percentageY = dataPercentage ? dataPercentage : (posY - blockTop + screenY) / (blockHeight + screenY);
      var percentageX = dataPercentage ? dataPercentage : (posX - blockLeft + screenX) / (blockWidth + screenX);
      if(self.options.center){ percentageX = 0.5; percentageY = 0.5; }

      // Optional individual block speed as data attr, otherwise global speed
      var speed = dataSpeed ? dataSpeed : self.options.speed;
      var verticalSpeed = dataVerticalSpeed ? dataVerticalSpeed : self.options.verticalSpeed;
      var horizontalSpeed = dataHorizontalSpeed ? dataHorizontalSpeed : self.options.horizontalSpeed;

      // Optional individual block movement axis direction as data attr, otherwise gobal movement direction
      var verticalScrollAxis = dataVericalScrollAxis ? dataVericalScrollAxis : self.options.verticalScrollAxis;
      var horizontalScrollAxis = dataHorizontalScrollAxis ? dataHorizontalScrollAxis : self.options.horizontalScrollAxis;

      var bases = updatePosition(percentageX, percentageY, speed, verticalSpeed, horizontalSpeed);

      // ~~Store non-translate3d transforms~~
      // Store inline styles and extract transforms
      var style = el.style.cssText;
      var transform = '';

      // Check if there's an inline styled transform
      var searchResult = /transform\s*:/i.exec(style);
      if (searchResult) {
        // Get the index of the transform
        var index = searchResult.index;

        // Trim the style to the transform point and get the following semi-colon index
        var trimmedStyle = style.slice(index);
        var delimiter = trimmedStyle.indexOf(';');

        // Remove "transform" string and save the attribute
        if (delimiter) {
          transform = " " + trimmedStyle.slice(11, delimiter).replace(/\s/g,'');
        } else {
          transform = " " + trimmedStyle.slice(11).replace(/\s/g,'');
        }
      }

      return {
        baseX: bases.x,
        baseY: bases.y,
        top: blockTop,
        left: blockLeft,
        height: blockHeight,
        width: blockWidth,
        speed: speed,
        verticalSpeed: verticalSpeed,
        horizontalSpeed: horizontalSpeed,
        verticalScrollAxis: verticalScrollAxis,
        horizontalScrollAxis: horizontalScrollAxis,
        style: style,
        transform: transform,
        zindex: dataZindex,
        min: dataMin,
        max: dataMax,
        minX: dataMinX,
        maxX: dataMaxX,
        minY: dataMinY,
        maxY: dataMaxY
      };
    };

    // set scroll position (posY, posX)
    // side effect method is not ideal, but okay for now
    // returns true if the scroll changed, false if nothing happened
    var setPosition = function() {
      var oldY = posY;
      var oldX = posX;

      posY = self.options.wrapper ? self.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset;
      posX = self.options.wrapper ? self.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset;
      // If option relativeToWrapper is true, use relative wrapper value instead.
      if (self.options.relativeToWrapper) {
        var scrollPosY = (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset;
        posY = scrollPosY - self.options.wrapper.offsetTop;
      }


      if (oldY != posY && self.options.vertical) {
        // scroll changed, return true
        return true;
      }

      if (oldX != posX && self.options.horizontal) {
        // scroll changed, return true
        return true;
      }

      // scroll did not change
      return false;
    };

    // Ahh a pure function, gets new transform value
    // based on scrollPosition and speed
    // Allow for decimal pixel values
    var updatePosition = function(percentageX, percentageY, speed, verticalSpeed, horizontalSpeed) {
      var result = {};
      var valueX = ((horizontalSpeed ? horizontalSpeed : speed) * (100 * (1 - percentageX)));
      var valueY = ((verticalSpeed ? verticalSpeed : speed) * (100 * (1 - percentageY)));

      result.x = self.options.round ? Math.round(valueX) : Math.round(valueX * 100) / 100;
      result.y = self.options.round ? Math.round(valueY) : Math.round(valueY * 100) / 100;

      return result;
    };

    // Remove event listeners and loop again
    var deferredUpdate = function() {
      window.removeEventListener('resize', deferredUpdate);
      window.removeEventListener('orientationchange', deferredUpdate);
      (self.options.wrapper ? self.options.wrapper : window).removeEventListener('scroll', deferredUpdate);
      (self.options.wrapper ? self.options.wrapper : document).removeEventListener('touchmove', deferredUpdate);

      // loop again
      loopId = loop(update);
    };

    // Loop
    var update = function() {
      if (setPosition() && pause === false) {
        animate();

        // loop again
        loopId = loop(update);
      } else {
        loopId = null;

        // Don't animate until we get a position updating event
        window.addEventListener('resize', deferredUpdate);
        window.addEventListener('orientationchange', deferredUpdate);
        (self.options.wrapper ? self.options.wrapper : window).addEventListener('scroll', deferredUpdate, supportsPassive ? { passive: true } : false);
        (self.options.wrapper ? self.options.wrapper : document).addEventListener('touchmove', deferredUpdate, supportsPassive ? { passive: true } : false);
      }
    };

    // Transform3d on parallax element
    var animate = function() {
      var positions;
      for (var i = 0; i < self.elems.length; i++){
        // Determine relevant movement directions
        var verticalScrollAxis = blocks[i].verticalScrollAxis.toLowerCase();
        var horizontalScrollAxis = blocks[i].horizontalScrollAxis.toLowerCase();
        var verticalScrollX = verticalScrollAxis.indexOf("x") != -1 ? posY : 0;
        var verticalScrollY = verticalScrollAxis.indexOf("y") != -1 ? posY : 0;
        var horizontalScrollX = horizontalScrollAxis.indexOf("x") != -1 ? posX : 0;
        var horizontalScrollY = horizontalScrollAxis.indexOf("y") != -1 ? posX : 0;

        var percentageY = ((verticalScrollY + horizontalScrollY - blocks[i].top + screenY) / (blocks[i].height + screenY));
        var percentageX = ((verticalScrollX + horizontalScrollX - blocks[i].left + screenX) / (blocks[i].width + screenX));

        // Subtracting initialize value, so element stays in same spot as HTML
        positions = updatePosition(percentageX, percentageY, blocks[i].speed, blocks[i].verticalSpeed, blocks[i].horizontalSpeed);
        var positionY = positions.y - blocks[i].baseY;
        var positionX = positions.x - blocks[i].baseX;

        // The next two "if" blocks go like this:
        // Check if a limit is defined (first "min", then "max");
        // Check if we need to change the Y or the X
        // (Currently working only if just one of the axes is enabled)
        // Then, check if the new position is inside the allowed limit
        // If so, use new position. If not, set position to limit.

        // Check if a min limit is defined
        if (blocks[i].min !== null) {
          if (self.options.vertical && !self.options.horizontal) {
            positionY = positionY <= blocks[i].min ? blocks[i].min : positionY;
          }
          if (self.options.horizontal && !self.options.vertical) {
            positionX = positionX <= blocks[i].min ? blocks[i].min : positionX;
          }
        }

        // Check if directional min limits are defined
        if (blocks[i].minY != null) {
            positionY = positionY <= blocks[i].minY ? blocks[i].minY : positionY;
        }
        if (blocks[i].minX != null) {
            positionX = positionX <= blocks[i].minX ? blocks[i].minX : positionX;
        }

        // Check if a max limit is defined
        if (blocks[i].max !== null) {
          if (self.options.vertical && !self.options.horizontal) {
            positionY = positionY >= blocks[i].max ? blocks[i].max : positionY;
          }
          if (self.options.horizontal && !self.options.vertical) {
            positionX = positionX >= blocks[i].max ? blocks[i].max : positionX;
          }
        }

        // Check if directional max limits are defined
        if (blocks[i].maxY != null) {
            positionY = positionY >= blocks[i].maxY ? blocks[i].maxY : positionY;
        }
        if (blocks[i].maxX != null) {
            positionX = positionX >= blocks[i].maxX ? blocks[i].maxX : positionX;
        }

        var zindex = blocks[i].zindex;

        // Move that element
        // (Set the new translation and append initial inline transforms.)
        var translate = 'translate3d(' + (self.options.horizontal ? positionX : '0') + 'px,' + (self.options.vertical ? positionY : '0') + 'px,' + zindex + 'px) ' + blocks[i].transform;
        self.elems[i].style[transformProp] = translate;
      }
      self.options.callback(positions);
    };

    self.destroy = function() {
      for (var i = 0; i < self.elems.length; i++){
        self.elems[i].style.cssText = blocks[i].style;
      }

      // Remove resize event listener if not pause, and pause
      if (!pause) {
        window.removeEventListener('resize', init);
        pause = true;
      }

      // Clear the animation loop to prevent possible memory leak
      clearLoop(loopId);
      loopId = null;
    };

    // Init
    init();

    // Allow to recalculate the initial values whenever we want
    self.refresh = init;

    return self;
  };
  return Rellax;
}));

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
