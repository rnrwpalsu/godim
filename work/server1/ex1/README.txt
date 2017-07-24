
서버 ip : 13.124.88.141

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get install -y build-essential

sudo npm i -g forever

//서버계속 띄우려고
시작 : forever start app.js
종료 : forever stop app.js