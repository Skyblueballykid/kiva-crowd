# UIUC CS 411: Database Systems Kiva Crowdfunding Project
## Team: "Import Team_name"


Lightsail instructions:

1. Login to the AWS instance (credentials in the team google doc)

2. Navigate here:
https://lightsail.aws.amazon.com/ls/webapp/home/instances

3. Open a terminal session by clicking the terminal button (or SSH in using an SSH client)

4. By default, the terminal opens in /home/ubuntu.
cd ../../ to get to the root dir and cd srv/docker to get to the docker dir

5. Start the application with:
docker-compose -f /srv/docker/docker-compose.yml up -d
