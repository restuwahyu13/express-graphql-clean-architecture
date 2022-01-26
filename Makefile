#================================
#== DOCKER ENVIRONMENT
#================================
COMPOSE := docker-compose

dcb:
	${COMPOSE} build

dcbuf:
ifdef f
	${COMPOSE} up -d --build --${f}
endif

dcuf:
ifdef f
	${COMPOSE} up -d --${f}
endif

dcu:
	${COMPOSE} up -d --build

dcd:
	${COMPOSE} down

kdmig:
ifdef type
	${COMPOSE} exec app npm run ${type}
endif

kdrun:
	${COMPOSE} exec app npm run krun

#############################
# Application Teritory
#############################

NPM := npm

dev:
	${NPM} run dev
prod:
	${NPM} start
build:
	${NPM} run build
test:
	${NPM} test

install: npm.o build.o

npm.o:
	${NPM} ci

build.o:
	${NPM} run build

#############################
# Knex Database Teritory
#############################

NPX := npx
KNEX := knex

kmakem:
ifdef name
	${NPX} ${KNEX} --cwd src --knexfile knexfile migrate:make ${name}
endif

kmakes:
ifdef name
	${NPX} ${KNEX} --cwd src --knexfile knexfile seed:make ${name}
endif

kmig:
ifdef type
	${NPX} ${KNEX} --cwd src --knexfile knexfile migrate:${type}
endif

krun:
	${NPX} ${KNEX} --cwd src --knexfile knexfile seed:run

klist:
	${NPX} ${KNEX} --cwd src --knexfile knexfile migrate:list