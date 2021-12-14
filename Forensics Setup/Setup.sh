#!/bin/bash
sudo apt update -y;
sudo apt upgrade -y;
sudo pip install python -y;
sudo apt install python -y;
sudo apt-get install python3-pip -y;
sudo apt install git -y;
sudo apt install snap -y;
sudo apt install exiftool -y;
sudo apt install ghex -y;
sudo apt install binwalk -y;
sudo apt install steghide -y;
sudo apt-get install zbar-tools -y;
sudo apt install gnupg -y;
sudo snap install john-the-ripper -y;
sudo apt-get install steghide -y;
sudo pip3 install stegcracker -y;
sudo apt install fcrackzip -y;
sudo apt-get install pdfcrack -y;
wget http://www.caesum.com/handbook/Stegsolve.jar -O stegsolve.jar;
chmod +x stegsolve.jar;
mkdir bin;
mv stegsolve.jar bin/;
sudo pip3 install stegoVeritas -y;
stegoVeritas_install_deps;
sudo apt install stegsnow -y;
sudo apt install pngcheck -y;
sudo apt install wine-stable -y;
sudo git clone https://github.com/jesparza/peepdf -y;
sudo wget -O /usr/bin/jsteg https://github.com/lukechampine/jsteg/releases/download/v0.1.0/jsteg-linux-amd64 -y;
sudo chmod +x /usr/bin/jsteg -y;
sudo wget -O /usr/bin/slink https://github.com/lukechampine/jsteg/releases/download/v0.2.0/slink-linux-amd64 -y;
chmod +x /usr/bin/slink -y;
sudo apt install ruby -y;
sudo gem install zsteg -y;
sudo git clone https://github.com/volatilityfoundation/volatility.git -y; 
sudo apt-get update -y;
sudo apt-get install python3 python3-pip python3-dev git libssl-dev libffi-dev build-essential -y;
python3 -m pip install --upgrade pip;
python3 -m pip install --upgrade pwntools;

sudo apt-get update -y;
sudo apt-get install python python-pip python-dev git libssl-dev libffi-dev build-essential -y;
python2 -m pip install --upgrade pip==20.3.4;
python2 -m pip install --upgrade pwntools;
sudo pip3 install autopep8 -y;

sudo apt-get update -y;
sudo apt upgrade -y;
sudo apt-get install python3-pip -y;
sudo apt-get install libtiff5-dev -y;
sudo pip3 install Pillow -y;
sudo pip-3.2 install Pillow -y;

sudo pip install ipython -y;

sudo apt update -y;
sudo apt upgrade -y;

sudo apt install volatility -y;
sudo pip install python-csv -y;
sudo pip install pycrypto -y && sudo pip install distorm3 -y;
sudo apt update -y;
sudo apt upgrade -y;

set -x;

sudo apt-get update -y;

sudo apt-get install ghex binwalk steghide gnupg stegsnow -y;
sudo apt-get install libimage-exiftool-perl -y;
sudo apt-get install pngcheck python3-pip ipython3 -y;
sudo apt-get install fcrackzip pdfcrack -y;
sudo apt-get install ruby -y;
sudo gem install zsteg -y;
sudo apt-get install snapd -y;
sudo snap install john-the-ripper -y;
sudo apt-get install zbar-tools -y;
sudo apt-get install foremost -y;

python3 -m pip install Pillow;
python3 -m pip install stegcracker;

wget https://bootstrap.pypa.io/pip/2.7/get-pip.py
python2 get-pip.py
sudo pip install --upgrade pip
pip2 install scapy
