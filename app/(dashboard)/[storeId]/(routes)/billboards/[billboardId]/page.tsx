import prismadb from '@/lib/prismadb'
import React from 'react'
import BillboardForm from './billboard-form';

const CreateBillBoardPage = async ({ params }: { params: { billboardId: string } }) => {
    
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })

    console.log(billboard);
    
    

  return (
      <div className='flex-col'>
          <div className='flex-1 space-y-4 p-8 pt-6'>
              <BillboardForm initialData={billboard}/>
          </div>
          
    </div>
  )
}

export default CreateBillBoardPage