#! /bin/bash

echo "enter tag"
read tag
npm install
npm build
docker build -t mynodeapp4:${tag} .
