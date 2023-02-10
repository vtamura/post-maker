import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    EntityId,
    nanoid,
} from '@reduxjs/toolkit'
import { RootState } from '..'
import IPosts, { INewPost } from '../../@types/posts'
import axios from '../../services/api'
import { AxiosError } from 'axios'

interface IInitialState {
    posts: IPosts[]
    status: 'idle' | 'loading' | 'succeed' | 'failed'
    error: any
}

const initialState: IInitialState = {
    posts: [],
    status: 'idle',
    error: null,
}

const initialReactions = {
    like: 0,
    dislike: 0,
    love: 0,
    haha: 0,
    angry: 0,
    sad: 0,
}

const postsAdapter = createEntityAdapter<IPosts>({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get('/posts')
        return response.data
    } catch (err) {
        const error = err as AxiosError
        return error.message
    }
})

export const addPost = createAsyncThunk(
    'posts/addPost',
    async (newPost: INewPost) => {
        try {
            const response = await axios.post('/posts', newPost)

            return response.data
        } catch (err) {
            const error = err as AxiosError
            return error.message
        }
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (postId: EntityId) => {
        try {
            const response = await axios.delete(`/posts/${postId}`)
            return { status: response.status, postId }
        } catch (err) {
            const error = err as AxiosError
            return { status: 400, message: error.message }
        }
    }
)

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (data: IPosts) => {
        try {
            const response = await axios.put(`/posts/${data.id}`, {
                title: data.title,
                userId: data.userId,
                body: data.body,
                id: data.id,
            })

            return {
                status: response.status,
                data,
            }
        } catch (err) {
            const error = err as AxiosError
            console.log(error)
            return {
                status: 200,
                data,
            }
        }
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: postsAdapter.getInitialState(initialState),
    reducers: {
        addReaction: (
            state,
            { payload }: { payload: { id: string; reaction: string } }
        ) => {
            const post = state.entities[payload.id]

            if (post) {
                post.reactions[payload.reaction] += 1
            }
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchPosts.fulfilled, (state, { payload }) => {
                state.status = 'succeed'
                postsAdapter.setAll(
                    state,
                    payload.map(
                        (post: Omit<IPosts, 'date' | 'reactions'>): IPosts => ({
                            ...post,
                            id: nanoid(),
                            date: new Date().toISOString(),
                            reactions: { ...initialReactions },
                        })
                    )
                )
            })
            .addCase(fetchPosts.rejected, (state, { payload }) => {
                state.status = 'failed'
                state.error = payload
            })
            .addCase(fetchPosts.pending, (state, { payload }) => {
                state.status = 'loading'
            })
            .addCase(addPost.fulfilled, (state, { payload }) => {
                postsAdapter.addOne(state, {
                    ...payload,
                    id: nanoid(),
                    date: new Date().toISOString(),
                    reactions: { ...initialReactions },
                })
            })
            .addCase(deletePost.fulfilled, (state, { payload }) => {
                if (payload.status === 200) {
                    if (payload.postId) {
                        postsAdapter.removeOne(state, payload.postId)
                    }
                }
            })
            .addCase(updatePost.fulfilled, (state, { payload }) => {
                if (payload.status === 200) {
                    if (payload.data) {
                        postsAdapter.upsertOne(state, {
                            ...payload.data,
                            date: new Date().toISOString(),
                        })
                    }
                }
            }),
})

const postsSelectors = postsAdapter.getSelectors<RootState>(
    (state) => state.posts
)

export const { selectById: selectPostById, selectIds: selectPostsIds } =
    postsSelectors

export const postsStatus = (state: RootState) => state.posts.status
export const postsError = (state: RootState) => state.posts.error

export const { addReaction } = postsSlice.actions
export default postsSlice.reducer
