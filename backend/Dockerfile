FROM python:3-slim
ENV PYTHONUNBUFFERED 1

WORKDIR /var/app
COPY . /var/app
RUN pip install -r requirements.txt

## add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

## launch the wait tool and then application
ENTRYPOINT /wait && python manage.py runserver_plus 0.0.0.0:5000