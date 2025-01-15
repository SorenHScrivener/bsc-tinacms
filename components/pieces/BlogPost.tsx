'use client'
import React from 'react';
import Image from 'next/image';

import { ArrowLeftIcon } from '@heroicons/react/24/solid'

import { useTina } from 'tinacms/dist/react';
import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';

import fillerImg from '@/public/placeholders/team.png';

import Link from 'next/link';

import Header from './Header';
import Cover from './Cover';
import Footer from './Footer';

import Shifter from '@/components/utils/Shifter';

import { BlogPostsQuery } from '@/tina/__generated__/types';
import clsx from 'clsx';
interface BlogPostProps {
    data: BlogPostsQuery;
    variables: {
        relativePath: string;
    };
    query: string;
    page: number;
}

interface Split {
    orientation: string;
    copy: TinaMarkdownContent;
    imageWidth?: number;
    imageHeight?: number;
    image?: string;
 }

const components = {
    splitContent: (props: Split) => {
        const orientation = props.orientation;
        return (
            <>
                <div className={clsx(
                    'my-8 relative grid md:grid-cols-2 min-h-[200px] gap-4'
                )}>
                    <div>
                        
                        <TinaMarkdown content={props.copy} components={{
                            // eslint-disable-next-line
                            p: (props: any) => {
                                return <p className={clsx()} {...props}></p>;
                            },
                            // eslint-disable-next-line
                            h3: (props: any) => <h3 className={clsx('text-center md:text-left text-3xl font-semibold mb-4')} {...props} />,
                        }} /> 
                    </div>
                    
                    <Image
                        className={clsx(
                            'max-w-[80%] self-center justify-self-center',
                            {
                                '-order-1': orientation === 'img-txt'
                            }
                        )}
                        {...props.imageWidth && props.imageHeight ? { width: props.imageWidth, height: props.imageHeight } : { fill: true } }
                        src={props.image || fillerImg}
                        alt=''
                        loading='lazy'
                        quality={75}
                    />
                </div>
            </>
        )
    },
    // eslint-disable-next-line
    a: (props: any) => <a className={clsx('text-blue-700 hover:underline cursor-pointer')} {...props} />,
    // eslint-disable-next-line
    h3: (props: any) => <h3 className={clsx('text-center md:text-left text-3xl font-semibold mb-5', props.className)} {...props} />,
}

const BlogPost: React.FC<BlogPostProps> = (props: {
        data: BlogPostsQuery,
        variables: {
            relativePath: string;
        },
        query: string,
        page: number,
    }) => {
    const { data } = useTina(props)
    
    // @ts-expect-error too annoying to fix
    const setUp = props.setUp;
    const entry = data.blogPosts;
    
    setUp.page.cover.copy = entry.title;
    setUp.page.cover.isPostPage = true;

    // console.log(props.page);
    return (
        <>
            <Header {...setUp.nav} />
            <main>
                <h1 className="sr-only">{entry.title}</h1>

                <Shifter>
                    <Cover {...setUp.page.cover} />
                </Shifter>
                <div className='md:pt-12 sticky top-[40vh] z-50 pl-8 lg:block hidden'>
                    <Link
                        className='font-mainTitle text-3xl hover:underline'
                        href={`/blog-posts?page=${props.page}`}>
                        All Posts
                    </Link>
                </div>

                <div className='flex flex-col items-center my-4'>
                        <p
                            data-tina-field={tinaField(entry, 'date')}
                            className='font-auxTitle italic text-3xl mb-1'
                        >{entry.date ? new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Invalid date'}</p>
                    
                    <div className='relative mt-6 mb-8 px-1 md:pl-4 md:px-[4rem] lg:px-[12rem] max-w-[1350px] flex'>
                        <div className='self-start sticky top-[40vh] pr-2 z-50 block lg:hidden'>
                            <Link
                                className='font-mainTitle text-3xl hover:underline'
                                href={`/blog-posts?page=${props.page}`}>
                                <ArrowLeftIcon className='h-8 w-8 block md:hidden' />
                                <span className='pr-4 hidden md:block lg:hidden'>Back</span>
                            </Link>
                        </div>
                        <div>
                            <hr className='w-full mb-2' />
                            {entry.body?.map((block, i: number) => {
                                return (
                                    <div data-tina-field={tinaField(block, 'content')} key={i}>
                                        <TinaMarkdown key={i} content={block?.content} components={components} />
                                    </div>
                                )
                            })}
                        </div>
                        {/* // <TinaMarkdown content={entry.body} components={ components } /> */}
                    </div>
                </div>    
            </main>
            <Footer {...setUp.data} />
        </>
    );
};

export default BlogPost;