class User {
  constructor(id, name, username, website) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.website = website;
  }
}

class Widget {
  constructor(id, name, description, url) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
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

const widgets = [
  new Widget('1', 'Bible', 'King James Version of the Bible', '/bible'),
  new Widget('2', 'Notebooks', 'Collection of Bible Notes.', '/notebooks')
];
	
const lvarayut = new User('1', 'Varayut Lerdkanlayanawat', 'lvarayut', 'https://github.com/lvarayut/relay-fullstack');

function getUser(id) {
  return id === lvarayut.id ? lvarayut : null;
}

function getWidget(id) {
  return widgets.find(w => w.id === id);
}

function getWidgets() {
  return widgets;
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

export {
  User,
  Notebook,
  Widget,
  getUser,
  getWidget,
  getWidgets,
  getBibleNavs,
  getLibrary
};
