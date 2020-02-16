
var isIE = !!window.ActiveXObject;
function ieVersion () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

/* https://stackoverflow.com/a/25054465/1562506 */
if (!document.getElementsByClassName) {
  document.getElementsByClassName = function(search) {
    var d = document, elements, pattern, i, results = [];
    if (d.querySelectorAll) { // IE8
      return d.querySelectorAll("." + search);
    }
    if (d.evaluate) { // IE6, IE7
      pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
      elements = d.evaluate(pattern, d, null, 0, null);
      while ((i = elements.iterateNext())) {
        results.push(i);
      }
    } else {
      elements = d.getElementsByTagName("*");
      pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
      for (i = 0; i < elements.length; i++) {
        if ( pattern.test(elements[i].className) ) {
          results.push(elements[i]);
        }
      }
    }
    return results;
  }
}

if(isIE) {
	/* fix menu toggle (needs refresh) */
	/* based on https://stackoverflow.com/q/9022429/1562506 */
	var anchorArray = document.getElementsByTagName("a"), I;
	for(I=0;I<anchorArray.length;I++){
		if(anchorArray[I].href.indexOf("#nav-") == 0 || anchorArray[I].href.indexOf("/#nav-") > -1){
			anchorArray[I].onclick =  function(event){
				window.location.reload();
			}
		}
	}

	/* https://stackoverflow.com/a/3150139/1562506 */

	if(ieVersion() >= 9) {
		resize_nav = function(event) {
			var body = document.getElementsByTagName("body")[0];
			var nav = document.getElementsByTagName("nav")[0];
			var logo  = document.getElementsByClassName("logo")[0];
			var banner  = document.getElementById("banner");

			var body_w = body.getBoundingClientRect().width;
			var nav_w =  nav.getBoundingClientRect().width;
			var logo_w =  logo.getBoundingClientRect().width;
			var logo_l =  logo.getBoundingClientRect().left;

			nav.style.width = (body_w - logo_w - logo_l - 50) + "px";
		}

		addEvent(window, "onload", resize_nav);
		addEvent(window, "load", resize_nav);
		addEvent(window, "resize", resize_nav);
	}

	/* remove dupplicate menu (not yet working) */
	/*function domPurge(d) {
		var a = d.attributes, i, l, n;
		if (a) {
			for (i = a.length - 1; i >= 0; i -= 1) {
				n = a[i].name;
				if (typeof d[n] === 'function') {
					d[n] = null;
				}
			}
		}
		a = d.childNodes;
		if (a) {
			l = a.length;
			for (i = 0; i < l; i += 1) {
				domPurge(d.childNodes[i]);
		   }
		}
	}


	function removeElement(elem) {
		domPurge(elem);
		return elem.parentNode.removeChild(elem);
	}

	if(ieVersion() <= 8) {
		var p = document.getElementsByClassName("placeholder");
		for(I=0;I<p.length;I++){
			removeElement(p[I]);
			console.log("here");
		}
	}*/


/*	window.load  = resize_nav;*/
}



