import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { HandlePost } from '../Pages/HandlePost'
import { Posts } from '../Pages/Posts'
import { ShowPost } from '../Pages/ShowPost'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<Posts />} index />
                    <Route path="post" element={<HandlePost />} />
                    <Route path="posts">
                        <Route path=":id" element={<ShowPost />} />
                        <Route path="edit/:id" element={<HandlePost />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
