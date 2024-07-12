import Database from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const db = new Database();
	await db.connect();
	const songs = await db.data.song.getAll();
	const authors = await db.data.author.getAll();
	await db.disconnect();

	return { songs, authors, permissions: event.locals.user?.permissions };
};
