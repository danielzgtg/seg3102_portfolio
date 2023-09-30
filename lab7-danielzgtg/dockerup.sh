#!/bin/dash
# ufw allow in on enp4s0 proto tcp to any port 3306
# This didn't work with 6033:3306, only with 3306:3306
exec docker run -dp 3306:3306 --name=docker-mysql-seg3102-lab7 \
    --env="MYSQL_ROOT_PASSWORD=root" --env="MYSQL_PASSWORD=root" --env="MYSQL_DATABASE=booksDb" \
    --rm mysql:8.0.31
