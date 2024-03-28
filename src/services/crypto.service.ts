import argon2 from "argon2";

export async function hashPassword(password: string) {
  const hash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19923,
    timeCost: 2,
    parallelism: 1,
  });

  return hash;
}

export async function verifyPassword(digest: string, password: string) {
  const match = await argon2.verify(digest, password);
  return match;
}