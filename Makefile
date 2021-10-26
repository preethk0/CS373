.DEFAULT_GOAL := all
MAKEFLAGS     += --no-builtin-rules
SHELL         := bash


CFILES :=                                     \
    .gitignore                                \
    .gitlab-ci.yml       

check: $(CFILES)

docker:
	docker run -p 3000:3000 around-the-world

backend-install:
	python3 -m pip install -r ./back-end/requirements.txt

frontend-install:
	cd front-end/ && npm install

frontend-start:
	cd front-end/ && npm start

selenium-tests:
	chmod 775 front-end/gui_tests/chromedriver.exe
	chmod 775 front-end/gui_tests/chromedriver_linux
	python3 front-end/guitests.py


