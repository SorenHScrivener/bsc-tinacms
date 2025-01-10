import React, { Suspense } from "react";
import PageComponent from "@/components/main";
import { client } from "@/tina/__generated__/client";

import Loader from "@/components/others/loader";

export default async function page() {
    const result = await client.queries.pageAndNavAndData({ relativePath: "BackStory-Capitals-Homepage.md" });
    return (
        <Suspense fallback={<Loader/>}>
            <PageComponent {...result} />
        </Suspense>
    );
}