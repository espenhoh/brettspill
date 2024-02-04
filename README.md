# Brettpill
> Implementation of common board games in norwegian

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
Trying to implement a Rest board game with html/css and no images/graphics files.

## Screenshots
TODO

## Technologies
* pyenv-win - version 2.64.11
    * Python - version 3.9.6
* poetry - version 1.1.11 
* Django - version 3.1.3
* MariaDB - version 10.5.8
    * BrettspillDB

## Setup

### code-server
Backend is coded with code server

Upgrade by installing over old:

`curl -fsSL https://code-server.dev/install.sh | sh`

Change port back to 8079 after reboot:

`nano ~/.config/code-server/config.yaml`

code server is exposed locally through ssh tunnel together with local ports for localhost on the server. THis allows localhost to be available on the development machine.


### Dyndns

Dynamic dns handeled by dynu through holtebu.ddnsfree.com

Dynmic IP updated with script:

`sudo nano /etc/ddclient.conf`

Change update interval:

``sudo nano /etc/default/ddclient ``

``sudo systemctl start/stop/restart ddclient.service ``



## Install docker


## Run dev environment
docker compose -f docker-compose.dev.yml up

## Migrations
docker compose -f docker-compose.dev.yml exec brettspill python manage.py makemigrations
docker compose -f docker-compose.dev.yml exec brettspill python manage.py migrate
## Show currently exposed endpoints
docker compose -f docker-compose.dev.yml exec brettspill python manage.py show_urls

Shell: docker compose -f docker-compose.dev.yml exec brettspill python manage.py shell
Superuser: docker compose -f docker-compose.dev.yml exec brettspill python manage.py createsuperuser


## Code Examples
Show examples of usage:
`put-your-code-here`

## Features
List of features ready and TODOs for future development
* Awesome feature 1
* Awesome feature 2
* Awesome feature 3

To-do list:
* Wow improvement to be done 1
* Wow improvement to be done 2

## Status
Project is: _in progress_

## Contact
Created by [@espenhoh] - feel free to contact me!