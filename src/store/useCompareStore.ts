import {create} from 'zustand'

interface CompareStore {
    user1: string | null
    user2: string | null

    setUser1: (user1: string) => void
    setUser2: (user2: string) => void

}

const useCompareStore = create<CompareStore>((set) => ({
    user1: null,
    user2: null,

    setUser1: (user) => set({user1: user}),
    setUser2: (user) => set({user2: user}),
}))

export default useCompareStore