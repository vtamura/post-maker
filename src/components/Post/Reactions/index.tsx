import { useDispatch } from 'react-redux'
import { addReaction } from '../../../store/reducers/postsReducer'

const reactions: { [key: string]: string } = {
    like: '🍷',
    dislike: '🗿',
    love: '😍',
    haha: '😭',
    sad: '😢',
    angry: '😡',
}

export const Reactions = ({
    postId,
    reacts,
}: {
    postId: string
    reacts: { [key: string]: number }
}) => {
    const dispatch = useDispatch()

    return (
        <div className="flex gap-4 self-end">
            {Object.entries(reactions).map(([name, emoji]) => {
                return (
                    <div key={name}>
                        <span
                            className="mr-2 cursor-pointer"
                            onClick={() =>
                                dispatch(
                                    addReaction({ id: postId, reaction: name })
                                )
                            }
                        >
                            {emoji}
                        </span>
                        <span>{reacts[name]}</span>
                    </div>
                )
            })}
        </div>
    )
}
