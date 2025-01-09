import React from 'react';

import { client } from "@/tina/__generated__/client"

import BlogPost from "@/components/pieces/BlogPost";

import { NextRequest } from 'next/server';

interface BlogPostPageProps {
    post: string;
    params: { post: string };
    searchParams: { page: string };
}

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params, searchParams }) => {

    const res = params;

    const search = searchParams;

    // const request = new NextRequest(params);
    // const searchParams = new URLSearchParams(request.url);
    // const page = searchParams.get('page');

    const post = await client.queries.blogPosts({ relativePath: `${res.post}` });

    const result = await client.queries.pageAndNavAndData({ relativePath: "blog-posts.md" });

    // @ts-ignore
        post.setUp = result.data;
    // @ts-ignore
        post.page = search.page;

    return (
        <BlogPost page={0} {...post} />
    );
};

export default BlogPostPage;