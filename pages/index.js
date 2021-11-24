import useSWR from 'swr';
import React, { useState } from 'react';

import SearchBar from '../components/SearchBar';
import PostList from '../components/PostList';
import FullPageLoader from '../components/FullPageLoader';

export default function Home() {
  const [url, setUrl] = useState('https://blogged-for-you.herokuapp.com/api/all-posts');
  const { data } = useSWR(url);

  const [filterConstraints, setFilterConstraints] = useState({
    searchKeyword: '',
    author: '',
    sort: '',
  });

  const onFilter = ({ searchKeyword, author, sort }) => {
    setFilterConstraints({ searchKeyword, author, sort });
    setUrl(
      `https://blogged-for-you.herokuapp.com/api/all-posts/?search=${searchKeyword}&author=${author.replace(
        /\s/g,
        '%20'
      )}&sort=${sort}`
    );
  };

  if (!data) return <FullPageLoader />;

  return (
    <div className="section-container">
      <SearchBar onFilter={onFilter} filterConstraints={filterConstraints} />
      <PostList posts={data} />
    </div>
  );
}
