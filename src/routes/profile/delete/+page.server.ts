import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { hash, sessionCookie } from '$lib/server/authentication';
import Database from '$lib/server/database';

export const actions: Actions = {
	default: async (event) => {
		const login = event.locals.user?.login;
		if (!login) error(401, { message: 'Unauthorized' });

		const data = await event.request.formData();
		const password = data.get('password')?.toString();
		if (!password) error(400, { message: 'Missing data' });

		const db = new Database();
		await db.connect();
		const user = await db.data.user.get(login);

		if (!user) {
			await db.disconnect();
			error(400, 'Could not find user');
		}

		const hPassword = await hash(password + user.salt);
		if (hPassword !== user.password) {
			await db.disconnect();
			error(400, 'Incorrect password');
		}

		await db.data.user.delete(login);
		await db.disconnect();

		event.cookies.delete(sessionCookie.name, sessionCookie.config);

		redirect(301, '/');
	}
};
