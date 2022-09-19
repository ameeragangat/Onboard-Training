#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Aug 17 10:56:59 2022

@author: ameeragangat
"""

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

#Expects input as json
#Declare your data model as a class that inherits from BaseModel.

class Item(BaseModel):
    dividend:int
    divisor:int

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

#Using GET request
@app.get("/divide")
def division(dividend:int, divisor:int):
    return {"Quotient": dividend/divisor}

#Using POST request
@app.post('/d/')
def create_item(item: Item):
    return {"Quotient": item.dividend/item.divisor}

if __name__ == "__main__":
    uvicorn.run("training_part1:app", host="0.0.0.0", port=8080, reload=True)