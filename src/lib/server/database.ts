import mysql from 'mysql2/promise';
import { DBHOST, DBUSER, DBPASSWORD, DBNAME } from '$env/static/private';
import type { Song } from '../types';

async function createConnection() {
	const config = {
		host: DBHOST,
		user: DBUSER,
		password: DBPASSWORD,
		database: DBNAME
	};
	console.log(config);

	return mysql.createConnection(config);
}

export async function getSong(id: string): Promise<any | null> {
	const con = await createConnection();
	await con.connect();
	try {
		const stm = await con.prepare(
			'SELECT songs.title, authors.name, songs.lyrics, songs.chords FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.id = ?;'
		);
		const result = (await stm.execute([id])) as any;
		return result;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await con.end();
	}
}
