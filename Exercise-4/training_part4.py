#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Aug 28 17:43:52 2022

@author: ameeragangat
"""

from fastapi import FastAPI
from pydantic import BaseModel
from elasticsearch import Elasticsearch

# you can use RFC-1738 to specify the url
es = Elasticsearch(['http://elasticsearch:9200'])

class Item(BaseModel):
    body: dict

#Expects input as json
#Declare your data model as a class that inherits from BaseModel.

app = FastAPI()

#Create an index
@app.post("/create_index")
def create_index(index: str, id: int, item: Item):
    return {"create_index": es.index(index=index, doc_type="_doc", id=id, body=item.body)}

#To return all documents for a given index
@app.get("/index_docs")
def index_docs(index: str, id:int):
    return es.get(index=index, doc_type="_doc", id=id)['_source']


#Add a document to an index
@app.get("/add_doc")
def add_docs(index:str, doc_field:str, doc_value:str, id:int):
    return {"add_doc": es.update(index=index,doc_type='_doc',id=id,body={"doc": {doc_field:doc_value}})}


#Update an existing document for a given index
@app.get("/update_doc")
def update_docs(index:str, doc_field:str, doc_value:str, id:int):
    return {"update_doc": es.update(index=index,doc_type='_doc',id=id,body={"doc": {doc_field:doc_value}})}


# Delete a document for a given index
@app.get("/delete_doc")
def delete_docs(index:str, doc_field:str, id:int):
    return {"delete_doc": es.update(index='books',doc_type='_doc',id=id,body={"script" : f"ctx._source.remove('{doc_field}')"})}
