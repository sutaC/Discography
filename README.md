# Discography

Web app for songs lirycs and chords

> Author: [sutaC](https://github.com/sutaC)

## Developing

Once you've got this project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying

To deploy build version of application:

```bash
npm run start
```

Then app will run using adapter-node

## Enviroment file template

Local deploy `.env` file template

```.env
DBHOST=localhost
DBUSER=server
DBPASSWORD=password
DBNAME=discography
PORT=3000
```
