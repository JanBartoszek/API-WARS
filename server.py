from flask import Flask, render_template, request
import requests
import logic
import json

app = Flask(__name__)


@app.route("/")
def start_menu():
    return render_template('api-wars.html')


@app.route("/register", methods = ['GET', 'POST'])
def register_new_user():
    register_input = request.get_json()
    if logic.check_if_user_in_database(register_input) == True:
        return json.dumps('nok')
    logic.register_new_user(register_input)
    return json.dumps('ok')


@app.route("/login", methods = ['GET', 'POST'])
def log_in_user():
    login_input = request.get_json()
    print(login_input)
    print(logic.check_if_user_in_database(login_input))
    if logic.check_if_user_in_database(login_input) == True:
        return json.dumps('ok')
    else:
        return json.dumps('nok')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
