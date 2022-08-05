import os


def test_env():
    osdict = dict(os.environ)
    assert int(osdict['DEBUG']) == 1
