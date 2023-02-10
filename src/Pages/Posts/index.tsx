import { useDispatch, useSelector } from 'react-redux'
import {
    fetchPosts,
    postsError,
    postsStatus,
    selectPostsIds,
} from '../../store/reducers/postsReducer'
import { Post } from '../../components/Post'
import { useEffect } from 'react'
import { AppThunkDispatch } from '../../store'
import { fetchUsers } from '../../store/reducers/usersReducer'

export const Posts = () => {
    const posts = useSelector(selectPostsIds)
    const status = useSelector(postsStatus)
    const error = useSelector(postsError)
    const dispatch = useDispatch<AppThunkDispatch>()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers())
            dispatch(fetchPosts())
        }
    }, [status, dispatch])

    return (
        <div className="container mx-auto max-w-[600px] py-6">
            <h1 className="mb-6 text-center text-3xl text-gray-700">Posts</h1>
            {status === 'loading' && <h1>Loading...</h1>}
            {error && <h1>Error</h1>}
            {status === 'succeed' &&
                posts.map((id) => <Post id={id} key={id} />)}
        </div>
    )
}
