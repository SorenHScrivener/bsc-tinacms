"use client"
import React, { useState } from 'react'
import Image from 'next/image';

import { useTina } from 'tinacms/dist/react';
import { tinaField } from 'tinacms/dist/react'

import clsx from 'clsx';

import {
    PageAndNavAndDataQuery
} from '@/tina/__generated__/types';

import Scroller from './utils/Scroller';
import Shifter from './utils/Shifter';

import Header from './pieces/Header';

import FounderMessage from './pieces/FounderMessage';
import Cover from './pieces/Cover';
import SimpleCopy from './pieces/SimpleCopy';
import SplitContent from './pieces/SplitContent';
import IconsArray from './pieces/IconsArray';
import Team from './pieces/Team';
import Bio from './pieces/bio';
import Cards from './pieces/Cards';
import CardsLogo from './pieces/CardsLogo';

import { usePathname } from "next/navigation"

import fillerImg from '@/public/cardImgs/phone.jpg';
import Footer from './pieces/Footer';

import arkap from '@/public/logos/arkapmkts-cut.jpg'
import bw from '@/public/logos/bw-logo.png'
import factRight from '@/public/logos/FactRight-.jpg'
import mickLaw from '@/public/logos/24-MickLaw-Logo_web.webp'
import MMM from '@/public/logos/Morris Manning logo.png'

import Link from 'next/link';

import { useSearchParams } from 'next/navigation';
import { TinaMarkdownContent } from 'tinacms/dist/rich-text';

interface dataModel {
    blogPosts?: Array<{ title: string; date: string; body: TinaMarkdownContent; isDraft: boolean; _sys: { basename: string } }>;
    page: { pageTitle: string; cover: { src: string; alt: string }; sections: Array<Section>; postDisplayLimit?: number };
    nav: PageAndNavAndDataQuery['nav'];
    data: {
        email: { url: string; label: string };
        phone: { url: string; label: string };
        address: { url: string; label: string };
        mapLink: string;
    };
}

interface Section {
    __typename: string;
    id?: string;
    sectionTitle?: string;
    isTitleHidden?: boolean;
    content?: Array<Content>;
}

interface Content {
    __typename: string;
    text?: string;
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
    orientation?: string;
    includeMedia?: boolean;
}

