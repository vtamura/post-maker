import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react'
import { INewPost } from '../../@types/posts'
import { Input } from '../Input'
import { useDispatch, useSelector } from 'react-redux'
import {
    addPost,
    deletePost,
    selectPostById,
    updatePost,
} from '../../store/reducers/postsReducer'
import { AppThunkDispatch, RootState } from '../../store'
import { Select } from '../Select'
import { showAllUsers } from '../../store/reducers/usersReducer'
import { useNavigate, useParams } from 'react-router-dom'

const initialState: INewPost = {
    title: '',
    body: '',
    userId: 1,
}

export const Form = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const post = useSelector((state: RootState) => selectPostById(state, id))

    const [inputValues, setInputValues] = useState<INewPost>(
        post || initialState
    )

    const [status, setStatus] = useState<'pending' | 'idle'>('idle')
    const dispatch = useDispatch<AppThunkDispatch>()
    const users = useSelector(showAllUsers)

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setInputValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    }

    const canSave = Object.entries(inputValues)
        .map(([_, value]) => Boolean(value))
        .every((value) => value)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setStatus('pending')
            id && post
                ? await dispatch(
                      updatePost(Object.assign({}, post, inputValues))
                  ).unwrap()
                : await dispatch(addPost(inputValues)).unwrap()
            navigate('/')
        } catch (err) {
            console.error(err)
        } finally {
            setStatus('idle')
        }
        resetInputs()
    }

    const handleDeletePost = async (e: MouseEvent) => {
        if (id) {
            try {
                await dispatch(deletePost(id)).unwrap()
                navigate('/')
            } catch (err) {
                console.error(err)
            }
        }
    }

    const resetInputs = () => setInputValues(initialState)

    return (
        <form onSubmit={handleSubmit}>
            <Input
                id="title"
                label="Title"
                name="title"
                value={inputValues.title}
                onChange={handleInputChange}
            />
            <Select
                id="userId"
                label="User"
                name="userId"
                value={inputValues.userId || 0}
                options={users.map((user) => ({
                    id: user.id,
                    label: user.name,
                }))}
                onChange={handleInputChange}
            />
            <Input
                id="body"
                label="Content"
                name="body"
                value={inputValues.body}
                onChange={handleInputChange}
            />
            <div className="flex justify-end gap-4">
                {id && (
                    <button
                        className="rounded-md bg-red-500 py-2 px-6 text-white hover:bg-red-600"
                        onClick={handleDeletePost}
                        type="button"
                    >
                        Delete
                    </button>
                )}
                <button
                    className={`rounded-md ${
                        status === 'pending' || !canSave
                            ? 'bg-gray-500'
                            : 'bg-blue-600 hover:bg-blue-700'
                    } py-2 px-6 text-white`}
                    type="submit"
                    disabled={status === 'pending' || !canSave}
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
