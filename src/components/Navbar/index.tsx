import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <header className="container mx-auto flex h-[100px] items-center justify-between">
            <div className="text-xl ">
                <span className="font-bold text-blue-500">Post</span>
                <span className="text-gray-500">Maker</span>
            </div>
            <div className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/post">Post</Link>
            </div>
        </header>
    )
}
