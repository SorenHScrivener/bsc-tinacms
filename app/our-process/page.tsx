import PageComponent from "@/components/main";
import { client } from "@/tina/__generated__/client"

export default async function page() {
    const result = await client.queries.pageAndNavAndData({ relativePath: "our-process.md" });
    return (
        <>
            <PageComponent {...result} />
        </>
    )
}