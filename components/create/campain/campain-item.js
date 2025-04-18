import styles from './campain-list.module.css';
import DeleteButton from "@/components/ui/close-button";
import Link from "next/link";


export default function CampainItem({ campain, onDeleteClick }) {
    return (
        <div className={styles.itemContainer}>
            <Link href={`/create/${campain.id}`} className={styles.link}>
                <p>{campain.title}</p>
            </Link>
            <DeleteButton onClick={() => onDeleteClick(campain)} />
        </div>
    );
}