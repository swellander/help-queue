import React from 'react';
import PropTypes from 'prop-types';
import TicketList from './TicketList';

function Admin(props) {
  return (
    <div>
      <TicketList ticketList={props.ticketList} currentRouterPath={props.currentRouterPath} />
    </div>
  );
}

Admin.propTypes = {
  ticketList: PropTypes.array,
  currentRouterPath: PropTypes.string.isRequired
};

export default Admin;