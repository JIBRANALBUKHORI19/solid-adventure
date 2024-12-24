import SearchSemester from "@/app/component/SearchSemester";
import supabase from "../../../../utils/supabase";
import CardMahasiswa from "@/app/component/cardMahasiswa";
// export const revalidate = 20;

export default async function NilaiByNim({ params }) {
  const { nim } = params;
  const { data: nilai, error } = await supabase
    .from("nilai")
    .select(`
      nim, nilai, semester,
      matakuliah(kdmk, matakuliah, sks)
    `)
    .eq("nim", nim);

  console.log(nilai);
  const { data: mahasiswa, err } = await supabase.from("mahasiswa").select("*").eq("nim", nim);
  console.log(mahasiswa);

  if (error) {
    console.log(error.message);
  }

  return (
    <div>
      <SearchSemester nim = {nim}/>
      <div className="flex p-4 justify-center">
      {mahasiswa && mahasiswa.map((mhs,idx) => (
          <CardMahasiswa
          key = {idx}
          nim = {mhs.nim}
          nama = {mhs.nama}
          angkatan = {mhs.angkatan}
          prodi = {mhs.prodi}
          foto = {mhs.foto}
        />
      ))}
    </div>
      <table className="min-w-full divide-gray-200 mt4">
            <thead className="bg-gray-800">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Kode Mata Kuliah
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Mata Kuliah
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        SKS
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Semester
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Nilai
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {nilai.map((mhs) => (
                    <tr key={mhs} className="bg-white dark:bg-gray-600 hover:bg-gray-50
                    dark:hover:bg-gray-500 dark:text-white">
                        <td className="px-6 py-4 font-sm whitespace-nowrap">{mhs.matakuliah.kdmk}</td>
                        <td className="px-6 py-4 font-sm whitespace-nowrap">{mhs.matakuliah.matakuliah}</td>
                        <td className="px-6 py-4 font-sm whitespace-nowrap">{mhs.matakuliah.sks}</td>
                        <td className="px-6 py-4 font-sm whitespace-nowrap">{mhs.semester}</td>
                        <td className="px-6 py-4 font-sm whitespace-nowrap">{mhs.nilai}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}