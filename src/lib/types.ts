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

export interface UserData {
	login: string;
	permissons: string;
	session: string | null;
}

export interface User extends UserData {
	password: string;
	salt: string;
}
