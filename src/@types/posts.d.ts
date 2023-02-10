import IReactions from './reactions'

export default interface IPosts {
    id: string
    userId: number
    title: string
    body: string
    date: string
    reactions: IReactions
}

export type INewPost = Omit<
    IPosts,
    'id' | 'date' | 'reactions' | 'userId' | 'author'
> & {
    userId: number | null
}
