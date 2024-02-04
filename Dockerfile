
FROM python:3.12.1-slim

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.7.1

RUN mkdir /app
WORKDIR /app

ENV PYTHONPATH=${PYTHONPATH}:${PWD} 
RUN apt-get update && apt-get -y install libpq-dev gcc && \
  pip3 install poetry==${POETRY_VERSION} && \
  poetry config virtualenvs.create false

COPY poetry.lock pyproject.toml env/database.dev.env /app/
RUN poetry install --no-dev
COPY /app /app