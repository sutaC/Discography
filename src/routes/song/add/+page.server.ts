import type { Author, Song, SongTag } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import Database from '$lib/server/database';
import { error, redirect } from '@sveltejs/kit';
import { validateSongData } from '$lib/server/validation';

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
		const song = {
			title: data.get('title')?.toString(),
			authorId: Number.parseInt(data.get('author')?.toString() ?? 'NaN'),
			chords: data.get('chords')?.toString(),
			lyrics: data.get('lyrics')?.toString()
		};

		const valRes = validateSongData(song);
		if (!valRes.success) error(400, { message: valRes.message as string });

		const db = new Database();
		await db.connect();

		const isAuthor = (await db.data.author.get(song.authorId)) !== null;
		if (!isAuthor) {
			await db.disconnect();
			error(400, 'Not valid author id');
		}

		await db.data.song.add(song as Song);
		const id = await db.data.song.findId(song.title as string);
		await db.disconnect();
		redirect(303, `/song/${id}`);
	}
} satisfies Actions;
