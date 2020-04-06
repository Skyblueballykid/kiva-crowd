# UIUC CS 411: Database Systems Kiva Crowdfunding Project
## Team: "Import Team_name"


### Lightsail instructions

1. Login to the AWS instance (credentials in the team google doc)

2. Navigate here:
https://lightsail.aws.amazon.com/ls/webapp/home/instances

3. Open a terminal session by clicking the terminal button (or SSH in using an SSH client)

4. By default, the terminal opens in /home/ubuntu.

```bash
cd kiva-crowd
docker-compose up --build
```

Look into .env file to see Postgres DB name, password (user default to `postgres`).


More info about Lightsail:
https://www.youtube.com/watch?time_continue=3&amp=&v=z525kfneC6E&amp=&feature=emb_title

https://github.com/mikegcoleman/todo/blob/master/lightsail-compose.sh

### Frontend Setup

#### To run with docker

Simply run:

```bash
docker-compose up --build
```

This will build the entire project including the frontend. The first build of the container may take a couple of minutes,
but subsequent builds will be much faster.

The frontend will be ready at `http://localhost`

#### To run without docker

If you want to run the frontend without docker, first you'll need to install `yarn` (these instructions used `yarn`
version `1.22.4`) - see https://classic.yarnpkg.com/en/docs/getting-started. Once you have `yarn` installed navigate
to the `frontend` directory and run:

```bash
cd frontend
yarn install
REACT_APP_API=http://localhost:5000 yarn start
```

Your should open up at `http://localhost:3000`

### Backend Tests

All backend test cases should be located under `backend/local_app/kiva/tests` and should follow the file naming
convention of `test_*.py` (e.g. `test_api_filters.py`).

To run the test suite first bring up the `postgres` container then navigate to the `backend` directory and run:

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

(this assumes you are using python 3) if you haven't already applied the migrations. This is necessary because
Django will create a test database in the postgres container to run the tests against. Finally, after you've
done the above run:

```bash
python manage.py test
```
#### To cleanup / refresh docker environments

```bash
docker-compose down
```
