import React, { Suspense } from "react";
import PageComponent from "@/components/main";
// import { PageAndNavAndDataQuery } from '@/tina/__generated__/types'
import { client } from "@/tina/__generated__/client";
// import { tinaField } from 'tinacms/dist/react'
// import { useTina } from 'tinacms/dist/react';

const Page = async () => {
    const result = await client.queries.pageAndNavAndData({ relativePath: "contact-us.md" });
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageComponent {...result} />
        </Suspense>
    );
};

export default Page;