import React, { useEffect } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import SadSmileIcon from '../components/icons/SadSmileIcon/SadSmileIcon';
import './css/pageNotFound.css';

const PageNotFound = () => {
  const { session } = useSession();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('');
  }
  useEffect(() => {
    if (session) {
      dispatch(login(session));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <MainLayout childrens={
      <div className='d-flex flex-column justify-content-center align-items-center gap-2 mt-5'>
        <SadSmileIcon classStyle='pageNotFound-smile' />
        <h1 className='text-muted m-0'>404</h1>
        <h3 className='text-muted m-0'>Page not found</h3>
        <p className='text-muted text-center m-0'>The Page you are looking for doesn't exist or an
          other error occured. Go back, or click
          <span
            onClick={handleNavigate}
            className='pageNotFound-link'>
            here
          </span>
          to be redirected to the dashboard</p>
      </div>
    } />
  )
}

export default PageNotFound;
