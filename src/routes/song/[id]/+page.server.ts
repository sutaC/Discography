import type { PageServerLoad } from './$types';
import Database from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const id = Number.parseInt(event.params.id);

	const db = new Database();
	await db.connect();
	const song = await db.data.song.get(id);
	await db.disconnect();

	if (!song) error(404, { message: 'Not found' });

	return { song, permissions: event.locals.user?.permissions };
};
