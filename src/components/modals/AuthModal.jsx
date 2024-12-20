import classNames from 'classnames';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { register, signIn } from '../../redux/user/userOperations';

const AuthModal = ({ closeModal }) => {
  const [ifRegister, setIfRegister] = useState(false);

  const initialValues = ifRegister
    ? {
        name: '',
        email: '',
        password: '',
      }
    : {
        email: '',
        password: '',
      };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (ifRegister) {
        dispatch(register(values));
      } else {
        const res = await dispatch(signIn(values)).unwrap();
        if (res.message === 'login success') {
          closeModal();
        }
      }
    },
  });

  const toggleRegister = () => {
    setIfRegister((prev) => !prev);
    formik.resetForm();
  };

  const isDisabled =
    formik.values.email === '' ||
    formik.values.password === '' ||
    (ifRegister && formik.values.name === '');
  return (
    <div className='bg-[#f8e8e2] p-6 rounded-3xl min-w-[300px] sm:p-4 sm:min-w-[300px] md:p-6 md:min-w-[400px] lg:p-8 lg:min-w-[512px]'>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex justify-between mb-16'>
          <h2 className='text-xl font-bold'>
            {ifRegister ? 'Hello, nice to meet you!' : 'Hello, welcome back!'}
          </h2>
          <button
            type='button'
            className='bg-transparent border border-black text-black py-4 px-3 rounded-xl text-sm flex items-center justify-center h-10'
            onClick={toggleRegister}
          >
            Sing up
          </button>
        </div>
        {ifRegister && (
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Name'
              id='name'
              name='name'
              onChange={formik.handleChange}
              value={formik.values.name}
              className='w-full p-0 border-b border-b-black bg-transparent focus:border-b-[#0000004d] focus:outline-none placeholder:pb-2 placeholder:text-base'
            />
          </div>
        )}
        <div className='mb-6'>
          <input
            type='text'
            placeholder='Email'
            id='email'
            name='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            className='w-full p-0 border-b border-b-black bg-transparent focus:border-b-[#0000004d] focus:outline-none placeholder:pb-2 placeholder:text-base'
          />
        </div>
        <div className='mb-6'>
          <input
            type='password'
            placeholder='Password'
            id='password'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            className='w-full p-0 border-b border-b-black bg-transparent focus:border-b-[#0000004d] focus:outline-none placeholder:pb-2 placeholder:text-base'
          />
        </div>
        {ifRegister && (
          <div className='mb-6 text-[#0000004d] text-xs'>
            <p>
              By proceeding, you agree to the Terms and Conditions, Privacy
              Policy & Cookies Policy
            </p>
          </div>
        )}
        <div>
          <button
            type='submit'
            disabled={isDisabled}
            className={classNames(
              'min-w-[48px] w-full py-2 px-6 h-10 rounded-3xl bg-black font-bold text-white text-base flex items-center justify-center cursor-pointer whitespace-nowrap',
              {
                'bg-[#1301014d] text-[#ffffff66] cursor-default': isDisabled,
              }
            )}
          >
            {ifRegister ? 'Create account ' : 'Let me in'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthModal;
