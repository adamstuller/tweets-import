-- CREATE DATABASE tweets;
CREATE TABLE IF NOT EXISTS countries (
    id SERIAL PRIMARY KEY,
    code VARCHAR(3),
    name VARCHAR(200),
    CONSTRAINT unique_code UNIQUE(code)
);

CREATE UNIQUE INDEX coutry_code ON countries (code);

CREATE TABLE IF NOT EXISTS hashtags (
    id SERIAL PRIMARY KEY,
    value TEXT NOT NULL,
    CONSTRAINT unique_hashtag UNIQUE(value)
);

CREATE UNIQUE INDEX hashtag_value ON hashtags (value);

CREATE TABLE IF NOT EXISTS accounts (
    id BIGINT PRIMARY KEY,
    screen_name VARCHAR(200),
    name VARCHAR(200),
    description TEXT,
    followers_count INTEGER,
    friends_count INTEGER,
    statuses_count INTEGER
);

CREATE TABLE IF NOT EXISTS tweets (
    id VARCHAR(20) PRIMARY KEY,
    content TEXT,
    location GEOMETRY(point, 4326),
    retweet_count INTEGER,
    favorite_count INTEGER,
    happened_at TIMESTAMP WITH TIME ZONE,
    author_id BIGINT,
    country_id INTEGER,
    parent_id VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS tweet_mentions (
    ID SERIAL PRIMARY KEY,
    account_id BIGINT,
    tweet_id VARCHAR(20),
    CONSTRAINT unique_tweet_mention UNIQUE(account_id, tweet_id)
);

CREATE TABLE IF NOT EXISTS tweet_hashtags (
    id SERIAL PRIMARY KEY,
    hashtag_id INTEGER,
    tweet_id VARCHAR(20),
    CONSTRAINT unique_tweet_hashtag UNIQUE(hashtag_id, tweet_id)
);