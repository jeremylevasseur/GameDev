# iTAD Frontend Browser Application and Backend

This repository contains all the files needed to get the iTAD frontend browser application and backend up and running. It uses Docker to create a container that hosts a MySQL database, a container that hosts a REST API (powered by Node.js), a container that uses Nginx to host a React web application, and another Nginx container that acts as a reverse proxy for the system. The following README file explains how to get started.

Here is a list of YouTube videos that were made throughout the development of the application:


| Date         | URL                                         | Description                                                             |
|:------------ |:------------------------------------------- |:------------------------------------------------------------------------|
| Mar 15, 2021 | https://www.youtube.com/watch?v=CIE1r1SSi8Y | Demonstration of the real-time interactions feature of the application. |
| Feb 10, 2021 | https://www.youtube.com/watch?v=ZBCq1aSE494 | Tutorial on how to get the Docker containers up and running.            |
| Feb 10, 2021 | https://www.youtube.com/watch?v=4Xk_4fH2UKA | Improved user interface of application and added new features.          |
| Dec 1, 2020  | https://www.youtube.com/watch?v=1sdjwcCMgkQ | Implemented user accounts into application.                             |

# Contact Information

My name is Jeremy and I was assigned this work for the Fall 2020 term and the Winter 2021 term. For future students of the iTAD capstone project, feel free to reach me at *jeremy.levasseur.1997@gmail.com* with any questions about the content of this repository.

Don't hesitate to edit this section if things change.

# Getting The Docker Containers Running

