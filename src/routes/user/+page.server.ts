import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { PermissionsObject } from '$lib/types';
import { stringifyPermissions } from '$lib/server/authentication';
import Database from '$lib/server/database';
import superUsers from '$lib/server/superUsers';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user?.permissions.granting) error(401, { message: 'Unauthorized' });

	return {
		disabledUsers: [...superUsers, event.locals.user.login]
	};
};

export const actions: Actions = {
	update: async (event) => {
		if (!event.locals.user?.permissions.granting) error(401, { message: 'Unauthorized' });

		const data = await event.request.formData();
		const userData: { login?: string; permissions: PermissionsObject | string } = {
			login: data.get('login')?.toString(),
			permissions: {
				adding: data.get('adding')?.toString() === 'on',
				deleting: data.get('deleting')?.toString() === 'on',
				granting: data.get('granting')?.toString() === 'on',
				updating: data.get('updating')?.toString() === 'on'
			}
		};

		if (!userData.login) error(400, { message: 'Missing data' });
		if (superUsers.includes(userData.login)) error(418, { message: 'Cannot update super user' });
		if (userData.login === event.locals.user.login)
			error(418, { message: 'Cannot update yourself' });

		userData.permissions = stringifyPermissions(userData.permissions as PermissionsObject);

		const db = new Database();
		await db.connect();
		await db.data.user.updatePermissions(userData.login, userData.permissions);
		await db.disconnect();

		event.url.searchParams.set('q', userData.login);
	}
};
