import useCompareStore from "../../store/useCompareStore.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {AboutUser} from "../../components/AboutUser/AboutUser.tsx";
import UserCard from "../../components/UserCard/UserCard.tsx";
import {TopLanguages} from "../../components/TopLanguages/TopLanguages.tsx";
import styles from './AboutUserPage.module.scss';
import RepoActivityChart from "../../components/RepoActivityChart/RepoActivityChart.tsx";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary.tsx";
import {useEffect, useRef} from "react";
import {useExportPdf} from "../../hooks/useExportPDF.ts";

export const AboutUserPage = () =>{
    const {user1, setUser1} = useCompareStore();
    const navigate = useNavigate();
    let {paramUser1} = useParams();

    const handleCompare = (firstUser:string) => {
        setUser1(firstUser);
        navigate(`/user-about/${firstUser}`);
    }

    useEffect(() => {
        if(paramUser1){
            setUser1(paramUser1);
        }
    }, [paramUser1]);

    const pageRef = useRef(null);
    const {exportPdf} = useExportPdf()
    return(
        <div className={styles.page}>
            <div className={styles.pageContainer}>
                <div className={styles.pageNav}>
                    <Link to="/">
                        <button className={styles.pageBackBtn}>Home</button>
                    </Link>
                    {(user1 || paramUser1) && (
                        <button
                            className={styles.pageExportBtn}
                            onClick={() => exportPdf(pageRef)}
                        >
                            ↓ Export PDF
                        </button>
                    )}
                </div>
                <AboutUser onSearch={handleCompare}/>
                {!user1 && (
                    <ErrorBoundary>
                        <div className={styles.emptyState}>
                            <p className={styles.emptyStateIcon}>🔍</p>
                            <p className={styles.emptyStateTitle}>Enter a GitHub username to explore</p>
                            <p className={styles.emptyStateSubtitle}>Top languages, repositories and activity</p>
                        </div>
                    </ErrorBoundary>
                )}
                {(user1 || paramUser1) && (
                    <ErrorBoundary>
                        <div className={styles.pageContent} ref={pageRef}>
                            <UserCard user={user1 || paramUser1} />
                            <RepoActivityChart userA={user1 || paramUser1} />
                            {user1 && (
                                <TopLanguages user={user1 || paramUser1} />
                            )}
                        </div>
                    </ErrorBoundary>
                )}
            </div>
        </div>
    )
}