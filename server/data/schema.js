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
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

// Import methods that your schema can use to interact with your database
import {
	User,  Course, Module, Chapter, Step
} from './database';

import {
  // getModelsByClass,
  resolveArrayData,
  // getArrayData,
  // resolveArrayByClass,
  resolveModelsByClass
} from 'sequelize-relay';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);

    switch (type) {
      case 'User':
        return User.findByPrimary(id);
      case 'Course':
        return Course.findByPrimary(id);
      case 'Store':
        return store;
      default:
        return null;
    }

  },
  (obj) => {
    if (obj instanceof User.Instance) {
      return UserType;
    } else if (obj instanceof Course.Instance)  {
      return CourseType;
   } else if (obj instanceof Store)  {
      return StoreType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 * FIELDS:
 * 
 * id, firstName, lastName, username, createdAt, updatedAt, middleName, suffix, twitter, profileImage, gender, email, password, confirmationCode, confirmed, active
 */
 
var UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
	firstName: {
      type: GraphQLString,
      description: 'first name',
    },
	lastName: {
      type: GraphQLString,
      description: 'last anme',
    },
	username: {
      type: GraphQLString,
      description: 'username',
    },
	
	createdAt: {
      type: GraphQLString,
      description: 'created at',
    },
	updatedAt: {
      type: GraphQLString,
      description: 'udpated at',
    },
	middleName: {
      type: GraphQLString,
      description: 'middle name',
    },
	suffix: {
      type: GraphQLString,
      description: 'suffix',
    },
	twitter: {
      type: GraphQLString,
      description: 'twitter',
    },
	profileImage: {
      type: GraphQLString,
      description: 'url of profile image',
    },
	gender: {
      type: GraphQLString,
      description: 'gender',
    },
	email: {
      type: GraphQLString,
      description: 'email',
    },
	
	password: {
      type: GraphQLString,
      description: 'account password',
    },
	
	confirmationCode: {
      type: GraphQLString,
      description: 'confirmation code for account',
    },
	
	confirmed: {
      type: GraphQLString,
      description: 'confirmed',
    },
	active: {
      type: GraphQLString,
      description: 'active account',
    },
	bibleNavs: {
      type: GraphQLString,
      description: 'bible navs',
    },
  }),
  interfaces: [nodeInterface],
});

const CourseType = new GraphQLObjectType({
  name: 'Course',
  description: 'A course is a collection of sections',
  fields: () => ({
    id: globalIdField('Course'),
    title: {
      type: GraphQLString,
      description: 'The title of the course',
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
	  resolve: (course, args) => {
          return connectionFromPromisedArray(
            resolveArrayData(course.getModules(), true), args
          )
        }
    },
  }),
  interfaces: [nodeInterface],
});

const ModuleType = new GraphQLObjectType({
  name: 'Module',
  description: 'A module is a collection of chapters',
  fields: () => ({
    id: globalIdField('Module'),
    title: {
      type: GraphQLString,
      description: 'The title for the module',
    },
	 description: {
      type: GraphQLString,
      description: 'The description of the module',
    },
    courseId: {
      type: GraphQLInt,
      description: 'The id of the course this belongs to',
    },
	chapters: {
      type: chapterConnection,
      description: 'Chapters belonging to this module',
	  args: connectionArgs,
	  resolve: (module, args) => {
          return connectionFromPromisedArray(
            resolveArrayData(module.getChapters(), true), args
          )
        }
    },
    orderBy: {
      type: GraphQLInt,
      description: 'the order this should appear',
    },
  }),
  interfaces: [nodeInterface],
});

const ChapterType = new GraphQLObjectType({
  name: 'Chapter',
  description: 'A chapter is a collection of steps',
  fields: () => ({
    id: globalIdField('Chapter'),
    title: {
      type: GraphQLString,
      description: 'The title for the chapter',
    },
	 description: {
      type: GraphQLString,
      description: 'The description of the chapter',
    },
	moduleId: {
      type: GraphQLInt,
      description: 'The id of the module this belongs to',
    },
	steps: {
      type: stepConnection,
      description: 'Steps belonging to this chapter',
      args: connectionArgs,
      resolve: (chapter, args) => {
          return connectionFromPromisedArray(
            resolveArrayData(chapter.getSteps(), true), args
          )
        }
    },
    orderBy: {
      type: GraphQLInt,
      description: 'the order this should appear',
    }
  }),
  interfaces: [nodeInterface],
});

const StepType = new GraphQLObjectType({
  name: 'Step',
  description: 'The lowest level child of a course.',
  fields: () => ({
    id: globalIdField('Step'),
    body: {
      type: GraphQLString,
      description: 'The body of the step',
    },
	chapterId: {
      type: GraphQLInt,
      description: 'The id of the chapter this belongs to',
    },
    orderBy: {
      type: GraphQLInt,
      description: 'the order this should appear',
    },
    type: {
      type: GraphQLString,
      description: 'the type of step',
    }
  }),
  interfaces: [nodeInterface],
});

/**
 * Define your own connection types here
 */
var {connectionType: userConnection, edgeType: userEdge} = connectionDefinitions({name: 'User', nodeType: UserType});
var {connectionType: courseConnection, edgeType: courseEdge} = connectionDefinitions({name: 'Course', nodeType: CourseType});
var {connectionType: moduleConnection, edgeType: courseEdge} = connectionDefinitions({name: 'Module', nodeType: ModuleType});
var {connectionType: chapterConnection, edgeType: courseEdge} = connectionDefinitions({name: 'Chapter', nodeType: ChapterType});
var {connectionType: stepConnection, edgeType: courseEdge} = connectionDefinitions({name: 'Step', nodeType: StepType});


const StoreType = new GraphQLObjectType({
  name: 'Store',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField("Store"),
    people: {
      type: userConnection,
      args: connectionArgs,
      resolve: (root, args) => {
        return connectionFromPromisedArray(
          resolveArrayData(User.findAll(), true), args
        )
      }
    },
	course: {
      type: CourseType,
      description: 'an individual course',
      args: {
		  ...connectionArgs,
		  id: { type: GraphQLInt }
	  },
     resolve: (root, args) => {
        return Course.findById(args.id);
	  }
    },
    courses: {
      type: courseConnection,
      args: {
		...connectionArgs,
		filter: { type: GraphQLString } 
	  },
      resolve: (_, args) => {
        return connectionFromPromisedArray(
          resolveArrayData(
		  
		  Course.findAll({
			  where: {
				title: {
				   $like: '%'+args.filter+'%'
				}
			  }
			})
		  , true), args
        )
      }
    }
  }),
});

class Store {}
// Mock data
let store = new Store();

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
      type: UserType,
      resolve: (root, args) => User.authUser
    },
    courses: {
      type: courseConnection,
      description: 'A person\'s collection of courses',
      args: connectionArgs,
      resolve: (root, args) => {
        return connectionFromPromisedArray(
          resolveArrayData(Course.findAll(), true), args
        )
	  }
    },
	store: {
        type: StoreType,
        resolve: () => store,
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