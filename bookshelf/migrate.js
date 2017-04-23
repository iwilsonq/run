const Schema = require('./schema');
const sequence = require('when/sequence');
const _ = require('lodash');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'run',
    charset: 'utf8'
  }
});


function createTable(tableName) {
  return knex.schema.createTable(tableName, table => {
    let column;
    let columnKeys = _.keys(Schema[tableName]);
    console.log(tableName);

    _.each(columnKeys, key => {

      if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
      } else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
      } else {
        column = table[Schema[tableName][key].type](key);
      }

      if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
        column.nullable();
      }
      else {
        column.notNullable();
      }

      if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
        column.primary();
      }
      if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
        column.unique();
      }
      if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
        column.unsigned();
      }
      if (Schema[tableName][key].hasOwnProperty('references')) {
        column.references(Schema[tableName][key].references);
      }
      if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
        column.defaultTo(Schema[tableName][key].defaultTo);
      }
    });
  });
}

function createTables() {
  let tables = [];
  let tableNames = _.keys(Schema);
  
  tables = _.map(tableNames, tableName => {
    return () => createTable(tableName);
  });

  return sequence(tables);
}

createTables()
  .then(() => {
    console.log('Tables created!!');
    process.exit(0);
  })
  .catch(error => {
    throw error;
  });
