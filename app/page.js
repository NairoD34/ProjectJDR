import styles from './page.module.css'
import Link from "next/link";
import ImageSlideshow from "@/components/images/image-slideshow";
export default function Home() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.slideshow}>
                    <ImageSlideshow/>
                </div>
                <div>
                    <div className={styles.hero}>
                        <h1>Project JDR</h1>
                        <p>Créé vos mondes et personnages pour des soirées JDR inoubliable</p>
                    </div>
                    <div className={styles.cta}>
                        <Link href={"/arena"}>Rejoignez l'arène !</Link>
                        <Link href={"/create"}>Créé vos histoire</Link>
                    </div>
                </div>
            </header>
            <main>
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
