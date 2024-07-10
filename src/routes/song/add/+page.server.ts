import type { Song } from '$lib/types';
import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { addAuthor, addSong, findAuthor, getSong } from '$lib/server/database';

function generateId(name: string): string {
	return name.toLowerCase().replaceAll(/\s/gm, '-');
}

export const actions: Actions = {
	default: async (event) => {
		console.log('got req');

		const data = await event.request.formData();
		const song: Song = {
			id: 0, // A_I
			title: (data.get('title') as string).trim(),
			author: (data.get('author') as string).trim(),
			authorId: 0, // TODO:
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
