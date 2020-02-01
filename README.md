# Node Typescript Express Boilerplate

A delightful way to building a Node.js RESTful API Services with beautiful code written in TypeScript.

## Installation

Install node v12.14.10 and above

```bash
npm install
npm run build

# Use to rebuild on change
npm run watch
```

## Usage

```bash
npm run local
npm run dev
npm run start
```

## Testing

```
# Run tests written in Typescript
npm run test

# Run tests on file change
npm run test:watch

# Fix lint auto
npm run lint:fix
```

## Lint

```
# Lint code with Eslint
npm run lint

# Run lint on any file change
npm run lint:watch
```

## Logging

Winston logging library is used for logging.

### API logging

Logs detailed info about each api request to console, log file and google metrics during development.

### Error logging

## Logs stack trace of the error to console along with other details. You should ideally store all error messages persistently.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
