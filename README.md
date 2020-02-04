# sec1_Numja_Back-End-

This project is backend project for Software Engineering course (2019/2). Here are guidelines we would like you to follow:
- [Member](#members)
- [Contributing](#contributing)
- [Getting Started](#getting-start)
- [Adding dependencies](#adding-dependencies)
- [Running tests](#running-tests)
- [Formatting Code](#formatting-code)
- [Documentation](#documentation)

## Members
 
- ธนดล รุ่งจิตวรานนท์ 6031018121 
- นนท์ธนัต ธีรธนาพัทธ์กุล 6031019821
- ธนวิชญ์ กฤตวงศ์วิมาน 6031021021 
- ชวิน ช่วงชัยชัชวาล 6030124821
- ณัชพล ศรีสังข์ 6031308121
- ภูชิต ชฎาศิลป์ 6031317821

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

See also the list of [contributors](https://github.com/2110423-2019-2/sec1_Numja-Back-End-/graphs/contributors) who participated in this project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need the following softwares to run this project:
* [Node.js](https://nodejs.org/en/) - Running javascript locally
* [`yarn`](https://yarnpkg.com/en/) - Node.js package manager
* [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
* [Docker](https://www.docker.com/) - Container platform
* [`docker-compose`](https://docs.docker.com/compose/) - A tool for defining and running multi-container Docker applications

### Installing

A step by step series of examples that tell you how to get a development env running

1. Fork this repository

2. Clone forked repository to your machine

```
git clone https://github.com/<your-github-user>/sec1_Numja-Back-End-.git
```

3. Install dependencies

```
yarn
```

4. Create file named `.env`, then copy `example.env` and fill the details

5. Run the project using docker

```
docker-compose up
```
or run in background
```
docker-compose up -d
```

## Adding dependencies

To add dependencies, run the following command:
```
yarn add <package-name>
```
Some dependencies should be added in devDependencies. To do that, run the following command:
```
yarn add -D <package-name>
```

## Running tests

To run tests only once, run:
```
yarn test
```
To run tests automatically while editing codes, run:
```
yarn test:watch
```

## Formatting code

To format codes, run:
```
yarn format
```

## Documentation

To open API docs after start server, visit `localhost:3000/api`.