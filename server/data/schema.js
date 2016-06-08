/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

// Import methods that your schema can use to interact with your database
import * as db from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return db.getUser(id);
    } else if (type === 'Course') {
      return db.getCourse(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof db.User) {
      return userType;
    } else if (obj instanceof db.Course)  {
      return courseType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

var userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
	name: {
      type: GraphQLString,
      description: 'username',
    },
	username: {
      type: GraphQLString,
      description: 'username',
    },
	website: {
      type: GraphQLString,
      description: 'username',
    },
    courses: {
      type: courseConnection,
      description: 'A person\'s collection of courses',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(db.getCourses(), args),
    },
	course: {
      type: courseType,
      description: 'an individual course',
      args: {
		  id: { type: GraphQLInt }
	  },
      resolve: (_, args) => db.getCourse(args.id),
    },
  }),
  interfaces: [nodeInterface],
});

var courseType = new GraphQLObjectType({
  name: 'Course',
  description: 'A course is a collection of sections',
  fields: () => ({
    id: globalIdField('Course'),
    name: {
      type: GraphQLString,
      description: 'The name of the course',
    },
	 url: {
      type: GraphQLString,
      description: 'The url of the course',
    },
	 description: {
      type: GraphQLString,
      description: 'The description of the course',
    },
	modules: {
      type: moduleConnection,
      description: 'Modules belonging to this course',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(db.getModulesByCourse(1), args),
    },
  }),
  interfaces: [nodeInterface],
});

var moduleType = new GraphQLObjectType({
  name: 'Module',
  description: 'A module is a collection of chapters',
  fields: () => ({
    id: globalIdField('Module'),
    name: {
      type: GraphQLString,
      description: 'The name of the module',
    },
	 description: {
      type: GraphQLString,
      description: 'The description of the module',
    },
    course_id: {
      type: GraphQLInt,
      description: 'The id of the course this belongs to',
    },
	chapters: {
      type: chapterConnection,
      description: 'Chapters belonging to this module',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(db.getChaptersByModule(1), args),
    },
  }),
  interfaces: [nodeInterface],
});

var chapterType = new GraphQLObjectType({
  name: 'Chapter',
  description: 'A chapter is a collection of steps',
  fields: () => ({
    id: globalIdField('Chapter'),
    name: {
      type: GraphQLString,
      description: 'The name of the chapter',
    },
	 description: {
      type: GraphQLString,
      description: 'The description of the chapter',
    },
	module_id: {
      type: GraphQLInt,
      description: 'The id of the module this belongs to',
    },
	steps: {
      type: stepConnection,
      description: 'Steps belonging to this chapter',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(db.getStepsByChapter(1), args),
    },
  }),
  interfaces: [nodeInterface],
});

var stepType = new GraphQLObjectType({
  name: 'Step',
  description: 'The lowest level child of a course.',
  fields: () => ({
    id: globalIdField('Step'),
    body: {
      type: GraphQLString,
      description: 'The body of the step',
    },
	chapter_id: {
      type: GraphQLInt,
      description: 'The id of the chapter this belongs to',
    },
  }),
  interfaces: [nodeInterface],
});

/**
 * Define your own connection types here
 */
var {connectionType: courseConnection} = connectionDefinitions({name: 'Course', nodeType: courseType});
var {connectionType: moduleConnection} = connectionDefinitions({name: 'Module', nodeType: moduleType});
var {connectionType: chapterConnection} = connectionDefinitions({name: 'Chapter', nodeType: chapterType});
var {connectionType: stepConnection} = connectionDefinitions({name: 'Step', nodeType: stepType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: userType,
      resolve: () => db.getUser('1'),
    },
  }),
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});