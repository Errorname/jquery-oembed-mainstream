/*!
 * jQuery oEmbed plugin with mainstream providers
 *
 * Copyright (c) 2016 Thibaud Courtoison
 * Licensed under MIT License
 *
 * Original Author: Richard Chamorro
 * First fork: Andrew Mee
 */

(function($) {

	var defaults = {
		providers: '*',
		beforeEmbed: function(embedCode) {
			return embedCode;
		},
		afterEmbed: function(container) {
			console.log('OEmbed succeeded!');
		},
		onError: function(e) {
			console.log('OEmbed error:');
			console.log(e);
		}
	};

	$.fn.oembed = function () {

		// Enable several ways to call function
		var url,options;
		if ($.type(arguments[0]) === 'string') {
			url = arguments[0];
			options = arguments[1];
		} else {
			url = null;
			options = arguments[0];
		}

		var settings = $.extend(true, {}, $.fn.oembed.defaults, options);

		return this.each(function() {

			var container = $(this);
			var resourceURL = (url && (!url.indexOf('http://') || !url.indexOf('https://'))) ? url : container.attr("href");

			if (resourceURL) {

				provider = $.fn.oembed.getOEmbedProvider(resourceURL, settings.providers);

				if (provider) {

					provider.getEmbedCode(resourceURL, settings, function(embedCode) {

						var new_embedCode = settings.beforeEmbed($(embedCode));

						var new_container = provider.embed(container, new_embedCode);

						settings.afterEmbed(new_container);

						return new_container;

					});

				} else {
					settings.onError({type: 'provider not authorized', message: 'The provider could not be found in the authorized list'});
				}

			} else {
				settings.onError({type: 'URL not found', message: 'The URL could not be found'});
			}

			return container;
		});
	};

	$.fn.oembed.defaults = defaults;

	$.fn.oembed.getOEmbedProvider = function(url, providers) {

		var providerList = $.fn.oembed.providers;

		// Limit list of authorized providers
		if (providers && providers != '*')
			providerList = providers;

		for (key in providerList) {
			var provider = $.fn.oembed.providers[key] || $.fn.oembed.providers[providerList[key].toLowerCase()];

			for (i in provider.urls) {
				var regExp = new RegExp(provider.urls[i], 'i');

				if (url.match(regExp) !== null)
					return provider;
			}
		}

		return null;
	};

	$.fn.oembed.queryAPI = function(url, provider) {

		var requestUrl = provider.getRequestUrl(url);

	};

})(jQuery);


// Constructor function for OEmbedProvider Class
$.fn.oembed.OEmbedProvider = function(settings) {

	for (var property in (settings || {})) {
		this[property] = settings[property];
	}

	this.name = this.name || 'error';
	this.type = this.type || 'rich'; // 'photo', 'video', 'link', 'rich', null
	this.urls = this.urls || []; // url schemes
	this.api = this.api || 'http://error.error'; // api endpoint
	this.format = this.format || 'json';

};

$.fn.oembed.OEmbedProvider.prototype.getRequestUrl = function(resourceURL) {

	var url = this.api;

	url += (url.indexOf("?") <= 0) ? "?" : "&";

	url += "format="+this.format + "&url=" + escape(resourceURL);

	if (this.dataType && this.dataType == 'jsonp')
		url += '&'+(this.callbackParameter ? this.callbackParameter : "callback")+'=?';

	return url;

};

$.fn.oembed.OEmbedProvider.prototype.getEmbedCode = function(resourceURL, settings, callback) {
	
	var requestURL = this.getRequestUrl(resourceURL);
	var self = this;

	if (this.yql) {

		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql',
			data: {
				q: "select * from json where url ='"+requestURL+"'",
				format: "json"
			},
			dataType: 'jsonp',
			success: function(data) {

				if (data.query.count > 0) {
					callback(self.getCode(self.yql(data)));
				} else {
					settings.onError({type:'yql null', message:'YQL request return an empty result'});
				}

			},
			error: function(e) {
				settings.onError({type:'ajax error', message:'Error during ajax request', error: e});
			}
		});

	} else {

		$.ajax({
			url: requestURL,
			dataType: 'json',
			success: function(data) {

				callback(self.getCode(data));

			},
			error: function(e) {
				settings.onError({type:'ajax error', message:'Error during ajax request', error: e});
			}
		});

	}
};

$.fn.oembed.OEmbedProvider.prototype.getCode = function(data) {

	if ($.isFunction(this.build_code))
		this.build_code(data);
	else {

		if (data.html) {
			return data.html;
		} else {
				settings.onError({type:'unknown instructions', message:"The script is unable to know what to do with the returned data"});
		}
	}

};

$.fn.oembed.OEmbedProvider.prototype.embed = function(container, embedCode) {
	var new_container = $('<div>').addClass('oembed-container');

	new_container.append(embedCode).insertAfter(container);

	container.remove();

	return new_container.get(0);
}
