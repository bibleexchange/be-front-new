import Relay from 'react-relay'
import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill();

class Response {

	construct(data){
	  this.data = data;
	}

	json(){
	  return this.data;
	}

}

export default class NetworkLayer {
  constructor(auth, url = null) {
    this.auth = auth
    this.url = url || 'http://localhost:3000/graphql'
  }

  get defaultHeaders() {

    let bearer = 'Bearer '+ this.auth;

    return {
      'Authorization': bearer,
      'Accept': '*/*',
      'Content-Type': 'application/json'
    }
  }

  buildRequest(request) {
    return JSON.stringify({
      query: request.getQueryString(),
      variables: request.getVariables()
    })
  }

  sendMutation(request) {

    return fetch(this.url, {
      method: 'POST',
      body: this.buildRequest(request),
      headers: this.defaultHeaders
    }).
    then(response => response.json()).
    then(results => {
      if (results.errors) {
	console.log('we cannot connect to server to send mutation. :(');
        request.reject(new Error(this.formatRequestErrors(results.errors, request)))
      } else {
        request.resolve({ response: results.data })
      }
    })
  }

 myCachedFetch(request){

    let requestId = btoa(JSON.stringify(request.getQueryString()) + JSON.stringify(request.getVariables()));
    let localResponse = localStorage.getItem(requestId);
    console.log('I temporarily disabled local cached responses in MyNetworkLayer.js page 63.');
    if (false && localResponse !== null && localResponse !== "") {
      console.log('FETCHING FROM LOCAL STORAGE.');
      let data = {data:JSON.parse(localStorage.getItem(requestId))};
      return new Promise(function(resolve, reject) {return resolve(data)});
	//forcing load from server even if offline
    }else if(/*window.navigator.onLine*/ true) {
	console.log('FETCHING FROM SERVER.');
      return fetch(this.url, {
			  method: 'POST',
			  body: this.buildRequest(request),
			  headers: this.defaultHeaders
			}).then(response => {
			   return response.json();
			}).then(results => {
				//disabled caching query results as results are mixed with it
			   //localStorage.setItem(requestId, JSON.stringify(results.data));
			   return results;
			}).catch(function(error) {
		    		console.log('Request failed fetching from GRAPHQL server, Stephen. You better fix that problem pronto!', error)
				let data = {data:{viewer:error}};
				return new Promise(function(resolve, reject) {return resolve(data)});
		  });

    }else{
      let data = {data:{viewer:{errors:['You are not connected to the internet!']}}};
      return new Promise(function(resolve, reject) {return resolve(data)});
    }

  }

  sendQueries(requests) {

	  return Promise.all(requests.map(
	     request => this.myCachedFetch(request)
		.then(results => {
		       if (results.errors) {
			  request.reject(new Error(this.formatRequestErrors(results.errors, request)))
		       } else {
			  request.resolve({ response: results.data })
		       }
		 }).catch(function(error) {
		    console.log('Request failed Stephen. You better fix that problem pronto!', error)
		  })
	  ));

 }

  supports(options) {
    return false
  }

  formatRequestErrors(errors, request) {
    let CONTEXT_BEFORE = 20,
        CONTEXT_LENGTH = 60,
        queryLines = request.getQueryString().split('\n')

    return errors.map(({locations, message}, ii) => {
      var prefix = (ii + 1) + '. '
      var indent = ' '.repeat(prefix.length)

      //custom errors thrown in graphql-server may not have locations
      var locationMessage = locations ?
        ('\n' + locations.map(({column, line}) => {
          var queryLine = queryLines[line - 1]
          var offset = Math.min(column - 1, CONTEXT_BEFORE)
          return [
            queryLine.substr(column - 1 - offset, CONTEXT_LENGTH),
            ' '.repeat(offset) + '^^^',
          ].map(messageLine => indent + messageLine).join('\n')
        }).join('\n')) :
        ''

      return prefix + message + locationMessage

    }).join('\n')
  }
}
