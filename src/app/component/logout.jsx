'use client'
import { signout } from "../login/actions"

export default function Signout(){
    return(
        <form>
        <button
        formAction={signout}>
            keluar
        </button>
        </form>
    )
}