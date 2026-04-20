import {githubFetch} from "../api/github";
import {useQuery} from "@tanstack/react-query";

interface GitHubUser{
    login: string;
    name: string;
    avatar_url: string;
    followers: number;
    location: string;
}
const useGithubUser = (user: string) => {
    return useQuery({
        queryKey: ['user', user],
        queryFn:
        async (): Promise<GitHubUser> => {
            const res = await githubFetch(`https://api.github.com/users/${user}`)
                if(!res.ok) throw new Error(` User ${user} not found`)
                return res.json()
        },
        enabled: !!user,

    })
}

export default useGithubUser;