#Ubuntu is the fastet python image
FROM python:3.9.7-slim

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.1.12 \
  TZ=Europe/Oslo 

RUN mkdir /app
WORKDIR /app
COPY /app /app
COPY poetry.lock pyproject.toml /app/

ENV PYTHONPATH=${PYTHONPATH}:${PWD} 
RUN apt-get update && apt-get -y install libpq-dev gcc && \
  pip3 install poetry==${POETRY_VERSION} && \
  poetry config virtualenvs.create false && \
  poetry install --no-dev

EXPOSE 8008

CMD ["python", "manage.py", "runserver", "0.0.0.0:8008"]