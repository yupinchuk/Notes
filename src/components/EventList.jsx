import moment from 'moment';
import React from 'react';
import ItemEvent from './ItemEvent';

const EventList = ({ events, date }) => {
  return events.map((event) => {
    return (
      moment(event.date).isSame(date, 'day') && (
        <ItemEvent key={event._id} event={event} />
      )
    );
  });
};

export default EventList;
