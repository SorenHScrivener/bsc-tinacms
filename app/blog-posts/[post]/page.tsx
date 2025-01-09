import React from 'react';

import { client } from "@/tina/__generated__/client"

import BlogPost from "@/components/pieces/BlogPost";

import { NextRequest } from 'next/server';

interface BlogPostPageProps {
    post: string;
}

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params, searchParams }) => {

    const res = await params;

    const search = await searchParams;

    // const request = new NextRequest(params);
    // const searchParams = new URLSearchParams(request.url);
    // const page = searchParams.get('page');

    const post = await client.queries.blogPosts({ relativePath: `${res.post}` });

    const result = await client.queries.pageAndNavAndData({ relativePath: "blog-posts.md" });

    post.setUp = result.data;
    post.page = search.page;

    return (
        <BlogPost {...post} />
    );
};

export default BlogPostPage;