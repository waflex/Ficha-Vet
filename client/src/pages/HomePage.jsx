// import React from 'react'
import { Lateral } from '../components/Sidebar';
import { HiMenu } from 'react-icons/hi';

function HomePage() {
  return (
    <div className="flex h-full">
      {/* Menú */}
      <Lateral />
      <div className="flex-grow p-4">
        <h1>Esta es la Home page</h1>
      </div>
    </div>
  );
}

export default HomePage;
