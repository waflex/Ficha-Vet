// import React from 'react'
import { Sidebar } from '../components/Sidebar';

function HomePage() {
  return (
    <div className="flex">
      {/* Menú */}
      <Sidebar />
      <div className="flex-grow p-4">
    </div>
    </div>
  );
}

export default HomePage;
