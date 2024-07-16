import type { Author, Song, SongTag } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import Database from '$lib/server/database';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const db = new Database();
	await db.connect();
	const authors = await db.data.author.getAll();
	await db.disconnect();

	return { authors };
};

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.user?.permissions.adding) error(401, { message: 'Unauthorized' });

		const data = await event.request.formData();
		const song: Song = {
			id: 0, // A_I
			title: (data.get('title') as string).trim(),
			author: '',
			authorId: Number.parseInt(data.get('author') as string),
			chords: data.get('chords') as string,
			lyrics: data.get('lyrics') as string
		};

		// TODO Input validation

		const db = new Database();
		await db.connect();
		await db.data.song.add(song);
		const id = await db.data.song.findId(song.title);
		await db.disconnect();
		redirect(303, `/song/${id}`);
	}
} satisfies Actions;
