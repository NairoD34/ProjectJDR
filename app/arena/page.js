/**
 * Page de l'arène de combat
 * Cette page permet d'afficher et gérer la grille de combat pour les parties de JDR
 */

import Grid from "@/components/arena/grid/grid";
import styles from './page.module.css';

export default function ArenaPage() {

    return (
        <div className={styles.arenaContainer}>
            <Grid/>
        </div>
    );
}