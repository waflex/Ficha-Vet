import { Spinner } from 'flowbite-react';

function Prueba() {
  return (
    <div className="flex h-full bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 items-center overflow-hidden">
      <div className="grid w-full justify-items-center scale-150">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    </div>
  );
}

export default Prueba;
