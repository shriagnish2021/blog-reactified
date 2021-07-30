import Link from 'next/link';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AuthenticationContext } from '../pages/_app';
import 'font-awesome/css/font-awesome.min.css';

const RegisterForm = () => {
    const router = useRouter();
    const logginSettings = useContext(AuthenticationContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    async function submitHandler(e) {
        setLoading(true);
        e.preventDefault();
        const res = await fetch('https://blogged-for-you.herokuapp.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password2,
            }),
        });
        const response = await res.json();
        if (res.status === 200) {
            setLoading(false);
            toast.success('You have been registered successfully. Please login.', {
                position: toast.POSITION.TOP_CENTER,
            });
            router.push('/login');
        } else {
            setLoading(false);
            toast.warn(response.errors[0].message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
    return (
        <>
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <div>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        placeholder="Confirm password"
                        required
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </div>
                <div className="button-flex">
                    <button type="submit">
                        {loading && <i className="fa fa-refresh fa-spin" />}
                        {loading && <span>&nbsp;&nbsp;</span>}
                        Register
                    </button>
                    <Link href="/login">Already registered? Login here</Link>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;
