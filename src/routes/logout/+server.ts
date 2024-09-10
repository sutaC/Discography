import { sessionCookie } from '$lib/server/authentication';
import Database from '$lib/server/database';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';

// TODO: Fix - not logging out
export const GET: RequestHandler = async (event) => {
	console.log(event);

	const { user } = event.locals;
	if (!user) error(401, { message: 'Unauthorized' });

	const db = new Database();
	await db.connect();
	await db.data.user.updateSession(user.login, null);
	await db.disconnect();

	event.cookies.delete('session', sessionCookie.config);

	redirect(307, '/');
};
