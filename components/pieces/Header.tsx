"use client"
import React, {useState} from 'react'
import { PageAndNavAndDataQuery } from '@/tina/__generated__/types'
import Image from 'next/image'
import Link from "next/link"
import clsx from "clsx"
import Logo from "@/public/logo/bsc.webp"
import { tinaField } from "tinacms/dist/react"
import { usePathname } from "next/navigation"
import { Bars3Icon } from '@heroicons/react/16/solid'

export default function Header(props: PageAndNavAndDataQuery['nav']) {
    const [dropDownExtended, toggleDropDownExtended] = useState(false);

    const toggleDropDown = () => {
        toggleDropDownExtended(!dropDownExtended)
    }
    const closeDropDown = () => {
        toggleDropDownExtended(false)
    }
    
    const pathname = usePathname();
    const rootPath = `/${pathname?.split('/')[1]}`
    return (
        <header className={clsx(
            "w-screen fixed z-50 lg:h-28 lg-tab:h-[initial] grid items-center shadow-gray-800/70 shadow-xl",
            {
                "bg-black": dropDownExtended || rootPath === "/privacy-policy",
                "bg-black/65": !dropDownExtended && rootPath !== "/privacy-policy",
            }
        )}
            role="banner"
        >
            <a href="#main-content" className="skip-to-content-link">
                Skip to content
            </a>

            <div className="w-[80vw] lg:w-[initial] flex items-center">
                <Image
                    priority
                    alt=""
                    src={Logo}
                    className="h-20 w-20 lg:h-[6.5rem] lg-tab:h-[5.5rem] lg:w-[6.5rem] lg-tab:w-[5.5rem] p-1 ml-3 lg:ml-24 lg-tab:ml-8"
                />
                    <p className="
                        font-auxTitle
                        text-green-lighter
                        font-[700]
                        text-2xl lg:text-4xl lg-tab:text-3xl
                        ml-2 lg:ml-4 lg-tab:ml-2
                    ">BackStory Capital</p>
            </div>

            <button
                onClick={() => toggleDropDown()}
                className={clsx(
                    'box-content w-8 text-white lg:hidden lg-tab:block justify-self-end mr-5 bg-bluish-gray rounded-full',
                )}
            >
                <span className="sr-only">open nav</span>
                <Bars3Icon />
            </button>
            <nav className={clsx(
                'z-40 justify-self-center pr-2 lg:pr-8 text-lg lg:bg-transparent lg-tab:bg-inherit',
                {
                      'border-t border-green-dark w-full py-4': dropDownExtended
                }
            )} aria-label="Main Navigation">
                    <ul className={clsx(
                        'flex flex-col lg:flex-row lg-tab:flex-col gap-x-4',
                          {
                              'h-0 lg:h-[auto] lg-tab:h-0 overflow-hidden lg:overflow-visible lg-tab:overflow-hidden': !dropDownExtended
                                //   && LinkType === 'HeaderLinks'
                              ,
                              'items-center gap-y-2'
                                  :
                                  dropDownExtended 
                                // &&  LinkType === 'HeaderLinks'
                              ,
                          }
                        )}>
                        {props?.links?.map((link) => {
                            return (
                                <li
                                    data-tina-field={link && tinaField(link, 'label')}
                                    key={link?.label}
                                    className={clsx(
                                        {
                                            'w-5/6 border border-green-dark py-1 text-center': dropDownExtended
                                                // && LinkType === 'HeaderLinks'
                                        }
                                    )}
                                >
                                    <Link
                                        scroll={true}
                                        onClick={() => closeDropDown && closeDropDown()}
                                        href={link?.url?.slug || '#'}
                                        className={clsx(
                                            'focus:text-green-light hover:text-green-light',
                                            {
                                                'text-green-light pointer-events-none': rootPath === `${link?.url?.slug}`,
                                                'text-white': rootPath !== `${link?.url?.slug}`,
                                            },
                                        )}
                                    >
                                        {link?.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
            </nav>
        </header>
    )
}
