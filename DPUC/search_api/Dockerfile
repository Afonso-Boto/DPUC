FROM python:3.8-slim-buster
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY . /app

RUN apt-get update
RUN apt-get install curl -y
RUN apt-get clean

RUN pip3 install -r requirements.txt