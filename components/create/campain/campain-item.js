import styles from './campain-list.module.css';
import DeleteButton from "@/components/ui/close-button";


export default function CampainItem (item) {

    return (
        <div className={styles.itemContainer}>
            <p>{item.campain.name}</p>
            <DeleteButton item={item.campain}/>


        </div>
    )
}