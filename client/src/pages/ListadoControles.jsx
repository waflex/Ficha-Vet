import { Lateral } from '../components/Sidebar';
import { useEffect, useState } from 'react';
import React from 'react';
import { Checkbox, Table } from 'flowbite-react';
import { useControles } from '../context/ControlesContext';

function ListadoControles() {
  const { controles, getControles } = useControles();
  
  useEffect(() => {
    getControles();
    console.log('Controles:', controles);
  }, []);

  return (
    <>
      <div className="flex h-full">
        {/* Menú */}
        <Lateral />

        <div className="flex-grow p-6 max-h-full overflow-y-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox />
              </Table.HeadCell>
              <Table.HeadCell>Mascota</Table.HeadCell>
              <Table.HeadCell>Tutor</Table.HeadCell>
              <Table.HeadCell>Fecha</Table.HeadCell>
              <Table.HeadCell>Hora</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {controles.map((control, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {control.mascota}
                  </Table.Cell>
                  <Table.Cell>{}</Table.Cell>
                  <Table.Cell>{}</Table.Cell>
                  <Table.Cell>{}</Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}

export default ListadoControles;
