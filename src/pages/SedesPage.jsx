import React from 'react';
import { RegisterSede } from '../components/sedes/RegisterSede';
import GlobalTable from '../components/componets_globals/GlobalTable';
import UpdateSede from '../components/sedes/UpdateSede';
import DeleteSede from '../components/sedes/DeleteSede';
import CardComponent from '../components/CardComponent';

export const SedesPage = () => {
  const columns = [
    'id',
    'nombre_sede',
    'centro_sede',
    'direccion_sede',
    'date_created',
    'date_modified',
  ];

  return (
    <>
      <main className='w-full p-3 h-screen'>
        <div className='my-5 flex flex-col py-5'>

            <CardComponent title="Modulo Sedes"/>
          <RegisterSede />
          <GlobalTable 
            columns={columns} 
            dataEndpoint="sede/" 
            updateComponent={UpdateSede}
            deleteComponent={DeleteSede}
          />
        </div>
      </main>
    </>
  );
};

export default SedesPage;
