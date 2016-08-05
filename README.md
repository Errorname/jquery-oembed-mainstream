# jquery-oembed-mainstream

Use oEmbed data with jQuery - Rework of https://github.com/nfl/jquery-oembed-all

Instead of providing an exhaustive list of all oEmbed providers, this jQuery plugin lets you configure the providers that you need.

If you wish, you can find a list of mainstream providers in the file `providers.oembed.js`

Quick Start
-----------
Include `jquery.oembed.js` in your web application.
```
<script src="//code.jquery.com/jquery-3.1.0.min.js"></script>
<script src="jquery.oembed.js"></script>
```

You can also add the mainstream providers.
```
<script src="providers.oembed.js"></script>
```

To include an oEmbed resource, you can:
```
<a href="https://www.flickr.com/photos/sohailkarmani/24048210319" class="oembed"></a>

<script>
  $('.oembed').oembed();
</script>
```
Note: Read the documentation for more explanation on how to call .oembed()

Documentation
-------------

### Calling the oEmbed function

##### .oembed()

Use default settings. Use the url contained in the "href" attribute.

##### .oembed(settings)

Use given settings. Use the url contained in the "href" attribute.

##### .oembed(url)

Use default settings. Use given url.

##### .oembed(url, settings)

Use given settings. Use given url.

### OEmbed Settings

##### providers : Array(String)

You can list all authorized array for this call.

```
providers: ['youtube','dailymotion','soundcloud']
```

##### beforeEmbed : Function(Array[DOMElement])

Can access and operate changes on the DOM Elements soon to be embedded.

Needs to return an Array of DOMElement to embedded.

```
beforeEmbed: function(elements) {
  elements.push($('<p>').html('OEmbed item'));
  return elements;
}
```

##### afterEmbed : Function(DOMElement)

Can access and operate changes on the DOM Element container that have been embedded.

```
afterEmbed: function(container) {
  $(container).prepend('<h1>OEmbed item</h1>');
}
```

##### onError : Function(Object)

Define the expected behaviour when encountering an error.

```
onError: function(error) {
  console.log('An error have been found: '+error.type);
}
```

### Adding a provider

To add a provider, you can do the following:
```
<script>
  $.fn.oembed.providers['soundcloud'] = new $.fn.oembed.OEmbedProvider({
    name: 'soundcloud',
    type: 'rich',
    urls: [
      "soundcloud.com/.+",
      "snd.sc/.+"
    ],
    api: "//soundcloud.com/oembed"
  });
</script>
```

### Provider settings

##### Name : String

The name of the provider

```
name: 'youtube'
```

##### Type : String

The oEmbed type of the resource (Photo, Video, Link or Rich)

```
type: 'video'
```

##### URLs : Array(String)

The URL regex schemes to link an URL to a provider

```
urls: [
  "youtube\\.com/watch.+v=[\\w-]+&?",
	"youtu\\.be/[\\w-]+",
	"youtube.com/embed"
]
```

##### Api : String

The oEmbed API endpoint of the provider

```
api: "www.youtube.com/oembed"
```

##### Data Type : String

Sometime, the ajax request return a CORS error. You can add a jsonp data type to perform the request.

```
dataType: 'jsonp'
```

##### Callback Parameter : String

Some providers need a specific callback function name.

```
callbackParameter: 'jsoncallback'
```

##### Code Builder : Function(oembedData)

This function is used to construct a custom DOM Element based on the oEmbed data.

Note: If a `codeBuilder` option is present at the call of `.oembed()`, the function from options will be used.

```
codeBuilder: function(oembedData) {
  return $('<img>').attr('src',data.url).attr('alt',data.title);
}
```

##### YQL : Function(oembedData)

Sometime, a provider will not allow a jsonp request. Therefore, you need to use YQL to perform the request.

The function is use to extract the oEmbed data from the YQL response data.

```
yql: (data) => {return data.query.results.json}
```
