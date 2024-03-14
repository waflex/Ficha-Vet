import { HiMenu } from 'react-icons/hi';
function ControlPage() {
  return (
    <>
      <button className="cel fixed top-5 left-5 right-0" onClick={onClick}>
        <HiMenu />
      </button>
      <div>ControlPage</div>
    </>
  );
}

export default ControlPage;

function onClick() {
  const sideBar = document.querySelector('.SideBar');
  sideBar.classList.toggle('show');
  const cel = document.querySelector('.cel');
  cel.classList.toggle('show');
}
