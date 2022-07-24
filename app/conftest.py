from dotenv import load_dotenv
import pathlib

env_path = pathlib.Path.cwd().joinpath('app', 'brettspill-test.env')
load_dotenv(dotenv_path=env_path)
env_path = pathlib.Path.cwd().joinpath('app', 'database-test.env')
load_dotenv(dotenv_path=env_path)