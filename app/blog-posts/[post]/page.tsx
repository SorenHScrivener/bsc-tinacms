import React from 'react';

import { client } from "@/tina/__generated__/client"

import BlogPost from "@/components/pieces/BlogPost";

interface BlogPostPageProps {
    post: string;
    params: { post: string };
    searchParams: { page: string };
}

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params, searchParams }) => {

    const res = await params;

    const search = await searchParams;

    const post = await client.queries.blogPosts({ relativePath: `${res.post}` });

    const result = await client.queries.pageAndNavAndData({ relativePath: "blog-posts.md" });

    // @ts-expect-error I don't know what this is
        post.setUp = result.data;
    // @ts-expect-error I don't know what this is
        post.page = search.page;

    return (
        <BlogPost page={0} {...post} />
    );
};

export default BlogPostPage;