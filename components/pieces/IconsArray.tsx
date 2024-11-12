import React from 'react'
import { tinaField } from 'tinacms/dist/react'
import Image from 'next/image'
import placeholder from '@/public/placeholders/icon.png'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export default function IconsArray({
    ...props
 }) {

  return (
    <>
      <div data-tina-field={tinaField(props)} className="flex flex-col items-center">
        <div className="grid md:grid lg:flex lg-tab:grid  grid-cols-2 md:grid-cols-3 gap-y-3 lg:gap-x-12 mt-14">
          {props.icon?.map((i: { image: string | StaticImport; label: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }, index: number) => (
            <div data-tina-field={tinaField(i)} key={index} className="serve-box max-w-full">
              <Image
                alt=""
                src={i?.image ? i?.image : placeholder}
                width={210}
                height={160}
              />
              <p className="text-xl text-center">{i?.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
