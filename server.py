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
    if logic.check_if_user_in_database(login_input) and logic.check_if_user_password_correct(login_input):
        username = login_input['username']
        logic.set_active_user(username)
        session['user:' + username] = username
        return json.dumps(username)
        # return app.response_class(json.dumps(True), content_type='application/json')
    else:
        return app.response_class(json.dumps(False), content_type='application/json')


@app.route("/logout", methods = ['GET', 'POST'])
def logout_user():
    logout_input = request.get_json()
    logic.logout_user()
    session.pop('user:' + logout_input, None)
    return app.response_class(json.dumps(True), content_type='application/json')


@app.route("/check_logged_in", methods = ['GET', 'POST'])
def check_logged_in():
    logged_in = logic.check_logged_in()
    if logged_in == False:
        return app.response_class(json.dumps(False), content_type='application/json')
    return json.dumps(logged_in)

@app.route("/vote", methods = ['GET', 'POST'])
def vote():
    vote_input = request.get_json()
    logic.vote(vote_input)
    return json.dumps(vote_input['planet_name'])


@app.route("/voted_planets", methods = ['GET', 'POST'])
def get_voted_planets():
    user = request.get_json()
    voted_planets = logic.get_voted_planets(user)
    return json.dumps(voted_planets)


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
