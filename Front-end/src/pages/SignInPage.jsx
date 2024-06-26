import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { signin } from '../redux/slices/auth';
import { useCookies } from 'react-cookie';

const eye = <FontAwesomeIcon icon={faEye} />;
const SignInPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [cookies, setCookie] = useCookies();
    const [passwordShown, setPasswordShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('アカウント作成と同時に、当サイト');
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const error = useSelector((state) => state.auth.error);

    const handleLogin = (e) => {
        e.preventDefault();
        const signinObject = { email, password }
        dispatch(signin({ signinObject, setCookie, cookies }));
    };

    const handleLoginSuccess = () => {
        // Navigate back to the previous page
        history.goBack();
    };

    useEffect(() => {
        setErrorMsg(error);
    }, [error])

    useEffect(() => {
        setTimeout(() => {
            if (cookies.token) {
                handleLoginSuccess();
            }
        }, 20);
    })

    const handleNavigateToRegister = () => {
        history.push('/register')
    }

    return (
        <>
            <div className='w-full h-[900px] bg-image-blur bg-cover '></div>
            <div className='fixed bottom-1/3 right-1/2 transform translate-x-1/2 translate-y-1/3 flex flex-col items-center w-[350px] sm:w-[550px] bg-black/50 z-10 border-white border-2 rounded-lg font-normal'>
                <h1 className='text-[28px] text-white font-medium pt-[40px]'>ログイン</h1>
                <form className='flex flex-col items-center flex-wrap w-[70%]' onSubmit={(e) => handleLogin(e)} >
                    <div className='flex flex-col w-full'>
                        <label htmlFor="email" className='text-white font-normal mb-1 mt-5 text-[20px]'>メール</label>
                        <input
                            className='h-[35px] rounded-md pl-2'
                            type="text"
                            id="email"
                            name="emailname"
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='relative flex flex-col w-full mb-10'>
                        <label htmlFor="password" className='text-white font-normal mb-1 mt-7 text-[20px]'>パスワード<br /><span className='text-[14px] leading-[2px]'>登録済みのパスワードをご入力ください。</span><br /></label>
                        <input
                            className='h-[35px] rounded-md pl-2'
                            type={passwordShown ? "text" : "password"}
                            id="password"
                            name="password"
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className='absolute bottom-1 right-3 cursor-pointer' onClick={togglePasswordVisibility}>{eye}</i>
                    </div>
                    {
                        errorMsg !== '' &&
                        <p className='text-red-400 text-lg font-bold'>{errorMsg}</p>
                    }
                    <button className='mt-10 w-full h-[50px] rounded-md bg-[#2A6484] text-white font-semibold border-white/50 border-2 text-[22px]' onSubmit={(e) => handleLogin(e, useSelector)}>ログイン </button>
                    <button className='mt-6 w-full h-[50px] rounded-md bg-[#2A6484] text-white font-semibold border-white/50 border-2 text-[19px] mb-20' onClick={handleNavigateToRegister}>サインアップページに移動 </button>
                </form>
            </div>
        </>
    )
}

export default SignInPage;