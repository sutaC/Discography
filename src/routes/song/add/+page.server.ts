import type { Song } from '$lib/types';
import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { addAuthor, addSong, findAuthor, getSong } from '$lib/server/database';

function generateId(name: string): string {
	return name.toLowerCase().replaceAll(/\s/gm, '-');
}

export const actions: Actions = {
	default: async (event) => {
		console.log('got req');

		const data = await event.request.formData();
		const song: Song = {
			id: '',
			title: data.get('title') as string,
			author: data.get('author') as string,
			chords: data.get('chords') as string,
			lyrics: data.get('lyrics') as string
		};
		// TODO Validation
		// Id generation
		song.title = song.title.trim();
		song.id = generateId(song.title);
		const hasSong = (await getSong(song.id)) !== null;
		if (hasSong) {
			console.error('Already has song');
			return fail(409, { message: 'Song with that title already exists' });
		}
		// Find author
		const authorName = song.author.trim();
		let author = await findAuthor(authorName);
		if (author === null) {
			// Add author
			author = {
				id: generateId(authorName),
				name: authorName
			};
			addAuthor(author);
		}
		song.author = author.id;
		// Add song
		await addSong(song);
		console.log('added song');
	}
} satisfies Actions;
