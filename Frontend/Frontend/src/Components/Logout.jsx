import { useDispatch } from "react-redux"
import { LoginMe } from "../Actions/Loginme"


export default function Logout(){

const dispatch=useDispatch()

    return(<nav style={{width:"100%",backgroundColor:"gray", padding:"10px", display:"flex", alignItems:"center",justifyContent:"center" }}>
        <button onClick={()=>dispatch(LoginMe(false,{}))}>Logout</button>
    </nav>)
}