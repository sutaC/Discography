import type { Author, Song } from '$lib/types';
import type { PageServerLoad } from './$types';
import { getAllAuthors, getSong, updateSong } from '$lib/server/database';
import { error, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad<{ song: Song; authors: Author[] }> = async ({ params }) => {
	const song = await getSong(Number.parseInt(params.id));
	if (!song) error(404, { message: 'Not found' });
	const authors = (await getAllAuthors()) ?? [];
	return { song, authors };
};

export const actions: Actions = {
	default: async (event) => {
		console.log('got req');
		const data = await event.request.formData();
		const song: Song = {
			id: Number.parseInt(event.params.id as string),
			title: (data.get('title') as string).trim(),
			author: '',
			authorId: Number.parseInt(data.get('author') as string),
			chords: data.get('chords') as string,
			lyrics: data.get('lyrics') as string
		};
		await updateSong(song);
		console.log('Updated song');
	}
} satisfies Actions;
