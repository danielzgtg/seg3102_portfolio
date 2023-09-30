#!/bin/bash
if [ ! -d 'docker-entrypoint-initdb.d' ]; then
  echo 'Wrong directory'
  exit 1
fi
exec docker run -dp 127.0.0.1:27017:27017 -m 2g --name=mongodb-seg3102-lab8 \
    -v "$(readlink -f docker-entrypoint-initdb.d)":/docker-entrypoint-initdb.d \
    --env='MONGO_INITDB_ROOT_USERNAME=mongoadmin' --env='MONGO_INITDB_ROOT_PASSWORD=secret' \
    --rm mongo:6.0.3 --wiredTigerCacheSizeGB 0.5
