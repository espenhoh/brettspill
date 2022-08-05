"""
conftest.py
"""

import pytest
import pathlib
import os

from dotenv import load_dotenv

print(os.getcwd())
#env_path = pathlib.Path.cwd().joinpath('app', 'brettspill-test.env')
#load_dotenv(dotenv_path=env_path)
#env_path = pathlib.Path.cwd().joinpath('app', 'database-test.env')
#load_dotenv(dotenv_path=env_path)