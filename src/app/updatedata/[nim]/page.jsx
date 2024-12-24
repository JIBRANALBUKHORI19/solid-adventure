'use client';
import { useState, useEffect } from "react";
import supabase from "@/../../utils/supabase";
import { CldUploadWidget } from "next-cloudinary";

export default function Home() {
  const [formData, setFormData] = useState({
    id: null,
    nim: "",
    nama: "",
    angkatan: "",
    prodi: "",
    foto: "",
  });
  const [foto, setFoto] = useState("");
  const [mahasiswaList, setMahasiswaList] = useState([]);

  const fetchMahasiswa = async () => {
    const { data: mahasiswa, error } = await supabase
      .from("mahasiswa")
      .select()
      .order("id", { ascending: true });

    if (error) {
      console.log(error.message);
    } else {
      setMahasiswaList(mahasiswa);
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.id) {
      const { data, error } = await supabase
        .from("mahasiswa")
        .update({
          nim: formData.nim,
          nama: formData.nama,
          angkatan: formData.angkatan,
          prodi: formData.prodi,
          foto: foto || formData.foto,
        })
        .eq("id", formData.id);

      if (error) {
        console.log("Error updating data:", error.message);
      } else {
        console.log("Data updated:", data);
        fetchMahasiswa();
        resetForm();
      }
    }
  };

  const handleEdit = (mahasiswa) => {
    setFormData(mahasiswa);
    setFoto(mahasiswa.foto);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("mahasiswa").delete().eq("id", id);

    if (error) {
      console.log("Error deleting data:", error.message);
    } else {
      console.log("Data deleted:", id);
      fetchMahasiswa();
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      nim: "",
      nama: "",
      angkatan: "",
      prodi: "",
      foto: "",
    });
    setFoto("");
  };

  return (
    <div>
        <div className="w-3/4 p-4">
          <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-300 rounded">
            <h2 className="text-lg font-bold mb-4">Update Mahasiswa</h2>
            <div className="mb-4">
              <label className="block text-gray-700">NIM</label>
              <input
                type="text"
                name="nim"
                value={formData.nim}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Angkatan</label>
              <input
                type="text"
                name="angkatan"
                value={formData.angkatan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Program Studi</label>
              <input
                type="text"
                name="prodi"
                value={formData.prodi}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Foto</label>
              <CldUploadWidget
                uploadPreset="wubnqevu"
                onSuccess={(result) => {
                  setFoto(result.info.public_id);
                }}
              >
                {({ open }) => {
                  return (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}
                      className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-200 font-medium shadow-sm"
                    >
                      Upload Foto
                    </button>
                  );
                }}
              </CldUploadWidget>
              {foto && (
                <p className="text-sm text-green-600 font-medium flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 fill-none stroke-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Foto berhasil diupload
                </p>
              )}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Update Mahasiswa
            </button>
          </form>
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">Daftar Mahasiswa</h2>
            <ul>
              {mahasiswaList.map((mahasiswa) => (
                <li key={mahasiswa.id} className="p-4 border-b border-gray-300 flex justify-between">
                  <div>
                    <p>NIM: {mahasiswa.nim}</p>
                    <p>Nama: {mahasiswa.nama}</p>
                    <p>Angkatan: {mahasiswa.angkatan}</p>
                    <p>Program Studi: {mahasiswa.prodi}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(mahasiswa)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(mahasiswa.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
}
