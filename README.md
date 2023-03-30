# Dans (Goaded) Car Barn - CS3450

This project aims to build an online car rental service, including functionality for customers and employees alike.

The website will include authentication capabilities for its users, including a built-in system that allows users to keep track of their money.

Different kinds of cars can be reserved by users for different periods of time, provided that they have the money to continue renting the car.

There is an option for customers to purchase insurance for their rentals.

## Organization

This repository houses the high-level documentation for the project, the source code for the frontend web app, and the source code for the REST API in the following directory structure:

- `docs/` - Contains the high-level documentation guiding the development of the project
  - `docs/Data Models.png` - Contains UML class diagrams.
  - `docs/activitydiagram.png` - Activity diagram.
  - `docs/Project Plan.pdf` - Project plan.
  - `Requirements Definition.pdf` - Requirements definition.
  - `docs/ScrumBacklog.png` - A hierarchical Scrum backlog. Each task contains nested task, adding up to over 10 total tasks.
- `prototypes/` - The high/low-fidelity prototypes.
  - `prototypes/highlevel` - The high-fidelity prototypes.
  - `prototypes/lowlevel` - The low-fidelity prototypes.
- `frontend/` - The client-side web application for Dan's Car Barn. Instructions on how to run/build/test it are located in `frontend/README.md`.
- `backend/` - The REST API for Dan's Car Barn. Instructions on how to run/build/test it are located in `backend/README.md`.

## Git Flow

The `master` and `develop` branches contain code for the production and pre-production environments respectively. Both branches are protected, so contributions can only be made via a code-reviewed pull request.

The `master` branch should always contain code that is deployable. The `develop` branch should always be stable, but does not necessarily need to contain all features necessary for deployment.

The `develop` branch will be merged into the `master` branch at the completion of each sprint.

### Making a contribution

When working on a feature, create a new branch off of `develop` by running

```
git checkout develop					# switch to 'develop' branch
git checkout -b {USERNAME}/{FEATURE}	# create and switch to a feature branch
```

For example, if John P. Trystate was going to implement the Transport-inator, he would create the feature branch `jtrystate/transport-inator`.

After implementing the feature, prepare for code review by running `yarn run lint` in both `frontend/` and `backend/` to eliminate any last-minute bugs and adhere to the style guide.

When finished, open a pull request from the feature branch into the `develop` branch. The PR will get merged once it is reviewed by another team member.

## Toolstack

The project uses JavaScript on both the frontend and the backend. The frontend is a standalone [Vue 3](https://vuejs.org/guide/introduction.html) project and the backend is an [Express.js](https://expressjs.com/) REST API.

The project also uses a PostgreSQL database for persistent storage in production and a SQLite database in development. Database operations will be performed by the backend using the [Sequelize ORM](https://sequelize.org/).

## Building and Testing

The frontend and backend are built/tested independently from each other. For further instructions, seek the `frontend/README.md` regarding the frontend, and `backend/README.md` regarding the backend.

## Sprint Reports Path

`DansCarBarn/docs/planning/`
