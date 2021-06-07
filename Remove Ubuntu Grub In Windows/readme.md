# Remove Ubuntu Grub In Windows

![](https://linuxbsdos.com/wp-content/uploads/2015/09/DiskpartC.png)
![](https://linuxbsdos.com/wp-content/uploads/2015/09/DiskpartA.png)
![](https://linuxbsdos.com/wp-content/uploads/2015/09/DiskpartB.png)
![](https://linuxbsdos.com/wp-content/uploads/2015/09/DiskpartC.png)

- Run a `cmd.exe` process with administrator privileges.
- Run `diskpart`.
- Type: `list disk` then `sel disk X` where `X` is the drive your boot files reside on.
- Type `list vol` to see all partitions (volumes) on the disk (the EFI volume will be formatted in FAT, others will be NTFS).
- Select the EFI volume by typing: `sel vol Y` where `Y` is the SYSTEM volume (this is almost always the EFI partition).
- For convenience, assign a drive letter by typing: `assign letter=Z` where Z is a free (unused) drive letter.
- Type `exit` to leave disk part.
- While still in the cmd prompt, type: `Z:` and hit enter, where `Z` was the drive letter you just created.
- Type `dir` to list directories on this mounted EFI partition.
- If you are in the right place, you should see a directory called `EFI`.
- Type `cd EFI` and then `dir` to list the child directories inside `EFI`.
- Type `rmdir /S ubuntu` to delete the ubuntu boot directory.
