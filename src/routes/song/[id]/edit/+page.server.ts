import type { Author, Song } from '$lib/types';
import type { PageServerLoad } from './$types';
import Database from '$lib/server/database';
import { error, type Actions } from '@sveltejs/kit';
import { validateSongData } from '$lib/server/validation';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user?.permissions.updating) error(401, { message: 'Unauthorized' });

	const id = Number.parseInt(event.params.id);

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
		const song = {
			id: Number.parseInt(event.params.id as string),
			title: data.get('title')?.toString(),
			authorId: Number.parseInt(data.get('author')?.toString() ?? 'NaN'),
			chords: data.get('chords')?.toString(),
			lyrics: data.get('lyrics')?.toString()
		};

		const valRes = validateSongData(song);
		if (!valRes.success) error(400, { message: valRes.message as string });

		// TODO: Check author

		const db = new Database();
		await db.connect();
		await db.data.song.update(song as Song);
		await db.disconnect();
	}
} satisfies Actions;
