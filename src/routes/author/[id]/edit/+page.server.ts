import type { Author } from '$lib/types';
import type { PageServerLoad } from './$types';
import Database from '$lib/server/database';
import { error, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad<Author> = async ({ params }) => {
	const id = Number.parseInt(params.id);

	const db = new Database();
	await db.connect();
	const author = await db.data.author.get(id);
	await db.disconnect();

	if (!author) error(404, { message: 'Not found' });
	return author;
};

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const author: Author = {
			id: Number.parseInt(event.params.id as string),
			name: (data.get('name') as string).trim()
		};

		const db = new Database();
		await db.connect();
		await db.data.author.update(author);
		await db.disconnect();
	}
} satisfies Actions;
