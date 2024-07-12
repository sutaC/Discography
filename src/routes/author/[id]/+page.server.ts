import type { Author, Song, SongTag } from '$lib/types';
import type { PageServerLoad } from './$types';
import Database from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad<{ author: Author; songs: SongTag[] }> = async ({ params }) => {
	const id = Number.parseInt(params.id);

	const db = new Database();
	await db.connect();
	const author = await db.data.author.get(id);

	if (!author) {
		await db.disconnect();
		error(404, { message: 'Not found' });
	}

	const songs = await db.data.song.getAllByAuthor(id);
	await db.disconnect();

	return { author, songs };
};
