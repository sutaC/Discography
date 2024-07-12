import type { PageServerLoad } from './$types';
import Database from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const id = Number.parseInt(event.params.id);

	const db = new Database();
	await db.connect();
	const author = await db.data.author.get(id);

	if (!author) {
		await db.disconnect();
		error(404, { message: 'Not found' });
	}

	const songs = await db.data.song.getAllByAuthor(id);
	await db.disconnect();

	return { author, songs, permissions: event.locals.user?.permissions };
};
