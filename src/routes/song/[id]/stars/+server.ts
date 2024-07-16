import Database from '$lib/server/database';
import type { RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async (event) => {
	if (!event.locals.user) return new Response(null, { status: 401, statusText: 'Unauthorized' });
	if (!event.params.id) return new Response(null, { status: 400, statusText: 'Missing data' });
	const id = Number.parseInt(event.params.id);
	const { login } = event.locals.user;

	const db = new Database();
	await db.connect();
	await db.data.stars.add(login, id);
	await db.disconnect();

	return new Response();
};

export const DELETE: RequestHandler = async (event) => {
	if (!event.locals.user) return new Response(null, { status: 401, statusText: 'Unauthorized' });
	if (!event.params.id) return new Response(null, { status: 400, statusText: 'Missing data' });
	const id = Number.parseInt(event.params.id);
	const { login } = event.locals.user;

	const db = new Database();
	await db.connect();
	await db.data.stars.delete(login, id);
	await db.disconnect();

	return new Response();
};
