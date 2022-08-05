import os


def test_env():
    osdict = dict(os.environ)
    print("User's Environment variable:")
    print('Debug: ' + osdict['DEBUG'])
    print('Postgres user : ' + osdict['POSTGRES_USER'])
    assert True
