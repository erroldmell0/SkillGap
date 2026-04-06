import { useAuth } from "../hooks/useAuth"    
import { Navigate } from "react-router"
import Loading from "../../landing/pages/Loading"

const Protected = ({children}) => {
    const {user, loading} = useAuth()

    if(loading) {
        return <Loading/>
    }

    if(!user) {
        return <Navigate to="/login"/>
    }

    return children
}

export default Protected    