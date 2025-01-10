import React, { useEffect, useState } from 'react';
import BlogPost from "@/components/pieces/BlogPost";
import { client } from "@/tina/__generated__/client";

interface PageProps {
    params: { post: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

interface BlogPostData {
    // Define the structure of your blog post data here
    title: string;
    body: any; // Replace 'any' with the actual type if known
    [key: string]: any;
}

const Page: React.FC<PageProps> = ({ params, searchParams }) => {
    const [post, setPost] = useState<BlogPostData | null>(null);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const postResult = await client.queries.blogPosts({ relativePath: `${params.post}` });
            const result = await client.queries.pageAndNavAndData({ relativePath: "blog-posts.md" });

            const postWithExtras = {
                title: postResult.data.blogPosts.title,
                body: postResult.data.blogPosts.body,
                data: result.data,
                page: searchParams.page ? parseInt(searchParams.page as string, 10) : 0,
            };

            setPost(postWithExtras as BlogPostData);
            setPage(postWithExtras.page);
        };

        fetchData();
    }, [params, searchParams]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <BlogPost page={page} data={post.data} variables={post.variables} query={post.query} title={post.title} body={post.body} />
    );
};

export default Page;