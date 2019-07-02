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
