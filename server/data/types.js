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
  Library,
  getUser,
  getWidget,
  getWidgets,
  getBibleNavs,
  getNotebooks,
  getLibraryPages,
  getLibrary
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
    }else if (type === 'Library') {
      return getLibrary(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof Widget) {
      return widgetType;
    } else if (obj instanceof Library) {
      return libraryType;
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

const libraryType = new GraphQLObjectType({
  name: 'Library',
  description: 'A Library is a collection of Notebooks',
  fields: () => ({
	id: globalIdField('Library'),
    notebooks: {
      type: notebookConnection,
      description: 'Notebooks in this library',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getNotebooks(), args)
    },
	pages: {
      type: libraryPageConnection,
      description: 'Page information for this library',
      args: {
		...connectionArgs,
        page: {
          type: GraphQLInt
		},
		filter: {
          type: GraphQLString
		}
	  },
      resolve: (_, args) => connectionFromArray(getLibraryPages(), args)
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

const pageType = new GraphQLObjectType({
  name: 'Page',
  description: 'a Page',
  fields: () => ({
    id: globalIdField('Page'),
    currentPage: {
      type: GraphQLString,
      description: 'current page'
    },
    numberOfPages: {
      type: GraphQLString,
      description: 'Number of pages'
    },
    filter: {
      type: GraphQLString,
      description: 'filter'
    }
  }),
  interfaces: [nodeInterface]
});

const notebookType = new GraphQLObjectType({
  name: 'Notebook',
  description: 'a Notebook',
  fields: () => ({
    id: globalIdField('Notebook'),
    url: {
      type: GraphQLString,
      description: 'url'
    },
    title: {
      type: GraphQLString,
      description: 'title'
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

const {
  connectionType: notebookConnection,
  edgeType: NotebookEdge,
} = connectionDefinitions({name: 'Notebook', nodeType: notebookType});

const { connectionType: bibleNavConnection } = connectionDefinitions({ name: 'BibleNav', nodeType: bibleNavType });
const { connectionType: libraryPageConnection } = connectionDefinitions({ name: 'Page', nodeType: pageType });

export {
  userType,
  libraryType,
  widgetType,
  bibleNavType,
  pageType,
  notebookType,
  nodeInterface,
  nodeField
};