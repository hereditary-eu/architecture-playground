# HEREDITARY-architecture-playground

This repository includes the code to test and experiment with the architecture for the Federated Data Analytics Infrastructure described by the schema here: <https://hereditary.dei.unipd.it/wiki/doku.php?id=groups:semanticmodelling>.

Inside the repository:
- Some mock data in CSV format, representing users and cities
- A sample Postgres database that represents some users renting DVDs
- A `docker-compose.yml` file and some scripts to allow the system to run
- A `playground.ipynb` notebook, with experiments and api showcase. This should allow you to perform many tasks (included the setup list here and generating huge CSVs) automatically.


## Getting started
- make sure to install docker. In my setup, I used docker desktop on top of Windows (WSL2)
- clone this repository (`git clone`)
- start a terminal in this folder and run `docker compose up` in order to start everything
- extract the driver from running dremio, so graphdb may use it later:
```bash
docker compose exec -u root dremio /bin/bash -c 'cp /opt/dremio/jars/jdbc-driver/*.jar /jdbc/driver.jar'
```

Now you have to manually link the sources together.


##### linking csv and postgres to dremio
Open the dremio admin panel at <http://localhost:9047/> and create a new user (example: dremioUser with password: dremioPass)

Now you can go on the bottom left "+ Add Source" and press it to add new sources.

**Postgres:** setup a new postgres source with
```
Name = mockdb
Host = db
Database Name = example
Username = user
Password = pass
```

Database Name, Username and Password are taken from the docker-compose.yml vars. The host is a virtual DNS automatically created by docker with the name. "mockdb" will become the name of the schema for further uses.

**CSV:** start by setting up a new NAS source
```
Name = mockcsv
Mount Path = /csv
```

Now you will be able to click on every csv file and import it.
Keep in mind that for each file you have to use the right import settings. Make sure to check the "Extract Column Names" checkbox and to use the right column delimiter (sometimes is , where as sometimes is ;)


##### linking dremio to graphdb
Open the dremio admin panel at <http://localhost:7200/>.

Go to Import > "+ create new repository" > Ontop Virtual SPARQL
```
Repository ID = testrepo
Database driver = Dremio
Port =      #leave it blank
Host name* = dremio
Schema* = *
Username = dremioUser  #same you used in your Dremio sign up
Password = dremioPass  #same you used in your Dremio sign up


OBDA or R2RML file *: here you have to upload the mapping file located in this repo as ./mockdata/R2RMLMapping.ttl
```

Done! Now you should be ready to issue SPARQL queries.


## Resources/references

### W3C R2RMLMapping Cheatsheet
<https://www.w3.org/TR/r2rml/>


### Mock data overview
<https://www.postgresqltutorial.com/postgresql-getting-started/postgresql-sample-database/>

<https://www.postgresqltutorial.com/wp-content/uploads/2018/03/printable-postgresql-sample-database-diagram.pdf>



## Author and License
Luca Fabbian <luca.fabbian.1999@gmail.com>

Part of the HEREDITARY project



