import mysql from 'mysql2/promise';
import { DBHOST, DBUSER, DBPASSWORD, DBNAME } from '$env/static/private';
import type { Song } from '../types';

async function createConnection() {
	try {
		return mysql.createConnection({
			host: DBHOST,
			user: DBUSER,
			password: DBPASSWORD,
			database: DBNAME
		});
	} catch (error) {
		console.error(error);
	}
}

export async function getSong(id: string): Promise<Song | null> {
	const con = await createConnection();
	if (!con) return null;
	await con.connect();
	try {
		const stm = await con.prepare(
			'SELECT songs.title, authors.name AS author, songs.lyrics, songs.chords FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.id = ?;'
		);
		const [[result]] = (await stm.execute([id])) as unknown as Song[][];
		return result ?? null;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await con.end();
	}
}
