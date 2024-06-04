import React from 'react'
import TableCoordiSoft from '../components/Table/TableCoordiSoft'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";

function MovimientosPage() {
  return (
    <>

      <main className='w-full px-7'>
        <Card className='my-4 ' shadow='none'>
          <CardHeader className='flex flex-col items-start'>
            <p className='text-[30px]'>Titulo</p>
            <p className='text-xs'>Subtitulo</p>
          </CardHeader>
          <Divider className='mx-[2%] max-w-[96%]'></Divider>
          <CardBody className=''>
            <div className='flex w-full  px-6'>
              <div className='w-1/2 flex justify-center items-center'>
                <input type="text" placeholder='ajajja'  className='h-[40px] border-gray-400 border p-3 rounded-lg w-4/5'/>
              </div>
              <div className='flex gap-3 w-1/2 justify-end'>
                <Button className='h-[60px] w-[120px]' radius='lg' color="success" variant="shadow">+ Movimiento</Button>
                <Button className='h-[60px] w-[120px]' radius='lg' color='warning' variant="shadow">Button</Button>
              </div>
            </div>
          </CardBody>
        </Card>
        <TableCoordiSoft></TableCoordiSoft>
      </main>
    </>
  )
}

export default MovimientosPage