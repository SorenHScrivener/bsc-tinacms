import React, { Suspense } from 'react';
import PageComponent from "@/components/main";
import { client } from "@/tina/__generated__/client";

import Loader from "@/components/others/loader";

const fetchData = async () => {
    const result = await client.queries.pageAndNavAndData({ relativePath: "our-strategies.md" });
    return result;
};

const Page = async () => {
    const result = await fetchData();

    return (
        <Suspense fallback={<Loader />}>
            <PageComponent {...result} />
        </Suspense>
    );
};

export default Page;