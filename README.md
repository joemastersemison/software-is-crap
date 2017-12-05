# software-is-crap
Example of how to build a complex, auto-scaling application with very little bespoke code

# setup
You need to have the following accounts set up:
* firebase
* cloudinary
* algolia
* sendgrid
* segment

Once you have those in place, you can install firebase and set credentials:
* npm install -g firebase-tools
* firebase login
* [firebase set credential]
* [firebase admin credentials]
* [put public-facing API keys in X file]

And then install necessary support packages:
* npm install


# to deploy
* firebase deploy
