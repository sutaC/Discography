// See https://kit.svelte.dev/docs/types#app

import type { UserData } from '$lib/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserData | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
