'use client';

import React from 'react';
import JokeComponent from './components/JokeComponent';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const HomePage: React.FC = () => {
  const total = useSelector((state: RootState) => state.counter.total);

  return (
    <div>
      <JokeComponent />
      
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  counter: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '18px',
  },
};

export default HomePage;