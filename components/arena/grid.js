import styles from './grid.module.css'
import * as url from "node:url";

export default function Grid({x,y,background}){
    return (
        <>
        <div className={styles.contenant}>
        <table className={styles.table} style={{
            backgroundImage: `url(https://project-jdr-bucket.s3.amazonaws.com/icon.png)`,
            backgroundSize: "cover"
            }}>
            <tbody>
                {[...Array(y)].map((_, rowIndex) => (
                    <tr className={styles.tr} key={rowIndex}>
                        {[...Array(x)].map((_, colIndex) => (
                            <td className={styles.td} key={`${rowIndex}-${colIndex}`}>

                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </>
    );
}