import React from 'react';

export default class Signup extends React.Component {
  render() {
    return (
        <div style={{ width: '70%', margin: 'auto' }}>
 
            <form style={{ margin: 'auto' }}>
                email: <input type="text" onChange={() => {}} />
                password: <input type="text" onChange={() => {}} />
                <input type="submit" value="Sign up" />

            </form>

        </div>
    );
  }
}
