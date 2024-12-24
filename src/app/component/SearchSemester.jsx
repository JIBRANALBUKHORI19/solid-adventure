"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchSemester({ nim }) {
    const router = useRouter()
    const [semester, setSemester] = useState("1") // Default ke semester 1

    const handleSearch = () => {
        router.push(`/nilai/${nim}/${semester}`)
    }

    return (
        <div className="flex justify-center">
            <div>
                <select
                    className="w-full border rounded-md p-2"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                >
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                </select>
            </div>
            <button
                className="bg-blue-600 text-white border rounded-md p-2 ml-2"
                onClick={handleSearch}
            >
                Cari Semester
            </button>
        </div>
    )
}
