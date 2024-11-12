"use client"
import React, {useState} from 'react'

import { useTina } from 'tinacms/dist/react';
import { tinaField } from 'tinacms/dist/react'

import { PageAndNavAndDataQuery } from '@/tina/__generated__/types';

import Image from 'next/image';

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

import Footer from './pieces/Footer';

import arkap from '@/public/logos/arkapmkts-cut.jpg'
import bw from '@/public/logos/bw-logo.png'
import factRight from '@/public/logos/FactRight-.jpg'
import mickLaw from '@/public/logos/24-MickLaw-Logo_web.webp'
import MMM from '@/public/logos/Morris Manning logo.png'

export default function PageComponent(props: {
    data: PageAndNavAndDataQuery,
    variables: {
        relativePath: string;
    },
    query: string
}) {
    const { data } = useTina(props);
    const [currentId, setCurrentId] = useState<string>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const site = data.data;
    const email = site.email;
    const phone = site.phone;
    const address = site.address;
    const map = site.mapLink;

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
    return (
        <>
            
            <Header {...data.nav} /> 
           
            <main>
                <h1 className="sr-only">{data.page.pageTitle}</h1>
                {rootPath !== '/privacy-policy' && (
                    <Shifter>
                        <Cover {...data.page.cover} />
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
            </main>

            <Footer {...data.data} /> 
        </>
    )
}
