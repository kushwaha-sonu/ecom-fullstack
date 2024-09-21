import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import SettingsForm from './setting-form';

interface SettingsPageProps { 
params:{storeId:string}
}

const SettingsPage = async({ params }: SettingsPageProps) => {
    
    const { userId } = auth();
    
    if (!userId) {
        return redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        },
    });

    if (!store) {
        return redirect("/");
    }
    
    return <div className='flex-col'>
      
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SettingsForm initialData={store} />

        </div>
  </div>;
};

export default SettingsPage