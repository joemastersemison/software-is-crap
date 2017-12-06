const functions = require('firebase-functions');

const algoliasearch = require('algoliasearch');
const algoliaFunctions = require('algolia-firebase-functions');

const algolia = algoliasearch(functions.config().algolia.app,
                              functions.config().algolia.key);
const index = algolia.initIndex(functions.config().algolia.index);

exports.syncAlgoliaWithFirebase = functions.database.ref('/chat/{childRef}').onWrite(
    event => algoliaFunctions.syncAlgoliaWithFirebase(index, event)
);