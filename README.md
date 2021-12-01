

# Advent of Code 2021

TypeScript / nx / node / jest

## Solutions

Solutions to each day completed can be found in the [`solutions`](https://github.com/jacksonhardaker/adventofcode-2021/tree/solutions) branch

## Setup

This repo uses `nx` as a build framework to easily spin up a project for each day
using shared libs where it makes sense. 

```
yarn add --global nx
yarn
```

## Generating a new "day"

A workspace generator has been included to easily generate the boilerplate and linting/testing frameworks. For example, to generate an application for "day 1" with a starter function of "merryXmas":

```
nx workspace-generator day-generator day-1 merryXmas
```

This will result in a directory structure

```
apps/
└── day-1/
    ├── src/
    │   ├── assets/
    │   │   └── input.txt
    │   ├── main.ts
    │   ├── merryXmas.spec.ts
    │   └── merryXmas.ts
    ├── .eslintrc.json
    ├── jest.config.js
    ├── project.json
    ├── tsconfig.app.json
    ├── tsconfig.json
    └── tsconfig.spec.json
```

Where the `main.ts`, `merryXmas.spec.ts` and `merryXmas.ts` files contain boilerplate wiring things together.

Alternatively you can run the generator with prompts:

```
nx workspace-generator day-generator

// or

yarn generate
```

## Running the Code

Yeah day will live as a distinct app in `./apps`. Each of these can be run individually using the `nx serve` command:

```
nx serve day-1
```

## Running the Tests

Similar to serving each day, you can also run any tests which exist:

```
nx test day-1
```

To run tests for _all_ days, use:

```
nx run-many --target=test --all
```

Finally to easily run the tests on _only_ the code which has been affected:

```
nx affected --target=test
```
