FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    python3-pip

# install dependencies
COPY requirements.txt .

RUN python3 -m pip install -r requirements.txt

WORKDIR /Users/ameeragangat/Documents/docker_fastapi-elastic-kibana

COPY training_part4.py training_part4.py 

EXPOSE 4321

CMD ["uvicorn", "training_part4:app", "--host", "0.0.0.0", "--port", "4321"]
