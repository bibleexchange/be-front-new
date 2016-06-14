import React from 'react';
import { Grid, Cell, Textfield, Button, Checkbox } from 'react-mdl';
import Page from '../Page/PageComponent';

export default class Login extends React.Component {
	
	  constructor(props) {
		super(props);	
		this.state = {
			email: "sgrjr@deliverance.me",
			password: "happy"
		};
	  }
	
   _handleSubmit = () => {
    // To perform a mutation, pass an instance of one to
    // `this.props.relay.commitUpdate`
    this.props.relay.commitUpdate(
      new LoginUserMutation({email: this.state.email, password: this.state.password})
    );
  }
	
  render() {
    return (
      <Page heading='Login'>
        <div style={{ width: '70%', margin: 'auto' }}>
          <Grid>
            <form style={{ margin: 'auto' }}>
              <Cell col={12}>
                <Textfield onChange={(e) => {this.setState({email:e.target.value})}} label='Email' />
              </Cell>
              <Cell col={12}>
                <Textfield  onChange={(e) => {this.setState({password:e.target.value})}} label='Password' />
              </Cell>
              <Cell col={12}>
                <Checkbox label='Remember me' ripple style={{ textAlign: 'right' }} />
              </Cell>
              <Cell col={12} style={{ textAlign: 'right' }}>
                <a href='#'>Forgot password</a>
                <Button primary onClick={this._handleSubmit}>Login</Button>
              </Cell>
            </form>
          </Grid>
        </div>
      </Page>
    );
  }
}
