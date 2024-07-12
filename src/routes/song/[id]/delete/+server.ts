import Database from '$lib/server/database';
import { error, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ params }) => {
	if (params.id === undefined) error(400, { message: 'Id is missing' });
	const id: number = Number.parseInt(params.id as string);

	const db = new Database();
	await db.connect();
	await db.data.song.delete(id);
	await db.disconnect();

	return new Response();
};
