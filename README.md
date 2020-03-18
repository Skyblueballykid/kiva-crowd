# UIUC CS 411: Database Systems Kiva Crowdfunding Project
## Team: "Import Team_name"


### Lightsail instructions

1. Login to the AWS instance (credentials in the team google doc)

2. Navigate here:
https://lightsail.aws.amazon.com/ls/webapp/home/instances

3. Open a terminal session by clicking the terminal button (or SSH in using an SSH client)

4. By default, the terminal opens in /home/ubuntu.
cd ../../ to get to the root dir and cd srv/docker to get to the docker dir

5. Start the application with:
docker-compose -f /srv/docker/docker-compose.yml up -d


More info about Lightsail:
https://www.youtube.com/watch?time_continue=3&amp=&v=z525kfneC6E&amp=&feature=emb_title

https://github.com/mikegcoleman/todo/blob/master/lightsail-compose.sh

### Frontend Setup

#### To run with docker

Simply run `docker-compose up --build`. This will build the entire project including the frontend. The frontend
will be exposed at port `3000` on your machine so you can access it within your browser at `localhost:3000`. The first 
build of the container may take a couple of minutes, but subsequent builds will be much faster.

#### To run without docker

If you want to run the frontend without docker, first you'll need to install `yarn` (these instructions used `yarn` 
version `1.22.4`) - see https://classic.yarnpkg.com/en/docs/getting-started. Once you have `yarn` installed 
navigate to the `frontend` directory and run `yarn start`. This will expose the frontend on port `3000` so it 
can be accessed within your browser at `localhost:3000`.

### Backend Tests

All backend test cases should be located under `backend/local_app/kiva/tests` and should follow the file naming convention
of `test_*.py` (e.g. `test_api_filters.py`).

To run the test suite first bring up the `postgres` container then navigate to the `backend` directory and run 
`python manage.py makemigrations && python manage.py migrate` (this assumes you are using python 3) if you haven't 
already applied the migrations. This is necessary because Django will create a test database in the postgres container 
to run the tests against. Finally, after you've done the above run `python manage.py test`.

