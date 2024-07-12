import Database from '$lib/server/database';
import type { SongTag } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<{ songs: SongTag[] }> = async () => {
	const db = new Database();
	await db.connect();
	const songs = await db.data.song.getAll();
	const authors = await db.data.author.getAll();
	await db.disconnect();
	return { songs, authors };
};
