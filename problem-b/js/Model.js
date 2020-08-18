'use strict';

import allTweets from './uw_ischool_tweets';

// private!
const tweetData = allTweets.map((tweetObj) => {
    let mappedObj = {
        text : tweetObj.text,
        timestamp : Date.parse(tweetObj.created_at)
    };

    return mappedObj;
})

export function getRecentTweets() {
    tweetData.sort((tweet1, tweet2) => {
        return tweet2.timestamp - tweet1.timestamp;
    })
    return tweetData.slice(0,5);
}

export function searchTweets(stringSearch) {
    let results =  tweetData.filter((tweetObj) => {
        return (tweetObj.text.toLowerCase().indexOf(stringSearch.toLowerCase()) >= 0); //return if search is in text
    })
    return results;
}



