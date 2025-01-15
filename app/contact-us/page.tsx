import React, { Suspense } from "react";
import PageComponent from "@/components/main";
// import { PageAndNavAndDataQuery } from '@/tina/__generated__/types'
import { client } from "@/tina/__generated__/client";
// import { tinaField } from 'tinacms/dist/react'
// import { useTina } from 'tinacms/dist/react';
import Loader from "@/components/others/loader";

const Page = async () => {
    const result = await client.queries.pageAndNavAndData({ relativePath: "contact-us.md" });
    return (
        <Suspense fallback={<Loader />}>
            <PageComponent {...result} />
        </Suspense>
    );
};

export default Page;