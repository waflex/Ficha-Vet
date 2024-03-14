// import React from 'react'
import { Lateral } from '../components/Sidebar';
import { HiMenu } from 'react-icons/hi';

function HomePage() {
  return (
    <div className="flex h-full">
      {/* Menú */}
      <Lateral />
      <div className="flex-grow p-4">
        <button className="cel fixed top-5 left-5 right-0" onClick={onClick}>
          <HiMenu />
        </button>
        <h1>Esta es la Home page</h1>
      </div>
    </div>
  );
}
function onClick() {
  const sideBar = document.querySelector('.SideBar');
  sideBar.classList.toggle('show');
  const cel = document.querySelector('.cel');
  cel.classList.toggle('show');
}

export default HomePage;
