import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';
import type { Author, Song, SongTag } from '../types';

async function createConnection() {
	try {
		return mysql.createConnection({
			host: env.DBHOST,
			user: env.DBUSER,
			password: env.DBPASSWORD,
			database: env.DBNAME
		});
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getSong(id: number): Promise<Song | null> {
	const con = await createConnection();
	if (!con) return null;
	await con.connect();
	try {
		const stmt = await con.prepare(
			'SELECT songs.id, songs.title, authors.name AS author, songs.author_id AS authorId, songs.lyrics, songs.chords FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.id = ?;'
		);
		const [[result]] = (await stmt.execute([id])) as unknown as Song[][];
		return result ?? null;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await con.end();
	}
}

export async function getAllSongs(): Promise<SongTag[] | null> {
	const con = await createConnection();
	if (!con) return null;
	await con.connect();
	try {
		const stmt = await con.prepare(
			'SELECT songs.id, songs.title, songs.author_id AS authorId, authors.name AS author FROM songs JOIN authors ON songs.author_id = authors.id;'
		);
		const [result] = (await stmt.execute(null)) as unknown as SongTag[][];
		return result ?? [];
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await con.end();
	}
}

export async function getAllSongsByAuthor(id: number): Promise<SongTag[] | null> {
	const con = await createConnection();
	if (!con) return null;
	await con.connect();
	try {
		const stmt = await con.prepare(
			'SELECT songs.id, songs.title, songs.author_id AS authorId, authors.name AS author FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.author_id = ?;'
		);
		const [result] = (await stmt.execute([id])) as unknown as SongTag[][];
		return result ?? [];
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await con.end();
	}
}

export async function getAuthor(id: number): Promise<Author | null> {
	const con = await createConnection();
	if (!con) return null;
	await con.connect();
	try {
		const stmt = await con.prepare('SELECT * FROM authors WHERE authors.id = ?;');
		const [[result]] = (await stmt.execute([id])) as unknown as Author[][];
		return result ?? null;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await con.end();
	}
}

export async function getAllAuthors(): Promise<Author[] | null> {
	const con = await createConnection();
	if (!con) return null;
	await con.connect();
	try {
		const stmt = await con.prepare('SELECT * FROM authors');
		const [result] = (await stmt.execute(null)) as unknown as Author[][];
		return result ?? [];
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await con.end();
	}
}

export async function findAuthor(name: string): Promise<Author | null> {
	const con = await createConnection();
	if (!con) return null;
	await con.connect();
	try {
		const stmt = await con.prepare('SELECT * FROM authors WHERE authors.name LIKE ?;');
		const [[result]] = (await stmt.execute([name])) as unknown as Author[][];
		return result ?? null;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await con.end();
	}
}

export async function findSong(title: string): Promise<SongTag | null> {
	const con = await createConnection();
	if (!con) return null;
	await con.connect();
	try {
		const stmt = await con.prepare(
			'SELECT songs.id, songs.title, songs.author_id AS authorId, authors.name AS author FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.title LIKE ?;'
		);
		const [[result]] = (await stmt.execute([title])) as unknown as SongTag[][];
		return result ?? null;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await con.end();
	}
}

export async function addAuthor(author: Author): Promise<void> {
	const con = await createConnection();
	if (!con) return;
	await con.connect();
	try {
		const stmt = await con.prepare('INSERT INTO authors (id, name) VALUES (NULL, ?);');
		await stmt.execute([author.name]);
	} catch (error) {
		console.error(error);
	} finally {
		await con.end();
	}
}

export async function addSong(song: Song): Promise<void> {
	const con = await createConnection();
	if (!con) return;
	await con.connect();
	try {
		const stmt = await con.prepare(
			'INSERT INTO songs (id, title, lyrics, chords, author_id) VALUES (NULL, ?, ?, ?, ?);'
		);
		await stmt.execute([song.title, song.lyrics, song.chords, song.authorId]);
	} catch (error) {
		console.error(error);
	} finally {
		await con.end();
	}
}

export async function updateSong(song: Song): Promise<void> {
	const con = await createConnection();
	if (!con) return;
	await con.connect();
	try {
		const stmt = await con.prepare(
			'UPDATE songs SET title = ?, lyrics = ?, chords = ?, author_id = ? WHERE songs.id = ?;'
		);
		await stmt.execute([song.title, song.lyrics, song.chords, song.authorId, song.id]);
	} catch (error) {
		console.error(error);
	} finally {
		await con.end();
	}
}

export async function updateAuthor(author: Author): Promise<void> {
	const con = await createConnection();
	if (!con) return;
	await con.connect();
	try {
		const stmt = await con.prepare('UPDATE authors SET name = ? WHERE authors.id = ?;');
		await stmt.execute([author.name, author.id]);
	} catch (error) {
		console.error(error);
	} finally {
		await con.end();
	}
}

export async function deleteAuthor(id: number): Promise<void> {
	const con = await createConnection();
	if (!con) return;
	await con.connect();
	try {
		const stmt = await con.prepare('DELETE FROM authors WHERE authors.id = ?;');
		await stmt.execute([id]);
	} catch (error) {
		console.error(error);
	} finally {
		await con.end();
	}
}

export async function deleteSong(id: number): Promise<void> {
	const con = await createConnection();
	if (!con) return;
	await con.connect();
	try {
		const stmt = await con.prepare('DELETE FROM songs WHERE songs.id = ?;');
		await stmt.execute([id]);
	} catch (error) {
		console.error(error);
	} finally {
		await con.end();
	}
}

export async function searchSongs(slug: string): Promise<SongTag[] | null> {
	const con = await createConnection();
	if (!con) return null;
	await con.connect();
	try {
		const stmt = await con.prepare(
			'SELECT songs.id, songs.title, songs.author_id AS authorId, authors.name AS author FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.title LIKE CONCAT("%", ?, "%") OR authors.name LIKE CONCAT("%", ?, "%") ORDER BY songs.title, authors.name LIMIT 5;'
		);
		const [result] = (await stmt.execute([slug, slug])) as unknown as SongTag[][];
		return result ?? [];
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await con.end();
	}
}
