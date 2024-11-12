import React from 'react'
import Image from 'next/image'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { tinaField } from 'tinacms/dist/react'

export default function FounderMessage({
    ...props
}) {
    console.log(props.copy)
  return (
    <div id='founder-message' className="relative mb-[1rem] lg:grid align-top lg:max-h-[55rem] overflow-hidden">
        <Image
            alt=""
            src={props.image}
            className="w-full h-full object-cover hidden lg:block"
            width={1920}
            height={1080}
        />
        <div data-tina-field={tinaField(props)} className="px-4 md:px-14 lg:px-24 lg-tab:px-16 py-16 leading-loose bg-blue-light">
            <h2 id="founding-message-title" className="font-mainTitle relative left-[50%] translate-x-[-50%] text-center w-full leading-normal">
                Message from the <br />Founding Partners
            </h2>
            <TinaMarkdown content={props.copy} components={{
                p: props => <p className="
                    lg:text-justify    
                " {...props} />
            }} />
            <p className="flex flex-col">
                  <span className="font-mainTitle">{ props.regards }</span>
                  <span className="font-auxTitle font-semibold">{ props.signature} </span>
            </p>
        </div>
    </div>
  )
}
