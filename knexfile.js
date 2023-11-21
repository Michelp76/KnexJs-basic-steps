// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: { 
    client: 'pg',
    connection: {
      host : 'localhost',
      database: 'publications',
      user: 'postgres',
      password: 'XXXXXXXXXXXXXX'
    },    
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },    
    useNullAsDefault: true
  }
};
