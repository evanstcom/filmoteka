import {defineStore} from 'pinia'
import {ref} from 'vue'

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
    const error = ref('')

    const loader = ref(false)

    const accessToken = ref('')
    const refreshToken = ref('')

    const userInfo = ref({
        email: '',
        userId: '',
        name: ''
    })
    const auth = async (type, payload) => {
        const firebaseAuth = getAuth()
        switch (type) {
            case 'logout':

                signOut(firebaseAuth)
                    .then(() => console.log("Logout OK"))
                    .catch((e) => console.log(e))
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
                accessToken.value = ''
                refreshToken.value = ''
                userInfo.value = {
                    email: '',
                    userId: '',
                    name: ''
                }
                break
            case 'login':
                try {
                    const {user} = await signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
                    if (user) {
                        accessToken.value = user.accessToken
                        refreshToken.value = user.refreshToken
                        localStorage.setItem('accessToken', user.accessToken)
                        localStorage.setItem('refreshToken', user.refreshToken)
                        setUser(firebaseAuth.currentUser)
                    }
                } catch (e) {
                    showError(e.code)
                } finally {
                    loader.value = false
                }
                break
            case 'registration':
                try {
                    const {user} = await createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
                    console.log(user)
                    if (user) {
                        accessToken.value = user.accessToken
                        refreshToken.value = user.refreshToken
                        localStorage.setItem('accessToken', user.accessToken)
                        localStorage.setItem('refreshToken', user.refreshToken)
                        await updateProfile(firebaseAuth.currentUser, {displayName: payload.displayName})
                        setUser(firebaseAuth.currentUser)
                    }

                } catch (e) {
                    showError(e.code)
                } finally {
                    loader.value = false
                    console.log(firebaseAuth.currentUser)
                }
                break
            default:
                throw new Error('Такого типа авторизации не существует')
        }

    }

    const setUser = (data) => {
        userInfo.value = {
            email: data.email,
            name: data.displayName,
            userId: data.uid
        }
        localStorage.setItem('user', JSON.stringify(userInfo.value))
    }
    const showError = (e) => {
        console.log(e)
        switch (e) {
            case 'auth/email-already-in-use':
                error.value = 'Такой email уже зарегистрирован'
                break
            case 'auth/weak-password':
                error.value = 'Слишком слабый пароль, минимум 6 символов'
                break
            case 'auth/operation-not-allowed':
                error.value = 'Регистрация недоступна'
                break
            case 'auth/too-many-requests':
                error.value = 'Слишком много попыток входа. Попробуйте позже'
                break
            case 'auth/user-not-found':
                error.value = 'Такой пользователь не найден'
                break
            case  'auth/wrong-password':
                error.value = 'Неверный логин или пароль'
                break
            case  'auth/invalid-credential':
                error.value = 'Неверный логин или пароль'
                break
            case 'auth/user-disabled':
                error.value = 'Учетная запись неактивна'
                break
            default:
                error.value = 'Что-то пошло не так'
                break
        }
        throw error.value
    }
    return {auth, userInfo, accessToken, refreshToken, error, loader}
})

/*

const urlType = type === 'login' ? 'signInWithPassword' : 'signUp'
error.value = ''
loader.value = true
try {
    const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${urlType}?key=${apiKey}`, {
        ...payload,
        returnSecureToken: true
    })
    userInfo.value = {
        email: data.email,
        token: data.idToken,
        userId: data.localId,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
        name: data.displayName
    }
    localStorage.setItem('user', JSON.stringify({
        token: userInfo.value.token,
        refreshToken: userInfo.value.refreshToken,
        name: userInfo.value.name,
        expiresIn: userInfo.value.expiresIn,
        email: userInfo.value.email
    }))
    console.log(userInfo.value)
} catch (e) {
    switch (e.response.data.error.message) {
        case 'EMAIL_EXISTS':
            error.value = 'Такой email уже зарегистрирован'
            break
        case 'WEAK_PASSWORD : Password should be at least 6 characters':
            error.value = 'Слишком слабый пароль, минимум 6 символов'
            break
        case 'OPERATION_NOT_ALLOWED':
            error.value = 'Регистрация недоступна'
            break
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            error.value = 'Слишком много попыток входа. Попробуйте позже'
            break
        case 'EMAIL_NOT_FOUND':
            error.value = 'Такой пользователь не найден'
            break
        case 'INVALID_PASSWORD':
            error.value = 'Неверный логин или пароль'
            break
        case 'INVALID_LOGIN_CREDENTIALS':
            error.value = 'Неверный логин или пароль'
            break
        case 'USER_DISABLED':
            error.value = 'Учетная запись неактивна'
            break
        default:
            error.value = 'Что-то пошло не так'
            break
    }
    throw e.value
} finally {
    loader.value = false
}*/
