from flask import Flask, render_template, request, json, session
import requests
import logic
import json

app = Flask(__name__)
app.secret_key = 'test'


@app.route("/")
def start_menu():
    return render_template('api-wars.html')


@app.route("/register", methods = ['GET', 'POST'])
def register_new_user():
    register_input = request.get_json()
    if logic.check_if_user_in_database(register_input) == True:
        return app.response_class(json.dumps(False), content_type='application/json')
    logic.register_new_user(register_input)
    return app.response_class(json.dumps(True), content_type='application/json')


@app.route("/login", methods = ['GET', 'POST'])
def log_in_user():
    login_input = request.get_json()
    print(login_input)
    print(logic.check_if_user_in_database(login_input))
    if logic.check_if_user_in_database(login_input) and logic.check_if_user_password_correct(login_input):
        username = login_input['username']
        session['user:' + username] = username
        return app.response_class(json.dumps(True), content_type='application/json')
    else:
        return app.response_class(json.dumps(False), content_type='application/json')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
