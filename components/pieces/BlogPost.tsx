'use client'
import React from 'react';
import Image from 'next/image';

// import { ArrowLeftIcon } from '@heroicons/react/24/solid'

import { useTina } from 'tinacms/dist/react';
import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';

import fillerImg from '@/public/placeholders/team.png';

import Shifter from '../utils/Shifter';
import Header from './Header';
import Cover from './Cover';
import Footer from './Footer';

import clsx from 'clsx';

interface BlogPostProps {
    data: {
        nav: {
            __typename: "Nav";
            id: string;
            _sys: {
                __typename?: "SystemInfo";
                filename: string;
                basename: string;
                breadcrumbs: string[];
                path: string;
                relativePath: string;
                extension: string;
            };
        };
        page: {
            cover: {
                copy: string
            };
            sections: Array<{
                content: Array<{
                    __typename: string;
                    posts: Array<{
                        id: string;
                    }>;
                }>;
            }>;
        };
        
        data: {
            title: string;
            links: Array<{
                href: string;
                text: string;
            }>;
        };
    };
    variables: {
        relativePath: string;
    };
    query: string;
    page: number;
    pageNumber: number;
    postID: string;
}

interface Block { 
    __typename: string;
    title: string;
    copy: TinaMarkdownContent;
    text: TinaMarkdownContent;
    image: string;
    imageWidth: number;
    imageHeight: number;
    orientation: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
    ...props
}) => {
    const { data } = useTina(props)

    const cover = data.page.cover;

    const sections = data.page.sections;
    let currentPost;
    sections.forEach(element => {
        element.content.forEach(block => {
            if (
                block.__typename === 'PageSectionsContentBlogPosts'
            ) {
                block.posts.filter(post => post.id === props.postID).forEach(post => {
                    currentPost = post;
                })
            }
        })
    });
    cover.copy = currentPost!.title;
    ////////Add in title ref for each for accessibility
    return (
        <>
            <Header {...data.nav} />
                <main>
                    <h1 className="sr-only">Blog Post Page for {currentPost!.title}</h1>
                    <Shifter>
                        <Cover {...cover} isPostPage={false} />
                    </Shifter>
                    <div className='flex flex-col items-center my-4'>
                        <p
                            data-tina-field={tinaField(currentPost, 'date')}
                            className='font-auxTitle italic text-3xl mb-1'
                        >{currentPost!.date ? new Date(currentPost!.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Invalid date'}</p>
                        <div className='relative mt-6 mb-8 px-6 md:px-[4rem] lg:px-[12rem] max-w-[1350px] flex'>
                            <div>
                                <hr className='w-full mb-2' />
                                {currentPost!.content?.map((block:Block, i: number) => {
                                    const imageWidth = !isNaN(block.imageWidth) ? block.imageWidth : 0;
                                    const imageHeight = !isNaN(block.imageHeight) ? block.imageHeight : 0;
                                    const orientation = block.orientation;
                                    return (
                                        <React.Fragment key={i}>
                                            <div data-tina-field={tinaField(block)}>
                                                {block.__typename === 'PageSectionsContentBlogPostsPostsContentSplitContent' ? (
                                                    <div className={clsx(
                                                        'my-8 relative grid md:grid-cols-2 min-h-[200px] gap-4'
                                                    )}>
                                                        <div className='flex flex-col gap-4'>
                                                            <h2 className='font-semibold text-3xl' data-tina-field={tinaField(block, 'title')}>{block.title}</h2>
                                                            <TinaMarkdown content={block.text} components={
                                                                {
                                                                    h3: (props) => <h3 className='font-semibold text-2xl' {...props} />,
                                                                    p: (props) => <p {...props} />,
                                                                }
                                                            } />
                                                        </div>
                                                        <Image
                                                            className={clsx(
                                                                'max-w-[80%] self-center justify-self-center',
                                                                {
                                                                    '-order-1': orientation === 'img-txt',
                                                                }
                                                            )}
                                                            {...imageWidth && imageHeight ? { width: imageWidth, height: imageHeight } : { fill: true }}
                                                            src={block.image || fillerImg}
                                                            alt=''
                                                            loading='lazy'
                                                            quality={75}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className='flex flex-col gap-4'>
                                                        <h2 className='font-semibold text-3xl' data-tina-field={tinaField(block, 'title')}>{block.title}</h2>
                                                        <TinaMarkdown content={block.copy} components={
                                                            {
                                                                h3: (props) => <h3 className='font-semibold text-2xl' {...props} />,
                                                                p: (props) => <p {...props} />,
                                                                a: (props) => <a {...props} />,
                                                            }        
                                                        } />
                                                    </div>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                                {/* {entry.body?.map((block, i: number) => {
                                return (
                                    <div data-tina-field={tinaField(block, 'content')} key={i}>
                                        <TinaMarkdown key={i} content={block?.content} components={components} />
                                    </div>
                                )
                            })} */}
                            </div>
                        </div>
                    </div>
            </main>
            <Footer {...{ ...data.data, __typename: "Data", id: "", dataTitle: "", _sys: { __typename: "SystemInfo", filename: "", basename: "", breadcrumbs: [], path: "", relativePath: "", extension: "" } }} />
        </>
    );
};

export default BlogPost;

//         <div className='relative mt-6 mb-8 px-1 md:pl-4 md:px-[4rem] lg:px-[12rem] max-w-[1350px] flex'>
//             {/* <div className='self-start sticky top-[40vh] pr-2 z-50 block lg:hidden'>
//                     <Link
//                         className='font-mainTitle text-3xl hover:underline'
//                         href={`/blog-posts?page=${props.page}`}>
//                         <ArrowLeftIcon className='h-8 w-8 block md:hidden' />
//                         <span className='pr-4 hidden md:block lg:hidden'>Back</span>
//                     </Link>
//                 </div> */}
//             <div>
//                 <hr className='w-full mb-2' />
//                 {entry.body?.map((block, i: number) => {
//                     return (
//                         <div data-tina-field={tinaField(block, 'content')} key={i}>
//                             <TinaMarkdown key={i} content={block?.content} components={components} />
//                         </div>
//                     )
//                 })}
//             </div>
//             {/* // <TinaMarkdown content={entry.body} components={ components } /> */}
//         </div>