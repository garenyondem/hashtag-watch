## Hashtag Watch

Node.js server implementation to keep track of a given hash-tag on social networks.

### Getting started

Make sure you have Node.js v12.15+ and Docker installed.

Run MongoDB and Elasticsearch

```
$ docker run -d -p 27017:27017 --name mongo-instance mongo
$ docker run -d -p 9200:9200 --name es-instance -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.6.0
```

Populate your .env file and install dependencies.

```
$ npm i && npm start
```

All of streamed tweets are written to both MongoDB and Elasticsearch.
Only most recent 100k tweets will be stored in Elasticsearch to perform quick analysis.
Historical data will be kept and accessable on MongoDB.
