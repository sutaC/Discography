import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';
import type { Author, Song, SongTag, User } from '../types';

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
			return result;
		} catch (error) {
			await this.disconnect();
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
			get: async (id: number): Promise<Song | null> => {
				const res = await this.query<Song>(
					'SELECT songs.id, songs.title, authors.name AS author, songs.author_id AS authorId, songs.lyrics, songs.chords FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.id = ?;',
					[id]
				);
				return res[0] ?? null;
			},
			getAll: async (): Promise<SongTag[]> => {
				return await this.query<SongTag>(
					'SELECT songs.id, songs.title, songs.author_id AS authorId, authors.name AS author FROM songs JOIN authors ON songs.author_id = authors.id;'
				);
			},
			getAllByAuthor: async (id: number): Promise<SongTag[]> => {
				return await this.query<SongTag>(
					'SELECT songs.id, songs.title, songs.author_id AS authorId, authors.name AS author FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.author_id = ?;',
					[id]
				);
			},
			find: async (title: string): Promise<SongTag | null> => {
				const res = await this.query<SongTag>(
					'SELECT songs.id, songs.title, songs.author_id AS authorId, authors.name AS author FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.title LIKE ?;',
					[title]
				);
				return res[0] ?? null;
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
			search: async (slug: string): Promise<SongTag[]> => {
				return await this.query<SongTag>(
					'SELECT songs.id, songs.title, songs.author_id AS authorId, authors.name AS author FROM songs JOIN authors ON songs.author_id = authors.id WHERE songs.title LIKE CONCAT("%", ?, "%") OR authors.name LIKE CONCAT("%", ?, "%") ORDER BY songs.title, authors.name LIMIT 5;',
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
			find: async (name: string): Promise<Author | null> => {
				const res = await this.query<Author>('SELECT * FROM authors WHERE authors.name LIKE ?;', [
					name
				]);
				return res[0] ?? null;
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
			}
		}
	};
}
