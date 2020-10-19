import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import api from '../../services/api'
import history from '../../services/history'
import { Container, Post, InfoContainer, CreateButton } from './styles'
import OptionsButton from './OptionsButton'

export default function Posts() {
    const user = useSelector(state => state.usuario.perfil);
    const [posts, setPosts] = useState([]);
    const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRg6ZitqUTSpBDXu_Bej9UhxTQQQUrbE4BNhw&usqp=CAU";
    const userIsAdm = user?.isAdm ?? false;

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

    function showOptionsButton(postId, show) {
        setPosts(oldPosts => oldPosts.map(post => ({
            ...post,
            showOptionsButton: post.id === postId ? show : post.showOptionsButton
        })))
    }

    return (
        <>
            <Container className="posts">
                {posts.map(post => (
                    <Post 
                        key={post.id} 
                        className="post" 
                        onClick={() => show(post)} 
                        onMouseOver={() => showOptionsButton(post.id, true)}
                        onMouseLeave={() => showOptionsButton(post.id, false)}
                    >
                        <img src={imageUrl} alt={post.name} />
                        <InfoContainer>
                            <h1>{post.name}</h1>
                            {userIsAdm && post.showOptionsButton && <OptionsButton postId={post.id} />}
                        </InfoContainer>
                    </Post>
                        
                ))}
            </Container>
            
            {userIsAdm && (
                <CreateButton title="Novo Post" onClick={() => history.push('/editor')}>
                    <FaPlusCircle color="#4F3AB7" size={45} />
                </CreateButton>
            )}
        </>
    )
}
