import { useFormik } from 'formik';
import moment from 'moment';
import {
  MdOutlineDone,
  MdCalendarMonth,
  MdOutlineDelete,
  MdOutlineUndo,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask } from '../../redux/task/tasksOperations';

const EventDetailsModal = ({ id, handleClose }) => {
  const item = useSelector((state) =>
    state.tasks.items.find((el) => el._id === id)
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: item.title,
      date: item.date,
      description: item.description || '',
    },
    onSubmit: (values) => {
      dispatch(updateTask({ ...item, ...values, id: item._id }));
      handleClose();
    },
  });

  const markDoneHandler = () => {
    dispatch(updateTask({ ...item, completed: !item.completed, id: item._id }));
  };
  const deleteTaskHandler = () => {
    dispatch(deleteTask(item._id));
    handleClose();
  };
  return (
    <div className='p-6 bg-[#dde1fb] rounded-3xl min-w-[300px] sm:p-4 sm:min-w-[300px] md:p-6 md:min-w-[400px] lg:p-8 lg:min-w-[512px]'>
      <div className='flex justify-between items-center mb-16'>
        <div className='text-sm font-bold flex items-center gap-1'>
          <MdCalendarMonth />
          <span>{moment(item.date).format('ddd, D MMM YYYY')}</span>
        </div>
        <div>
          <button
            className='bg-transparent text-black rounded-full text-sm h-9 w-8'
            onClick={markDoneHandler}
          >
            {item.completed ? <MdOutlineUndo /> : <MdOutlineDone />}
          </button>
          <button
            className='bg-transparent text-black rounded-full text-sm h-9 w-8'
            onClick={deleteTaskHandler}
          >
            <MdOutlineDelete />
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit} className=''>
          <input
            type='text'
            className='w-full pb-1 bg-transparent focus:outline-none border-b border-b-[#0000004d] placeholder-[#0000004d] mb-2'
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <textarea
            className='w-full bg-transparent focus:outline-none border-b border-b-[#0000004d] placeholder-[#0000004d] py-2'
            name='description'
            placeholder='Description'
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <div className='flex justify-between mt-8'>
            <button
              className='bg-black text-white rounded-full text-sm px-4 py-1 min-w-20'
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-black text-white rounded-full text-sm px-4 py-1 min-w-20'
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDetailsModal;
