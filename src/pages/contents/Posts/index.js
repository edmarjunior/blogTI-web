import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import api from '../../../services/api'
import history from '../../../services/history'
import { Container, Post } from './styles'

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRg6ZitqUTSpBDXu_Bej9UhxTQQQUrbE4BNhw&usqp=CAU";

    useEffect(() => {
        async function init() {
            const { data: response } = await api.get('contents');

            if (!response.ok) {
                return toast.info(response.messages[0]);
            }

            setPosts(response.content);
        }

        init();
    }, [])

    function show(post) {
        history.push({
            pathname: '/post',
            search: `?p=${post.id}`,
        })
    }

    return (
        <Container className="posts">
            {posts.map(post => (
                <Post key={post.id} className="post" onClick={() => show(post)}>
                    <img src={imageUrl} alt={post.name} />
                    <h1>{post.name}</h1>
                </Post>
            ))}
        </Container>
    )
}
