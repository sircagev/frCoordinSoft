import React from 'react';
import { RegisterCentro } from '../components/areas/RegisterCentro';
import GlobalTable from '../components/componets_globals/GlobalTable';
import UpdateCentro from '../components/areas/UpdateCentro';
import DeleteCentro from '../components/areas/DeleteCentro';
import CardComponent from '../components/CardComponent';

export const CentrosPage = () => {
  const columns = [
    'id',
    'nombre',
    'municipio',  // Aquí especificamos que vamos a manejar 'municipio' de forma especial
    'date_created',
    'date_modified',
  ];

  return (
    <>
      <main className='w-full p-3 h-screen'>
        <div className='my-5 flex flex-col py-5'>
            <CardComponent title="Modulo Centros"/>
          <RegisterCentro />
          <GlobalTable 
            columns={columns} 
            dataEndpoint="centro/" 
            updateComponent={UpdateCentro}
            deleteComponent={DeleteCentro}
          />
        </div>
      </main>
    </>
  );
};

export default CentrosPage;
