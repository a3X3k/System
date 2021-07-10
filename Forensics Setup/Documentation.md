# Basic Installation Documentation of various pacakges

- Install [`Xming`](https://sourceforge.net/projects/xming/files/latest/download) and set it up.
- Before using `Ghex` - `Stegsolve`, start the `Xming` server and give `export DISPLAY=localhost:0.0` in the terminal.

## Stegsolve CLI

- Under linux there's a package called `binfmt-support` that allows you to run directly your jar without typing `java -jar`.
  
```
sudo apt-get install binfmt-support
chmod u+x <File Name>.jar
./<File Name>.jar
```
