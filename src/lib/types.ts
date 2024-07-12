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

interface UserTag {
	login: string;
	session: string | null;
}

export interface UserObject extends UserTag {
	permissions: PermissionsObject;
}

export interface User extends UserTag {
	salt: string;
	password: string;
	permissions: string;
}

export interface PermissionsObject {
	granting: boolean; // Granting user permissions - (GRT)
	adding: boolean; // Adding content - (ADD)
	deleting: boolean; // Deleting content - (DEL)
	updating: boolean; // Updating content - (UPD)
}
