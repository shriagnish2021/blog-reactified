/* eslint-disable import/no-cycle */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { AuthenticationContext } from '../pages/_app';

const Header = () => {
    const { isLogged, setIsLogged } = useContext(AuthenticationContext);
    const router = useRouter();
    const clickHandler = (e) => {
        e.preventDefault();
        const cookies = new Cookies();
        cookies.remove('jwt');
        setIsLogged(false);
        router.push('/');
        toast.warn('You have been logged out.', {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    const renderNavItems = () => {
        if (isLogged) {
            return (
                <>
                    <Link href="/createPost">Create Post</Link>
                    <Link href="/myPosts">My Posts</Link>
                    <a href="#" onClick={clickHandler}>
                        Logout
                    </a>
                </>
            );
        }
        return (
            <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </>
        );
    };
    return (
        <header className="nav-bar">
            <Link href="/" passHref>
                <a>
                    <h1 className="logo">Blogged</h1>
                </a>
            </Link>
            <div className="nav-items">
                <Link href="/">Home</Link>
                {renderNavItems()}
            </div>
        </header>
    );
};

export default Header;
