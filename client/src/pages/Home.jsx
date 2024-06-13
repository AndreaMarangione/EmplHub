import React from 'react';
import useSession from '../Hooks/useSession';

const Home = () => {
  const { decodeSession } = useSession();
  return (
    <div>Home Page</div>
  )
}

export default Home;
