#! /bin/bash

# file='/Users/adamstuller/Downloads/coronavirus-tweet-id-2020-08-01-02.jsonl'
file='./input.jsonl'

node ./index.js --file "${file}" --table "countries" && echo "Countries inserted!" && \
node ./index.js --file "${file}" --table "hashtags" && echo "Hashtags inserted!" && \
node ./index.js --file "${file}" --table "accounts" && echo "Accounts inserted!" && \
node ./index.js --file "${file}" --table "tweets" && echo "Tweets inserted!" && \
node ./index.js --file "${file}" --table "tweet_hashtags" && echo "Tweet_hashtags inserted!" && \
node ./index.js --file "${file}" --table "tweet_mentions" && echo "Tweet_mentions inserted!" 