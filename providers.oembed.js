
/* List of mainstream providers */

$.fn.oembed.providers = {

	'dailymotion': new $.fn.oembed.OEmbedProvider({
					name: 'dailymotion',
					type: 'video',
					urls: [
						"dailymotion\\.com/.+"
					],
					api: "www.dailymotion.com/services/oembed",
					dataType: 'jsonp'
				}),

	'flickr': new $.fn.oembed.OEmbedProvider({
					name: 'flickr',
					type: 'photo',
					urls: [
						"flickr\\.com/photos/.+"
					],
					api: "www.flickr.com/services/oembed",
					dataType: 'jsonp',
					callbackParameter: 'jsoncallback'
				}),

	'imgur': new $.fn.oembed.OEmbedProvider({
					name: 'imgur',
					type: 'photo',
					urls: [
						"imgur\\.com/gallery/.+"
					],
					api: "api.imgur.com/oembed"
				}),

	'instagram': new $.fn.oembed.OEmbedProvider({
					name: 'instagram',
					type: 'photo',
					urls: [
						"instagr\\.?am(\\.com)?/.+"
					],
					api: "api.instagram.com/oembed",
					dataType: 'jsonp'
				}),

	'soundcloud': new $.fn.oembed.OEmbedProvider({
					name: 'soundcloud',
					type: 'rich',
					urls: [
						"soundcloud.com/.+",
						"snd.sc/.+"
					],
					api: "soundcloud.com/oembed"
				}),

	'spotify': new $.fn.oembed.OEmbedProvider({
					name: 'spotify',
					type: 'rich',
					urls: [
						"open.spotify.com/(track|album|user)/"
					],
					api: "embed.spotify.com/oembed/",
					dataType: 'jsonp'
				}),

	'vimeo': new $.fn.oembed.OEmbedProvider({
					name: 'vimeo',
					type: 'video',
					urls: [
						"www\.vimeo\.com\/groups\/.*\/videos\/.*",
						"www\.vimeo\.com\/.*",
						"vimeo\.com\/groups\/.*\/videos\/.*",
						"vimeo\.com\/.*"
					],
					api: "vimeo.com/api/oembed.json"
				}),

	'youtube': new $.fn.oembed.OEmbedProvider({
					name: 'youtube',
					type: 'video',
					urls: [
						"youtube\\.com/watch.+v=[\\w-]+&?",
						"youtu\\.be/[\\w-]+",
						"youtube.com/embed"
					],
					api: "www.youtube.com/oembed",
					yql: (data) => {return data.query.results.json}
					//proxy: true
				}),

};
