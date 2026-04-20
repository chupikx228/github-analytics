import {useTopLanguages} from "../../hooks/useTopLanguages.ts";
import styles from './TopLanguages.module.scss';


export const TopLanguages = ({user}) => {
    const languages = useTopLanguages(user)

    return (

        <>
            <div className={styles.topLanguages}>
                <p className={styles.topLanguagesTitle}>Top Languages of {user} are</p>
                {Object.entries(languages).sort((a,b) => b[1] - a[1]).map(([lang, language]) => (
                    <div className={styles.topLanguagesItem} key={lang}>
                        <div className={styles.topLanguagesItemInfo}>
                            <img className={styles.topLanguagesItemIcon} src={`https://skillicons.dev/icons?i=${lang.toLowerCase()}`}/>
                            <p className={styles.topLanguagesItemName}>{lang}</p>
                        </div>
                        <p className={styles.topLanguagesItemCount}>{language} repos</p>
                    </div>
                ))
                }
            </div>
        </>
    )
}