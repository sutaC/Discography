import Database from '$lib/server/database';
import type { User } from '$lib/types';
import type { Handle } from '@sveltejs/kit';

const authURLs: string[] = ['/user'];

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');
	let user: User | null = null;

	if (session) {
		const db = new Database();
		await db.connect();
		user = await db.data.user.getBySession(session);
		await db.disconnect();
	}

	const isAuthURL = authURLs.find((url) => event.url.pathname.includes(url));
	if (isAuthURL && !user) return new Response(null, { status: 401, statusText: 'Unauthorized' });

	if (user)
		event.locals.user = {
			login: user.login,
			permissons: user.permissons,
			session: user.session
		};

	return await resolve(event);
};
