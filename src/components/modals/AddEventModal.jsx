import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/task/tasksOperations';

const AddEventModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      date: '',
      description: '',
    },
    onSubmit: (values) => {
      dispatch(addTask({ ...values, completed: false }));
      closeModal();
    },
  });

  return (
    <div className='p-6 bg-[#dde1fb] rounded-3xl min-w-[300px] sm:p-4 sm:min-w-[300px] md:p-6 md:min-w-[400px] lg:p-8 lg:min-w-[512px]'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold text-black'>Add Event</h2>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit} className=''>
          <input
            type='text'
            className='w-full pb-1 bg-transparent focus:outline-none border-b border-b-[#0000004d] placeholder-[#0000004d] mb-2'
            name='title'
            placeholder='Title'
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
          <input
            type='date'
            className='w-full bg-transparent focus:outline-none border-b border-b-[#0000004d] placeholder-[#0000004d] py-2'
            name='date'
            placeholder='Date'
            value={formik.values.date}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
