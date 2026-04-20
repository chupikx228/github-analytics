import {useThemeStore} from "../../store/useThemeStore.ts";
import {useEffect} from "react";
import styles from './ThemeToggle.module.scss';
import sun from './assets/sun.png';
import moon from './assets/moon.png';

export const ThemeToggle = ({className}) => {
    const {isLight, toggleTheme} = useThemeStore()

    useEffect(() => {
        document.body.classList.toggle("light" ,isLight)
    }, [isLight])


    return(
        <button className={`${className} ${isLight ? styles.light : styles.dark}`} onClick={toggleTheme}>
            <img src={isLight ? sun : moon} alt={isLight ? 'Light' : 'Dark'} className={styles.icon}/>
        </button>
    )
}