alter table tweets DROP CONSTRAINT tweets_country_id_fkey;

alter table tweets DROP CONSTRAINT tweets_author_id_fkey;

alter table tweets DROP CONSTRAINT tweets_parent_id_fkey;

alter table tweet_mentions DROP CONSTRAINT tweet_mentions_account_id_fkey;

alter table tweet_mentions DROP CONSTRAINT tweet_mentions_tweet_id_fkey;

alter table tweet_hashtags DROP CONSTRAINT tweet_hashtags_tweet_id_fkey;

alter table tweet_hashtags DROP CONSTRAINT tweet_hashtags_hashtag_id_fkey;