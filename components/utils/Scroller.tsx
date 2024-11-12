'use client'
//split into two for now, one for repeated footer + header
//the other for repeated scroller
//can combine later
import React, { useEffect } from "react"
import { InView, useInView } from "react-intersection-observer"

export default function Scroller({
    children,
}: {
    children: React.ReactNode
}) {
    const { ref, inView, entry } = useInView({
        /* Optional options */

        threshold: [0, 0.1, 0.2, 0.8],
    });

    useEffect(() => {
    const width = window.innerWidth;
    if (entry) {
        if (
            width > 850
            &&
            inView
            &&
            entry.intersectionRatio > 0.2
        ) {
            entry.target.classList.add("animate-in", "fade-in", "delay-150", "duration-1000");
            entry.target.classList.remove("invisible", "opacity-0");
        } else if (
            inView) {
            entry.target.classList.add("animate-in", "fade-in", "delay-50", "duration-1000");
            entry.target.classList.remove("invisible", "opacity-0");
        }
    }
}, [
    inView,
    entry
]);

    return (
        <InView> 
            <div
                // onChange={test()}
                className="invisible opacity-0"
                ref={ref}
            >
                {children}
            </div>
        </InView>
    )
}
