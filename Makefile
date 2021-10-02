.DEFAULT_GOAL := all
MAKEFLAGS     += --no-builtin-rules
SHELL         := bash


CFILES :=                                     \
    .gitignore                                \
    .gitlab-ci.yml       

check: $(CFILES)

frontend-install:
	cd front-end/ && npm install
frontend-start:
	cd front-end/ && npm start

