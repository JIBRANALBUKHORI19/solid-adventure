"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchMahasiswa() {
    const router = useRouter()
    const [nim, setNim] = useState("")

    return(
        <div className="flex justify-center">
            <div>
                <input 
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="cari mahasiswa"
                value={nim}
                onChange={(e)=>setNim(e.target.value)}
                />
            </div>
            <button className="bg-blue-600 text-white border rounded-md p-2 ml-2"
            onClick={() => router.push(`/nilai/${nim}`)}>cari nim</button>
        </div>
    )
}