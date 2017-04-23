import knex from 'knex';
import Bookshelf from 'bookshelf';

const knexClient = knex({
    client: 'mysql',
    connection: {
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'run',
        charset  : 'utf8'
  }
});

export default Bookshelf(knexClient);
