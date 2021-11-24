import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import FullPageLoader from './FullPageLoader';

const PostContent = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`https://blogged-for-you.herokuapp.com/api/posts/${id}`);
  const post = data;
  if (!post) return <FullPageLoader />;
  return (
    <>
      <img src={`https://blogged-for-you.herokuapp.com/uploads/${post.imageFileName}`} alt="cover" />
      <div className="show-post-content">
        <h1>{post.title}</h1>
        <em>{new Date(post.createdAt).toDateString()}</em>
        <div className="wrap-author-image-name">
          <Image
            src="https://blogged-for-you.herokuapp.com/images/alex-suprun-ZHvM3XIOHoE-unsplash.jpg"
            width={40}
            height={40}
            alt="Profile pic"
          />
          <h2>
            <Link href="">{post.author.name}</Link>
          </h2>
        </div>
        <div className="post-content-html" dangerouslySetInnerHTML={{ __html: post.sanitizedHtml }} />
      </div>
    </>
  );
};

export default PostContent;
