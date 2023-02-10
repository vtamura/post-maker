import { useParams } from 'react-router-dom'
import { Form } from '../../components/Form'

export const HandlePost = () => {
    const { id } = useParams()
    return (
        <div className="container mx-auto max-w-[700px]">
            <h1 className="mb-6 text-center text-3xl text-gray-700">
                {id ? 'Edit' : 'Make a post'}
            </h1>
            <Form />
        </div>
    )
}
