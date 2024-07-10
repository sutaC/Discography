import type { Author, Song } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { addSong, getAllAuthors } from '$lib/server/database';

export const load: PageServerLoad<{ authors: Author[] }> = async () => {
	const authors = (await getAllAuthors()) ?? [];
	return { authors };
};

export const actions: Actions = {
	default: async (event) => {
		console.log('got req');

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
		// Adds song
		await addSong(song);
		console.log('added song');
	}
} satisfies Actions;
