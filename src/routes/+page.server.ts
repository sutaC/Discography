import { getAllAuthors, getAllSongs } from '$lib/server/database';
import type { SongTag } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<{ songs: SongTag[] }> = async () => {
	const songs = (await getAllSongs()) ?? [];
	const authors = (await getAllAuthors()) ?? [];
	return { songs, authors };
};
