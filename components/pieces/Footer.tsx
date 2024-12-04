"use client";
import FaIcon, { linkedin } from '@/ui/icons/fa-icons';
import Link from 'next/link';
import { usePathname } from "next/navigation"
import clsx from 'clsx';
import { PageAndNavAndDataQuery } from '@/tina/__generated__/types'
import { tinaField } from 'tinacms/dist/react';

export default function Footer(props: PageAndNavAndDataQuery['data']) {
    const pathname = usePathname();
    const rootPath = `/${pathname?.split('/')[1]}`
    return (
        <>
            <footer className='relative bg-green-dark lg:h-[6.5rem] grid gap-y-2 lg:gap-y-0 py-2 mt-auto text-center text-white'>
                <div data-tina-field={tinaField(props, "disclaimer")}>
                    <p>{props.disclaimer}</p>
                </div>
                {props?.socials?.map((social, index) => (
                    social?.url && (
                        <a data-tina-field={tinaField(social)} key={index} href={social.url} target="_blank" rel="noreferrer"
                            className="
                        lg:absolute ml-2 lg:ml-14 top-[50%] lg:translate-y-[-50%] 
                        lg:flex text-white hover:text-green-lighter focus:outline-none f
                        ocus:ring-2 focus:ring-green-lighter
                    "
                            aria-label="LinkedIn link"
                        >
                            <FaIcon icon={linkedin} className="text-3xl" aria-hidden="true" />
                        </a>
                    )
                ))} 
                <div className='lg:h-8 self-end flex flex-col lg:flex-row gap-x-3 items-center justify-center'>
                    <div className="flex gap-x-3">
                        <p>
                            &copy; {new Date().getFullYear()} Backstory Capital. All rights reserved.
                        </p>
                    </div>
                    <span className="hidden lg:inline" aria-hidden="true">|</span>
                    <nav>
                        <Link
                            scroll={true}
                            href="/privacy-policy"
                            className={clsx(
                                'focus:text-green-light hover:text-green-light',
                                {
                                    'text-green-light pointer-events-none': rootPath === `privacy policy`,
                                    'text-white': rootPath !== `privacy policy`,
                                },
                            )}
                        >
                            Privacy Policy
                        </Link>
                    </nav>
                </div>
                <p>Website by: Passing Cloud Productions</p>
            </footer>

            <script

                async

                src="https://www.tracklyze.com/insight-core.js"

                data-site-id="02c43a04-bdf2-4a97-97f8-a2f85fb17114">

            </script>
        </>
    );
}
