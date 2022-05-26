FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY . /app

RUN pip3 install -r requirements.txt
RUN python3 -m spacy download pt_core_news_lg