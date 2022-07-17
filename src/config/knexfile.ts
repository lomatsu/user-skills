import dotenv from 'dotenv'
dotenv.config({ path: "../../.env" })

import { DB_HOST, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER, DB_PORT } from '.'


const connection = {
  host: "localhost",
  user: "postgres",
  database: "user_skill_db",
  port: 5435,
  password: "1234@mudar",
}

module.exports = {
  development: {
    client: 'pg',
    connection,
    migrations: {
      directory: "../database/migrations",
    },
    seeds: {
      directory: "../database/seeds",
    },
  },

  // production: {
  //   client: 'pg',
  //   connection: {
  //     port: DB_PORT,
  //     host: DB_HOST,
  //     database: POSTGRES_DB,
  //     user: POSTGRES_USER,
  //     password: POSTGRES_PASSWORD,
  //     ssl: {
	// 			production: {
	// 				client: 'pg',
	// 				connection: {
	// 					port: DB_PORT,
	// 					host: DB_HOST,
	// 					database: POSTGRES_DB,
	// 					user: POSTGRES_USER,
	// 					password: POSTGRES_PASSWORD,
	// 					ssl: {
	// 						rejectUnauthorized: false,
  //     }
  //   },
  //   migrations: {
  //     directory: "../database/migrations",
  //   },
  //   seeds: {
  //     directory: "../database/seeds",
  //   },
  // },

  test: {
    client: "pg",
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "../database/migrations",
    },
    seeds: {
      directory: "../database/seeds",
    },
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
