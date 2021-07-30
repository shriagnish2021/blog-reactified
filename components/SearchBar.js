import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import useSWR from 'swr';
import FullPageLoader from './FullPageLoader';

const SearchBar = ({ onFilter, filterConstraints }) => {
    const url = 'https://blogged-for-you.herokuapp.com/api/authors';
    const { data } = useSWR(url);

    const [searchKeyword, setSearchKeyword] = useState(filterConstraints.searchKeyword);
    const [author, setAuthor] = useState(filterConstraints.author);
    const [sort, setSort] = useState(filterConstraints.sort);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        e.target.reset();
        onFilter({ searchKeyword, author, sort });
    };

    if (!data) return <FullPageLoader />;
    return (
        <section className="search-bar">
            <form className="search-form" autoComplete="off" onSubmit={onSubmitHandler}>
                <input
                    autoComplete="off"
                    type="text"
                    name="search"
                    placeholder="search blog"
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    value={searchKeyword}
                />
                <select
                    defaultValue="DEFAULT"
                    className="author-select"
                    name="author"
                    id="author"
                    value={author || 'DEFAULT'}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="DEFAULT" disabled>
                        choose author
                    </option>
                    {data.map((eachAuthor) => (
                        <option key={eachAuthor.id} value={eachAuthor.name}>
                            {eachAuthor.name}
                        </option>
                    ))}
                </select>
                <select
                    className="author-select"
                    name="sort"
                    id="sort"
                    value={sort || 'DEFAULT'}
                    defaultValue="DEFAULT"
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="DEFAULT" disabled>
                        sort by
                    </option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <button className="search-btn" type="submit">
                    <i className="fa fa-search" />
                </button>
            </form>
        </section>
    );
};

export default SearchBar;
