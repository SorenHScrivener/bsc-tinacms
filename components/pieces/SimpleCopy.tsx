import React from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { tinaField } from 'tinacms/dist/react'

export default function SimpleCopy({
  ...props
}) {
  const isTextedCentered = props.isTextCentered;
  const font = props.fontSizeLarge;
  return (
    <>
      <div className='px-4 lg:px-0 lg-tab:px-8  flex flex-col items-center' data-tina-field={tinaField(props, "copy")}>
        {props.subTitle && <h3 className='text-center text-4xl font-auxTitle'>{props.subTitle}</h3>}
        <div className='max-w-[1200px]'>
          <TinaMarkdown content={props.copy} components={{
          p: props => <p className={`
                  ${isTextedCentered ? 'text-center' : 'lg:text-justify '}
                  my-4
                  text-lg lg:${font}
                  lg:w-[54vw] lg-tab:w-[70vw]
                  relative
                  lg:left-[50%]
                  lg:translate-x-[-50%]
                  px-4 md:px-14 lg:px-0
                  font-thin
                  lg:leading-relaxed 
           `} {...props} />,
          ul: props => <ul className={`list-disc pl-5 lg:pl-0`} {...props} />,
          li: props => <li className={`mb-6`} {...props} />
        }} />
        </div>
        
      </div>
    </>


  )
}

//   if (content?.__typename === "SectionContentSimpleCopy") {
//       return ()
//   }

