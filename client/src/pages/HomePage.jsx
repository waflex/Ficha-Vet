// import React from 'react'
import { Sidebar } from '../components/Sidebar';

function HomePage() {
  return (
    <div className="flex">
      {/* Menú */}
      <Sidebar />
      <div className="flex-grow p-4">
        {' '}
        <h1>Esta es la Home page</h1>
      </div>
    </div>
  );
}

export default HomePage;
