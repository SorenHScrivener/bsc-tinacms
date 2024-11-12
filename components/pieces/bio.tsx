import { useEffect } from "react"

import { TinaMarkdown } from 'tinacms/dist/rich-text'
import FaIcon, { profCloseArrow } from "@/ui/icons/fa-icons"
import Image from 'next/image'

export default function Bio({
    ...props
}) {
    const isOpen = props.isOpen;
    const closeProfile = props.closeProfile;
    const idNumber = props.idNumber;
    useEffect(() => {
        const body = document.querySelector('body');
        if (isOpen) {
            body!.classList.add('freeze');
        } else {
            body!.classList.remove('freeze');
        }
    }, [idNumber, isOpen])
    if (!idNumber) return null
    return (
        <div className={`fixed left-0 top-0 z-20 w-screen h-screen bg-black/95 ${ !isOpen ? 'hidden' : 'block' }`}>
            <div id="full-profile"
                className={`
                    rounded-md grid gap-x-4 bg-green-dark absolute w-[96vw] max-w-[750px] 
                    lg:w-[840px] h-[530px] lg:h-[470px] 2xl:max-h-[500px] translate-x-[-50%] translate-y-[-45%] 
                    lg:translate-y-[-40%] top-1/2 left-1/2 p-5 text-white
                `}>
                <div className="flex flex-col">
                    <Image
                        alt=""
                        src={props.member[idNumber].image}
                        height={272}
                        width={272}
                        className="w-[65%] md:w-[95%] lg:w-full"
                    />
                    <div className="mt-2 mb-2 lg:mb-0">
                        <p className="font-semibold text-lg">{props.member[idNumber].name}</p>
                        <p className="font-auxTitle font-thin text-lg">{props.member[idNumber].title}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-y-3 overflow-auto">
                    <TinaMarkdown content={props.member[idNumber].bio} components={{
                        p: props => <p className={`
                            text-lg
                            pr-6  
                        `} {...props} />
                    }} />
                </div>
                <button onClick={closeProfile} >
                    <FaIcon
                        title={`close ${props.member[idNumber].name}'s profile`}
                        className="
                            profile-open
                            text-4xl
                            absolute
                            self-start
                            top-2 
                            right-4
                        "
                        icon={profCloseArrow} />
                </button>
            </div>
        </div>
    )
}
