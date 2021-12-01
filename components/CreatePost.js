import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'font-awesome/css/font-awesome.min.css';
import MarkdownIt from 'markdown-it';

const CreatePost = () => {
  const cookies = new Cookies();
  const router = useRouter();
  const [imageFile, setImageFile] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [tabState, setTabState] = useState('edit');

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('cover', imageFile);
    formData.append('title', title);
    formData.append('content', content);
    const res = await fetch(`https://blogged-for-you.herokuapp.com/api/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cookies.get('jwt')}`,
      },
      body: formData,
    });
    const response = await res.json();
    if (res.status === 200) {
      setLoading(false);
      router.push(`/posts/${response.id}`);
      toast.warn('Post create successfully', {
        position: 'top-center',
      });
    } else {
      setLoading(false);
      toast.warn('Please upload a cover Image', {
        position: 'top-center',
      });
    }
  };
  const md = new MarkdownIt();
  return (
    <>
      <div className="flex justify-between pb-3">
        <h1 className="text-primary text-2xl">Create Post</h1>
        <div className="flex gap-2 text-lg">
          <button
            type="button"
            onClick={() => setTabState('edit')}
            className={`${tabState === 'edit' ? 'text-primary underline' : 'text-gray'}`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setTabState('preview')}
            className={`${tabState === 'preview' ? 'text-primary underline' : 'text-gray'}`}
          >
            Preview
          </button>
        </div>
      </div>
      <div className="text-area">
        {tabState === 'edit' ? (
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
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="cover">Add a cover image</label>
                  <input type="file" accept="image/*" id="cover" name="cover" hidden onChange={handleFile} />
                  <span className="image-name">&nbsp;{imageFile.name}</span>
                </div>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    rows={20}
                    required
                    name="content"
                    id="content"
                    placeholder="Write you content here in markdown..."
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                  />
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a className="btn" href="/">
                Cancel
              </a>
              <button className="btn" type="submit" disabled={loading}>
                {loading && <i className="fa fa-refresh fa-spin" />}
                {loading && <span>&nbsp;&nbsp;</span>}
                Publish
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="text-3xl">{title}</div>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="post-content-html" dangerouslySetInnerHTML={{ __html: md.render(content) }} />
          </>
        )}
      </div>
    </>
  );
};

export default CreatePost;
