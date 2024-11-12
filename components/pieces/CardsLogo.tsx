import React from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { tinaField } from 'tinacms/dist/react'
import Image from 'next/image'
import hexRgb from 'hex-rgb';

export default function SimpleCopy({
    ...props
}) {
    console.log(props)
    let bgColor;
    return (
        <div className='flex flex-col items-center mx-4 lg:mx-0'>
            <div className='grid lg:grid-cols-2 lg-tab:grid-cols-1 lg:gap-x-10 gap-y-6 lg:gap-y-0 lg-tab:gap-y-6\'>
                {props.cards.map((card: { backgroundColor: string; opacity: string; borderColor: string; subTitle?: string; image: string; copy: any }, index: number) => {
                    bgColor = hexRgb(card.backgroundColor);
                    bgColor.alpha = parseInt(card.opacity) / 100;
                    bgColor = Object.values(bgColor).join(', ')
                    console.log(`rgba(${bgColor})`)
                    return (
                        <div data-tina-field={tinaField(card)} key={index}
                            style={{
                                backgroundColor: `rgba(${bgColor})`,
                                borderColor: card.borderColor
                            }} className='md:w-[40rem] border md:m-auto lg:m-[initial] p-4'>
                            <div className='relative flex flex-col lg:flex-row items-start'>
                                {card.subTitle && <h3 className='font-auxTitle text-2xl mb-3 lg:mb-5'>CEDARst– Multi-Family</h3>}
                                <Image
                                    alt=''
                                    src={card.image}
                                    className='mb-2 lg:ml-4 lg:mb-0 h-[2.25rem] w-auto lg:absolute right-0 top-0'
                                    width={200}
                                    height={100}
                                />
                            </div>
                            <TinaMarkdown content={card.copy} components={{
                                p: props => <p className={`
                                                pr-2
                                        `} {...props} />
                            }} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}