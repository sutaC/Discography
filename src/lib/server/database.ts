import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';
import type { Author, Song, SongTag, Star, User } from '../types';

export default class Database {
	private readonly config = {
		host: env.DBHOST,
		user: env.DBUSER,
		password: env.DBPASSWORD,
		database: env.DBNAME
	};
	private connection: mysql.Connection | null = null;

	// ===

	constructor() {
		Object.freeze(this.data); // Prevents overwrites
	}

	// ===

	private async query<T>(query: string, data?: any[]): Promise<T[]> {
		if (this.connection === null)
			throw new Error('Query method can be called only while connected');
		try {
			const stmt = await this.connection.prepare(query);
			const [result] = (await stmt.execute(data)) as unknown as T[][];
			await stmt.close();
			return result;
		} catch (error) {
			if (this.connected) await this.disconnect();
			throw error;
		}
	}

	public async connect() {
		if (this.connected) throw new Error('Connect method can be called only while not connected');
		this.connection = await mysql.createConnection(this.config);
	}

	public async disconnect() {
		if (this.connection === null)
			throw new Error('Disconnect method can be called only while connected');
		await this.connection.end();
		this.connection = null;
	}

	get connected(): boolean {
		return this.connection !== null;
	}

	// Querys

	public readonly data = {
		song: {
			get: async (id: number): Promise<(Song & { stars: number }) | null> => {
				const res = await this.query<Song & { stars: number }>(
					'SELECT songs.id, songs.title, authors.name AS author, songs.author_id AS authorId, songs.lyrics, songs.chords, COUNT(stars.song_id) AS "stars" FROM songs JOIN authors ON songs.author_id = authors.id LEFT JOIN stars ON songs.id = stars.song_id WHERE songs.id = ? GROUP BY songs.id;',
					[id]
				);
				return res[0] ?? null;
			},
			getAll: async (): Promise<(SongTag & { stars: number })[]> => {
				return await this.query<SongTag & { stars: number }>(
					'SELECT songs.id, songs.title, songs.author_id AS "authorId", authors.name AS "author", COUNT(stars.song_id) AS "stars" FROM songs JOIN authors ON songs.author_id = authors.id LEFT JOIN stars ON songs.id = stars.song_id GROUP BY songs.id;'
				);
			},
			getPopular: async (): Promise<(SongTag & { stars: number })[]> => {
				return await this.query<SongTag & { stars: number }>(
					'SELECT songs.id, songs.title, songs.author_id AS "authorId", authors.name AS "author", COUNT(stars.song_id) AS "stars" FROM songs JOIN authors ON songs.author_id = authors.id LEFT JOIN stars ON songs.id = stars.song_id GROUP BY songs.id ORDER BY stars DESC LIMIT 5;'
				);
			},
			getAllStaredByUser: async (login: string): Promise<(SongTag & { stars: number })[]> => {
				return await this.query<SongTag & { stars: number }>(
					'SELECT songs.id, songs.author_id AS "authorId", songs.title, authors.name AS "author", (SELECT COUNT(stars.user_login) FROM stars WHERE stars.song_id = songs.id) AS "stars" FROM songs JOIN authors ON songs.author_id = authors.id JOIN stars ON songs.id = stars.song_id WHERE stars.user_login = ?;',
					[login]
				);
			},
			getAllByAuthor: async (id: number): Promise<(SongTag & { stars: number })[]> => {
				return await this.query<SongTag & { stars: number }>(
					'SELECT songs.id, songs.title, songs.author_id AS "authorId", authors.name AS "author", COUNT(stars.user_login) AS "stars" FROM songs JOIN authors ON songs.author_id = authors.id LEFT JOIN stars ON songs.id = stars.song_id WHERE songs.author_id = ? GROUP BY songs.id;',
					[id]
				);
			},
			findId: async (title: string): Promise<number | null> => {
				const res = await this.query<{ id: number }>(
					'SELECT songs.id FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.title = ?;',
					[title]
				);
				return res[0]?.id ?? null;
			},
			add: async (song: Song): Promise<void> => {
				await this.query<void>(
					'INSERT INTO songs (id, title, lyrics, chords, author_id) VALUES (NULL, ?, ?, ?, ?);',
					[song.title, song.lyrics, song.chords, song.authorId]
				);
			},
			update: async (song: Song): Promise<void> => {
				await this.query<void>(
					'UPDATE songs SET title = ?, lyrics = ?, chords = ?, author_id = ? WHERE songs.id = ?;',
					[song.title, song.lyrics, song.chords, song.authorId, song.id]
				);
			},
			delete: async (id: number): Promise<void> => {
				await this.query<void>('DELETE FROM songs WHERE songs.id = ?;', [id]);
			},
			search: async (slug: string): Promise<(SongTag & { stars: number })[]> => {
				return await this.query<SongTag & { stars: number }>(
					'SELECT songs.id, songs.title, songs.author_id AS "authorId", authors.name AS "author", COUNT(stars.user_login) AS "stars" FROM songs JOIN authors ON songs.author_id = authors.id LEFT JOIN stars ON songs.id = stars.song_id WHERE songs.title LIKE CONCAT("%", ?, "%") OR authors.name LIKE CONCAT("%", ?, "%") GROUP BY songs.id ORDER BY stars DESC, songs.title DESC, authors.name DESC LIMIT 5;',
					[slug, slug]
				);
			}
		},
		author: {
			get: async (id: number): Promise<Author | null> => {
				const res = await this.query<Author>('SELECT * FROM authors WHERE authors.id = ?;', [id]);
				return res[0] ?? null;
			},
			getAll: async (): Promise<Author[]> => {
				return await this.query<Author>('SELECT * FROM authors');
			},
			findId: async (name: string): Promise<number | null> => {
				const res = await this.query<{ id: number }>(
					'SELECT authors.name FROM authors WHERE authors.name = ?;',
					[name]
				);
				return res[0]?.id ?? null;
			},
			add: async (author: Author): Promise<void> => {
				await this.query<void>('INSERT INTO authors (id, name) VALUES (NULL, ?);', [author.name]);
			},
			update: async (author: Author): Promise<void> => {
				await this.query<void>('UPDATE authors SET name = ? WHERE authors.id = ?;', [
					author.name,
					author.id
				]);
			},
			delete: async (id: number): Promise<void> => {
				await this.query<void>('DELETE FROM authors WHERE authors.id = ?;', [id]);
			}
		},
		user: {
			get: async (login: string): Promise<User | null> => {
				const res = await this.query<User>('SELECT * FROM users WHERE users.login = ?;', [login]);
				return res[0] ?? null;
			},
			updatePermissions: async (login: string, permissions: string): Promise<void> => {
				await this.query<void>('UPDATE users SET permissions = ? WHERE users.login = ?', [
					permissions,
					login
				]);
			},
			updateSession: async (login: string, session: string | null) => {
				if (session === null) {
					await this.query<void>('UPDATE users SET session = NULL WHERE users.login = ?;', [login]);
				} else {
					await this.query<void>('UPDATE users SET session = ? WHERE users.login = ?;', [
						session,
						login
					]);
				}
			},
			getBySession: async (session: string): Promise<User | null> => {
				const res = await this.query<User>('SELECT * FROM users WHERE users.session = ?;', [
					session
				]);
				return res[0] ?? null;
			},
			add: async (user: User): Promise<void> => {
				if (user.session === null) {
					await this.query<User>(
						'INSERT INTO users (login, password, salt, permissions, session) VALUES (?, ?, ?, ?, NULL)',
						[user.login, user.password, user.salt, user.permissions]
					);
				} else {
					await this.query<User>(
						'INSERT INTO users (login, password, salt, permissions, session) VALUES (?, ?, ?, ?, ?)',
						[user.login, user.password, user.salt, user.permissions, user.session]
					);
				}
			},
			delete: async (login: string): Promise<void> => {
				await this.query<void>('DELETE FROM users WHERE users.login = ?;', [login]);
			},
			search: async (slug: string): Promise<{ login: string; permissions: string }[]> => {
				return await this.query<{ login: string; permissions: string }>(
					'SELECT users.login, users.permissions FROM users WHERE users.login LIKE CONCAT("%", ?, "%") LIMIT 5;',
					[slug]
				);
			}
		},
		stars: {
			get: async (login: string, songId: number): Promise<Star | null> => {
				const res = await this.query<Star>(
					'SELECT stars.user_login AS "login", stars.song_id AS "songId" FROM stars WHERE user_login = ? AND song_id = ?;',
					[login, songId]
				);
				return res[0] ?? null;
			},
			add: async (login: string, songId: number): Promise<void> => {
				await this.query<void>('INSERT INTO stars (user_login, song_id) VALUES (?, ?)', [
					login,
					songId
				]);
			},
			delete: async (login: string, songId: number): Promise<void> => {
				await this.query<void>(
					'DELETE FROM stars WHERE stars.user_login = ? AND stars.song_id = ?;',
					[login, songId]
				);
			}
		}
	};
}
