import type { Song } from '$lib/types';
import type { PageServerLoad } from './$types';
import { getSong } from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad<Song> = async ({ params }) => {
	const song = await getSong(params.id);
	if (!song) error(404, { message: 'Not found' });
	return song;
};
