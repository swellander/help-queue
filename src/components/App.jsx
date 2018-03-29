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
      masterTicketList: [
        {
          names: 'Sam and Andy',
          location: 'Room 4f',
          issue: 'Having trouble deterimining which of us is taller. Tried using our eyes but can\'t get the angle. Need third opinion.',
          id: v4(),
          timeOpen: new Moment()
        },
        {
          names: 'John and Lorenzo',
          location: 'Room 2e',
          issue: 'John\'s back itches but I cannot help him because I am lost in my own thoughts. Help plz.',
          id: v4(),
          timeOpen: new Moment()
        },
        {
          names: 'Rufus and Palosi',
          location: 'Room 2f',
          issue: 'Help us. Dear ppl plz help us. We don\'t need it help we just really really want it.',
          id: v4(),
          timeOpen: new Moment()
        }
      ]
    };
    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime() {
    let newMasterTicketList = this.state.masterTicketList.slice();
    newMasterTicketList.forEach((ticket) =>
      ticket.formattedWaitTime = (ticket.timeOpen).fromNow(true)
    );
    this.setState({masterTicketList: newMasterTicketList});
  }

  handleAddingNewTicketToList(newTicket){
    var newMasterTicketList = this.state.masterTicketList.slice();
    newTicket.formattedWaitTime = (newTicket.timeOpen).fromNow(true);
    newMasterTicketList.push(newTicket);
    this.setState({masterTicketList: newMasterTicketList});
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.state.masterTicketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl onNewTicketCreation={this.handleAddingNewTicketToList} />} />
          <Route path='/admin' render={(props)=><Admin currentRouterPath={props.location.pathname} ticketList={this.state.masterTicketList} />}/>
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }

}

export default App;