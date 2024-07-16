import type { Author } from '$lib/types';
import type { PageServerLoad } from './$types';
import Database from '$lib/server/database';
import { error, type Actions } from '@sveltejs/kit';
import { validateAuthorData } from '$lib/server/validation';

export const load: PageServerLoad = async ({ params }) => {
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
		if (!event.locals.user?.permissions.updating) error(401, { message: 'Unauthorized' });

		const data = await event.request.formData();
		const author = {
			id: Number.parseInt(event.params.id as string),
			name: data.get('name')?.toString()
		};

		const validationResult = validateAuthorData(author);
		if (!validationResult.success) error(400, { message: validationResult.message as string });

		const db = new Database();
		await db.connect();
		await db.data.author.update(author as Author);
		await db.disconnect();
	}
} satisfies Actions;
