import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import * as tables from '../bookshelf/models';

export const NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolveType: source => {

    // TODO: change this
    if (source.__tableName === tables.Users.getName()) {
      return UserType;
    }
    return PostType;
  }
})

const resolveId = source => {
  return tables.dbIdToNodeId(source.id, source.__tableName);
};

export const UserType = new GraphQLObjectType({
  name: 'User',
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    about: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

export const PostType = new GraphQLObjectType({
  name: 'Post',
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: resolveId
    },
    created_at: {
      type: new GraphQLNonNull(GraphQLString)
    },
    body: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})
