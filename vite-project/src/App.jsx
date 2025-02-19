import styles from './App.module.css'
import loginChangeScheme from './validation/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useRef, useState, useEffect } from 'react'

function App() {
    const onSubmit = (sendData) => {
        console.log(sendData)
    }

    const inputRef = useRef(null)
    const buttonRef = useRef(null)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        if (password && confirmPassword && password === confirmPassword) {
            buttonRef.current.focus()
        }
    }, [password, confirmPassword])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { login: '', password: '', confirmPassword: '' },
        resolver: yupResolver(loginChangeScheme),
    })

    const validateAndGetErrorMessage = (scheme, value) => {
        let errorMessage = null

        try {
            scheme.validateSync(value)
        } catch ({ errors }) {
            errorMessage = errors[0]
        }
        return errorMessage
    }

    const loginError = errors.login?.message

    return (
        <div className={styles.app}>
            {errors && (
                <div className={styles.errorLabel}>
                    {errors.login?.message ||
                        errors.password?.message ||
                        errors.confirmPassword?.message}
                </div>
            )}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input
                    className={styles.input}
                    type="email"
                    name="login"
                    placeholder="E-mail"
                    {...register('login')}
                />
                <input
                    className={styles.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register('password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    {...register('confirmPassword')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ref={inputRef}
                />
                <button
                    className={styles.confirmButton}
                    type="submit"
                    ref={buttonRef}
                    disabled={!!loginError}
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default App
