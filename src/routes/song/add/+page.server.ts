import type { Song } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const song: Song = {
			id: '',
			title: data.get('title') as string,
			author: data.get('author') as string,
			chords: data.get('chords') as string,
			lyrics: data.get('lyrics') as string
		};
		// TODO Validation
		// New id
		song.id = song.title.toLowerCase().replaceAll(/\s/gm, '-');
		// TODO: Add song to db
		console.log(song);
	}
} satisfies Actions;
