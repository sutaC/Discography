import { addAuthor } from '$lib/server/database';
import type { Author } from '$lib/types';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		console.log('got req');
		const data = await event.request.formData();
		const author: Author = {
			id: 0, // A_I
			name: data.get('name') as string
		};
		// TODO Input validation
		// Adds author
		await addAuthor(author);
		console.log('added author');
	}
} satisfies Actions;
