import { getAllSongs } from '$lib/server/database';
import type { SongTag } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<{ songs: SongTag[] }> = async () => {
	const songs = (await getAllSongs()) ?? [];
	return { songs };
};
