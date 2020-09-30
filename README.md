# REPOSITORY FOR IMPORT OF TWEETS, SCHOOL PURPOSES

## Usage

Firstly  clone this project with git. 

```
git clone
```

Firstly you must have POSTGRES server spinned up. To do so you can use script `postgres.sh` in postgresdirectory. 

```
./postgres/start_db.sh
```

On server initialization sql scrpt `00_init.sql`is executed and database tables and constrains are created. 

Secondly, to start importing you need tweeter tweets (https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/overview/tweet-object)
 file in json or jsonl format. To start import just run: 

```
node ./node-script/index.js --file <path  to your file>
```

This command starts concurent batch import.

