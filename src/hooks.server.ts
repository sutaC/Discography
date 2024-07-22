import { parsePermissions, sessionCookie } from '$lib/server/authentication';
import Database from '$lib/server/database';
import type { User } from '$lib/types';
import type { Handle } from '@sveltejs/kit';

const authURLs: (string | RegExp)[] = [
	'/profile',
	'/user',
	'/profile/delete',
	'/logout',
	'/song/add',
	'/song/stars',
	'/author/add',
	/\/song\/\d*\/edit/, // '/song/[id]/edit'
	/\/author\/\d*\/edit/, // '/author/[id]/edit'
	/\/song\/\d*\/delete/, // '/song/[id]/delete'
	/\/author\/\d*\/delete/ // '/author/[id]/delete'
];

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');
	let user: User | null = null;

	if (session) {
		const db = new Database();
		await db.connect();
		user = await db.data.user.getBySession(session);
		await db.disconnect();
		if (!user) {
			event.cookies.delete(sessionCookie.name, sessionCookie.config);
		}
	}

	const isAuthURL = authURLs.find((url) => event.url.pathname.match(url));
	if (isAuthURL && !user) return new Response(null, { status: 401, statusText: 'Unauthorized' });

	if (user)
		event.locals.user = {
			login: user.login,
			permissions: parsePermissions(user.permissions),
			session: user.session
		};

	return await resolve(event);
};
