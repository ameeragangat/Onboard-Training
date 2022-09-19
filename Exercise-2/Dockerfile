FROM ubuntu:latest

#You have explicitly install python3-pip as the latest version of Ubuntu no longer supports python aka python2
RUN apt-get update && apt-get install -y \
    python3-pip

# install dependencies
COPY requirements.txt .

RUN python3 -m pip install -r requirements.txt

WORKDIR ./

COPY training_part1.py training_part1.py 

EXPOSE 4321

CMD ["uvicorn", "training_part1:app", "--host", "0.0.0.0", "--port", "4321"]
