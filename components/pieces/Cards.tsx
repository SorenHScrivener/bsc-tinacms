import React from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { tinaField } from 'tinacms/dist/react'
import Image from 'next/image'
import hexRgb from 'hex-rgb';
import { TinaMarkdownContent } from 'tinacms/dist/rich-text';

interface Card {
    backgroundColor: string;
    opacity: string;
    borderColor: string;
    subTitle?: string;
    image: string;
    copy: TinaMarkdownContent | TinaMarkdownContent[];
    auxImage?: string;
 }

export default function Cards({
    ...props
}) {
    let bgColor;
    console.log('red')

    return (
        <>
            <div className="mt-10 mb-[7rem] flex flex-col items-center">
                <div className="outer-process grid lg:grid-cols-2 lg-tab:grid-cols-1 items-center gap-12">
                    {props.cards.map((card: Card, index: number) => {
                        bgColor = hexRgb(card.backgroundColor);
                        console.log('card', typeof card.copy)
                        bgColor.alpha = parseInt(card.opacity) / 100;
                        bgColor = Object.values(bgColor).join(', ')
                        return (
                            <div data-tina-field={tinaField(card)} key={index}
                                style={{
                                    backgroundColor: `rgba(${bgColor})`,
                                    borderColor: card.borderColor 
                                }}
                                className={`
                                    border-2 rounded-lg p-5
                                    inner-process md:grid md:w-[40rem] h-full self-start mx-2 md:mx-0
                                    ${index % 2 === 0 ? 'justify-self-start' : 'justify-self-end'}
                                `}>
                                <div className=''>
                                    {card.subTitle && <h3 className="font-auxTitle text-2xl mb-5">{card.subTitle}</h3>}
                                    <TinaMarkdown content={card.copy} components={{
                                        // eslint-disable-next-line
                                        p: (props: any) => <p className={`
                                                pr-2
                                        `} {...props} />
                                    }} />
                                </div>
                                <Image
                                    alt=""
                                    width={300}
                                    height={250}
                                    src={card.image}
                                    className='rounded-lg mb-2 mt-4 lg:mt-[3.4rem]'
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}