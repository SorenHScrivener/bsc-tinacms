import PageComponent from "@/components/main";
import { client } from "@/tina/__generated__/client"

export default async function page() {
    const result = await client.queries.pageAndNavAndData({ relativePath: "BackStory-Capitals-Homepage.md" });
    return (
        <>
            <PageComponent {...result} />
        </>
    )
}  