import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import FullPageLoader from './FullPageLoader';

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`https://blogged-for-you.herokuapp.com/api/posts/${id}`);
  const post = data;
  const cookies = new Cookies();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState({});
  const [loading, setLoading] = useState(false);
  const handleFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('cover', imageFile);
    formData.append('title', title || post.title);
    formData.append('content', content || post.content);
    const res = await fetch(`https://blogged-for-you.herokuapp.com/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cookies.get('jwt')}`,
      },
      body: formData,
    });
    const response = await res.json();
    if (res.status === 200) {
      toast.warn('Post updated successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
      router.push(`/posts/${response.article.id}`);
      setLoading(false);
    } else {
      toast.error('Something went wrong!', {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
    }
  };
  if (!post) {
    return <FullPageLoader />;
  }
  return (
    <>
      <h1>Edit Post</h1>
      <div className="text-area">
        <form
          className="create-form"
          action="/user/create-post"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="form-fields">
            <div>
              <div className="cover">
                <label htmlFor="cover">Add a cover image</label>
                <input type="file" accept="image/*" id="cover" name="cover" hidden onChange={handleFile} />
                <span className="image-name">&nbsp;{imageFile.name || post.imageFileName}</span>
              </div>
              <div className="form-group">
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title here..."
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || post.title}
                />
              </div>
              <div className="form-group">
                <textarea
                  rows={20}
                  required
                  name="content"
                  id="content"
                  placeholder="Write you content here in markdown..."
                  value={content || post.content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
            <a className="btn" href="/">
              Cancel
            </a>
            <button className="btn" type="submit">
              {loading && <i className="fa fa-refresh fa-spin" />}
              {loading && <span>&nbsp;&nbsp;</span>}
              Publish
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPost;
