# Discography

Web app for songs lirycs and chords

> Author: [sutaC](https://github.com/sutaC)

## Technologies

- SvelteKit
- Typescript
- Docker
- Mysql

## Developing

To create developing version:

```bash
docker compose up
```

Connect with `127.0.0.1:5173`

> Default admin credentials are:\
> Login: `kot`\
> Password: `kotkotkot`

## Building

To create a production version:

> Checkout [docker-compose.yml](./docker-compose.yml) and switch required options commented by `dev` to `prod`

```bash
docker compose up
```

Connect with `127.0.0.1:3000`
