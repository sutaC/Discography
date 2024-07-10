import type { Author } from '$lib/types';
import type { PageServerLoad } from './$types';
import { getAuthor } from '$lib/server/database';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad<Author> = async ({ params }) => {
	const author = await getAuthor(Number.parseInt(params.id));
	if (!author) error(404, { message: 'Not found' });
	return author;
};
