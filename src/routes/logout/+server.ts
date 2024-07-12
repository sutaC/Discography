import Database from '$lib/server/database';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	const { user } = event.locals;
	if (!user) return new Response(null, { status: 401, statusText: 'Unauthorized' });

	const db = new Database();
	await db.connect();
	await db.data.user.updateSession(user.login, null);
	await db.disconnect();

	event.cookies.delete('session', { path: '/' });

	return new Response(null, {
		status: 301,
		statusText: 'Logged out',
		headers: {
			location: '/'
		}
	});
};
