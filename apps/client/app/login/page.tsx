const LoginPage = () => {
    return (
        <main className='container d-flex flex-column justify-content-center align-items-center vh-100'>
            <div className='card p-4 shadow-sm'>
                <h3 className='mb-3'>
                    С возвращением
                </h3>
                <form method="POST" action='/api/login'>
                    <div className='mb-3'>
                        <label className='form-label'>
                            E-mail
                        </label>
                        <input
                            type='email'
                            name='email'
                            className='form-control'
                            placeholder='Введите email'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            className='form-control'
                            placeholder='Введите пароль'
                            required
                        />
                    </div>
                    <div className='mb-3 btn-group'>
                        <button type='submit' className='btn btn-primary w-100'>
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
export default LoginPage;