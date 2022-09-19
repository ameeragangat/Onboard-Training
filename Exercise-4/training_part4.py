#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Aug 28 17:43:52 2022

@author: ameeragangat
"""

from fastapi import FastAPI
from pydantic import BaseModel
from elasticsearch import Elasticsearch
import json
from fastapi.middleware.cors import CORSMiddleware

# you can use RFC-1738 to specify the url
es = Elasticsearch(['http://elasticsearch:9200'])

class Item(BaseModel):
    body: dict

#Expects input as json
#Declare your data model as a class that inherits from BaseModel.

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:4321",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Create an index
@app.post("/create_index")
def create_index(index: str, id: int, item: Item):   
    return {"create_index": es.index(index=index, doc_type="_doc", id=id, body=item.body)}

#To return all documents for a given index and id
@app.get("/indexId_docs")
def indexId_docs(index: str, id:str):
    return [es.get(index=index, doc_type="_doc", id=id)['_source']]

#To return all documents for a given index
@app.get("/index_docs")
def index_docs(index: str):
    return [es.get(index=index, doc_type="_doc")['_source']]

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

#To return all documents entries for a given index
@app.get("/get_all_docs")
def get_all_docs(index: str = "books"): 
    resp = es.search(index=index, body={"query": {"match_all":{}}})
    vals = []
    for hit in resp['hits']['hits']:
        vals.append(hit['_source'])
        vals[-1]['id']=hit['_id']    
    
    return vals

tmp_doc = {
    'title': 'TEST',
    'author': 'TEST',
    'isbn': 'TEST'
}
#Create index default id
@app.post("/create_index_new")
def create_index_new(index: str = "books", body: dict = tmp_doc):
    resp = es.index(index=index, doc_type="_doc", body=body)