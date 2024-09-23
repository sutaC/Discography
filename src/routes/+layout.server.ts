import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return { permissions: event.locals.user?.permissions };
};
