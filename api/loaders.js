import * as tables from '../bookshelf/models';

export const getNodeById = nodeId => {
  const { tableName, dbId } = tables.splitNodeId(nodeId);
  // TODO: update id field

  const table = tables[tableName];
  const query = table
    .forge()
    .fetch()

  return query
  .then(collection => collection.toJSON())
  .then(rows => {
    if (rows[0]) {
      rows[0].__tableName = tableName;
    }
    return rows[0];
  });
}
