# Exercise 1 - FastAPI
Create a simple webservice in Python using FastAPI library to return the quotient of two numbers, both using a GET and a POST request:
curl -XGET localhost:8080/divide?dividend=20&divisor=5
curl -XPOST localhost:8080 -H'Content-Type: application/json' -d'{"dividend": 20, "divisor": 5}'
Response = {quotient: 4} 

To run the file from a terminal window use uvicorn training_part1:app --reload
