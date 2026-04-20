export const githubFetch = (url: string) =>
    fetch(url, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
    })