# Contacts Management - Expedia

## Requirements

* Page to list, sort and filter the contacts
	* Will display the Title, Name, Age, Favorite Flag, ContactDetail count, and link to show all the contact details for a contact
	* Should allow filtering/searching on the name
	* Paging
	* Sorting on any field
* Page to show the contact details for a given contact
	* Will list all the contact details for a given user
		* List with the type and content of the contact detail

## Evaluation criteria

* Technology
	* For DB use MySQL
	* For backend use Node.js, https://expressjs.com/
	* For client side use Javascript, https://github.com/gaptree/gap-front-view/
	* For SCM use git, https://github.com/zhanjh/exp-server
	* Deploying the application to tecposter.cn:9198

* Best practices on all layers
	* Easy to debug, troubleshoot and audit
	* Use the right design patterns
	* Ensure some level abstraction
* Focus on clean and readable code
* Focus on performance
* Document explaining the instructions to run the code (if needed)
	* Deployment strategy (App + DB)
	* Technical choices (including the tools you have used)
	* Architecture
	* Possible future improvements
	* Strategy to track user actions and detect anomalies when in production

## Build dev environment

Install nodejs: https://nodejs.org/en/download/package-manager/

Install yarn: https://yarnpkg.com/en/docs/install#arch-stable

```
sudo pacman -S nodejs npm
sudo pacman -S yarn
```

Set up mariadb

* http://www.geekpills.com/operating-system/linux/install-configure-mariadb-mysql-archlinux
* https://mariadb.com/kb/en/library/mysql_install_db/

```
sudo pacman -S mariadb
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql

```

```
Installing MariaDB/MySQL system tables in '/var/lib/mysql' ...
OK

To start mysqld at boot time you have to copy
support-files/mysql.server to the right place for your system


Two all-privilege accounts were created.
One is root@localhost, it has no password, but you need to
be system 'root' user to connect. Use, for example, sudo mysql
The second is mysql@localhost, it has no password either, but
you need to be the system 'mysql' user to connect.
After connecting you can set the password, if you would need to be
able to connect as any of these users with a password and without sudo

See the MariaDB Knowledgebase at http://mariadb.com/kb or the
MySQL manual for more instructions.

You can start the MariaDB daemon with:
cd '/usr' ; /usr/bin/mysqld_safe --datadir='/var/lib/mysql'

You can test the MariaDB daemon with mysql-test-run.pl
cd '/usr/mysql-test' ; perl mysql-test-run.pl

Please report any problems at http://mariadb.org/jira

The latest information about MariaDB is available at http://mariadb.org/.
You can find additional information about the MySQL part at:
http://dev.mysql.com
Consider joining MariaDB's strong and vibrant community:
https://mariadb.org/get-involved/
```

```
sudo systemctl start mariadb
sudo systemctl enable mariadb
```

```
sudo /usr/bin/mysql_secure_installation
mysql -u root -p
```
