"use client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CardMahasiswa(props) {
    const {nim, nama, angkatan, prodi, foto} = props

    const router = useRouter()
    return(
    <>
        <div className='p-2 m-2 border border-slate-300 rounded-lg
        grid justify-items-center text-slate-700'>
        <Link href={`/nilai/${nim}`}>
        <CldImage className="rounded-full"
        src={foto}
        width="75"
        height="75"
        crop={{
            type : 'auto',
            source : true
        }}
        />
         </Link>
        <h1 className="text-xl font-semibold">{nama}</h1>
        
                <p>Nim          : {nim}</p>
                <p>Angkatan     : {angkatan}</p>
                <p>Prodi        : {prodi}</p>
                <div className="m-2">
                <button className="focus:outline-none text-white bg-red-700 
                hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium 
                rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 
                dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => router.push(`/updatedata/${nim}`)}>EDIT</button>

                <button className="focus:outline-none text-white bg-red-700 
                hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium 
                rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 
                dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => router.push('/inputdata')}>INPUT</button>
                </div>       
        </div>
    </>
    )
}