export default function PageComponent(
    props: {
        data: PageAndNavAndDataQuery,
        variables: {
            relativePath: string;
        },
        query: string,
    },
) {    
    const [currentPage, setCurrentPage] = useState<number>(0);

    function countWords(str:string) {
        return str.trim().split(/\s+/).length;
    }
    const { data } = useTina(props);
    const posts = ((props.data as unknown as dataModel).blogPosts ?? []).map((post) => post);

    const searchParams = useSearchParams();

    React.useEffect(() => {
        const page = searchParams!.get('page');
        if (page) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParams]);
    
    const [currentId, setCurrentId] = useState<string>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const site = data.data;
    const email = site.email;
    const phone = site.phone;
    const address = site.address;
    const map = site.mapLink;

    const postDisplayLimit = (data.page.postDisplayLimit ?? 1) > 0 ? data.page.postDisplayLimit : 1;

    const pathname = usePathname();
    const rootPath = `/${pathname?.split('/')[1]}`

    const openProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.closest('.profile')?.getAttribute('data-id');

        if (id) {
            setCurrentId(id);
            setIsOpen(true);
        }
    };

    const closeProfile = () => {
        setCurrentId('');
        setIsOpen(false);
    };

    const setCurrentPageNumber = (index: number) => {
        console.log(index);
        setCurrentPage(index);
    };
    return (
        <>

            <Header {...data.nav} />

            <main>
                <h1 className="sr-only">{data.page.pageTitle}</h1>
                {rootPath !== '/privacy-policy' && (
                    <Shifter>
                        <Cover {...data.page.cover} isPostPage={false} />
                    </Shifter>
                )}

                {data.page?.sections?.map((section, index) =>
                    <Scroller key={index}>
                        <section key={index} className={`
                                outer ${rootPath === '/privacy-policy' ? 'mt-[8rem] lg:mt-[7rem] 2xl:mt-[5rem]' : ''}
                            `}
                            aria-describedby={section!.id ?? ''}>
                            {section?.content?.map((content, index) => {
                                {
                                    switch (content?.__typename) {
                                        case "PageSectionsContentSimpleCopy": {
                                            return (
                                                <React.Fragment key={index}>
                                                    <h2
                                                        data-tina-field={tinaField(section, "sectionTitle")}
                                                        id={section?.id ?? undefined}
                                                        className={`${section?.isTitleHidden ? 'sr-only' : ''} text-center font-mainTitle mb-5 lg:text-5xl`}
                                                    >
                                                        {section?.sectionTitle}
                                                    </h2>
                                                    {!section?.isTitleHidden ? <hr className="border-t border-solid border-foreground w-44 m-auto" /> : ''}
                                                    <SimpleCopy
                                                        {...content}
                                                    />
                                                </React.Fragment>
                                            )
                                        }
                                        case "PageSectionsContentIconsArray": {
                                            if (!content.addStatic) {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <h2
                                                            data-tina-field={tinaField(section, "sectionTitle")}
                                                            id={section?.id ?? undefined}
                                                            className={`${section?.isTitleHidden ? 'sr-only' : ''} text-center font-mainTitle mb-5`}
                                                        >
                                                            {section?.sectionTitle}
                                                        </h2>
                                                        {!section?.isTitleHidden ? <hr className="border-t border-solid border-foreground w-44 m-auto" /> : ''}
                                                        <IconsArray
                                                            // sectionTitle={section?.sectionTitle}
                                                            // isTitleHidden={section?.isTitleHidden}
                                                            // id={section!.id ?? ''}
                                                            {...content}
                                                        />
                                                    </React.Fragment>
                                                )
                                            } else {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <div id='partners-grid' className='
                                                            flex flex-col lg:grid gap-y-7
                                                            lg:gap-y-14 lg:gap-x-8 w-[70vw]
                                                            mx-auto
                                                            mb-14
                                                        '>
                                                            <Image
                                                                id='ark'
                                                                alt='ARKap Markets Logo'
                                                                src={arkap}
                                                                className='h-[6rem] md:h-[10rem] lg-tab:h-[6rem] w-auto'
                                                            />
                                                            <Image
                                                                id='bw'
                                                                alt='Buttonwood Due Diligence Logo'
                                                                src={bw}
                                                            />
                                                            <Image
                                                                id='fr'
                                                                alt='FactRight Logo'
                                                                src={factRight}
                                                            />
                                                            <Image
                                                                id='ml'
                                                                alt='Mick Law Logo'
                                                                src={mickLaw}
                                                            />
                                                            <Image
                                                                id='mmm'
                                                                alt='Morris, Manning & Martin, LLP Logo'
                                                                src={MMM}
                                                                className='w-[12rem] h-auto self-center lg:self-baseline'
                                                            />
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            }

                                        }
                                        case "PageSectionsContentSplitContent": {
                                            return <SplitContent
                                                key={index}
                                                sectionTitle={section?.sectionTitle}
                                                isTitleHidden={section?.isTitleHidden}
                                                id={section!.id ?? ''}
                                                {...content}
                                            />
                                        }
                                        case "PageSectionsContentFounderMessage": {
                                            return <FounderMessage
                                                key={index}
                                                sectionTitle={section?.sectionTitle}
                                                isTitleHidden={section?.isTitleHidden}
                                                id={section!.id ?? ''}
                                                {...content}
                                            />
                                        }
                                        case "PageSectionsContentTeam": {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Team
                                                        openProfile={openProfile}
                                                        {...content}
                                                    />
                                                    <Bio
                                                        idNumber={currentId ?? ""}
                                                        isOpen={isOpen}
                                                        closeProfile={closeProfile}
                                                        {...content}
                                                    />
                                                </React.Fragment>
                                            )
                                        }
                                        //temporary fix!!!
                                        case "PageSectionsContentCardsArray": {
                                            if (content.style === 'standard') {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <h2
                                                            data-tina-field={tinaField(section, "sectionTitle")}
                                                            id={section?.id ?? undefined}
                                                            className={`${section?.isTitleHidden ? 'sr-only' : ''} text-center font-mainTitle mb-5`}
                                                        >
                                                            {section?.sectionTitle}
                                                        </h2>
                                                        {!section?.isTitleHidden ? <hr className="border-t border-solid border-foreground w-44 m-auto" /> : ''}
                                                        <Cards
                                                            {...content}
                                                        />
                                                    </React.Fragment>
                                                )
                                            } else if (content.style === 'logo') {
                                                return <CardsLogo
                                                    key={index}
                                                    {...content}
                                                />

                                            }
                                        }
                                    }
                                }
                            })}

                        </section>
                    </Scroller>
                )}
                {rootPath === '/contact-us' && (
                    <section aria-labelledby="our-contact-us-title" className='
                        min-w-[60vw]
                        max-w-[1400px]
                        flex flex-col items-center 
                        relative 
                        left-[50%] translate-x-[-50%]
                        my-24
                    '>
                        <div className="w-full flex flex-col md:flex-row justify-center md:items-start md:gap-x-2 lg:gap-x-4 px-4 lg:px-0">
                            <div className="md:w-1/3">
                                <h2 id='our-contact-us-title' className="sr-only"></h2>
                                <p className="flex flex-col text-xl font-auxTitle mb-5">
                                    <span>Thank you for your interest in BackStory Capital.</span>
                                    <span>We look forward to connecting with you.</span>
                                </p>
                                <ul className='font-semibold text-lg'>
                                    <li data-tina-field={tinaField(site, 'email')}>Email: {phone ? <a href={`mailto:${email?.url}`}>{email?.label}</a> : "N/A"}</li>
                                    <li data-tina-field={tinaField(site, 'phone')}>Phone: <a href={`tel:${phone?.url}`}>{phone?.label}</a></li>
                                    <li data-tina-field={tinaField(site, 'address')} className="flex flex-col">
                                        <span>We are located at:</span>
                                        <a
                                            href={address?.url ?? ""}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {address?.label}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:w-1/3 mt-5 md:mt-0">
                                <iframe
                                    src={map ?? ""}
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    aria-hidden="false"
                                    tabIndex={0}
                                ></iframe>
                            </div>
                        </div>
                    </section>
                )}
                {rootPath === '/blog-posts' && (
                    <div className='flex flex-col items-center my-4'>
                        {posts?.slice(currentPage, (postDisplayLimit ?? 0) + currentPage).map((post, i: number) => {
                            // @ts-expect-error too annoying to fix
                            const entry = post.data?.blogPosts;
                            const text = entry.body[0].content.children[0].props ?
                                entry.body[0].content.children[0].props.copy.children
                                : entry.body[0].content.children;
         
                            const image = entry.body[0].content.children[0].props !== undefined ? entry.body[0].content.children[0].props.image : null;
                            const imageWidth = entry.body[0].content.children[0].props !== undefined ? entry.body[0].content.children[0].props.imageWidth : null;
                            const imageHeight = entry.body[0].content.children[0].props !== undefined ? entry.body[0].content.children[0].props.imageHeight : null;
                            const orientation = entry.body[0].content.children[0].props !== undefined ? entry.body[0].content.children[0].props.orientation : null;
                            const includeMedia = entry.includeMedia;

                            const combinedText = text.map((item: { children: { text: string }[] }) => {
                                return item.children[0].text;
                            }).join('/');

                            const limit = includeMedia ? 50 : 100;
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
                                    data-tina-field={tinaField(entry)}
                                    className={
                                    clsx(
                                        "mt-4 mb-8 px-4 md:px-[12rem] max-w-[1350px]",
                                        {
                                            hidden: entry.isDraft
                                        }
                                    )
                                } key={i} >
                                    <p className='font-auxTitle italic text-lg mb-1'>{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                    <h2 className='font-semibold text-4xl'>{entry.title}</h2>
                                    <div className={
                                        clsx(
                                            'my-8 relative gap-4',
                                            { 'grid lg:grid-cols-2': includeMedia }
                                        )
                                    }
                                    >
                                        <div className='my-4 flex flex-col gap-4'>
                                            {pArray.map((item, i) => {
                                                const type = text[i].type;
                                                return React.createElement(type, {
                                                    key: i, className:
                                                        clsx(
                                                            '',
                                                            {
                                                                'text-2xl font-medium': type === 'h3'
                                                            }
                                                        )
                                                }, item);
                                            })}
                                            <Link
                                                href={`/blog-posts/${entry._sys.basename}?page=${currentPage}`}
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
                            )
                        })}

                        <div className='flex gap-3'>
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
                   </div>
                )}
            </main>

            <Footer {...data.data} />
        </>
    )
}