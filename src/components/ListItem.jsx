import moment from 'moment';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksForWeek } from '../utils/prepareData';
import { useEffect, useState } from 'react';
import EventList from './EventList';
import { useFormik } from 'formik';
import { addTask } from '../redux/task/tasksOperations';

const ListItem = ({ item, index, nWeeks }) => {
  const [events, setEvents] = useState([]);

  const ifToday = moment(item).isSame(moment(), 'day');
  const ifIndex = (index && 'h-1/2') || 'min-h-full';
  const items = useSelector((state) => state.tasks.items);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const events = getTasksForWeek(items, nWeeks);
      setEvents(events);
    } else {
      setEvents([]);
    }
  }, [items, nWeeks, isLoggedIn]);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: moment(item).format('YYYY-MM-DD'),
    },
    onSubmit: (values) => {
      dispatch(addTask({ ...values, completed: false }));
      formik.resetForm();
    },
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  };
  return (
    <li
      className={classNames(
        'flex flex-col gap-3 py-3 px-4 rounded-md h-fit',
        ifIndex,
        'min-h-full sm:min-h-[75%] md:min-h-[66%] lg:min-h-full'
      )}
    >
      <div
        className={classNames(
          'flex justify-between items-baseline pb-3 border-b-2',
          ifToday ? 'border-b-[#5167f6]' : 'border-b-black'
        )}
      >
        <h2
          className={classNames(
            'text-lg  font-bold',
            ifToday ? 'text-[#5167f6]' : 'text-black'
          )}
        >
          {moment(item).format('DD.MM')}
        </h2>
        <p
          className={classNames(
            'text-lg font-bold opacity-20',
            ifToday ? 'text-[#5167f6]' : 'text-black'
          )}
        >
          {moment(item).format('ddd')}
        </p>
      </div>
      <EventList events={events} date={item} />
      <div>
        <input
          onBlur={formik.handleSubmit}
          onChange={formik.handleChange}
          value={formik.values.title}
          onKeyDown={handleKeyDown}
          id='title'
          name='title'
          type='text'
          placeholder='Create new task'
          className='peer w-full px-4 py-2 mt-2 border-b border-b-[#5167f466]  hover:bg-slate-100 focus:bg-slate-100 focus:outline-none'
        />
      </div>
    </li>
  );
};

export default ListItem;
