import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Post } from '../../components/Post'
import { RootState } from '../../store'
import { selectPostById } from '../../store/reducers/postsReducer'

export const ShowPost = () => {
    const { id } = useParams()
    const post = useSelector((state: RootState) => selectPostById(state, id))

    if (!post) return <h1>Post not found</h1>

    return (
        <div className="container mx-auto max-w-[700px]">
            <Post id={post.id} />
            <div className="flex justify-end">
                <Link
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    to={`/posts/edit/${id}`}
                >
                    Editar
                </Link>
            </div>
        </div>
    )
}
