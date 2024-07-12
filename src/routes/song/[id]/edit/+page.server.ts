import type { Author, Song } from '$lib/types';
import type { PageServerLoad } from './$types';
import Database from '$lib/server/database';
import { error, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad<{ song: Song; authors: Author[] }> = async ({ params }) => {
	const id = Number.parseInt(params.id);

	const db = new Database();
	await db.connect();
	const song = await db.data.song.get(id);

	if (!song) {
		await db.disconnect();
		error(404, { message: 'Not found' });
	}

	const authors = await db.data.author.getAll();
	await db.disconnect();

	return { song, authors };
};

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const song: Song = {
			id: Number.parseInt(event.params.id as string),
			title: (data.get('title') as string).trim(),
			author: '',
			authorId: Number.parseInt(data.get('author') as string),
			chords: data.get('chords') as string,
			lyrics: data.get('lyrics') as string
		};

		const db = new Database();
		await db.connect();
		await db.data.song.update(song);
		await db.disconnect();
	}
} satisfies Actions;
