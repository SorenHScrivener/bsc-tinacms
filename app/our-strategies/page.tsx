import React, { Suspense } from 'react';
import PageComponent from "@/components/main";
import { client } from "@/tina/__generated__/client";

const fetchData = async () => {
    const result = await client.queries.pageAndNavAndData({ relativePath: "our-strategies.md" });
    return result;
};

const Page = async () => {
    const result = await fetchData();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageComponent {...result} />
        </Suspense>
    );
};

export default Page;