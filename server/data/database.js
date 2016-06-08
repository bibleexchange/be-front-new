class User {
  constructor(id, name, username, website) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.website = website;
  }
}

class Course {
  constructor(id, name, description, modules) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.modules = modules;
  }
}

class Module {
  constructor(id, name, description, chapters, course_id) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.chapters = chapters;
	this.course_id = course_id;
  }
}

class Chapter {
  constructor(id, name, description, steps, module_id) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.steps = steps;
	this.module_id = module_id;
  }
}

class Step {
  constructor(id, body, chapter_id) {
    this.id = id;
    this.body = body;
	this.chapter_id = chapter_id;
  }
}

class BibleNav {
  constructor(id, body, url) {
    this.id = id;
    this.body = body;
    this.url = url;
  }
}

class Notebook {
  constructor(id, url, title) {
    this.id = id;
    this.url = url;
    this.title = title;
  }
}

class Library {
  constructor(id, notebooks) {
    this.id = id;
    this.notebooks = notebooks;
  }
}

const notebooks = [
		new Notebook(1,'/notebooks/1_first-notebook','First Notebook'),
		new Notebook(2,'/notebooks/2_second-notebook','Second Notebook'),
		new Notebook(3,'/notebooks/3_third-notebook','Third Notebook'),
		new Notebook(4,'/notebooks/4_fourth-notebook','Fourth Notebook'),
		new Notebook(5,'/notebooks/5_fifth-notebook','Fifth Notebook')
	  ];

const libraryStore = new Library(1,notebooks);

const bibleNavs = [
		new BibleNav("01001001", "In the beginning God created the heaven and the earth", "/bible/genesis/1/1"),
		new BibleNav("01001002", "And the earth waas without form and void and darkness was upon the face of the deep.", "/bible/genesis/1/2")
	];

const steps = [
  new Step(1, 'Bible'),
  new Step(2, 'Book of Romans'),
  new Step(3, 'Through the Bible'),
  new Step(4, 'Personal Evangelism')
];

const chapters = [
  new Chapter(1, 'Bible', 'King James Version of the Bible', steps, 1),
  new Chapter(2, 'Book of Romans', 'A Study on Romans', steps,2),
  new Chapter(3, 'Through the Bible', 'through the bible', steps,3),
  new Chapter(4, 'Personal Evangelism', 'witnessing demystified', steps,4)
];

const modules = [
  new Module(1, 'Bible', 'King James Version of the Bible', chapters, 1),
  new Module(2, 'Book of Romans', 'A Study on Romans', chapters,2),
  new Module(3, 'Through the Bible', 'through the bible', chapters,3),
  new Module(4, 'Personal Evangelism', 'witnessing demystified', chapters,4)
];

const verses = [
  new Step(1, 'In the beginning God created the heaven and the earth.', 1),
  new Step(2, 'And the earth was without form and void.',2),
  new Step(3, 'And God said let there be light.',3),
  new Step(4, 'And God separated the waters from the waters.',4),
  new Step(5, 'cant remember.',5)
];

const bibleChapters = [
  new Chapter(1, 'Chapter One', 'creation of the world', verses,1),
  new Chapter(2, 'Chapter Two', 'creation of the world repeated', verses,1),
  new Chapter(3, 'Chapter Three', 'fall in the garden', verses,1),
  new Chapter(4, 'Chapter Four', 'cain and abel', verses,1),
  new Chapter(5, 'Chapter One', 'creation of the world', verses,2),
  new Chapter(6, 'Chapter Two', 'creation of the world repeated', verses,2),
  new Chapter(7, 'Chapter One', 'creation of the world', verses,3),
  new Chapter(8, 'Chapter Two', 'creation of the world repeated', verses,3),
  new Chapter(9, 'Chapter One', 'creation of the world', verses,4),
  new Chapter(10, 'Chapter Two', 'creation of the world repeated', verses,4),
  new Chapter(11, 'Chapter One', 'creation of the world', verses,5),
  new Chapter(12, 'Chapter Two', 'creation of the world repeated', verses,5),
];

const bibleModules = [
  new Module(1, 'Genesis', 'beginnings', bibleChapters),
  new Module(2, 'Exodus', 'going out', bibleChapters),
  new Module(3, 'Leviticus', 'priesthood', bibleChapters),
  new Module(4, 'Numbers', 'wanderings', bibleChapters),
  new Module(5, 'Deuteronomy', 'remember', bibleChapters)
];

const courses = [
  new Course(1, 'Bible', 'King James Version of the Bible', bibleModules),
  new Course(2, 'Book of Romans', 'A Study on Romans', modules),
  new Course(3, 'Through the Bible', 'through the bible', modules),
  new Course(4, 'Personal Evangelism', 'witnessing demystified', modules)
];

const lvarayut = new User('1', 'Varayut Lerdkanlayanawat', 'lvarayut', 'https://github.com/lvarayut/relay-fullstack');

function getUser(id) {
  return id === lvarayut.id ? lvarayut : null;
}

function getBibleNavs() {
  return bibleNavs;
}

function getNotebook(id) {
  return  notebooks[id];
}

function getLibrary() {
  return libraryStore;
}


function getCourse(id) {
  return courses.find(c => c.id === id);
}

function getCourses() {
  return courses;
}


function getChapter(id) {
  return chapters.find(ch => ch.id === id);
}

function getChapters() {
  return chapters;
}


function getModule(id) {
  return modules.find(m => m.id === id);
}

function getModules() {
  return modules;
}

function getModulesByCourse(courseId) {
	var course = courses.find(c => c.id === courseId);
	return course.modules;
}

function getStep(id) {
  return steps.find(s => s.id === id);
}

function getSteps() {
  return steps;
}

function getChaptersByModule(moduleId) {
	var module = modules.find(c => c.id === moduleId);
	return module.chapters;
}

function getStepsByChapter(chapterId) {
	var chapter = chapters.find(c => c.id === chapterId);
	return chapter.steps;
}

export {
  Course,
  Module,
  Chapter,
  Step,
  User,
  Notebook,
  getUser,
  getCourse,
  getCourses,
  getModule,
  getModules,
  getModulesByCourse,
  getChaptersByModule,
  getStepsByChapter,
  getChapter,
  getChapters,
  getSteps,
  getStep,
  getBibleNavs,
  getLibrary
};
