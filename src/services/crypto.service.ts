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