import React from 'react';
import PropTypes from 'prop-types';
import Ticket from './Ticket';

function TicketList(props) {
  return (
    <div>
      <hr/>

      {Object.keys(props.ticketList).map(function(ticketId) {
        var ticket = props.ticketList[ticketId];
        return <Ticket names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={ticket.id}
          ticketId={ticketId}
          currentRouterPath={props.currentRouterPath}
          formattedWaitTime={ticket.formattedWaitTime} 
          onTicketSelection={props.onTicketSelection}/>
      })}

    </div>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.object,
  currentRouterPath: PropTypes.string,
  onTicketSelection: PropTypes.func
};

export default TicketList;
