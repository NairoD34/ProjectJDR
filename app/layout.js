import './globals.css';
import MainHeader from "@/components/main-header/main-header";

export const metadata = {
    title: 'Project-JDR',
    description: 'A RPG application by a gamer for the gamers ! Launch the dice and let lady Destiny do her magic.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <MainHeader/>
        {children}
        </body>
        </html>
    );
}
