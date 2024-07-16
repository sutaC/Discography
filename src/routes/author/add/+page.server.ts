import Database from '$lib/server/database';
import { validateAuthorData, type AuthorData } from '$lib/server/validation';
import type { Author } from '$lib/types';
import { error, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.user?.permissions.adding) error(401, { message: 'Unauthorized' });

		const data = await event.request.formData();
		const author = {
			id: 0, // A_I
			name: data.get('name')?.toString()
		};

		const validationResult = validateAuthorData(author as AuthorData);
		if (!validationResult.success)
			return error(400, { message: validationResult.message as string });

		const db = new Database();
		await db.connect();
		await db.data.author.add(author as Author);
		const id = await db.data.author.findId(author.name as string);
		await db.disconnect();

		redirect(303, `/author/${id}`);
	}
} satisfies Actions;
