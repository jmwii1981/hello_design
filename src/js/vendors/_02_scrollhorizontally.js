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
