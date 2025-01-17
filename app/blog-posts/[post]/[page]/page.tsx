import React, { Suspense } from 'react';

import { client } from "@/tina/__generated__/client"

import BlogPost from "@/components/pieces/BlogPost";

import Loader from "@/components/others/loader";

interface BlogPostPageProps {
    params: Promise<{ page: string, post: string }>;
    // searchParams: Promise<{  post: string }>;
}

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params }) => {

    const res = await params;

    const result = await client.queries.pageAndNavAndData({ relativePath: "blog-posts.md" });

    // @ts-expect-error I don't know what this is
    result.pageNumber = res.page;
    // @ts-expect-error I don't know what this is
    result.postID = res.post;

    return (
        // @ts-expect-error I don't know what this is
        <BlogPost page={0} {...result} />
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