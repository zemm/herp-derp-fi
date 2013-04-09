/*
Copyright © 2013 zemm <zemm@iki.fi>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
*/

(function(){
	var imgMinH = 50;
	var imgMaxH = 200;
	var imgMinW = 100;
	var imgMaxW = 400;
	var classNames = [
		//'author',
		'comment-body',
		'xcTextValue'
	];

	var checkComments = function() {
		var els = findUnderpedElements();
		for (var i in els) {
			if ( ! els[i].derpedHTML) {
				makeElementDerped(els[i]);
			}
		}
		setTimeout(checkComments, 300);
	};

	var findUnderpedElements = function() {
		var els = [];
		for (var i in classNames) {
			var domNodeList = document.getElementsByClassName(classNames[i]);
			for (
				var j = 0,
					c = domNodeList.length;
				j != c;
				els.push(domNodeList[j++])
			);
		}
		return els;
	};

	var makeElementDerped = function(el) {
		var generatorI = Math.floor(Math.random() * generators.length);
		el.originalHTML = el.innerHTML;
		el.derpedHTML = generators[generatorI](el);
		el.innerHTML = el.derpedHTML;
		el.isDerped = true;
		el.addEventListener('click', onElementClick, true);
	};

	var onElementClick = function(event) {
		toggleElementDerpidity(event.currentTarget);
	};

	var toggleElementDerpidity = function(el) {
		if (el.derpedHTML) {
			if (el.isDerped) {
				el.innerHTML = el.originalHTML;
				el.isDerped = false;
			} else {
				el.innerHTML = el.derpedHTML;
				el.isDerped = true;
			}
		}
	};

	var generators = [
		// herp derp
		function(el) {
			var herpderps = [];
			var original = el.innerHTML;
			for (var i=0,c=countWords(original); i<c; ++i) {
				herpderps.push((Math.random() > 0.5) ? 'herp' : 'derp');
			}
			return herpderps.join(' ');
		},

		// kittens
		function(el) {
			var w = imgMinW + Math.floor(Math.random() * (imgMaxW - imgMinW));
			var h = imgMinH + Math.floor(Math.random() * (imgMaxH - imgMinH));
			return '<img src="http://placekitten.com/' + w + '/' + h + '" />';
		}
	];

	var countWords = function(string) {
		return string.replace(/[\s\n]+/g, ' ').split(' ').length;
	};

	checkComments();

})();
