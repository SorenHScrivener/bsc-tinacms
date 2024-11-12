import { Playfair_Display_SC, Playfair_Display, Roboto } from 'next/font/google';

export const pfdsc = Playfair_Display_SC({
    weight: ["400", "700" , "900"],
    subsets: ['latin'],
    variable: '--mainTitle'
});

export const pfd = Playfair_Display({
    weight: ["400", "700" , "900"],
    subsets: ['latin'],
    variable: '--auxTitle'
});

export const lato = Roboto({
    weight: ["300", "500",  "400", "700"],
    subsets: ['latin'],
    variable: '--main'
});