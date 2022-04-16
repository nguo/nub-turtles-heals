## Resource Site for Nub Turtle Healers

React app housing information for our favorite turtles.

### Healing Assignment Terminology

- Group: A particular healer group / healer configuration. For example, the "6heal" group describes a group of our common 6 healers.

- Encounter: An encounter is a boss fight or other fight (eg. trash) that requires a specific set of healing assignments.

  - Role: The role of a healer within an encounter. This includes their tasks, eg. what they're assigned to do each phase.
    - Task - The task a healer needs to do at a more granular level of an encounter, eg. each phase.

### Running locally in development mode

To get started, just clone the repository and run `npm install && npm run dev`:

    git clone https://github.com/iaincollins/nextjs-starter.git
    npm install
    npm run dev

Note: If you are running on Windows run install --noptional flag (i.e. `npm install --no-optional`) which will skip installing fsevents.

### Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `npm run build` and run it with `npm start`:

    npm install
    npm run build
    npm start

You should run `npm run build` again any time you make changes to the site.

Note: If you are already running a webserver on port 80 (e.g. Macs usually have the Apache webserver running on port 80) you can still start the example in production mode by passing a different port as an Environment Variable when starting (e.g. `PORT=3000 npm start`).
