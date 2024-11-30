import { User } from "@prisma/client";
import { useSession } from "vinxi/http";
import { db } from "./db";

export function validateUsername(username: unknown): string | undefined {
	if (typeof username !== "string" || username.length < 3) {
		return "Usernames must be at least 3 characters long";
	}
}

export function validatePassword(password: unknown): string | undefined {
	if (typeof password !== "string" || password.length < 6) {
		return "Passwords must be at least 6 characters long";
	}
}

export async function login(
	username: string /*, password: string*/,
): Promise<User> {
	const user = await db.user.findUnique({ where: { username } });
	if (user === null /* || password !== user.password */) {
		throw new Error("Invalid login");
	}
	return user;
}

export async function logout(): Promise<void> {
	const session = await getSession();
	await session.update((d) => {
		d.userId = undefined;
	});
}

export async function register(
	username: string,
	/* password: string, */
): Promise<User> {
	const existingUser = await db.user.findUnique({ where: { username } });
	if (existingUser !== null) {
		throw new Error("User already exists");
	}
	return db.user.create({
		data: { username /*, password */ },
	});
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getSession() {
	return useSession({
		password:
			process.env.SESSION_SECRET ?? "areallylongsecretthatyoushouldreplace",
	});
}
