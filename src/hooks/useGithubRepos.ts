import {githubFetch} from "../api/github";
import {useQuery} from "@tanstack/react-query";


interface GitHubRepos{
    name: string;
    created_at: string;
    language: string;
}

const useGitHubRepos = (user : string) => {
    return useQuery({
        queryKey: ['repos', user],
        enabled: !!user,
        queryFn: async (): Promise<GitHubRepos[]> => {
            const res = await githubFetch(`https://api.github.com/users/${user}/repos`)

            if(!res.ok){
                throw new Error('User or Repos not Found')
            }
            const data = await res.json()
            return Array.isArray(data) ? data : []

        },
    })

}
export default useGitHubRepos;