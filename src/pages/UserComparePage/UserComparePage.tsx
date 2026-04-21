import UserCompareForm from "../../components/UserCompareForm/UserCompareForm.tsx";
import UserCard from "../../components/UserCard/UserCard.tsx";
import RepoActivityChart from "../../components/RepoActivityChart/RepoActivityChart.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import useCompareStore from "../../store/useCompareStore.ts";
import {TopLanguages} from "../../components/TopLanguages/TopLanguages.tsx";
import styles from './UserComparePage.module.scss';
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary.tsx";
import {useEffect} from "react";
import useGitHubRepos from "../../hooks/useGithubRepos.ts";


function UserComparePage() {

    let {paramUser1 , paramUser2} = useParams();
    const navigate = useNavigate();
    const { data: repos, } = useGitHubRepos()


    const {user1, user2, setUser1, setUser2} = useCompareStore();


    const handleCompare = (firstUser: string, secondUser: string) => {
        setUser1(firstUser);
        setUser2(secondUser);
        navigate(`/user-compare/${firstUser}/${secondUser}`);
    }

    useEffect(() => {
        if(paramUser1 && paramUser2){
            setUser1(paramUser1);
            setUser2(paramUser2);
        }
    },[paramUser1, paramUser2]);
    return (
        <div className={styles.page}>
            <div className={styles.pageContainer}>
                <Link to='/'>
                    <button className={styles.pageBackBtn}>Home</button>
                </Link>
                <UserCompareForm onCompare={handleCompare} />
                {!user1 && !user2 && (
                    <div className={styles.emptyState}>
                        <p className={styles.emptyStateIcon}>⚡</p>
                        <p className={styles.emptyStateTitle}>Enter two GitHub usernames to compare</p>
                        <p className={styles.emptyStateSubtitle}>Repos, languages and activity side by side</p>
                    </div>
                )}

                {(user1 || paramUser1) && (user2 || paramUser2) && (
                    <div className={styles.pageContent}>
                        <ErrorBoundary>
                        <div className={styles.pageCards}>
                            <UserCard user={user1 || paramUser1} />
                            <UserCard user={user2 || paramUser2} />
                        </div>
                        </ErrorBoundary>

                        <ErrorBoundary>
                            {repos?.length > 0 && (
                                <div className={styles.pageChart}>
                                    <RepoActivityChart userA={user1 || paramUser1} userB={user2 || paramUser2} />
                                </div>
                            )}
                        </ErrorBoundary>


                        <ErrorBoundary>
                            {repos?.length > 0 &&(
                                <div className={styles.pageLanguages}>
                                    <TopLanguages user={user1 || paramUser1} />
                                    <TopLanguages user={user2 || paramUser2} />
                                </div>
                            )}

                        </ErrorBoundary>

                    </div>
                )}

            </div>
        </div>
    )
}

export default UserComparePage;