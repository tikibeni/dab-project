# Designing and Building Scalable Web Applications / Course Project I

## Documentation

A basic get started guide can be found below and [here](./doc/RUNNING.md).

The required k6 test results can be inspected [here](./doc/PERFORMANCE_TEST_RESULTS.md).

## Install:

```sh
~/python-gym$ cd frontend
~/python-gym/frontend$ npm install
~/python-gym/frontend$ cd ..
~/python-gym$ cd grader-image
~/python-gym/grader-image$ bash build.sh
```

## Define env values

E.g. by using `export` command in the terminal or by creating a `project.env` in the project root.

The following values need to be defined:

```sh
# Database configuration for PostgreSQL (running in container called "database-server-dab-p1-8c8e4482-eac9-449f-830f-7f9a97bb7a53")
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB

# Database configuration for Flyway (used for database migrations)
FLYWAY_USER
FLYWAY_PASSWORD
FLYWAY_URL=jdbc:postgresql://database-server-dab-p1-8c8e4482-eac9-449f-830f-7f9a97bb7a53:5432/database

# Database configuration for PostgreSQL driver
PGUSER
PGPASSWORD
PGHOST=database-server-dab-p1-8c8e4482-eac9-449f-830f-7f9a97bb7a53
PGPORT=5432
PGDATABASE=database

# Deno cache location (avoid reloading depedencies over and over)
DENO_DIR
```

## Run:

### Development build

```sh
~/python-gym$ docker compose up
```

You may need to use `docker-compose` instead of `docker compose` depending on your Docker compose version.

You can run the container on the background using `-d` -switch.

### Production build

You can access the optimized production build by using the `docker-compose.prod.yml` as follows:

```sh
~/python-gym$ docker compose -f docker-compose.prod.yml up
```

## Access:

http://localhost:7800/

## Closing and cleaning

You can close the created containers with

```sh
~/python-gym$ docker compose down
```

After this you can prune the containers.
