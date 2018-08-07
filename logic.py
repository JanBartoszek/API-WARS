import server
import data_manager
from datetime import datetime


def register_new_user(register_input):
    username = register_input['username']
    password = register_input['password']
    data_manager.insert_new_user(username, password)


def check_if_user_in_database(user_input):
    username = user_input['username']
    validation_result = data_manager.check_if_user_in_databse(username)
    if validation_result == []:
        return False
    else:
        return True


def check_if_user_password_correct(user_input):
    username = user_input['username']
    password = user_input['password']
    password_from_database = data_manager.get_user_password(username)
    if password_from_database != []:
        if password == password_from_database[0]['password']:
            return True
    return False


def set_active_user(username):
    data_manager.set_active_user(username)


def logout_user():
    data_manager.logout()

def check_logged_in():
    logged_in = data_manager.check_logged_in()
    logged_in = logged_in[0]['active']
    if logged_in == 'no one':
        return False
    return logged_in


def vote(vote_input):
    vote_input['submission_time'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    data_manager.add_vote(vote_input)    


def get_voted_planets(user):
    voted_planets_dicts = data_manager.get_voted_planets(user)
    voted_planets = []
    for item in voted_planets_dicts:
        voted_planets.append(item['planet_name'])
    return voted_planets


def get_statistics():
    statistics = data_manager.get_statistics()
    # statistics = {}
    # for item in statistics_dicts:
        # statistics[item['planet_name']] = item['votes']
    return statistics