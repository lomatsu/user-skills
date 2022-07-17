import { Knex } from "knex";
import { tableName } from "../helps";
import { encrypt } from '../../common/crypto'

export async function seed(knex: Knex): Promise<void> {
  try {
    const data = await knex(tableName.USER).select("*").first();
    if (data) {
      console.log("Skipping seed table user");
      return;
    }

    const passwordHash = await encrypt(process.env.PASSWORD);

    await knex(tableName.USER).insert([
      {
        login: "admin@gmail.com",
        password: passwordHash,
        lastLoginDate: "2022-07-17",
      },
    ]);
  } catch (error) {
    console.log("Error on seed 01_USER -> ", error);
  }
};
