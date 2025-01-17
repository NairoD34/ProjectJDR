/**
 * Page d'accueil de Project JDR
 * Cette page présente les fonctionnalités principales de l'application
 * et permet aux utilisateurs de naviguer vers les différentes sections
 */

import styles from './page.module.css'
import Link from "next/link";
import ImageSlideshow from "@/components/images/image-slideshow";

export default function Home() {
    return (
        <>
            {/* En-tête avec diaporama et texte d'accroche */}
            <header className={styles.header}>
                <div className={styles.slideshow}>
                    <ImageSlideshow/>
                </div>
                <div>
                    {/* Section héros avec titre et description */}
                    <div className={styles.hero}>
                        <h1>Project JDR</h1>
                        <p>Créez vos mondes et personnages pour des soirées JDR inoubliables</p>
                    </div>
                    {/* Boutons d'appel à l'action */}
                    <div className={styles.cta}>
                        <Link href={"/arena"}>Rejoignez l'arène !</Link>
                        <Link href={"/create"}>Créez vos histoires</Link>
                    </div>
                </div>
            </header>
            <main>
                {/* Section explicative du fonctionnement */}
                <section className={styles.section}>
                    <h2>Comment ça marche ?</h2>
                    <p>
                        Project JDR est un outil de combat et de placement pour jeux de rôles.
                        Il a pour objectif de permettre au maître du jeu de créer les personnages joueurs,
                        les cartes de combats semés d'obstacles et les ennemis qui barreront la route de nos
                        protagonistes.
                    </p>
                    <p>
                        Comment ça fonctionne ??
                    </p>
                </section>

                {/* Section sur le créateur de monde */}
                <section className={styles.section}>
                    <h2>Le créateur de monde</h2>
                    <p>
                        La page création de monde est essentielle à l'utilisation de Project JDR car elle
                        permettra au maître du jeu de pouvoir préparer différentes cartes, différents
                        personnages mais aussi leurs compétences et celles de multiple boss.
                        Il pourront créer alors différentes campagnes qui regrouperont les assets nécessaire à
                        la campagne.
                        Lorsque la partie création de monde est terminé la parti peut commencer !
                    </p>
                </section>

                {/* Section sur l'arène de combat */}
                <section className={styles.section}>
                    <h2>L'arène</h2>
                    <p>
                        La page arène vous permettra de crée une grille qui servira de carte pour les combats
                        de vos jeux de rôles. Il vous permettra de gérer les personnages et leurs placement
                        sur la grille de jeux ainsi que leur compétences.
                        Il ne fonctionne pas sans la partie création de monde !
                    </p>
                </section>

            </main>
        </>
    );
}
