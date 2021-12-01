import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import PostItem from './PostItem';

// eslint-disable-next-line react/prop-types
const PostList = ({ posts }) => {
  // eslint-disable-next-line no-unused-vars
  const [articleData, setArticleData] = useState(posts);
  const [pageNumber, setPageNumber] = useState(0);
  const articlesPerPage = 5;

  const pageCount = Math.ceil(articleData.length / articlesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const pagesVisited = pageNumber * articlesPerPage;
  let displayArticles;
  if (articleData) {
    displayArticles = articleData.slice(pagesVisited, pagesVisited + articlesPerPage);
  }
  return (
    <section className="posts">
      {!displayArticles.length && (
        <ul>
          <li>No posts to display.</li>
        </ul>
      )}
      {displayArticles.map((post) => (
        <div key={post.id} className="post-card">
          <PostItem post={post} />
        </div>
      ))}
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="w-4/5 flex justify-center mb-4 text-gray-500 items-center"
        disabledClassName=""
        pageLinkClassName="py-1 px-2 m-1 cursor-pointer font-bold text-xl focus:text-white hover:bg-blue-600 hover:text-white rounded"
        nextLinkClassName="py-1 px-2 m-1 cursor-pointer font-bold text-xl hover:text-yellow-600"
        previousLinkClassName="py-1 px-2 m-1 cursor-pointer font-bold text-xl hover:text-yellow-600"
        activeLinkClassName="bg-blue-600 rounded text-white"
      />
    </section>
  );
};

export default PostList;
