import { searchSongs } from '$lib/server/database';
import type { RequestHandler } from '@sveltejs/kit';

const headers = { 'Content-Type': 'application/json' };

export const GET: RequestHandler = async (event) => {
	const slug = event.params.slug;
	if (!slug) return new Response('[]', { status: 400, headers });
	const songs = await searchSongs(slug);
	const body = JSON.stringify(songs ?? []);
	return new Response(body, { headers });
};
