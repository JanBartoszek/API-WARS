from psycopg2 import sql, Binary

import persistence
import logic

@persistence.connection_handler
def insert_new_user(cursor, username, password):
    cursor.execute(
        sql.SQL("""
                    INSERT INTO users (username, password)
                    VALUES (%(username)s, %(password)s);
                """), {'username': username, 'password': password}
                )


@persistence.connection_handler
def check_if_user_in_databse(cursor, username):
    cursor.execute(
        sql.SQL("""
                    SELECT username FROM users
                    WHERE username = %(username)s;
                """), {'username': username}
                )
    username = cursor.fetchall()
    return username


@persistence.connection_handler
def get_user_password(cursor, username):
    cursor.execute(
        sql.SQL("""
                    SELECT password FROM users
                    WHERE username = %(username)s;
                """), {'username': username}
                )
    password = cursor.fetchall()
    return password


@persistence.connection_handler
def set_active_user(cursor, username):
    cursor.execute(
        sql.SQL("""
                    UPDATE logged_in
                    SET active = %(username)s;
                """), {'username': username}
                )


@persistence.connection_handler
def logout(cursor):
    cursor.execute(
        sql.SQL("""
                    UPDATE logged_in
                    SET active = 'no one';
                """)
                )


@persistence.connection_handler
def check_logged_in(cursor):
    cursor.execute(
        sql.SQL("""
                    SELECT active FROM logged_in
                """)
                )
    active_user = cursor.fetchall()
    return active_user


@persistence.connection_handler
def add_vote(cursor, vote_input):
    cursor.execute(
        sql.SQL("""
                    SELECT id FROM users
                    WHERE username = %(username)s
                """), {'username': vote_input['username']}
                )
    user_id = cursor.fetchall()
    user_id = user_id[0]['id']
    vote_input['user_id'] = user_id

    cursor.execute(
        sql.SQL("""
                    INSERT INTO planet (planet_name, user_id, submission_time)
                    VALUES (%(planet_name)s, %(user_id)s, %(submission_time)s);
                """), {'planet_name': vote_input['planet_name'], 'user_id': vote_input['user_id'], 'submission_time' : vote_input['submission_time']}
                )


@persistence.connection_handler
def get_voted_planets(cursor, username):
    cursor.execute(
        sql.SQL("""
                    SELECT planet_name FROM planet
                    JOIN users ON users.id = planet.user_id
                    WHERE username = %(username)s;
                """), {'username': username}
                )
    voted_planets_dicts = cursor.fetchall()
    return voted_planets_dicts