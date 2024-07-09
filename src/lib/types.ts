export interface SongTag {
	id: string;
	title: string;
	author: string;
}

export interface Song extends SongTag {
	lyrics: string;
	chords: string;
}
