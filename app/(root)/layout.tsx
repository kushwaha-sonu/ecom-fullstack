import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

interface SetupLayoutProps { 
    children: React.ReactNode;
}

const SetupLayout = async ({ children }: SetupLayoutProps) => {
    
      const { userId } = auth();

      if (!userId) {
        return redirect("/sign-in");
      }

      const store = await prismadb.store.findFirst({
        where: {
          userId,
        },
      });

      if (store) {
        return redirect(`/${store.id}`);
      }
    


  return (
      <>{ children}</>
  )
}

export default SetupLayout