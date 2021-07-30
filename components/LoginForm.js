import Link from 'next/link';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { AuthenticationContext } from '../pages/_app';
import 'font-awesome/css/font-awesome.min.css';

const LoginForm = () => {
    const cookies = new Cookies();
    const { isLogged, setIsLogged } = useContext(AuthenticationContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        const res = await fetch('https://blogged-for-you.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const response = await res.json();
        if (res.status === 200) {
            setLoading(false);
            cookies.set('jwt', response.accessToken);
            setIsLogged(true);
            toast.info('Logged in successfully!', {
                position: toast.POSITION.TOP_CENTER,
            });
            router.push('/');
        } else {
            toast.error('User does not exist or wrong password!', {
                position: toast.POSITION.TOP_CENTER,
            });
            setLoading(false);
        }
    };
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="button-flex">
                    <button type="submit" disabled={loading}>
                        {loading && <i className="fa fa-refresh fa-spin" />}
                        {loading && <span>&nbsp;&nbsp;</span>}
                        Login
                    </button>
                    <Link href="/register">Need an account? Register here</Link>
                </div>
            </form>
        </>
    );
};

export default LoginForm;
