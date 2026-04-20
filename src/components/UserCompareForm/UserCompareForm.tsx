import {useState} from "react";
import styles from './UserCompareForm.module.scss';

interface Props {
    onCompare: (firstUser: string, secondUser: string) => void;
}
const UserCompareForm = ({onCompare}: Props) =>{
    const [firstUser, setFirstUser] = useState("");
    const [secondUser, setSecondUser] = useState("");

    return (
        <div className={styles.compareForm}>
            <label className={styles.compareFormLabel}>
                <p className={styles.compareFormLabelText}>
                    Enter username of First User
                </p>
                <input
                    type="text"
                    className={styles.compareFormInput}
                    value={firstUser}
                    onChange={(e) => setFirstUser(e.target.value)}
                />
            </label>

            <label className={styles.compareFormLabel}>
                <p className={styles.compareFormLabelText}>
                    Enter username of Second User
                </p>
                <input
                    type="text"
                    className={styles.compareFormInput}
                    value={secondUser}
                    onChange={(e) => setSecondUser(e.target.value)}
                />
            </label>
            <button className={styles.compareFormBtn} onClick={() => onCompare(firstUser, secondUser)}
                    disabled={!firstUser.trim() || !secondUser.trim() || firstUser === secondUser}
            >
                Start
            </button>
        </div>
    )
}
export default UserCompareForm;