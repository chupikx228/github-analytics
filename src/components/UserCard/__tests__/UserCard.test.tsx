import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserCard from "../UserCard";
import useGithubUser from "../../../hooks/useGithubUser.ts";
import useGithubRepos from "../../../hooks/useGithubRepos.ts";

vi.mock('../../../hooks/useGithubUser.ts', () => ({
    default: vi.fn()
}))


vi.mock('../../../hooks/useGithubRepos.ts', () => ({
    default: vi.fn()
}))

test('loading test', async () => {

    const mockedUseGithubUser = vi.mocked(useGithubUser)

    const mockedGithubRepos = vi.mocked(useGithubRepos)

    mockedUseGithubUser.mockReturnValue({data: null,isLoading: true, isError: false})
    mockedGithubRepos.mockReturnValue({data: [], isLoading: true, isError: false})

    render(<UserCard user={"chupikx228"} />)

    const skeletonDiv = screen.getByTestId('user-card-skeleton')


    expect(skeletonDiv).toBeInTheDocument()

})

test('error test', async() => {
    const mockedUseGithubUser = vi.mocked(useGithubUser)
    const mockedGithubRepos = vi.mocked(useGithubRepos)

    mockedUseGithubUser.mockReturnValue({data: null, isLoading: false, isError: true})
    mockedGithubRepos.mockReturnValue({data: null, isLoading: false, isError: true})

    render(<UserCard user={"chupikx228"} />)

    const errorDiv = screen.getByTestId('user-card-error')
    expect(errorDiv).toBeInTheDocument()
})