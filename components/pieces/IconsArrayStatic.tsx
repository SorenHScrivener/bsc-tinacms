import React from 'react'
import Image from 'next/image'
import placeholder from '@/public/placeholders/icon.png'

interface IconItem {
    image?: string;
    label: string;
    imageSize?: string;
}

interface IconsArrayStaticProps {
    icon?: IconItem[];
}

export default function IconsArrayStatic({ icon }: IconsArrayStaticProps) {
    return (
        // <div className="flex flex-wrap justify-center gap-6">
        <>
            {icon && icon?.map((item, idx) => (

                <Image
                    key={idx}
                    src={item.image || placeholder}
                    alt={item.label}
                    width={192}
                    height={96}
                    className={item.imageSize|| ""}
                />
            ))}
        </>
        //</div>
    );
}