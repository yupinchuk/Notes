import classNames from 'classnames';
import { useState } from 'react';
import { MdOutlineDone, MdOutlineUndo } from 'react-icons/md';
import EventDetailsModal from './modals/EventDetailsModal';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updateTask } from '../redux/task/tasksOperations';

const ItemEvent = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState();

  const toggleModal = (id) => {
    setIsOpen((prev) => !prev);
    if (id) {
      setSelectedItemId(id);
    }
  };
  const dispatch = useDispatch();

  const markDoneHandler = () => {
    dispatch(
      updateTask({ ...event, completed: !event.completed, id: event._id })
    );
  };
  return (
    <>
      <div
        className={classNames(
          'flex items-center justify-between gap-2 border-b-[#5167f466] border-b py-2'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type='button'
          className='w-full outline-none focus:outline-none flex justify-start items-center'
          onClick={() => toggleModal(event._id)}
        >
          <p
            className={classNames(
              'text-sm text-black',
              event.completed && 'line-through'
            )}
          >
            {event.title.length > 24
              ? event.title.slice(0, 24).trim() + '...'
              : event.title}
          </p>
        </button>
        {isHovered && (
          <button
            className='flex items-center justify-center rounded-full p-1 border border-black w-5 h-5'
            onClick={markDoneHandler}
          >
            {event.completed ? <MdOutlineUndo /> : <MdOutlineDone />}
          </button>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => toggleModal()}
        ariaHideApp={false}
        className='top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg'
      >
        {selectedItemId && (
          <EventDetailsModal id={selectedItemId} handleClose={toggleModal} />
        )}
      </Modal>
    </>
  );
};

export default ItemEvent;
