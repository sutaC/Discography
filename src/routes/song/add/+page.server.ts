import type { Author, Song, SongTag } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { addSong, findSong, getAllAuthors, getSong } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad<{ authors: Author[] }> = async () => {
	const authors = (await getAllAuthors()) ?? [];
	return { authors };
};

export const actions: Actions = {
	default: async (event) => {
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
		// TODO: Author validation
		await addSong(song);
		const { id } = (await findSong(song.title)) as SongTag;
		redirect(303, `/song/${id}`);
	}
} satisfies Actions;
