import { $host, $authHost } from '../http/index'
import { setUser, logoutUser, setError } from '../store/slices/userSlice'
import {store} from '../store/index'


const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  }


  export const registration = async (email,password) =>{
    try{
        const {data} = await $host.post(
        'api/user/registration',
        {email, password },
        config
    )
    localStorage.setItem('token', data.accesToken)

    store.dispatch(setUser(data))
    return data
    }catch(e){
        console.log(e.response?.data?.message)
        store.dispatch(setError(e.response?.data?.message))
        throw e 
    }
}

export const login = async (email,password) =>{

    try{
        const {data} = await $host.post(
        'api/user/login',
        {email, password },
        config
    )

    localStorage.setItem('token', data.accesToken)
    store.dispatch(setUser(data))
    console.log(data)
    return data
    }catch(e){
        console.log(e.response?.data?.message)
        store.dispatch(setError(e.response?.data?.message))
        throw e 
    }
}

export const logout = async () =>{
    const {data} = await $authHost.post(
        'api/user/logout',
        config
    )
    localStorage.removeItem('token')
    store.dispatch(logoutUser())
    return data
}

export const checkAuth = async () =>{
    const {data} = await $host.get(
        'api/user/refresh',
        config
    )
    localStorage.setItem('token', data.accesToken)
    store.dispatch(setUser(data))
    return data
}