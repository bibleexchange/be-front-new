/* eslint-disable no-unused-vars, no-use-before-define */
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions
} from 'graphql-relay';

import {
  User,
  Widget,
  getUser,
  getWidget,
  getWidgets,
  getBibleNavs
} from './database';


/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Widget') {
      return getWidget(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof Widget) {
      return widgetType;
    }
    return null;
  }
);

/**
 * Define your own types here
 */

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    widgets: {
      type: widgetConnection,
      description: 'Widgets that I have',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getWidgets(), args)
    },
	bibleNavs: {
      type: bibleNavConnection,
      description: 'Bible Navs that I have',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getBibleNavs(), args)
    },
    username: {
      type: GraphQLString,
      description: 'Users\'s username'
    },
    website: {
      type: GraphQLString,
      description: 'User\'s website'
    }
  }),
  interfaces: [nodeInterface]
});

const widgetType = new GraphQLObjectType({
  name: 'Widget',
  description: 'Widget integrated in our starter kit',
  fields: () => ({
    id: globalIdField('Widget'),
    name: {
      type: GraphQLString,
      description: 'Name of the widget'
    },
    description: {
      type: GraphQLString,
      description: 'Description of the widget'
    },
    url: {
      type: GraphQLString,
      description: 'Url of the widget'
    }
  }),
  interfaces: [nodeInterface]
});

const bibleNavType = new GraphQLObjectType({
  name: 'BibleNav',
  description: 'Bible navigations',
  fields: () => ({
    id: globalIdField('BibleNav'),
    body: {
      type: GraphQLString,
      description: 'body of the bible nav'
    },
    url: {
      type: GraphQLString,
      description: 'Url of the bible nav'
    }
  }),
  interfaces: [nodeInterface]
});

/**
 * Define your own connection types here
 */
const { connectionType: widgetConnection } = connectionDefinitions({ name: 'Widget', nodeType: widgetType });
const { connectionType: bibleNavConnection } = connectionDefinitions({ name: 'BibleNav', nodeType: bibleNavType });

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: userType,
      resolve: () => getUser('1')
    }
  })
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export default new GraphQLSchema({
  query: queryType
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});
