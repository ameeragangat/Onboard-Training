# Exercise 2 - Docker 
Dockerise the webapp created in Exercise 1 to run on port 4321 using a Dockerfile, with the base image of Ubuntu 

After the image is built using the following command in the terminal >>docker build --pull --rm -f "Dockerfile" -t onboardtraining:latest "."  (naming the image onboardtraining:latest), run the container from the terminal using the following command  >>docker run --rm -it -p4321:4321 onboardtraining:latest
