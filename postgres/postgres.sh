#! /bin/bash

docker run \
-d \
-e POSTGRES_PASS=qwerty \
-e POSTGRES_USER=root \
-e POSTGRES_DBNAME=tweets \
-v /Users/adamstuller/Skolicka/Semester7/PDT/tweets/postgres/configuration:/docker-entrypoint-initdb.d/ \
--name postgis \
-p 5432:5432 \
kartoza/postgis:10.0-2.4 
