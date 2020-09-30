# REPOSITORY FOR IMPORT OF TWEETS, SCHOOL PURPOSES

## Usage

Firstly  clone this project with git. 

```
git clone https://github.com/AdamStuller/tweets-import.git
```

Firstly you must have POSTGRES server spinned up. To do so you can use script `postgres.sh` in postgresdirectory. 

```
./postgres/start_db.sh
```

On server initialization sql scrpt `00_init.sql`is executed and database tables and constrains are created. 

Secondly, to start importing you need tweeter tweets (https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/overview/tweet-object)
 file in json or jsonl format. To start import just run: 

```
npm install
node ./node-script/index.js --file <path  to your file>
```

This command starts concurent batch import.


##  !!! BEWARE !!! 

In `postgres/configuration/00_init.sql` constrains on foreign keys are allready specified. In reality they were added to database after the import 
by another sql. These constrains would not allow conncurrent imports of respective tables in streams. 
