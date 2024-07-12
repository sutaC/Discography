export interface SongTag {
	id: number;
	authorId: number;
	title: string;
	author: string;
}

export interface Song extends SongTag {
	lyrics: string;
	chords: string;
}

export interface Author {
	id: number;
	name: string;
}

export interface User {
	login: string;
	password: string;
	salt: string;
	permissons: string;
	session: string | null;
}
