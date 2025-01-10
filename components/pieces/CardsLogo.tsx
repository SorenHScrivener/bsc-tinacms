import React from 'react'
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { tinaField } from 'tinacms/dist/react'
import Image from 'next/image'
import hexRgb from 'hex-rgb';

interface Card {
    backgroundColor: string;
    opacity: string;
    borderColor: string;
    subTitle?: string;
    image: string;
    copy: TinaMarkdownContent | TinaMarkdownContent[];
    auxImage?: string;
}

export default function CardsLogo({
    ...props
}) {
    // console.log(props)
    let bgColor;
    return (
        <div className='flex flex-col items-center mx-4 lg:mx-0'>
            <div className='grid lg:grid-cols-2 lg-tab:grid-cols-1 lg:gap-x-10 gap-y-6 lg:gap-y-0 lg-tab:gap-y-6\'>
                {props.cards.map((card: Card, index: number) => {
                    bgColor = hexRgb(card.backgroundColor);
                    bgColor.alpha = parseInt(card.opacity) / 100;
                    bgColor = Object.values(bgColor).join(', ')
                    return (
                        <div data-tina-field={tinaField(card)} key={index}
                            style={{
                                backgroundColor: `rgba(${bgColor})`,
                                borderColor: card.borderColor
                            }} className='md:w-[40rem] border md:m-auto lg:m-[initial] p-4'>
                            <div className='relative flex flex-col lg:flex-row items-start'>
                                {card.subTitle && <h3 className='font-auxTitle text-2xl mb-3 lg:mb-5'>{card.subTitle}</h3>}
                                <Image
                                    alt=''
                                    src={card.image}
                                    className='mb-2 lg:ml-4 lg:mb-0 h-[2.25rem] w-auto lg:absolute right-0 top-0'
                                    width={200}
                                    height={100}
                                />
                            </div>
                            <div className='grid'>
                                <div className='flex flex-col gap-y-2'>
                                    <TinaMarkdown content={card.copy} components={{
                                        // eslint-disable-next-line
                                        p: (props: any) => <p className={`
                                                pr-2
                                        `} {...props} />
                                    }} />
                                </div>
                                {card.auxImage &&
                                    <div>
                                        <Image
                                            alt=''
                                            src={card.auxImage}
                                            className='my-2 lg:mb-0 h-[2.25rem] w-auto'
                                            width={200}
                                            height={100}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}