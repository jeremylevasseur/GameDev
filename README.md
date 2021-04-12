# Game Dev Environment

This repository contains two separate directories: **NGINX_Setup** and **React_Setup**. They are to allow for experimentation with either an NGINX web server or the React Framework server.

The two setups use Docker to run the required components. Both setups contain four separate apps running in their own Docker containers. They are the following:

- **Reverse Proxy**

- **Web Server** (either NGINX or React)

- **REST API** (powered by Node.js)

- **Database** (a MySQL database)

The reason for having each of these containers is explained below. To get started, the first step is to make sure you have Git installed on your computer.

### Git
---
First, check if Git has already been installed. Do this by opening up a terminal, typing ```git``` and pressing ENTER. If you get something similar to the following output then Git has already been installed.

```
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]
```

If not, head to [this link](https://git-scm.com/downloads) and download the installation file for your operating system. Follow the instructions and then try typing ```git``` into your terminal again.


### Cloning This Repository
---
Now that you have Git installed, you'll be able to clone this repository. Enter the following command:

```
git clone https://github.com/jeremylevasseur/GameDev.git
```

You'll most likely need to authenticate yourself by either entering your Git credentials into the terminal or by filling in the login form that pops up in a browser (Windows & Mac only).

After the authentication, the cloning will begin and you will soon have the entire repository within the directory that you are executing these commands in. You can enter the directory with the command:

 ```
 cd GameDev
 ```

### Installing Docker
---
To run these applications on your computer, you need to have Docker installed. Here are links to step-by-step installation guides for each operating system.

[Install Docker on Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)

[Install Docker on Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac/)

[Install Docker on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

Once Docker is installed, you need to make sure that you also have the **docker-compose** tool installed. It should be automatically installed if you are using Windows or Mac. You may need to manually install it if you are using Linux. You can check whether it has been installed or not by entering the following command into your terminal.

```bash
docker-compose --version
```

If it is installed, your output should look something like this.

```bash
Docker version 20.10.3, build 48d30b5
```

If it is not installed and you are using linux, you will need to run the following commands in the terminal.

To download the current stable release.
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

To apply executable permissions to the binary file.
```bash
sudo chmod +x /usr/local/bin/docker-compose
```

Docker-compose should now be installed.


## Learning About Docker
---
Docker is a software that runs applications inside isolated Docker containers. A simplified description of a Docker container is that it is a slimmed down virtual machine that shares some of the host operating system's functionality to run applications. It is much less computationally taxing to run isolated applications using Docker when compared to running them inside virtual machines.

One of the main benefits to using Docker is that when deploying an application to a server, it is guaranteed to work properly, as long as the server has the correct version of Docker installed. Because of this, it is easy to make small updates to your application which are then quickly deployed to your production environment running on a server. This practice of making small updates and deploying them to production quickly is known as *DevOps Engineering*. The DevOps continuous integration process is the philosophy of developing, testing, and deploying small incremental changes often, rather than large updates less often. Docker has become the industry standard for deployment software within DevOps environments.

If you haven't used Docker before, I recommend watching some of the following YouTube videos to become familiar with the technology. It is definitely worth learning about.

[Exploring Docker - Getting Started](https://www.youtube.com/watch?v=Kyx2PsuwomE&t=1655s)

[Exploring Docker - Docker Compose With Node & MongoDB](https://www.youtube.com/watch?v=Kyx2PsuwomE&t=1655s)

These two videos will give you a base understanding of how Docker containers are created and how they interact with one another. 

## Building The NGINX Docker Containers
---
Once you have the repository downloaded, open up your terminal and navigate to the NGINX_Setup directory with:

```
cd NGINX_Setup
```

You'll know if you're in the right directory when the following command.
```bash
ls
```
on linux, or
```bash
dir
```
on windows, produces a list of the following directories and files.
```bash
api  cronjobs  database  docker-compose.yml  images  README.md  reverse_proxy  web_server
```
The **docker-compose.yml** file needs to be within the directory you are running the following commands in.

The final step in getting all the applications up and running within their respective Docker containers is to run this command.
```bash
docker-compose up --build
```

This command may take a significant amount of time to run. It needs to download the container images from Docker Hub and then run the start up scripts for each container. If you track the outputs of the containers, you will eventually see that they are ready to use. 

One way to check whether they are running or not is to run the following command in your terminal.
```bash
docker container ls
```
You should see a list of all the currently running containers. 

This application should have four active containers. One called **web_server** which hosts the NGINX web server, one called **reverse_proxy** which hosts the reverse proxy, one called **api** which hosts the REST API, and one called **mysql1** which hosts the database. The ports that each container is using can also be seen from the output. The web server is running on port 85 of your local machine, the REST API is running on port 8081 of your local machine, and the database is running on port 3306 of your local machine. However, the beauty of using a reverse proxy is that all of the network traffic goes through port 80 (or 443 if you setup an SSL certificate) and gets routed to the specific containers based on a set of rules pre-defined in the **nginx.conf** file located within the reverse_proxy directory of this repository.

At this point, all the containers should be running and all you have to do to access the browser application is open your web browser of choice and type "localhost" in the search bar and press enter. It should bring you to the authentication page of the web application. You then can actively edit the HTML, CSS, and JavaScript files within the *webserver/* directory to create the website. Every time you want to see the changes you've made, you'll need to refresh the page.

## Building The React Docker Containers
---
Before starting the React Docker containers, it is important that you have no other Docker containers currently running. You can kill all currently running containers with the following command:

Windows (open a PowerShell terminal):
```
docker ps -q | % { docker stop $_ }
```

Mac & Linux:

```
docker rm $(docker ps -a -q) -f
```

To make sure that the command worked and that you don't have any containers currently running, execute this command:

```bash
docker container ls
```

If there are no containers listed, you can continue to the next step.

Open up your terminal and navigate to the React_Setup directory. You'll know if you're in the right directory when the following command.
```bash
ls
```
on linux, or
```bash
dir
```
on windows, produces a list of the following directories and files.
```bash
api  cronjobs  database  docker-compose.yml  images  main_site  README.md  reverse_proxy
```
The **docker-compose.yml** file needs to be within the directory you are running the following commands in.

The final step in getting all the applications up and running within their respective Docker containers is to run this command.
```bash
docker-compose up --build
```

This command may take a significant amount of time to run. It needs to download the container images from Docker Hub and then run the start up scripts for each container. If you track the outputs of the containers, you will eventually see that they are ready to use. 

One way to check whether they are running or not is to run the following command in your terminal.
```bash
docker container ls
```
You should see a list of all the currently running containers. 

This application should have four active containers. One called **main_site** which hosts the React web application, one called **reverse_proxy** which hosts the reverse proxy, one called **api** which hosts the REST API, and one called **mysql1** which hosts the database. The ports that each container is using can also be seen from the output. The React web application is running on port 3000 of your local machine, the REST API is running on port 8081 of your local machine, and the database is running on port 3306 of your local machine. However, the beauty of using a reverse proxy is that all of the network traffic goes through port 80 (or 443 if you setup an SSL certificate) and gets routed to the specific containers based on a set of rules pre-defined in the **nginx.conf** file located within the reverse_proxy directory of this repository.

At this point, all the containers should be running and all you have to do to access the browser application is open your web browser of choice and type "localhost" in the search bar and press enter. It should bring you to the authentication page of the web application.


## Learning About MySQL, React, and Node.js

#### Back-end Comments
---
Having a strong back-end is more important than having a strong front-end. Leaving user data available for exploitation can ruin the product as well as any trust obtained from the users. Cutting corners on the back-end can be much more devastating then cutting corners on the front-end. Fortunately, putting more work into the back-end almost always makes it easier to develop the front-end. The application should be developed using this philosophy.

### MySQL Databases
---
The database for these applications is a MySQL database. It is hosted within a Docker container called 'mysql1'. The following YouTube video does a great job at quickly explaining the fundamentals of MySQL: 

[MySQL Crash Course | Learn SQL](https://www.youtube.com/watch?v=9ylj9NR0Lcg)

#### Database Comments
---
The database will automatically be generated when you run the `docker-compose up --build` command because it uses the *data_backup.sql*.

It is important that, when you are running these Docker containers on a server, no data is lost. A potential data-loss scenario is the following: 

You start up all the Docker containers and users are using the application. They are creating and editing accounts, sending robot commands, etc. All this data is being kept in the database. Then, two days later, disaster strikes and your Docker containers stop out of nowhere due to a power outage at server facility you are using. It is possible that the [Docker volumes](https://docs.docker.com/storage/volumes/) do not save all the data that has been added throughout the past couple of days. If this is the case, you will have some angry customers.

To prevent this from happening, you can set up a bash script to run every ~15-30 minutes that backs up the entire *base_db* MySQL database. A template of this script is located at [cronjobs/mysql_backup_script.sh](https://github.com/jeremylevasseur/GameDev/blob/main/React_Setup/cronjobs/mysql_backup_script.sh). You can set this script up to run at an interval by using the unix cronjob service.

#### Cronjob Tutorial
---
Open a terminal session on your server/computer (I use SSH):

```bash
ssh <user>@<IP Address>
```

Example (with a fake IP address):

```bash
ssh root@76.23.124.154
```

Now you can edit the cronjobs by using the command:

```bash
crontab -e
```

This should open up a file with the [Nano](https://linuxize.com/post/how-to-use-nano-text-editor/) text editor. Go to the bottom of this file and add the following line (expect edit the path to the location of the bash script):

```bash
*/15 * * * * /path/to/cronjobs/mysql_backup_script.sh
```

This interval is set to every 15th minute of every hour. If you want to change this interval, I recommend consulting the [crontab guru](https://crontab.guru/) site.

Press CTRL-X and then SHIFT-Y and then ENTER. The terminal should output something similar to:

```bash
crontab: installing new crontab
```

Your database should now be backed up every ~15 minutes. If there is a power outage at the server facility, you will only lose, at most, 15 minutes worth of data which is much more manageable than multiple days worth of data.

---

Another recommendation regarding the database is to use a database management software that allows you to connect to a database by providing an IP Address and database password. Doing this will allow you to create, edit, and delete things within the database using SQL. It also helps with API development because you can test SQL queries. The database management software that I use is [DataGrip](https://www.jetbrains.com/datagrip/), developed by JetBrains. If you create a student account you can use it for free.

### REST API With Node.js
---
In order for the system to work properly, there needs to be a flow of information from the user to the database, and from the database to the user. Essentially, the front-end application needs to request and send data to the database. These handoffs of data between the front-end and the database should never occur without an entity in the middle that protects the database from any form of malicious or unauthorized actions. When the front-end makes a request to the back-end for data, this request needs to be processed first. The type of technology required for this is an application programming interface (API). More specifically, a Representational State Transfer API, or, REST API. The front-end must send it's request to this REST API. The API then decides whether or not the request has the authorization to access the database, and it also inspects the request for malicious intent. If the request is valid and safe, the API executes the required commands in the database and returns the data to the front-end.

You can read more about REST API's [here](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/).

There are many different technologies that can be used to create a REST API for a database. Due to JavaScript and the Node Package Manager (npm) already being used within the project, the Node.js framework was chosen to run the REST API. With this decision, both the front-end and back-end frameworks will use JavaScript. 

The best way to quickly learn about creating a REST API with Node.js is to watch [this tutorial](https://www.youtube.com/watch?v=L72fhGm1tfE).


#### API Comments
---
A very useful tool to use when developing API's is the [Postman Software](https://www.postman.com/pricing/). It is free for indiviual development. There are tutorial videos on YouTube that demonstrate how to use it effectively.


### React Framework
---
To learn about React and how to use it, it is recommended that you watch the following YouTube videos:

[React Website Tutorial - Beginner React JS Project Fully Responsive](https://www.youtube.com/watch?v=I2UBjN5ER4s&t=1149s)

[React Website using Styled Components and Smooth Scroll - Beginner Project Fully Responsive](https://www.youtube.com/watch?v=Nl54MJDR2p8)


## Learning About A Reverse Proxy
---
Docker is very scalable. If there is a spike in network traffic and the applications are having trouble handling the load, Docker can create additional identical containers to help distribute the load. To use this functionality from Docker, additional components are required. The current additional component I am using for the browser application is a reverse proxy Docker container. This container is in charge of receiving all requests that come to the server and then deciding where to send them based on pre-defined logic. Using this type of container to filter through all the incoming requests allows for load distribution when network traffic is high. For example, if the performance of our Node.js REST API container is starting to decline due to increased traffic, Docker can start up another identical Node.js REST API container and the reverse proxy container can start sending half of all API requests to each container, resulting in better performance and quicker response times. Combining this Docker configuration with the seemingly limitless cloud computing power that is available these days, high spikes in traffic can almost always be handled effectively.

To learn more about reverse proxies, visit [What Is A Reverse Proxy Server?](https://www.nginx.com/resources/glossary/reverse-proxy-server/).

In the current Docker configuration, an NGINX Docker container is being created and configured into a reverse proxy server. This proxy can also be configured to support SSL security. To do this, proper SSL certificates will need to be purchased and put into the *reverse_proxy/certs/* folder. Next, follow the instructions within the file located at [reverse_proxy/nginx.conf](https://gitlab.com/iTAD/browser-application/-/blob/master/reverse_proxy/nginx.conf)