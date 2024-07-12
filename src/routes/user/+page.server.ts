import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	return { username: event.locals.user?.login };
};
