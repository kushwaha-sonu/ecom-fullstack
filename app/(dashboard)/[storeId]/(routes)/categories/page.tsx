import React from 'react'
import CategoryClient from "./client";
import prismadb from '@/lib/prismadb'
import { CategoryColumn } from "./columns";
import { format } from 'date-fns'

const CategoriesPage = async({params}:{params:{storeId:string}}) => {

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })


  const formatedCategory: CategoryColumn[] = categories.map((items) => ({
    id: items.id,
    name: items.name,
    billboardLabel: items.billboard.label,
    createdAt: format(items.createdAt, "dd/MM/yyyy"),
  }));




  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formatedCategory} />
      </div>
    </div>
  );
}

export default CategoriesPage;