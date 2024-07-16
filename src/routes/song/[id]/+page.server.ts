import type { PageServerLoad } from './$types';
import Database from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const id = Number.parseInt(event.params.id);

	const db = new Database();
	await db.connect();
	const song = await db.data.song.get(id);

	if (!song) {
		await db.disconnect();
		error(404, { message: 'Not found' });
	}

	const stars = (await db.data.stars.countSongs(song.id)) ?? 0;

	let isStared = false;
	if (event.locals.user) {
		isStared = (await db.data.stars.get(event.locals.user.login, id)) !== null;
	}

	await db.disconnect();

	return { song, stars, isStared, permissions: event.locals.user?.permissions };
};
