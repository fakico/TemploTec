#!/bin/bash
echo "Stop server"
pm2 stop templotecweb

echo "Getting last version from git"
git pull

echo "Starting server"
pm2 start index.js --name="templotecweb"

echo "done!"