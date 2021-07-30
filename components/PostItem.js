import Link from 'next/link';
import Image from 'next/image';

const PostItem = ({ post }) => (
    <>
        <Image
            src={`https://blogged-for-you.herokuapp.com/uploads/${post.imageFileName}`}
            alt="cover image"
            height="200"
            width="300"
            layout="fixed"
        />
        <Link href={`/posts/${post.id}`} passHref>
            <a>
                <h1>{post.title}</h1>
            </a>
        </Link>
        <div className="wrap-icon">
            <Image
                src="https://blogged-for-you.herokuapp.com/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg"
                alt="profile pic"
                width="40"
                height="40"
            />
            <div className="wrap-author-date">
                <div>
                    <h2>{post.author.name}</h2>
                </div>
                <em>{new Date(post.createdAt).toDateString()}</em>
            </div>
        </div>
        <div className="wrap-read-more">
            <p>
                {post.sanitizedHtml
                    .replace(/<[^>]*>/g, ' ')
                    .split(' ')
                    .slice(0, 20)
                    .join(' ')}
                &nbsp;<Link href={`/posts/${post.id}`}>read more</Link>
            </p>
        </div>
    </>
);

export default PostItem;
