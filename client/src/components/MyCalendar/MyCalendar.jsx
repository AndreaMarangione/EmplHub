import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Calendar, DateLocalizer, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from '../../dummy/dummy';
import './myCalendar.css';

export default function MyCalendar() {
    const defaultDate = useMemo(() => new Date(), []);
    const localizer = momentLocalizer(moment);
    return (
        <Fragment>
            <div className="myCalendar-height">
                <Calendar
                    defaultDate={defaultDate}
                    events={events}
                    localizer={localizer}
                    popup
                />
            </div>
        </Fragment>
    )
}
MyCalendar.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
}
