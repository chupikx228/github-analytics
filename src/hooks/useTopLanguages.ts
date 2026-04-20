import useGitHubRepos from "./useGithubRepos.ts";
import {useMemo} from "react";

export const useTopLanguages = (user : string) => {

    const queryResult = useGitHubRepos(user);
    const { data } = queryResult;

    return useMemo(() => {
        const languages = data?.map((repo) => {
            return repo.language;
        })

        const result = languages?.filter((language) => {
            return language !== null
        })

        const counter : Record<string, number> = {};

        if (!data) {
            return {}
        }
        for(const language of result) {
            if(counter.hasOwnProperty([language])) {
                counter[language] += 1;
            } else {
                counter[language] = 1;
            }
        }
        return counter;
    }, [data])
}