## Video
If you prefer, a [video](https://www.youtube.com/watch?v=ZBCq1aSE494) was created for this section of the README file. It shows how to get the Docker containers up and running.
## Pre-requisites

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

## Cloning The Repository

If you haven't already done so, you now need to clone this git repository by running the following command in your terminal:
```bash
git clone https://gitlab.com/iTAD/browser-application.git
```

If that doesn't work, download the compressed version of it located at the home page of this repository.

## Learning About Docker
Docker is a software that runs applications inside isolated Docker containers. A simplified description of a Docker container is that it is a slimmed down virtual machine that shares some of the host operating system's functionality to run applications. It is much less computationally taxing to run isolated applications using Docker when compared to running them inside virtual machines.

One of the main benefits to using Docker is that when deploying an application to a server, it is guaranteed to work properly, as long as the server has the correct version of Docker installed. Because of this, it is easy to make small updates to your application which are then quickly deployed to your production environment running on a server. This practice of making small updates and deploying them to production quickly is known as *DevOps Engineering*. The DevOps continuous integration process is the philosophy of developing, testing, and deploying small incremental changes often, rather than large updates less often. Docker has become the industry standard for deployment software within DevOps environments.

If you haven't used Docker before, I recommend watching some of the following YouTube videos to become familiar with the technology. It is definitely worth learning about.

[Exploring Docker - Getting Started](https://www.youtube.com/watch?v=Kyx2PsuwomE&t=1655s)

[Exploring Docker - Docker Compose With Node & MongoDB](https://www.youtube.com/watch?v=Kyx2PsuwomE&t=1655s)

These two videos will give you a base understanding of how Docker containers are created and how they interact with one another. 

## Building The Docker Containers

Once you have the repository downloaded, open up your terminal and navigate to it's root directory. You'll know if you're at the root directory when the following command.
```bash
ls
```
on linux, or
```bash
dir
```
on windows, produces a list of the following directories and files.
```bash
api  database  docker-compose.yml  main_site  README.md  reverse_proxy  src
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

At this point, all the containers should be running and all you have to do to access the browser application is open your web browser of choice and type "localhost" in the search bar and press enter. It should bring you to the authentication page of the web application. You then can either register a new user or sign in with the following credentials.

Username: jeremylevasseur

Password: password

# Learning About MySQL, React, and Node.js

## Back-end Comments

Having a strong back-end is more important than having a strong front-end. Leaving user data available for exploitation can ruin the product as well as any trust obtained from the users. Cutting corners on the back-end can be much more devastating then cutting corners on the front-end. Fortunately, putting more work into the back-end almost always makes it easier to develop the front-end. The application was developed using this philosophy.

## MySQL Databases

The database for this software application is a MySQL database. It is hosted within a Docker container called 'mysql1'. The following YouTube video does a great job at quickly explaining the fundamentals of MySQL: 

[MySQL Crash Course | Learn SQL](https://www.youtube.com/watch?v=9ylj9NR0Lcg)

Here is an image of the tables within the MySQL database called `base_db`.

![](images/tables.png "Tables")

As you can see there are five tables within the database.

#### Table command_data

As is evident from it's name, the data for specific commands is stored here. The table columns are: *command_id*, *command_type*, *command_details*, *command_status*, *command_request_timestamp*, *command_completion_timestamp*.

#### Table group_data
It is possible that this application will be used by multiple organizations (hospitals, assitive care homes, etc.). It is very important that the data for each of these groups is not mixed together. A specific group should only be able to see data that is relevant to their organization. For this reason, the database must contain a table that keeps track of the separate groups.

This table contains a list of the groups that are using the application. Everytime a new group of people want to use the application, the project admins will need to create a new entry in this table with a group code that the users will need to enter when creating an account. The columns of this table are: *group_index*, *group_code*, *group_creation_date*, *group_name*, *group_colour*.

The *group_code* column is what will contain the group code that each member will need to enter. The *group_name* and *group_colour* column will contain values that may be used for application custimization.

#### Table itad_user_data

This table contains user data. It lists all the users that have accounts with the application. Every time a user creates a new account, another row is added to this table. The columns of the table are: *user_index*, *group_code*, *type_of_account*, *username*, *password*, *user_first_name*, *user_last_name*, *user_email*, *user_phone_number*, *user_fax_number*, *profile_picture_file_path*, *user_token*, *account_creation_date*, *associated_robots*.

#### Table itad_user_session_data

The purpose of this table is to prevent users from being required to sign in to the application every time they load the web application. The first time they sign in to the web application, the Node.js REST API script will generate a new unique token and a token expiration time for that particular user. This newly generated token and expiration time will be updated in this table. At this point, every time the user loads a page of the web application, it will check to see if this user has a valid session token. If their session token has expired, they will be required to sign in again to continue using the application, where a new token will be generated. If their session token has not expired, they can continue using the application without interruption.

This table contains a list of the session tokens for each specific user. The columns of the table are: *session_id*, *user_jwt_token*, *session_key*, *session_deadline*.

#### Table robot_data

This table contains data about the robots that the mobile manipulator team has deployed. This data will be used to monitor the status of the robots and to know whether they are busy or not. With the data contained in this table, users will be able to monitor their robot. The columns of the table are: *robot_id*, *robot_type*, *robot_location*, *robot_status*, *robot_charge_level*.

### Database Comments

The database will automatically be generated when you run the `docker-compose up --build` command because it uses the *data_backup.sql* file located at [database/data_backup.sql](https://gitlab.com/iTAD/browser-application/-/blob/master/database/data_backup.sql).

It is important that, when you are running these Docker containers on a server, no data is lost. A potential data-loss scenario is the following: 

You start up all the Docker containers and users are using the application. They are creating and editing accounts, sending robot commands, etc. All this data is being kept in the database. Then, two days later, disaster strikes and your Docker containers stop out of nowhere due to a power outage at server facility you are using. It is possible that the [Docker volumes](https://docs.docker.com/storage/volumes/) do not save all the data that has been added throughout the past couple of days. If this is the case, you will have some angry customers.

To prevent this from happening, you can set up a bash script to run every ~15-30 minutes that backs up the entire *base_db* MySQL database. A template of this script is located at [cronjobs/mysql_backup_script.sh](https://gitlab.com/iTAD/browser-application/-/blob/master/cronjobs/mysql_backup_script.sh). You can set this script up to run at an interval by using the unix cronjob service.

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

## REST API With Node.js

In order for the system to work properly, there needs to be a flow of information from the user to the database, and from the database to the user. Essentially, the front-end application needs to request and send data to the database. These handoffs of data between the front-end and the database should never occur without an entity in the middle that protects the database from any form of malicious or unauthorized actions. When the front-end makes a request to the back-end for data, this request needs to be processed first. The type of technology required for this is an application programming interface (API). More specifically, a Representational State Transfer API, or, REST API. The front-end must send it's request to this REST API. The API then decides whether or not the request has the authorization to access the database, and it also inspects the request for malicious intent. If the request is valid and safe, the API executes the required commands in the database and returns the data to the front-end.

You can read more about REST API's [here](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/).

There are many different technologies that can be used to create a REST API for a database. Due to JavaScript and the Node Package Manager (npm) already being used within the project, the Node.js framework was chosen to run the REST API. With this decision, both the front-end and back-end frameworks will use JavaScript. 

The best way to quickly learn about creating a REST API with Node.js is to watch [this tutorial](https://www.youtube.com/watch?v=L72fhGm1tfE).

So far, there has been twenty-three API endpoints created. Twelve of them are used for managing users, accounts, authentication, sessions, and groups. Eleven of them are used to facilitate the real-time command functionality. Here is a list of the endpoints:

| Endpoint #    | Request Type  | Enpoint                                   |
| ------------- |:-------------:|:----------------------------------------- |
| 1)            | POST          | /api/itad/v1/create_new_user              |
| 2)            | POST          | /api/itad/v1/authenticate                 |
| 3)            | POST          | /api/itad/v1/session_token_to_jwt         |
| 4)            | POST          | /api/itad/v1/change_my_password           |
| 5)            | POST          | /api/itad/v1/update_user_information      |
| 6)            | POST          | /api/itad/v1/edit_my_profile              |
| 7)            | GET           | /api/itad/v1/get_my_profile_data          |
| 8)            | GET           | /api/itad/v1/get_user_data                |
| 9)            | GET           | /api/itad/v1/get_all_users_data           |
| 10)           | GET           | /api/itad/v1/get_admin_data               |
| 11)           | POST          | /api/itad/v1/update_absences              |
| 12)           | POST          | /api/itad/v1/upload_photo                 |
| 13)           | POST          | /api/itad/v1/send_command                 |
| 14)           | POST          | /api/itad/v1/update_command_status        |
| 15)           | POST          | /api/itad/v1/complete_command             |
| 16)           | GET           | /api/itad/v1/get_command_status           |
| 17)           | POST          | /api/itad/v1/update_robot_status          |
| 18)           | GET           | /api/itad/v1/get_robot_status             |
| 19)           | POST          | /api/itad/v1/update_robot_charge_level    |
| 20)           | GET           | /api/itad/v1/get_robot_charge_level       |
| 21)           | GET           | /api/itad/v1/get_available_commands       |
| 22)           | GET           | /api/itad/v1/get_all_robot_commands       |
| 23)           | GET           | /api/itad/v1/get_focused_robot_commands   |

The code for these endpoints is located at [api/routes/itad/itad.js](https://gitlab.com/iTAD/browser-application/-/blob/master/api/routes/itad/itad.js).

### API Comments

Almost all of the endpoints require a signed JSON Web Token (JWT) as a query parameter within the requests. A query parameter is sent through the URL: 

https://www.website.com/api/example_endpoint?exampleQueryParameterOne=parameter1&exampleQueryParameterTwo=parameter2

In this example, there are two query parameters: exampleQueryParameterOne which is equal to 'parameter1' and exampleQueryParameterTwo which is equal to 'parameter2'.

A signed JWT is an encryption key that contains their user credentials within the encryption which is why it has the word *signed* in it. It is used as a type of passport with the REST API. With their JWT, a user can access any data they are authorized to see. The JWT query parameter will look something like:

https://www.website.com/itad/api/v1/change_my_password?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RfdXNlcm5hbWUifQ.xi2EmVoAIHkbvRLFHACpZYdFC1amcpMaezxCvG5BYGg

The REST API will use this prameter to authenticate the request. A user can get their JWT by authenticating themselves at the /api/itad/v1/authenticate/ endpoint, which, upon successful authentication, returns their unique JWT.

A very useful tool to use when developing API's is the [Postman Software](https://www.postman.com/pricing/). It is free for indiviual development. There are tutorial videos on YouTube that demonstrate how to use it effectively.

## React Framework

The front-end of the application will be the part of the system that interacts with the user. When the user goes to the iTAD website with their internet browser, the front-end is served back to the user which displays as a web page in their browser. The front-end is the portion that controls the application appearance and has a role in the application behaviour. Therefore, it is essential to choose a front-end technology which makes it easy for the developer to create beautiful layouts and modern features.

To decide upon which technology to use for the front-end, research was done within the web development community online. It quickly became clear that the React framework was the most popular and potentially the industry leading front-end framework.  This made the decision easy to make. The technology that will run the front-end of the application will be [React](https://reactjs.org/).

Due to React's popularity, there are many third-party libraries that are easy to install. These third-party libraries allow developers to easily incorporate modern features into their front-end applications. The application is currently being hosted at [https://www.nautilusdevelopment.ca/itad](https://www.nautilusdevelopment.ca/itad) until a server is acquired for the project. The initial page that is served to the user has an animation that was created using a third-party library from react called Spring. At least thirteen other third-party libraries have been used so far in the creation of the product, which are listed [here](https://gitlab.com/iTAD/browser-application/-/blob/master/main\_site/package.json).

To learn about React and how to use it, it is recommended that you watch the following YouTube videos:

[React Website Tutorial - Beginner React JS Project Fully Responsive](https://www.youtube.com/watch?v=I2UBjN5ER4s&t=1149s)

[React Website using Styled Components and Smooth Scroll - Beginner Project Fully Responsive](https://www.youtube.com/watch?v=Nl54MJDR2p8)


# Learning About A Reverse Proxy

Docker is very scalable. If there is a spike in network traffic and the applications are having trouble handling the load, Docker can create additional identical containers to help distribute the load. To use this functionality from Docker, additional components are required. The current additional component I am using for the browser application is a reverse proxy Docker container. This container is in charge of receiving all requests that come to the server and then deciding where to send them based on pre-defined logic. Using this type of container to filter through all the incoming requests allows for load distribution when network traffic is high. For example, if the performance of our Node.js REST API container is starting to decline due to increased traffic, Docker can start up another identical Node.js REST API container and the reverse proxy container can start sending half of all API requests to each container, resulting in better performance and quicker response times. Combining this Docker configuration with the seemingly limitless cloud computing power that is available these days, high spikes in traffic can almost always be handled effectively.

To learn more about reverse proxies, visit [What Is A Reverse Proxy Server?](https://www.nginx.com/resources/glossary/reverse-proxy-server/).

In the current Docker configuration, an NGINX Docker container is being created and configured into a reverse proxy server. This proxy can also be configured to support SSL security. To do this, proper SSL certificates will need to be purchased and put into the *reverse_proxy/certs/* folder. Next, follow the instructions within the file located at [reverse_proxy/nginx.conf](https://gitlab.com/iTAD/browser-application/-/blob/master/reverse_proxy/nginx.conf)