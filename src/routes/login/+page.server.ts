import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import Database from '$lib/server/database';
import { hash } from '$lib/server/cryptography';

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const userData = {
			login: data.get('login') as string | null,
			password: data.get('password') as string | null
		};

		if (!userData.login || !userData.password) error(400, { message: 'Missing data' });

		// TODO: input validation

		const db = new Database();
		await db.connect();
		const user = await db.data.user.get(userData.login);

		if (!user) {
			await db.disconnect();
			error(400, { message: 'Wrong credential' });
		}

		const hPassword = await hash(userData.password + user.salt);

		if (hPassword !== user.password) {
			await db.disconnect();
			error(400, { message: 'Wrong credential' });
		}

		const session = crypto.randomUUID();

		await db.data.user.updateSession(user.login, session);
		await db.disconnect();

		event.cookies.set('session', session, {
			path: '/',
			sameSite: 'strict',
			maxAge: 604800, // 1 week
			secure: true,
			httpOnly: true
		});

		redirect(301, '/user');
	}
};
