
import Link from "next/link";
import styles from "./main-header.module.css"
import logoImg from "@/assets/icons/icon.png"
import Image from "next/image";
import MainHeaderBackground from "@/components/main-header/main-header-background";
import {usePathname} from "next/navigation";
import NavLink from "@/components/main-header/nav-link";

export default function MainHeader(){

    return (
        <>
        <MainHeaderBackground/>
        <header className={styles.header}>
            <Link className={styles.logo} href={"/"}><Image src={logoImg} priority alt={"A plate with food on it"}/>Project JDR </Link>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink href={"/arena"}>Arena</NavLink>
                    </li>
                    <li>
                        <NavLink href={"/create"}>Create your world</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
            </>
    )
}