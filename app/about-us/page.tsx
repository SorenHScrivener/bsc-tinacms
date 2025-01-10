import PageComponent from "@/components/main";
import { client } from "@/tina/__generated__/client";
import { Suspense } from "react";

export default async function page() {
    const result = await client.queries.pageAndNavAndData({ relativePath: "About-BackStory-Capital.md" });
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageComponent {...result} />
        </Suspense>
    );
}
