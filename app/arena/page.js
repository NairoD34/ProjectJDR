/**
 * Page de l'arène de combat
 * Cette page permet d'afficher et gérer la grille de combat pour les parties de JDR
 */

import Grid from "@/components/arena/grid";
import BG from "@/assets/icons/western.png"  // Image de fond pour le thème western
import Image from "next/image";

export default function ArenaPage(options) {
    return (
        <>
            {/* Grille de combat avec dimensions 11x11 */}
            <Grid x={11} y={11} background={""}/>
        </>
    );
}