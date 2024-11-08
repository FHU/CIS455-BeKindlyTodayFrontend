#!/bin/bash

npm ci
npm run build

sudo rm -rf /usr/share/nginx/html

sudo cp -r ./dist /usr/share/nginx/html