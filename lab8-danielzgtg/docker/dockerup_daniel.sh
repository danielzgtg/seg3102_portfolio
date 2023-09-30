#!/bin/bash
if [ ! -d '/home/home/DanielFolder' ]; then
    echo 'Do not run this script if you are not Daniel!'
    exit 1
fi
if [ "$UID" -ne 0 ]; then
    echo 'Not root'
    exit 1
fi
if [ ! -d 'docker-entrypoint-initdb.d' ]; then
  echo 'Wrong directory'
  exit 1
fi
# ufw allow in on enp4s0 proto tcp to any port 27017
docker container rm -f mongodb-seg3102-lab8 || :
umount mongoramdisk || :
mkdir -p mongoramdisk
mount -o size=4G,nosuid,nodev,noexec,noatime,mode=777 -t tmpfs mongo mongoramdisk
exec docker run -dp 27017:27017 -m 2g --name=mongodb-seg3102-lab8 \
    -v "$(readlink -f mongoramdisk)":/data/db \
    -v "$(readlink -f docker-entrypoint-initdb.d)":/docker-entrypoint-initdb.d \
    --env='MONGO_INITDB_ROOT_USERNAME=mongoadmin' --env='MONGO_INITDB_ROOT_PASSWORD=secret' \
    --rm mongo:6.0.3 --wiredTigerCacheSizeGB 0.5
