import useGithubUser from "../../hooks/useGithubUser.ts";
import useGitHubRepos from "../../hooks/useGithubRepos.ts";
import styles from './UserCard.module.scss'
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

interface UserCardProps{
    user: string;
}

const UserCard = ({user} : UserCardProps) => {

    const { data : userData, isLoading: userLoading, isError: userError } = useGithubUser(user)
    const { data: repos, isLoading: reposLoading, isError: reposError} = useGitHubRepos(user)


    useEffect(()=>{
        setVisibleCount(4)
    }, [user])
    const [visibleCount, setVisibleCount] = useState<number>(4)



    if(userLoading || reposLoading){
        return (
            <div data-testid="user-card-skeleton" className={`${styles.userCard} ${styles.userCardSkeleton}`}>
                <div className={styles.userCardHeader}>
                    <div className={`${styles.userCardAvatar} ${styles.userCardAvatarSkeleton}`} />
                    <div className={`${styles.userCardName} ${styles.userCardNameSkeleton}`} />
                </div>
                <div className={`${styles.userCardRepo} ${styles.userCardRepoSkeleton}`} />
                <div className={`${styles.userCardRepo} ${styles.userCardRepoSkeleton}`} />
                <div className={`${styles.userCardRepo} ${styles.userCardRepoSkeleton}`} />
            </div>
        );
    }
    if(userError || reposError){
        return <div data-testid="user-card-error" className={`${styles.userCard} ${styles.userCardError}`}>Error, User not found</div>
    }
    if(!userData){
        return null
    }
    return (
        <>
            <div className={styles.userCard}>
                <a href={`https://github.com/${user}`} target="_blank" rel="noopener noreferrer">
                    <div className={styles.userCardHeader}>
                        <img className={styles.userCardAvatar} src={userData.avatar_url} alt={userData.name}
                             crossOrigin="anonymous"/>
                        <div className={styles.userCardInfo}>
                            <h2 className={styles.userCardName}>{userData.name ?? userData.login}</h2>
                            {userData?.location && (
                                <p className={styles.userCardLocation}>{userData.location}</p>
                            )}
                            <p className={styles.userCardFollowers}>
                                <span className={styles.userCardFollowersCount}>{userData?.followers}</span> followers

                            </p>

                        </div>
                    </div>
                </a>
                {
                    repos?.slice(0,visibleCount).map((repo, index) => (
                        <motion.div key={repo.name} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.3 , delay: index * 0.1}}>
                    <a href={`https://github.com/${user}/${repo.name}`} target="_blank" rel="noopener noreferrer">
                        <div className={styles.userCardRepo}>
                            <p className={styles.userCardRepoName}>{repo.name}</p>
                            <p className={styles.userCardRepoLanguage}>{repo.language} </p>
                            <p className={styles.userCardRepoDate}>{new Date(repo.created_at).toLocaleDateString()}</p>
                        </div>
                    </a>
                        </motion.div>
                ))
                }
                {visibleCount < repos?.length &&
                    <button className={styles.userCardLoadMore} onClick={() => {
                        setVisibleCount(prev => prev + 4)
                    }
                    }>Load More</button>}
            </div>
        </>
    )
}

export default UserCard;