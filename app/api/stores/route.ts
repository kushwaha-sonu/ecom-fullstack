import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, ) {

    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { name } = await req.json();

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const existingStore = await prismadb.store.findFirst({
            where: {
                name,
            },
        });

        if (existingStore) {
            return new NextResponse("Store with name already taken", { status: 400 });
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId,
            },
        });

        return  NextResponse.json(store);


        
    } catch (error) {
        console.error(error);
        return new NextResponse("[STORE_CREATE]", { status: 500 });
        
    }
 
}