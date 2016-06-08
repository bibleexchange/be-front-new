class MyHelpers {
	 
	getFromJSON(objectToSearch,valueToFind){
		var allElementsThatMatch = objectToSearch.filter(function(obj) {
			return obj.id == valueToFind;
		});
		return allElementsThatMatch[0];
	}

	randomIntFromInterval(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	getRandomBibleChapter() {
		return this.randomIntFromInterval(1,1189);
	}

	safeUrl(url){
		return encodeURI(url).replace(/%20/g,'-');
	}
  
}

export default new MyHelpers();