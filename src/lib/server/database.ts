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
			'SELECT songs.id, songs.title, authors.name AS author, songs.lyrics, songs.chords FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.id = ?;'
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
			'SELECT songs.id, songs.title, authors.name AS author FROM songs JOIN authors ON songs.author_id = authors.id;'
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

export async function addAuthor(author: Author): Promise<void> {
	const con = await createConnection();
	if (!con) return;
	await con.connect();
	try {
		const stmt = await con.prepare('INSERT INTO authors (id, name) VALUES (?, ?);');
		await stmt.execute([author.id, author.name]);
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
		await stmt.execute([song.title, song.lyrics, song.chords, song.authorId ?? 0]);
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
		// TODO: update author
		const stmt = await con.prepare(
			'UPDATE songs SET title = ?, lyrics = ?, chords = ? WHERE songs.id = ?;'
		);
		await stmt.execute([song.title, song.lyrics, song.chords, song.id]);
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
