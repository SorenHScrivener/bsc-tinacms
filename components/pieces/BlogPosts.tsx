'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import fillerImg from '@/public/cardImgs/phone.jpg';

import { tinaField } from 'tinacms/dist/react'

import { useSearchParams } from 'next/navigation';

import clsx from 'clsx';
import {
    TinaMarkdownContent
} from 'tinacms/dist/rich-text';

interface Post {
    date: string;
    title: string,
    content: {
        title: string;
        copy: TinaMarkdownContent;
        text: TinaMarkdownContent
        image: string;
        imageWidth: number;
        imageHeight: number;
        orientation: string;
    }[];
    includeMedia: boolean;
    id: string;
    isDraft: boolean;
}

export default function BlogPosts({
    ...props
}) {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        const page = searchParams!.get('page');
        if (page) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParams]);

    function countWords(str: string) {
        return str.trim().split(/\s+/).length;
    }
    const postDisplayLimit = props.postDisplayLimit > 0 ? props.postDisplayLimit : 1;
    const posts = props.posts;

    const setCurrentPageNumber = (index: number) => {
        setCurrentPage(index);
        const params = new URLSearchParams(searchParams ?? undefined);
        params.set('page', index.toString());
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, '', newUrl);
    };
    return (
        <div className='flex flex-col items-center my-4'
        //   data-tina-field={tinaField(section, "sectionTitle")}
        >
            {posts?.slice(currentPage, (postDisplayLimit ?? 0) + currentPage).map((post: Post, i: number) => {
                
                if (!post.content || !post.content[0]) return null;
                const text = post.content[0].copy ?
                    post.content[0].copy.children
                    : post.content[0].text ? post.content[0].text.children : [];

                const image = post.content[0].image ? post.content[0].image : null;
                const imageWidth = post.content[0].image ? post.content[0].imageWidth : null;
                const imageHeight = post.content[0].image ? post.content[0].imageHeight : null;
                const orientation = post.content[0].image ? post.content[0].orientation : null;
                const includeMedia = post.includeMedia;

                const combinedText = text.map((item: { children: object[] }) => {
                    return (item.children[0] as { text: string }).text;
                }).join('/');

                const limit = includeMedia && image ? 50 : 100;
                const pArray: string[] = [];
                if (countWords(combinedText) > limit) {
                    let remainingLength = limit;
                    combinedText.split('/').forEach((sentence: string) => {
                        if (remainingLength > 0) {
                            const words = sentence.trim().split(/\s+/);
                            if (remainingLength >= words.length) {
                                pArray.push(sentence.trim());
                                remainingLength -= words.length;
                            } else {
                                pArray.push(words.slice(0, remainingLength).join(' ') + '[...]');
                                remainingLength = 0;
                            }
                        }
                    });
                } else {
                    combinedText.split('/').forEach((sentence: string) => {
                        pArray.push(sentence.trim());
                    });
                }
                return (
                    <div
                        data-tina-field={tinaField(post)}
                        className={
                            clsx(
                                "mt-4 mb-8 px-4 md:px-[4rem] lg:px-[12rem] max-w-[1350px]",
                                {
                                    hidden: post.isDraft
                                }
                            )
                        }
                        key={i}
                    >
                        <p data-tina-field={tinaField(post, 'date')} className='font-auxTitle italic text-lg mb-1'>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        <h2 data-tina-field={tinaField(post, 'title')} className='font-semibold text-4xl' key={i}>{post.title}</h2>
                        <div className={
                            clsx(
                                'my-8 relative gap-4',
                                { 'grid md:grid-cols-2': includeMedia && image }
                            )
                        }
                        >
                            <div data-tina-field={tinaField(post.content[0])} className='my-8 flex flex-col gap-4'>
                                {pArray.map((item, i) => {
                                    console.log(text[i].type);
                                    if (text[i].type === 'h3') {
                                        return <h3 className='font-semibold text-2xl' key={i}>{item}</h3>;
                                    } else {
                                        return <p key={i}>{item}</p>;
                                    }
                                })}
                                <Link
                                    href={`/blog-posts/${post.id}/${currentPage}`}
                                    className='text-green-800 text-xl font-semibold hover:opacity-70'
                                >
                                    Keep Reading...
                                </Link>
                            </div>
                            {image && (<Image
                                className={clsx(
                                    'max-w-[80%] self-center justify-self-center',
                                    {
                                        '-order-1': orientation === 'img-txt',
                                        hidden: includeMedia === false
                                    }
                                )}
                                {...imageWidth && imageHeight ? { width: imageWidth, height: imageHeight } : { fill: true }}
                                src={image || fillerImg}
                                alt=''
                                loading='lazy'
                                quality={75}
                            />)}
                        </div>
                        <hr className='mt-7' key={`hr-${i}`} />
                    </div>
                );
            })}
            {posts && (
                     <div className='flex gap-3'
                data-tina-field={tinaField(props, 'postDisplayLimit')}>

                {Array.from({ length: Math.ceil(posts.length / postDisplayLimit!) }).map((_, index: number) => (
                    <button
                        onClick={() => setCurrentPageNumber(index)}
                        className={clsx(
                            'text-xl hover:text-red-800',
                            {
                                'font-medium text-red-800 pointer-events-none': currentPage === index
                            }
                        )} key={index}>{index + 1}</button>
                ))}
            </div> 
            )}
      
        </div>
    )
}