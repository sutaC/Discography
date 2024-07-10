import type { Author } from '$lib/types';
import type { PageServerLoad } from './$types';
import { getAuthor, updateAuthor } from '$lib/server/database';
import { error, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad<Author> = async ({ params }) => {
	const author = await getAuthor(Number.parseInt(params.id));
	if (!author) error(404, { message: 'Not found' });
	return author;
};

export const actions: Actions = {
	default: async (event) => {
		console.log('got req');
		const data = await event.request.formData();
		const author: Author = {
			id: Number.parseInt(event.params.id as string),
			name: (data.get('name') as string).trim()
		};
		await updateAuthor(author);
		console.log('Updated author');
	}
} satisfies Actions;
