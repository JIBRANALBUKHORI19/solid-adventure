import CardMahasiswa from "./component/cardMahasiswa";
import SearchMahasiswa from "./component/searchMahasiswa";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import Signout from "./component/logout";

export const revalidate = 20;

export default async function Home() {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.getUser();
  console.log(data);

  if (authError || !data?.user) {
    redirect('/login');
  }

  const { data: mahasiswa, error } = await supabase
    .from("mahasiswa")
    .select()
    .order("id", { ascending: true });
  console.log(mahasiswa);

  if (error) {
    console.log(error.message);
  }

  return (
    <>
      <SearchMahasiswa />
      <div className="flex p-4">
        {mahasiswa &&
          mahasiswa.map((mhs, idx) => (
            <CardMahasiswa
              key={idx}
              nim={mhs.nim}
              nama={mhs.nama}
              angkatan={mhs.angkatan}
              prodi={mhs.prodi}
              foto={mhs.foto}
            />
          ))}
      </div>

      <Signout/>
    </>
  );
}
