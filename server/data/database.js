"use strict";

import Sequelize from 'sequelize';
import path from 'path';

const db_config = {
	name: "dev_exchange",
	user: "root",
	password: "",
	host:"127.0.0.1",
	dialect: "mysql"
};

const Conn = new Sequelize(db_config.name, db_config.user, db_config.password, {
  host: db_config.host,
  dialect: db_config.dialect,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

const UserSeq = Conn.define('user', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
	primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'firstname'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'lastname'
  },
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  createdAt: {
    type: Sequelize.STRING,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.STRING,
    field: 'updated_at'
  },
  middleName: {
    type: Sequelize.STRING,
    field: 'middlename'
  },
  suffix: {
    type: Sequelize.STRING,
    field: 'suffix'
  },
  twitter: {
    type: Sequelize.STRING,
    field: 'twitter'
  },
  profileImage: {
    type: Sequelize.STRING,
    field: 'profile_image'
  },
  gender: {
    type: Sequelize.STRING,
    field: 'gender'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
  password: {
    type: Sequelize.STRING,
    field: 'password'
  },
  confirmationCode: {
    type: Sequelize.STRING,
    field: 'confirmation_code'
  },
  confirmed: {
    type: Sequelize.STRING,
    field: 'confirmed'
  },
  active: {
    type: Sequelize.STRING,
    field: 'active'
  }
}, {
  tableName: "users"
});

class User {
	
	constructor(token){
		this.token = false;
		this.props = false;
		this.authorize(token);
	}
	
	authorize(token){
		
		const tokenIsGood = false;
		
		if(token) {
			tokenIsGood = true;
		}
		
		if(tokenIsGood){
			return UserSeq.findById(1);
		}else{
			return false;
		}
	}
	
}

//id , bible_verse_id, title, description, image_id, user_id, year, public, created_at, updated_at

const Course = Conn.define('course', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
	primaryKey: true
  },
  bibleVerseId: {
    type: Sequelize.INTEGER,
    field: 'bible_verse_id'
  },
  title: {
    type: Sequelize.STRING,
    field: 'title'
  },
  description: {
    type: Sequelize.STRING,
    field: 'description'
  },
  imageId: {
    type: Sequelize.INTEGER,
    field: 'image_id'
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  },
  year: {
    type: Sequelize.STRING,
    field: 'user_id'
  },
  public: {
    type: Sequelize.INTEGER,
    field: 'public'
  },
  createdAt: {
    type: Sequelize.STRING,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.STRING,
    field: 'updated_at'
  }
}, {
  tableName: "courses"
});

const Module = Conn.define('module', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
	primaryKey: true
  },
  courseId: {
    type: Sequelize.INTEGER,
    field: 'course_id'
  },
  title: {
    type: Sequelize.STRING,
    field: 'title'
  },
  orderBy: {
    type: Sequelize.INTEGER,
    field: 'order_by'
  },
  createdAt: {
    type: Sequelize.STRING,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.STRING,
    field: 'updated_at'
  }
}, {
  tableName: "modules"
});

const Chapter = Conn.define('chapter', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
	primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    field: 'title'
  },
  orderBy: {
    type: Sequelize.INTEGER,
    field: 'order_by'
  },
  createdAt: {
    type: Sequelize.STRING,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.STRING,
    field: 'updated_at'
  },
  moduleId: {
    type: Sequelize.STRING,
    field: 'module_id'
  }
}, {
  tableName: "chapters"
});

const Step = Conn.define('step', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
	primaryKey: true
  },
  body: {
    type: Sequelize.JSON,
    field: 'body'
  },
  orderBy: {
    type: Sequelize.INTEGER,
    field: 'order_by'
  },
  type: {
    type: Sequelize.STRING,
    field: 'type'
  },
  chapterId: {
    type: Sequelize.INTEGER,
    field: 'chapter_id'
  },
  createdAt: {
    type: Sequelize.STRING,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.STRING,
    field: 'updated_at'
  }
}, {
  tableName: "steps"
});

Course.hasMany(Module);
Module.belongsTo(Course, {foreignKey: 'course_id'});
Module.hasMany(Chapter);
Chapter.belongsTo(Module, {foreignKey: 'module_id'});
Chapter.hasMany(Step);
Step.belongsTo(Chapter, {foreignKey: 'chapter_id'});

module.exports = {
   Conn, User,  Course, Module, Chapter, Step
};