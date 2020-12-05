import React, { createContext } from 'react'

export const UserContext = createContext();

class UserContextProvider extends React.Component {
  state = {
    loggedInUserToken: "",
  }

  setUserToken = (token) => {
    this.setState({loggedInUserToken: {token}})
  }
  
  render() {
    return(
      <UserContext.Provider value={{...this.state, setUserToken: this.setUserToken()}}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;