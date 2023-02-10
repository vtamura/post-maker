import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import IPosts from '../../@types/posts'
import { RootState } from '../../store'
import { selectPostById } from '../../store/reducers/postsReducer'
import { showAllUsers } from '../../store/reducers/usersReducer'
import dateNow from '../../utils/dateFromNow'
import { Reactions } from './Reactions'

export const Post = ({ id }: { id: EntityId }) => {
    const { id: paramId } = useParams()
    const users = useSelector(showAllUsers)
    const post = useSelector<RootState>((state) =>
        selectPostById(state, id)
    ) as IPosts

    return (
        <article className="mb-4 rounded-lg border-[1px] p-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="py-4">
                {post.body.length > 100 && !paramId
                    ? post.body.substring(0, 50) + '...'
                    : post.body}
            </p>
            {!paramId && (
                <Link className="text-blue-700" to={`/posts/${id}`}>
                    Ver mais
                </Link>
            )}
            <div className="flex justify-between">
                <Reactions postId={id.toString()} reacts={post.reactions} />
                <div>
                    <p className="ml-auto mb-2 text-sm text-gray-600">
                        Written by{' '}
                        {users.find((user) => user.id === Number(post.userId))
                            ?.name || 'unknown'}
                    </p>
                    <p className="ml-auto text-sm text-gray-600">
                        {dateNow(post.date)}
                    </p>
                </div>
            </div>
        </article>
    )
}
