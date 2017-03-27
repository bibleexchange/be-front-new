import React from 'react';

export default class Search extends React.Component {

  componentWillMount() {
    this.state = {
      search: this.props.term
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ search: newProps.term });
  }

  render() {
    return (
		<form id='bibleSearch' role='search' onSubmit={this.submitSearch.bind(this)}>
			<input type='text' name='q' id='reference' value={this.state.search}
  onChange={this.updateSearch.bind(this)}
  onBlur={this.submitSearch.bind(this)}
			></input>
		</form>
    );
  }

  updateSearch(e) {
    this.setState({ search: e.target.value });
  }

  submitSearch(e) {
    e.preventDefault();
    this.props.submitHandler(this.state.search);
  }
}
