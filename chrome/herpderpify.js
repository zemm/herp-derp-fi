/*
Copyright © 2013 zemm <zemm@iki.fi>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
*/

(function(){
	var minH        = 50;
	var minVarH     = 100;
	var defaultVarH = 150;
	var minW        = 100;
	var minVarW     = 100;
	var defaultVarW = 300; // when not found (hidden elements)

	var selector = '.comment-body, .xcTextValue';

	var checkComments = function() {
		var els = findUnderpedElements();
		for (
			var i = 0, c = els.length;
			i !== c;
			makeElementDerped(els[i++])
		);
		setTimeout(checkComments, 300);
	};

	var findUnderpedElements = function() {
		var res = [];
		var els = document.querySelectorAll(selector);
		var el;
		for (var i = 0, c = els.length; i != c; ++i) {
			el = els[i];
			if ( ! el.derpedHTML) {
				res.push(el);
			}
		}
		return res;
	};

	var makeElementDerped = function(el) {
		var generatorIndex = Math.floor(Math.random() * generators.length);
		el.originalHTML    = el.innerHTML;
		el.derpedHTML      = generators[generatorIndex](el);
		el.innerHTML       = el.derpedHTML;
		el.isDerped        = true;
		el.addEventListener('click', onElementClick, true);
	};

	var onElementClick = function(event) {
		toggleElementDerpidity(event.currentTarget);
	};

	var toggleElementDerpidity = function(el) {
		if (el.derpedHTML) {
			if (el.isDerped) {
				el.innerHTML = el.originalHTML;
				el.isDerped  = false;
			} else {
				el.innerHTML = el.derpedHTML;
				el.isDerped  = true;
			}
		}
	};

	var generators = [
		// herp derp
		function(el) {
			var herpderps = [];
			var original = el.innerHTML;
			for (var i = 0, c = countWords(original); i != c; ++i) {
				herpderps.push((Math.random() > 0.5) ? 'herp' : 'derp');
			}
			return herpderps.join(' ');
		},

		// kittens
		function(el) {
			var size = generateImageSize(el);
			return '<img src="http://placekitten.com/' + size[0] + '/' + size[1] + '" />';
		}
	];

	var countWords = function(string) {
		return string.replace(/[\s\n]+/g, ' ').split(' ').length;
	};

	var generateImageSize = function(el) {
		var varW, varH;
		if (el.offsetWidth > 0) {
			varW = Math.max(minVarW, el.offsetWidth - minW);
			varH = Math.max(minVarH, el.offsetHeight - minH);
		} else {
			varW = defaultVarW;
			varH = defaultVarH;
		}
		return [
			minW + Math.floor(Math.random() * varW),
			minH + Math.floor(Math.random() * varH)
		];
	};

	setTimeout(checkComments, 100);

})();
