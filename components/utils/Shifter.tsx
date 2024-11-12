'use client'
import React, { useEffect, useCallback } from "react"
import { InView, useInView } from "react-intersection-observer"

export default function Shifter({
    children,
}: {
    children: React.ReactNode
}) {
    const { ref, inView, entry } = useInView({
        /* Optional options */

        threshold: [0.2, 0.8],
    });


    const changeHeading = useCallback(
        () => {
            const header = document.querySelector('header');
            const width = window.innerWidth;
            const bg = width > 1300 ? 'bg-black/65' : 'bg-black/65';
            if (entry && entry.intersectionRatio < 0.8 && (entry.target.querySelector('div') as Element).id === 'main-cover') {
                // console.log('change heading');
                header?.classList.remove(bg);
                header?.classList.add('bg-black', "shadow-gray-800/20");
                    
            } else {
                header?.classList.add(bg);
                header?.classList.remove('bg-black', "shadow-gray-800/20");
            }

        }, [entry]
    );

    useEffect(() => {
        if (entry) {
            changeHeading();
        }
    }, [
        inView,
        entry,
        changeHeading
    ]);

    return (
        <InView>
            <div
                ref={ref}
            >
                {children}
            </div>
        </InView>
    )
}
