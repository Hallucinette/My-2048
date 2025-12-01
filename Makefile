.PHONY: all build up down restart logs clean re

all: up

build:
	docker-compose build

up:
	docker-compose up -d --build

down:
	docker-compose down

logs:
	docker-compose logs -f

re:
	docker-compose down
	docker-compose up -d --build
