export interface SongTag {
	id: number;
	title: string;
	author: string;
	authorId?: number;
}

export interface Song extends SongTag {
	lyrics: string;
	chords: string;
}

export interface Author {
	id: number;
	name: string;
}
