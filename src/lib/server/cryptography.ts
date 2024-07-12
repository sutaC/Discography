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
