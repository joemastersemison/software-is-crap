// global variables and functions used by software-is-crap
var image_id = "";
var last_search = "";

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function firebaseLogOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.replace("https://wecreate.chat/");
    }, function(error) {
        // An error happened.
        console.log('error');
        console.log(e);
    });
} //firebaseSignOut

function loadChat(theSearch) {
    if (!theSearch) {
        theSearch = last_search;
    }

    // track in segment
    var searchDesc = "";
    if (typeof theSearch !== 'object') { searchDesc = theSearch; }
    analytics.track('Loaded Chat', {
      searchDesc: searchDesc
    });

    // run search
    algoliaIndex.search(theSearch, function(err, content) {
        var chatBlock = "";
        for (var i = content.hits.length - 1; i >= 0; i--) {
            var hit = content.hits[i];
            var cid = hit.cloudinaryPublicId ? hit.cloudinaryPublicId : 'crazy-animated-clipart-5_api3ob';
            var myDate = new Date(hit.postDateTime);
            var dt = myDate.toLocaleDateString("en-UK", {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour12: 'false',
                hour: '2-digit',
                minute: '2-digit'
            });
            chatBlock += '<div class="media msg row"><div class="col-lg-2"><img src="https://res.cloudinary.com/wecreate/image/upload/w_150,h_150,c_fit/g_' + $('#watermark-location').val() + ',x_5,y_5,l_gfk_logo_vrqyyk/' +
                cid + '.jpg"><br/><h5 class="media-heading">' + hit._highlightResult.email.value + '</h5></div><div class="col-lg-8"><span>' + hit._highlightResult.message.value + '</span></div>' +
                '<div class="col-lg-2"><small class="pull-right time"><i class="fa fa-clock-o"></i> ' +
                dt + '</small></div></div></div><hr/>';
        }
        $('#message-container').html(chatBlock);
        if (content.nbHits > content.hitsPerPage) {
            $('#count-container').html('LAST ' + content.hitsPerPage + ' OF ' + content.nbHits);
        } else {
            $('#count-container').html(content.hits.length + ' RESULTS FOUND');
        }
        last_search = theSearch;
    });
}

function postMessage() {
    if ($('#message').val() === "") {
        alert('You need to enter a message.');
    } else {
        var obj = {
            message: $('#message').val(),
            userId: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email,
            postDateTime: Date.now()
        };
        var returnMessage = "Posted message";
        if (image_id !== "") {
            returnMessage += " and image";
            obj.cloudinaryPublicId = image_id;
        }
        returnMessage += ".";

        // track in segment
        analytics.track('Posted Message', obj);

        // post in firebase (which will relay to algolia through a cloud function)
        firebase.database().ref("chat/").push().set(obj, function(error) {
            if (error) {
                console.log('error: ' + error);
            } else {
                // clear the message block:
                $('#message').val("");

                // notify the user
                alert(returnMessage);

                // reload the chat
                loadChat({ filters: 'postDateTime > 0' });
            }
        });
    }
} //postMessage
