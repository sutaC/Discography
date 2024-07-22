import { parsePermissions } from '$lib/server/authentication';
import Database from '$lib/server/database';
import type { PermissionsObject } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

const getHeaders = { 'Content-Type': 'text/json' };

export const GET: RequestHandler = async (event) => {
	if (!event.locals.user?.permissions.granting)
		return new Response(null, { status: 401, statusText: 'Unauthorized' });
	if (!event.params.slug) return new Response(null, { status: 400, statusText: 'Data missing' });
	const slug = event.params.slug;

	const db = new Database();
	await db.connect();
	const users = await db.data.user.search(slug);
	await db.disconnect();

	const userObjects: { login: string; permissions: PermissionsObject }[] = users.map((usr) => ({
		login: usr.login,
		permissions: parsePermissions(usr.permissions)
	}));

	const body = JSON.stringify(userObjects);

	return new Response(body, { headers: getHeaders });
};
