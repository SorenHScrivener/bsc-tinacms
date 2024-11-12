import { PageSectionsContentTeam } from '@/tina/__generated__/types'
import { tinaField } from 'tinacms/dist/react'
import React from 'react'
import Image from "next/image";
import FaIcon, { profOpenArrow } from '@/ui/icons/fa-icons';


export default function Team({
    ...props
}) {
  return (
    <>
          <div className='mt-8 md:mx-auto mb-14 md:w-[85vw] flex flex-col items-center' aria-labelledby="team-title">
              <div className='grid grid-cols-2 px-4 lg:px-0 gap-x-5 gap-y-5 lg:gap-x-10 lg:gap-y-8 justify-center'>
                  {props?.member?.map((i, key) => {
                      return (
                          <div key={key} data-id={key}
                              data-tina-field={tinaField(i)} 
                            style={{ backgroundColor: i?.backgroundColor ?? 'transparent' }}
                            className={`
                                profile relative flex flex-col border-2 border-black/30 w-full lg:w-[272px]
                            `}>
                              <Image
                                  src={i?.image ?? '/default-image.png'}
                                  alt={i?.name ?? 'default name'}
                                  width={272}
                                  height={272}
                                  className='w-full'
                              />
                              <div className="lg:flex justify-between">
                                  <div className={
                                    `
                                        relative
                                        pl-3 
                                        h-full 
                                        pb-2
                                    `
                                  }>
                                      <p className='font-semibold text-lg md:text-xl mt-2 lg:mt-4'>
                                          {i?.name}
                                      </p>
                                      <p className='font-auxTitle font-thin md:text-lg'>
                                          {i?.title}
                                      </p>
                                  </div>
                                  <button
                                      onClick={props.openProfile}
                                      title={`open ${i?.name}'s profile`}
                                      className="
                                            profile-open
                                            text-3xl md:text-4xl
                                            absolute lg:static
                                            self-start
                                            lg:mr-3 lg:mt-3
                                            top-2 right-2
                                        ">
                                      <span className="sr-only"></span>
                                      <FaIcon icon={profOpenArrow} />
                                  </button>
                              </div>
                          </div>
                      )
                  })}
              </div>
          </div>  
          {/* <Bio
              idNumber={currentId ?? ""}
              isOpen={isOpen}
              closeProfile={closeProfile}
          /> */}
    </>
  )
}
