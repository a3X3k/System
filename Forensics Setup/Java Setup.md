# Java Installation and Stegsolve Setup

```bash
$ sudo apt update
$ sudo apt install default-jre
$ java --version

$ readlink -f $(which java)
/usr/lib/jvm/java-11-openjdk-amd64/jre/bin/java

As printed out, JDK is installed in folder /usr/lib/jvm/java-8-openjdk-amd64.
```

- Edit .zshrc file:
- Add `export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64`

```bash
source ~/.bashrc
```

- Run the following command to make sure it is effective:

```bash
~$ echo $JAVA_HOME
/usr/lib/jvm/java-8-openjdk-amd64
```
