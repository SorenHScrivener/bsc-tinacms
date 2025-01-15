import React, { Suspense } from 'react';

import { client } from "@/tina/__generated__/client"

import BlogPost from "@/components/pieces/BlogPost";

import Loader from "@/components/others/loader";

interface BlogPostPageProps {
    params: Promise<{  post: string }>;
    searchParams: Promise<{ page: string }>;
}

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params, searchParams }) => {

    const res = await params;

    const post = await client.queries.blogPosts({ relativePath: `${res.post}` });

    const result = await client.queries.pageAndNavAndData({ relativePath: "blog-posts.md" });

    // @ts-expect-error I don't know what this is
    post.setUp = result.data;
    // @ts-expect-error I don't know what this is
    post.page = res.page;

    return (
        <BlogPost page={0} {...post} />
    );
};

const BlogPostPageWrapper: React.FC<BlogPostPageProps> = (props) => (
    <Suspense fallback={
        <Loader />
    }>
        <BlogPostPage {...props} />
    </Suspense>
);

export default BlogPostPageWrapper;