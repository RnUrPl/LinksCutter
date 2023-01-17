import {useSelector} from 'react-redux'


export default function useAuth() {
    const {loading,userInfo, token, error, succes} = useSelector((state) => state )

    

    return {
        isAuth: !! token,
        loading,userInfo, token, error, succes
    }
}
