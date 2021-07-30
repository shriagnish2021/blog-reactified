import React from 'react';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import Cookies from 'universal-cookie';
import FullPageLoader from './FullPageLoader';

const fetcher = async (url) => {
    const cookies = new Cookies();
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${cookies.get('jwt')}`,
        },
    });
    return res.json();
};
const MyPostsList = () => {
    const url = 'https://blogged-for-you.herokuapp.com/api/posts/';
    const { data, error } = useSWR(url, fetcher);

    const submitHandler = async (e, id) => {
        e.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get('jwt');
        const res = await fetch(`https://blogged-for-you.herokuapp.com/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.status === 200) {
            mutate('https://blogged-for-you.herokuapp.com/api/posts/');
            toast.warn('Deleted successfully!', {
                position: toast.POSITION.TOP_CENTER,
            });
            mutate('https://blogged-for-you.herokuapp.com/api/all-posts');
        }
    };
    if (!data) return <FullPageLoader />;
    return (
        <>
            <div>
                <div>
                    <h1>My Posts</h1>
                </div>
                <div>
                    <select className="author-select sort-select" name="sort" id="sort">
                        <option value="" disabled selected>
                            sort by
                        </option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
            {!data.length && (
                <div className="flash-messages">
                    <ul>
                        <li>You don&apos;t have any posts to display.</li>
                    </ul>
                </div>
            )}
            <section className="all-my-posts">
                {data.map((post) => (
                    <div key={post.id} className="my-post-card">
                        <div className="wrap-title-date">
                            <a className="title" href={`/posts/${post.id}`}>
                                <h1>{post.title}</h1>
                            </a>
                            <p>{new Date(post.createdAt).toDateString()}</p>
                        </div>
                        <div className="edit-delete">
                            <form onSubmit={(e) => submitHandler(e, post.id)}>
                                <button className="btn" type="submit">
                                    Delete
                                </button>
                            </form>
                            <a className="btn" href={`/posts/edit/${post.id}`}>
                                Edit
                            </a>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default MyPostsList;
