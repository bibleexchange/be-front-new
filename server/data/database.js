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

export {
  User,
  Widget,
  getUser,
  getWidget,
  getWidgets,
  getBibleNavs
};
