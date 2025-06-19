import React, {useEffect , useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Protected = ({children , authantication = 'true'}) => {

    //TODO: make it more easy
    const nevigate = useNavigate()
    const [loader , setLoader] = useState(true)

    const authStatus = useSelector((state)=> state.auth.status)

    useEffect(()=>{
        if(authantication && authStatus !== authantication){
            nevigate('/login')
        }else if(!authantication && authStatus !== authantication){
            nevigate('/')
        }
        setLoader(false)
    } , [authStatus , navigator , authantication])


  return (
    loader ? <p>"Loading..."</p> : <>{children}</>
  )
}

export default Protected