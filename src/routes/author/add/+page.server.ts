import Database from '$lib/server/database';
import type { Author } from '$lib/types';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const author: Author = {
			id: 0, // A_I
			name: data.get('name') as string
		};

		// TODO Input validation

		const db = new Database();
		await db.connect();
		await db.data.author.add(author);
		const { id } = (await db.data.author.find(author.name)) as Author;
		await db.disconnect();

		redirect(303, `/author/${id}`);
	}
} satisfies Actions;
