# REPOSITORY FOR IMPORT OF TWEETS, SCHOOL PURPOSES

## FILTER ALL OBJECTS OF ENTITY FROM ORIGINAL FILE

```
cat <original_file> | ./tweets/scripts/filters/<entity>.sh | jq -cs 'unique' >> tweets/postgres/data/entities/entity.json
```

1. countries
2. hashtags
3. users
4. tweets
5. tweet_hashtags
6. tweet_mentions