# Exercise 1 - FastAPI
Create a simple webservice in Python using FastAPI library to return the quotient of two numbers, both using a GET and a POST request:
curl -XGET localhost:8080/divide?dividend=20&divisor=5
curl -XPOST localhost:8080 -H'Content-Type: application/json' -d'{"dividend": 20, "divisor": 5}'
Response = {quotient: 4} 

To run the web api from a terminal, ensure you are in the Exercise-1 folder and the training_part1.py file exists here. Then run the following from the command line >> python training_part1.py