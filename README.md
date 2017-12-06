# software-is-crap
Example of how to build a relatively complex, auto-scaling application with very little bespoke code

# setup
You need to have the following accounts set up:
* firebase
* cloudinary
* algolia
* segment

And fill out the triggered-from-end-user respective initialization commands in public/js/services.js like so:
```
// Cloudinary config
$.cloudinary.config({"api_key":"XXX","cloud_name":"XXX"});
var cloudinaryVars = {
	uploadPreset: "XXXX"
};


// Firebase config
var firebaseConfig = {
	apiKey: "XXX",
	authDomain: "XXX",
	databaseURL: "XXX"
};

!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
  analytics.load("XXXXXX");
  analytics.page();
  }}();

//algolia
var algoliaClient = algoliasearch('XXX', 'XXX');
var algoliaIndex = client.initIndex('XXX');
```

Once you have those in place, you can install firebase and set credentials:
```
npm install -g firebase-tools
firebase login
firebase functions:config:set algolia.app="<YOUR-ALGOLIA-APP-ID>"
firebase functions:config:set algolia.key="<YOUR-ALGOLIA-APP-PUBLIC-KEY>"
firebase functions:config:set algolia.index="<YOUR-ALGOLIA-INDEX-NAME>"
```

And finally install necessary support packages:
```
npm install
bower install
cd functions
npm install
```

# to deploy
* firebase deploy
* firebase deploy --only functions
