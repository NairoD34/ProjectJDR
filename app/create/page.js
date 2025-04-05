/**
 * Page de création de contenu
 * Cette page permettra aux utilisateurs de créer leurs mondes,
 * personnages, compétences et campagnes
 */
import styles from './page.module.css';

import CampainList from "@/components/create/campain/campain-list";
import CreateCampain from "@/components/create/campain/new-campain";

export default function CreatePage() {

    return (
        <>
            <h1 className={styles.title}>Bienvenue dans le créateur de monde</h1>
            <div className={styles.mainContainer}>

                <CreateCampain/>
                <h2 className={styles.title}>Vos campagnes actuelles</h2>
                <CampainList />
            </div>
        </>

    )
}