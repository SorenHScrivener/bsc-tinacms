"use client"
import { PageCover as GeneratedPageCover } from '@/tina/__generated__/types';

interface PageCover extends GeneratedPageCover {
  isPostPage?: boolean;
}
// import { useTina } from 'tinacms/dist/react';

import { tinaField } from 'tinacms/dist/react'

// import placeholder from '@/public/placeholders/cover.jpg'

export default function Cover(props: PageCover) {

  // console.log(props)
  
  return (
    <>
      <div
        data-tina-field={tinaField(props)}
        id="main-cover"
        style={
          {
            backgroundImage: `url(${props.coverImage})`,
          }
        }
        className={
          `
            relative
            h-[400px] md:h-[500px] lg:h-[460px] 2xl:h-[650px]
            bg-no-repeat bg-cover
            lg:bg-[center_top_-3rem] md:bg-[center_top_-2rem] sm:bg-[center_top_-1rem]
            bg-center
          `
        }
      >
        <div className={`h-full w-full`} style={{ backgroundColor: `rgba(0, 0, 0, ${(props.brightness ?? 100)/100})` }}></div>
        <p
          id='opening-text'
          className={`
            z-20
            font-mainTitle
            text-white
            text-center
            text-[1.7rem] md:text-4xl lg:text-5xl lg-tab:text-4xl 2xl:text-6xl 
            ${!props.isPostPage ? 'lg:leading-relaxed 2xl:leading-loose lg-tab:leading-relaxed' : ''}
            absolute
            md:px-4 lg:px-0
            w-full ]
            ${!props.isPostPage ? 'lg:w-[initial]':'lg:w-[60%] px-6'}
            lg:left-[50%] top-[50%] lg:translate-x-[-50%] 
            ${!props.isPostPage ? 'translate-y-[-70%] lg:translate-y-[-70%] lg-tab:translate-y-[-60%]' : 'translate-y-[-50%] lg:translate-y-[-40%] lg-tab:translate-y-[-40%]'}
          `}>
          {props.copy}
        </p>
      </div>
    </>
  )
}
