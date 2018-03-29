import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

function Ticket(props) {
    const ticketInformation = 
      <div>
        <h3>{props.location} - {props.names}</h3>
        <h4>{props.formattedWaitTime}</h4>
        <p><em>{props.issue}</em></p>
        <hr/>
      </div>;
    
    if (props.currentRouterPath === '/admin') {
      return (
        <div onClick={() => {alert('you just asked for details on the ticket belonging to ' + props.names );}}>
          {ticketInformation}
        </div>
      );
    } else {
      return (
        <div>
          {ticketInformation}
        </div>
      )
    }
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string.isRequired,
  formattedWaitTime: PropTypes.string.isRequired,
  currentRouterPath: PropTypes.string
};

export default Ticket;
