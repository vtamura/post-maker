import { ChangeEvent } from 'react'

interface InputProps {
    id: string
    label: string
    value: string
    name: string
    type?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
    id,
    label,
    value,
    name,
    type = 'text',
    onChange,
}: InputProps) => {
    return (
        <div className="grid mb-4">
            <label htmlFor={id}>{label}</label>
            <input
                className="border-2 border-gray-400 px-4 py-2 rounded-md outline-none"
                id={id}
                value={value}
                name={name}
                onChange={onChange}
                type={type}
            />
        </div>
    )
}
