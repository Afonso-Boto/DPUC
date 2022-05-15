FROM python:3.8

WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN ["pip3", "install", "-r", "requirements.txt"]

COPY ./DPUC_2021.xlsx /app/DPUC_2021.xlsx
COPY ./parser.py /app/parser.py
CMD ["python3", "parser.py"]

