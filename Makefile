.DEFAULT_GOAL := all
MAKEFLAGS     += --no-builtin-rules
SHELL         := bash


CFILES :=                                     \
    .gitignore                                \
    .gitlab-ci.yml       

check: $(CFILES)

docker:
	docker run -p 3000:3000 around-the-world

frontend-install:
	cd front-end/ && npm install

frontend-start:
	cd front-end/ && npm start

