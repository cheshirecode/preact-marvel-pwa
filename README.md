# Docker-preact-pwa



Experimenting with:

* [Preact CLI](https://github.com/developit/preact-cli)
* [preact-material-components](https://github.com/prateekbh/preact-material-components)
* [Parse Server](https://www.back4app.com/)
* [Marvel Developer Portal](https://developer.marvel.com/)

[Demo link](https://docker-preact-marvellous.surge.sh)


## Commands

### With Node >= 7.0.x

```bash
# Installation
yarn

# Dev mode HMR
yarn start

# Production build
yarn build

# Local production test
NODE_ENV=production yarn start
```

### With Docker > 17.06.x-ce and Docker Compose >= 1.17.0

For Windows/OSX, refer to [here](https://github.com/EugenMayer/docker-sync/wiki/1.-Installation) to
work around HMR and similar file-watching modes that rely on native Linux's inotify events, which
break in Docker's volume syncing.

**Note** Development script does a few things:

* Starts sync operation if applicable
* Attaches CLI to the running setup to view the logs.
* When user presses Ctrl-C to stop the operation, it continues on to clean up the sync operation.

```bash
# Initial setup for linting/formatting
cp package.json package.json.tmp && \
cp package.json.editor package.json && \
yarn --pure-lockfile && \
mv package.json.tmp package.json

# Development mode
DOCKER_COMPOSE_CMD="docker-compose -f docker-compose.yml -f docker-compose.dev.yml" && \
command -v docker-sync >/dev/null 2>&1 && docker-sync clean; docker rm docker-preact-pwa-dev; docker volume rm preact-pwa-sync; docker-sync start; \
$DOCKER_COMPOSE_CMD up --build && \
command -v docker-sync >/dev/null 2>&1 && docker-sync clean; docker rm docker-preact-pwa-dev; docker volume rm preact-pwa-sync && \
unset DOCKER_COMPOSE_CMD

# Build production image
DOCKER_COMPOSE_CMD="docker-compose -f docker-compose.yml" && \
$DOCKER_COMPOSE_CMD build --force-rm && \
# $DOCKER_COMPOSE_CMD push && \
unset DOCKER_COMPOSE_CMD

# Production deployment
DOCKER_COMPOSE_CMD="docker-compose -f docker-compose.yml" && \
$DOCKER_COMPOSE_CMD pull && \
$DOCKER_COMPOSE_CMD up -d && \
unset DOCKER_COMPOSE_CMD
```

## Notes

* [Preact CLI](https://github.com/developit/preact-cli/blob/master/README.md).
* [Docker commands](https://docs.docker.com/engine/reference/commandline/docker/)
* [Docker Compose commands](https://docs.docker.com/compose/reference/)
* [Docker volume sync for non-Linux machines](http://docker-sync.io/)

## Known issues

* Local production with SSL is unreliable on WSL as Preact-CLI relies on https://github.com/davewasmer/devcert#how-it-works to set up self-signed cert. Alternative is to use _letsencrypt_ as external setup script before running `yarn serve`
*
