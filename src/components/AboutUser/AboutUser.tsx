import {useState} from "react";
import styles from './AboutUser.module.scss'

interface Props {
    onSearch: (username: string) => void;
}
export const AboutUser = ({onSearch}: Props) => {
    const [input, setInput] = useState("");

    return (
        <div className={styles.aboutUser}>
            <label className={styles.aboutUserLabel}>
                <p className={styles.aboutUserLabelText}>
                    Enter username
                </p>
                <input
                    className={styles.aboutUserInput}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}/>
            </label>
            <button className={styles.aboutUserBtn} onClick={()=> onSearch(input)}
                    disabled={!input.trim()}>Start</button>
        </div>
    )
}