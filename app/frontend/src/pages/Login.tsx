import s from '../styles/login.module.css'
function Login(){
    return(
        <>
        <div className={s.overlay}>
            <form className={s.loginCard + ' card'}>
            <p className='row'>
                <label htmlFor='depName'>Логин</label>
                <input id="depName" type="text" required/>
            </p>
            <p className='row'>
                <label htmlFor="depComment">Пароль</label>
                <input type="password" id="depComment" v-model="currentPassword" required></input>
            </p>
            <button type="submit" className={s.submitButton}>Войти</button>
        </form>
        </div>
        </>
    )
}

export default Login