import { ChangeEvent } from 'react'

interface SelectProps {
    id: string
    label: string
    value: string | number
    name: string
    options: {
        id: number
        label: string
    }[]
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({
    id,
    label,
    value,
    name,
    options,
    onChange,
}: SelectProps) => {
    return (
        <div className="mb-4 grid">
            <label htmlFor={id}>{label}</label>
            <select
                className="rounded-md border-2 border-gray-400 px-4 py-2 outline-none"
                id={id}
                value={value}
                name={name}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
