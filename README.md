# WK_WKSEATEC
Technical Development to Support Fisheries Data Collection
This group make recommendations on technical solutions for the collection and quality assurance of fisheries data at sea and in ports. This will be done through the following steps:


	- Review and support progress on electronic measuring board projects underway and presented at WKSEATEC 2017;
	- Review additional electronic data capture technologies such as electronic callipers, scanners beyond scope of WKSEATEC 2017;
	- Address the key recommendation from WKSEATEC 2017 by agreeing on a roadmap to defining a common Fisheries Data Language (FDL) and the 		development of an Application Program Interface (API). 
	
# Gallery App

This is the resulting repository of the 2019 Marine Institute Bursary, "Improving Data Quality in Fisheries Surveys". It's important to note that this README, serves as high-level documentation for the different components of this project and how they interact, not an in depth description of every file and function. The code has been fully commented in such a way that by using both this document and the included comments it should be relatively straight forward to understand what each piece of code is attempting to achieve. I made this decision due to the fact that this app is a prototype and means to serve as a guide for any future development that may or may not make use of the same technologies and/or frameworks that were used in it's initial development, it is also assumed that you have a general idea of the technologies that are being discussed such as Docker, Node.js & Angular, any introductory article about these technologies is more than sufficient to understand what is being discussed. For a full explanation of the project and it's Goals please read this blog post [here](https://fishinformatics.home.blog/2019/07/25/improving-data-quality-in-fisheries-surveys/ "Blog Post").




## General Overview

There are three main components to this application, the back-end developed with Node.js & Express.js, the front-end developed with Angular and finally the containerization tool Docker which was used to deploy both the core apps and the Quality Assurance/Quality Control tools which the app is based around. The following summarizes the interaction between these three components.

- The Angular app provides the front-end views and logic, it requests data from the back-end such as widgets(aka our QC/QA tools), a users saved widgets or when requesting the port that a widgets Docker container is running on so that it may display it in the dashboard. It also sends the back-end post requests when a user is adding a new widget to the app.
- The Node.js back-end handles all these requests from the Angular app and provides/receives the data correctly whether running on the server or offline on a local machine, it achieves this via config files mounted with Docker Compose and an abstraction between the relevant data access methods(SQL server whilst running on the server and reading JSON files while running locally) so that the correct data access method is used no matter the runtime environment. The back-end is also responsible for interacting with the Docker daemon via the local Docker REST API, a Node.js package called Dockerode was used to handle the requests to inspect, start, stop, create and pull containers but other frameworks are available for different languages and/or libraries, it is also possible to directly use HTTP requests.
- Docker is used both to enable our widgets to be run seamlessly both online and offline but also to ensure our core back-end and front-end apps can be run offline with minimal setup required by the user. Docker Compose is also used to start up the apps both offline and online to make everything as seamless as possible. Docker Hub is used to distribute the core apps and widgets to the user, it is currently a requirement that all uploaded widgets are hosted on Docker Hub. 

## Starting the app

### Online

All files and data needed to start up the server are contained in the server-startup folder located in the root of the repo, the app currently makes use of a Microsoft SQL Server for it's database, before running the app on a server you must edit the docker-compose.yml file, under the environment tag, add your SQL connection string to the SQLURI variable in the following format:

```
environment:
      HOST: 10.11.1.70
      DIR: "${PWD:?err}"
      SQLURI: "mssql://USERNAME:PASSWORD@SERVER_NAME/DATABASE_NAME"
```

Starting the server is then simply a matter of opening a terminal/command line window at this directory and running the command:

```dockerfile
docker-compose pull && docker-compose up
```

This will obtain the latest versions of the Angular and Node docker images and start them up with the correct data mounts and port bindings, the frontend will then be available on port 4200.

### Offline

The offline files are obtained by pressing the download button in the top right of the dashboard, this button triggers a post request to the back-end, sending the JSON objects of every widget currently being used in the dashboard. The back-end parses this data and zips it up with the necessary files to run everything offline and makes it available as a download. All that needs to be done to run the app offline now is to double-click the 'start_gallery.bat' file and the app will start up, of course this requires that Docker for Windows is installed. Please note that you must have the following Docker settings on your machine:


