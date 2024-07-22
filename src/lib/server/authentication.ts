import type { PermissionsObject } from '$lib/types';

export async function hash(input: string) {
	const inputUint8 = new TextEncoder().encode(input);
	const hashBuffer = await crypto.subtle.digest('SHA-256', inputUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
	return hashHex;
}

export function generateSalt() {
	const [randomNumber] = crypto.getRandomValues(new Uint32Array(1));
	const salt = randomNumber.toString(16);
	return salt;
}

export function parsePermissions(premissions: string): PermissionsObject {
	return {
		adding: premissions.includes('ADD'),
		deleting: premissions.includes('DEL'),
		updating: premissions.includes('UPD'),
		granting: premissions.includes('GRT')
	};
}

export function stringifyPermissions(permissions: PermissionsObject): string {
	let prm: string[] = [];
	if (permissions.adding) prm.push('ADD');
	if (permissions.deleting) prm.push('DEL');
	if (permissions.granting) prm.push('GRT');
	if (permissions.updating) prm.push('UPD');
	return prm.join('|');
}

export const sessionCookie = {
	name: 'session',
	config: {
		path: '/',
		sameSite: 'strict' as 'strict',
		maxAge: 604800, // 1 week
		secure: true,
		httpOnly: true
	}
};
