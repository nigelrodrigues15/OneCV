/*
 *  Project: Google Maps Plugins for the WanChai template
 *  Description: Show Google Maps on the WanChai template
 *  Author: Simon Li
 */

 ;(function ( $, window, undefined ) {
	"use strict";
	
	var document = window.document,
	defaults = {
		styled: true,
		disableDefaultUI: false,
		scrollwheel: false,
		latitude: 22.319259,
		longitude: 114.169372,
		zoom: 15,
		hue: 'rgb(224, 107, 100)',
		gamma: 1.75,
		saturation: -80,
		lightness: -10,
		invertLightness: false,
		infoWindowContentString: '',
		markerIcon: '',
		markerAnimation: 'drop'
	};

	function GoogleMaps( element, options ) {
		this.elem = element;
		this.$elem = $('element');
		this.options = $.extend( {}, defaults, options) ;
		this._defaults = defaults;
		this.markerAnimation = '';
		this.latlong = null;
		this.map = null;
		this.marker = null;

		switch(this.options.markerAnimation){
			case 'drop':
				this.markerAnimation = google.maps.Animation.DROP;
				break;
			case 'bounce':
				this.markerAnimation = google.maps.Animation.BOUNCE;
				break;
		}

		this.options.infoWindowContentString = $('<div/>').html(this.options.infoWindowContentString).text();

		this.init();
	}

	GoogleMaps.prototype.init = function () {
		// Define map styles and options and create a map
		this.latlong = new google.maps.LatLng(this.options.latitude, this.options.longitude);

		var mapStyles = this.options.styled === false ? [{}] : [{
				stylers: [
				{ "invert_lightness": this.options.invertLightness },
				{ "hue": this.rgb2hex(this.options.hue) },
				{ "gamma": this.options.gamma },
				{ "saturation": this.options.saturation },
				{ "lightness": this.options.lightness }
				]
			}],
			mapOptions = {
				zoom: this.options.zoom,
				center: this.latlong,
				disableDefaultUI: this.options.disableDefaultUI,
				scrollwheel: this.options.scrollwheel,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
		this.map = new google.maps.Map(this.elem, mapOptions);
		this.map.setOptions({styles: mapStyles});
		this.kmlLayer = new google.maps.KmlLayer({
			url: 'http://www.google.com/maps/d/u/2/kml?mid=1TLSTtMiDihATBZZQVluwUtVPnoA&lid=vVjavG9ee5U',
			map: this.map
		});
		
	};

	GoogleMaps.prototype.addMarker = function () {
		
		this.kmlLayer = new google.maps.KmlLayer({
			url: 'http://www.google.com/maps/d/u/2/kml?mid=1TLSTtMiDihATBZZQVluwUtVPnoA&lid=vVjavG9ee5U',
			map: this.map
		});
		kmlLayer.addListener('click', function (kmlEvent) {
			var text = kmlEvent.featureData.description;
			showInContentWindow(text);
		});

		function showInContentWindow(text) {
			var sidediv = document.getElementById('content-window');
			sidediv.innerHTML = text;
		}
	}

	GoogleMaps.prototype.removeMarker = function () {
		this.kmlLayer = new google.maps.KmlLayer({
			url: 'http://www.google.com/maps/d/u/2/kml?mid=1TLSTtMiDihATBZZQVluwUtVPnoA&lid=vVjavG9ee5U',
			map: null
		});
	}

	GoogleMaps.prototype.rgb2hex = function (rgb) {
		// Utility function to translate rgb to hex
		// Source: http://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
	};

	GoogleMaps.prototype.hex = function (x) {
		return ("0" + parseInt(x, 10).toString(16)).slice(-2);
	};


	$.fn['googleMaps'] = function ( options ) {
		return this.each(function () {
		if (!$.data(this, 'plugin_googleMaps')) {
			$.data(this, 'plugin_googleMaps', new GoogleMaps( this, options ));
		}
	});
};

}(jQuery, window));