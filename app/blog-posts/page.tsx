import PageComponent from "@/components/main";
import { client } from "@/tina/__generated__/client"
// import BlogWrapper from "@/components/wrappers/blogWrapper"; 

export default async function page(): Promise<JSX.Element> {
    const result = await client.queries.pageAndNavAndData({ relativePath: "blog-posts.md" });
    const blogPostsResult = await client.queries.blogPostsConnection()
    const blogPosts = blogPostsResult.data.blogPostsConnection.edges?.map((post) => {
        if (post?.node) {
            return {
                slug: post.node._sys.filename,
                title: post.node.title,
                date: post.node.date,
                isDraft: post.node.isDraft,
            };
        }
        return null;
    }).filter(Boolean);

    const blogPostsArray = await Promise.all(blogPosts?.map(async (post) => {
        const result = await client.queries.blogPosts({ relativePath: `${post!.slug}.mdx` });
        return result;
    }) || []);
    
    const data = result.data as { blogPosts?: typeof blogPostsArray };
    data.blogPosts = blogPostsArray;
    return (
        <PageComponent  {...result}  />
    )
}