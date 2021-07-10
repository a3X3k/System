# Java Installation and Stegsolve Setup

```
$ sudo apt update
$ sudo apt install default-jre
$ java --version

$ readlink -f $(which java)
/usr/lib/jvm/java-11-openjdk-amd64/jre/bin/java

As printed out, JDK is installed in folder /usr/lib/jvm/java-8-openjdk-amd64.
```

- Edit .zshrc file:
- Add `export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64`

```
source ~/.bashrc
```

- Run the following command to make sure it is effective:

```
~$ echo $JAVA_HOME
/usr/lib/jvm/java-8-openjdk-amd64
```

- Under linux there's a package called binfmt-support that allows you to run directly your jar without typing java -jar
  
```
sudo apt-get install binfmt-support
chmod u+x <File Name>.jar
./<File Name>.jar
```
