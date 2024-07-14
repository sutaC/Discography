import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import Database from '$lib/server/database';
import { generateSalt, hash, sessionCookie } from '$lib/server/authentication';
import type { User } from '$lib/types';

export const load: PageServerLoad = async (event) => {
	if (!!event.locals.user) redirect(301, '/profile');
};

export const actions: Actions = {
	login: async (event) => {
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

		event.cookies.set(sessionCookie.name, session, sessionCookie.config);

		redirect(301, '/profile');
	},
	register: async (event) => {
		const data = await event.request.formData();
		const userData = {
			login: data.get('login') as string | null,
			password: data.get('password') as string | null,
			repeatPassword: data.get('repeatPassword') as string | null
		};

		if (!userData.login || !userData.password || !userData.repeatPassword)
			error(400, { message: 'Missing data' });

		// TODO: validate input
		if (userData.password !== userData.repeatPassword)
			error(400, { message: 'Password is not the same as repeat password' });
		// ---

		const db = new Database();
		await db.connect();
		const hasUser = (await db.data.user.get(userData.login)) !== null;

		if (hasUser) {
			await db.disconnect();
			error(400, { message: 'Login is already taken' });
		}

		const salt = generateSalt();
		const user: User = {
			login: userData.login,
			salt,
			password: await hash(userData.password + salt),
			permissions: '',
			session: crypto.randomUUID()
		};

		await db.data.user.add(user);
		await db.disconnect();

		event.cookies.set(sessionCookie.name, user.session as string, sessionCookie.config);

		redirect(301, '/profile');
	}
};
