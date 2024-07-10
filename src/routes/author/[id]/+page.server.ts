import type { Author, Song, SongTag } from '$lib/types';
import type { PageServerLoad } from './$types';
import { getAllSongsByAuthor, getAuthor } from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad<{ author: Author; songs: SongTag[] }> = async ({ params }) => {
	const author = await getAuthor(Number.parseInt(params.id));
	if (!author) error(404, { message: 'Not found' });
	const songs = (await getAllSongsByAuthor(author.id)) ?? [];
	return { author, songs };
};
