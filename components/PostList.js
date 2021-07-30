import PostItem from './PostItem';

const PostList = ({ posts }) => (
    <section className="posts">
        {!posts.length && (
            <ul>
                <li>No posts to display.</li>
            </ul>
        )}
        {posts.map((post) => (
            <div key={post.id} className="post-card">
                <PostItem post={post} />
            </div>
        ))}
    </section>
);

export default PostList;
