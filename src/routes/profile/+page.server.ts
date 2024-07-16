import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Database from '$lib/server/database';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) error(401, { message: 'Unauthorized' });
	const { login } = event.locals.user;

	const db = new Database();
	await db.connect();
	const songs = await db.data.song.getAllStaredByUser(login);
	await db.disconnect();
	return { login, songs };
};
