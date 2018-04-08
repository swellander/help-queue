import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Admin from './Admin';
import Error404 from './Error404';
import { Switch, Route } from 'react-router-dom';
import Moment from 'moment';
import { v4 } from 'uuid';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    };
    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
    this.handelChangingSelectedTicket = this.handelChangingSelectedTicket.bind(this);
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  //Handlers
  handelChangingSelectedTicket(ticketId) {
    this.setState({selectedTicket: ticketId});
  }
  handleAddingNewTicketToList(newTicket){
    var newTicketId = v4()
    var newMasterTicketList = Object.assign({}, this.state.masterTicketList, {
      [newTicketId]: newTicket
    });
    newTicket.formattedWaitTime = (newTicket.timeOpen).fromNow(true);
    this.setState({masterTicketList: newMasterTicketList});
  }
  
  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime() {
    var newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    Object.keys(newMasterTicketList).map(function(ticketId) {
      var ticket = newMasterTicketList[ticketId];
      ticket.formattedWaitTime = (ticket.timeOpen).fromNow(true)
    });
    this.setState({masterTicketList: newMasterTicketList});
  }


  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.state.masterTicketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl onNewTicketCreation={this.handleAddingNewTicketToList} />} />
          <Route path='/admin' render={(props)=><Admin selectedTicket={this.state.selectedTicket} onTicketSelection={this.handelChangingSelectedTicket} currentRouterPath={props.location.pathname} ticketList={this.state.masterTicketList} />}/>
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }

}

export default App;