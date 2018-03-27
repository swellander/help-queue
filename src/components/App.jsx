//Steps to turn stateless functional component into a class-based component: https://www.learnhowtoprogram.com/react/managing-state/lifting-state-part-2

// Create an ES6 class with the same name that extends React.Component.
// Add a single empty method to it called render().
// Move the body of the function into the render() method.
// Replace any calls to props with this.props in the render() body. (And, calls to any event handlers should change from eventHandlerName to this.eventHandlerName).
// Delete the remaining empty function declaration.

import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Error404 from './Error404';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: []
    };

    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
  }

  handleAddingNewTicketToList(newTicket) {
    let newMasterTicketList = this.state.masterTicketList.slice();
    newMasterTicketList.push(newTicket);
    this.setState({masterTicketList: newMasterTicketList});
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={() => <TicketList ticketList={this.state.masterTicketList} />} />
          <Route path='/newticket' render={() => <NewTicketControl onNewTicketCreation={this.handleAddingNewTicketToList}/> } />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}



export default App;
