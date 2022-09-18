# Elasticsearch - Exercises
## Exercise 1 - Using Docker, setup two containers for ElasticSearch and Kibana using the following images:
docker.elastic.co/elasticsearch/elasticsearch 
docker.elastic.co/kibana/kibana

A network should first be created.
In a terminal window enter the following:

>>docker network create elastic (with elastic being the name of the network)

By typing the following into the terminal window you should now be able to see the network you just created.

>>docker network ls

Next, the containers for Elasticsearch and Kibana will be created using the following commands:

-e environmental variable where we need to define what kind of cluster it is we are sending, a single node elastic search container or a clustered kind

>>docker run -d --name elasticsearch --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.13.4
Take note that the latest elasticsearch tag is not supported and that a version number needs to be specified when pulling the image

Kibana needs to know what is the host for your elasticsearch so here you need to map it based on the previous container

>> docker run -d --name kibana --net elastic -p 5601:5601 -e "ELASTICSEARCH_HOSTS=http://elasticsearch:9200" docker.elastic.co/kibana/kibana:7.13.4

Now by using:
>>docker ps
You should be able to see both containers running

## Exercise 2 - use the DevTools in Kibana and write some queries in Query DSL to:
* Add an index ‘books’
* Add a few documents {“title”: “XYZ”, “author”: “XYZ”, “isbn”: “XYZ”}
* List all the documents in the index
* Update a single document’s ISBN field only

KibanaDevTools.txt contains the queries necessary for this exercise with comments.

## Exercise 3 - create a Python web API to:
* Retrieve the list of documents form an index
* Add a document to an index
* Update a document
* Delete a document

Ensure that your Elasticsearch and Kibana containers are still running if you would like to navigate and inspect the created indexes with documents
To run the file from a terminal window use uvicorn training_part4:app --reload
Navigate to the local host/4321/docs# link to view the webapi page
