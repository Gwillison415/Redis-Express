module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/homeslice_dev',
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/homeslice_test',
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};
