FROM python:3.6

RUN apt-get update
RUN apt-get install vim -y
RUN apt-get install python3-dev -y
RUN apt-get install libpq-dev -y
RUN pg_config --version
RUN apt-get install \
    build-essential zlib1g-dev libssl-dev libncurses-dev \
    libffi-dev libsqlite3-dev libreadline-dev libbz2-dev -y

#download and install chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

#some envs
ENV APP_HOME /app 
ENV PORT 5000

#set workspace
WORKDIR ${APP_HOME}

#copy local files
COPY . /app

# CMD exec gunicorn --bind :${PORT} --workers 1 --threads 8 main:app 
CMD ["bash"]
