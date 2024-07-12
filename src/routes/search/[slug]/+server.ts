import Database from '$lib/server/database';
import { error, type RequestHandler } from '@sveltejs/kit';

const headers = { 'Content-Type': 'application/json' };

export const GET: RequestHandler = async ({ params }) => {
	if (params.slug === undefined) error(400, { message: 'Slug is missing' });
	const slug = params.slug as string;

	const db = new Database();
	await db.connect();
	const songs = await db.data.song.search(slug);
	await db.disconnect();

	const body = JSON.stringify(songs ?? []);
	return new Response(body, { headers });
};
