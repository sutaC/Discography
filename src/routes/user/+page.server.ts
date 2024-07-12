import Database from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = event.cookies.get('session');
	if (!session) return { username: null };

	const db = new Database();
	await db.connect();
	const user = await db.data.user.getBySession(session);
	await db.disconnect();

	return { username: user?.login ?? null };
};
