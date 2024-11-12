import type { Metadata } from "next";
import localFont from "next/font/local";
import { pfd, pfdsc, lato } from "../ui/fonts";
// import TopNav from "@/app/ui/TopNav";
// import Footer from "@/app/ui/Footer";
import "./globals.css";

// import Scroll from "@/app/ui/LinkHelper";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Backstory Capital",
    description: "BackStory Capital LLC is a boutique alternative investment firm with a wide range of capabilities.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Backstory Capital" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${pfd.variable} ${pfdsc.variable} ${lato.variable} antialiased font-main`}
            >{children}</body>
        </html>
    )
}