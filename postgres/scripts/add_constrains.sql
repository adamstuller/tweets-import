alter table tweets ADD FOREIGN KEY(country_id)
   REFERENCES countries(id);

alter table tweets ADD FOREIGN KEY(author_id)
   REFERENCES accounts(id);

alter table tweets ADD FOREIGN KEY(parent_id)
   REFERENCES tweets(id);

alter table tweet_mentions ADD FOREIGN KEY(account_id)
   REFERENCES accounts(id);

alter table tweet_mentions ADD FOREIGN KEY(tweet_id)
   REFERENCES tweets(id);

alter table tweet_hashtags ADD FOREIGN KEY(tweet_id)
   REFERENCES tweets(id);

alter table tweet_hashtags ADD FOREIGN KEY(hashtag_id)
   REFERENCES hashtags(id);