import { addAuthor, findAuthor } from '$lib/server/database';
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
		await addAuthor(author);
		const { id } = (await findAuthor(author.name)) as Author;
		redirect(303, `/author/${id}`);
	}
} satisfies Actions;
