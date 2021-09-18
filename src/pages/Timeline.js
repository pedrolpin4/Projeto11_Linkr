import { useContext, useEffect, useState } from "react";

import BaseLayout from "../components/BaseLayout";
import Loading from "../components/Loading";
import Post from '../components/Post';
import service from '../service/auth';
import PostBox from "../components/PostBox";
import UserContext from "../context/UserContext";

function Timeline() {
    const { userData } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ posts, setPosts ] = useState([]);
    const [ newPosts, setNewPosts ] = useState(0);
    useEffect(() => {
        let unmounted = false;

        async function getPostsData() {
            const { token } = userData;

            const response = await service.getPosts(token);

            console.log("carreguei posts do server")
            if(response && !unmounted) setPosts(response.posts)
            else if(response === false) alert("Desculpe, o servidor saiu pra almoço, por favor atualize a página")

            setIsLoading(false);
        }
        if(userData.token) getPostsData();
    },[newPosts, userData])

    return (
        <BaseLayout
            title="timeline"
            trends={[{name: "timeline"}]}            
        >
            <PostBox setNewPosts={setNewPosts} newPosts={newPosts}/>
            {
            isLoading
                ? <Loading spinnerSize={30}/>
                : posts.length === 0
                    ? "Nenhum post encontrado :("
                    : posts.map(post => <Post          key={post.id}
                                                       id = {post.id}
                                                       username={post.user.username} 
                                                       text={post.text}
                                                       link={post.link}
                                                       profilePic={post.user.avatar}
                                                       prevTitle={post.linkTitle}
                                                       prevImage={post.linkImage}
                                                       prevDescription={post.linkDescription}
                                                       likes={post.likes}
                                                       userId={post.user.id}
                                                       id={post.id}
                                                       setNewPosts={setNewPosts}
                                                       newPosts={newPosts} />)
        }</BaseLayout>
    )
}

export default Timeline;