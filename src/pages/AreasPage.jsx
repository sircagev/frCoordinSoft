import React from 'react'
import { RegisterArea } from '../components/areas/RegisterArea'
import RegisterAreaSede from '../components/areas/RegisterAreaSede'
import GlobalTable from '../components/componets_globals/GlobalTable'

export const AreasPage = () => {
  const columns = [
    'id',
    'nombre_area',
    'date_created',
    'date_modified'
  ];

  const columns2 = [
    'id',
    'sede_area',
    'area_AreaSede',
    'persona_administra',
    'date_created',
    'date_modified'
  ];

  return (
    <>
      <main className='w-full p-3 h-screen '>
        <div className='my-5 flex flex-col py-5'>
          <RegisterArea />
          <GlobalTable 
            columns={columns} 
            dataEndpoint="area/" 
          />
        </div>
        <div className='my-5 flex flex-col py-5'>
       <RegisterAreaSede />
       <GlobalTable 
            columns={columns2} 
            dataEndpoint="areaSede/" 
          />
       </div>
      </main>
    </>
  )
}

export default AreasPage;
