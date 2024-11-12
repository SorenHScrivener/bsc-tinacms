import Image from 'next/image'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { tinaField } from 'tinacms/dist/react'

export default function SplitContent({
    ...props
}) {
    // console.log(props.backgroundColor)
  return (
      <div
          data-tina-field={tinaField(props)}
          className={`
                    split-section
                    ${props.isImageFirst === true ? '' : 'reverse'}
                    md:w-[90vw] lg:w-[initial]
                    md:mx-auto lg:mx-[initial]
                    lg:min-h-[600px] lg-tab:min-h-[initial] 2xl:min-h-[700px]
                    grid
                    `}>
          <div className='image relative hidden lg:block'>
              <Image
                  alt=''
                  src={props.image}
                  fill
                  className=''
              />
          </div>
          <div
              style={{ backgroundColor: props.backgroundColor }}
              className={`copy mx-1 px-4 md:px-14 lg:px-24 py-10 lg:py-16 leading-loose flex flex-col justify-center`}>
              <h2
                //   data-tina-field={tinaField(props, "sectionTitle")}
                  id={props.id}
                  className='font-auxTitle'
              >{ props.sectionTitle }</h2>
              <TinaMarkdown content={props.copy} components={{
                  p: props => <p className="
                    text-lg mt-3 lg:mt-0 lg:text-justify   
                " {...props} />
              }} />
          </div>      
    </div>
  )
}
