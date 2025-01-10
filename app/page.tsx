import React, { Suspense } from "react";
import PageComponent from "@/components/main";
import { client } from "@/tina/__generated__/client";

export default async function page() {
    const result = await client.queries.pageAndNavAndData({ relativePath: "BackStory-Capitals-Homepage.md" });
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageComponent {...result} />
        </Suspense>
    );
}