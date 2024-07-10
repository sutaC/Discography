import { deleteAuthor } from '$lib/server/database';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	console.log('got req');
	const id: number = Number.parseInt(event.params.id as string);
	await deleteAuthor(id);
	console.log('deleted author');
	return new Response();
};
