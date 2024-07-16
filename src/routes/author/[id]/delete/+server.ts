import Database from '$lib/server/database';
import { error, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	if (!event.locals.user?.permissions.deleting) error(401, { message: 'Unauthorized' });

	if (event.params.id === undefined) error(400, { message: 'Id is missing' });
	const id: number = Number.parseInt(event.params.id as string);

	const db = new Database();
	await db.connect();
	await db.data.author.delete(id);
	await db.disconnect();

	return new Response();
};
