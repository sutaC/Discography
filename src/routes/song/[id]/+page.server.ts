import type { Song } from '$lib/types';
import type { PageServerLoad } from './$types';
import { getSong } from '$lib/server/database';

export const load: PageServerLoad<Song> = async ({ params }) => {
	const song = await getSong(params.id);

	console.log(song);

	return {
		title: 'tilte',
		lyrics: 'lyrics',
		chords: 'chords',
		author: 'author'
	};
};
