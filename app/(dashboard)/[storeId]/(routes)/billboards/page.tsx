import React from 'react'
import BillboardClient from './client'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './columns'
import { format } from 'date-fns'

const BillBoardsPage = async({params}:{params:{storeId:string}}) => {

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })


  const formatedBillboard: BillboardColumn[] = billboards.map((items) => ({
    id: items.id,
    label: items.label,
    createdAt: format(items.createdAt, 'dd/MM/yyyy')
  }));




  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatedBillboard} />
      </div>
    </div>
  );
}

export default BillBoardsPage