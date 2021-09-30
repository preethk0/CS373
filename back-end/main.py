import os

from flask import Flask

# create and configure the app
app = Flask(
    __name__,
    static_folder="../frontend/build/static",
    template_folder="../frontend/build",
)

app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
)

# a simple page that says hello
@app.route('/hello')
def hello():
    return 'Hello, World!'