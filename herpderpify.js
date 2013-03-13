/*
Copyright © 2013 zemm <zemm@iki.fi>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
*/

var mode = 'herpderp';
var kittenHBase = 50;
var kittenHMod = 100;
var kittenWBase = 100;
var kittenWMod = 250;

var handleElements = function() {
	var els = findUnsafeElements();
	for (var i in els) {
		if ( ! els[i].isSafe) {
			makeElementSafe(els[i]);
		}
	}
	setTimeout(handleElements, 300);
};

var findUnsafeElements = function() {
	var classNames = [
		'author',
		'comment-body',
		'xcTextValue'
	];
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

var makeElementSafe = function(el) {
	el.originalHTML = el.innerHTML;
	var mode = (Math.random() > 0.5) ? 'herpderp' : 'kitten';
	if (mode === 'herpderp') {
		el.safeHTML = generateHerpDerp(el.originalHTML);
	} else if (mode === 'kitten') {
		el.safeHTML = generateKitten(el.originalHTML);
	}
	el.innerHTML = el.safeHTML;
	el.isSafe = true;
	el.addEventListener('click', onElementClick);
};

var onElementClick = function(event) {
	toggleElementSafety(event.target);
};

var toggleElementSafety = function(el) {
	if (el.isSafe) {
		if (el.isUnsafe) {
			el.innerHTML = el.safeHTML;
			el.isUnsafe = false;
		} else {
			el.innerHTML = el.originalHTML;
			el.isUnsafe = true;
		}
	}
};

var generateHerpDerp = function(original) {
	// @TODO: some variation
	var herpderps = [];
	for (var i=0,c=countWords(original); i<c; ++i) {
		herpderps.push((Math.random() > 0.5) ? 'herp' : 'derp');
	}
	return herpderps.join(' ');
};

var generateKitten = function(original) {
	var w = kittenWBase + Math.floor(Math.random() * kittenWMod);
	var h = kittenHBase + Math.floor(Math.random() * kittenHMod);
	return '<img src="http://placekitten.com/' + w + '/' + h + '" />';
};

var countWords = function(string) {
	return string.replace(/[\s\n]+/g, ' ').split(' ').length;
};

handleElements();
