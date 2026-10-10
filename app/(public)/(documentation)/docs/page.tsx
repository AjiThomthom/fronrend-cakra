import { Info } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dokumentasi",
};

export default async function Page() {
  return (
    <div className="text-black">
      <div className="flex gap-x-2 items-center">
        <h1 className="underline font-bold md:text-3xl">Apa Itu CAKRA</h1>
        <Info size={32} />
      </div>
      <div className="py-5">
        <p>
          CAKRA adalah platform deteksi perkelahian yang dikembangkan oleh
          sekelompok mahasiswa Program Studi Teknik Informatika, Universitas
          Pelita Bangsa
        </p>
        <p>
          Tim pengembang terdiri dari <a href="">Radjikin Septiawan</a> sebagai
          Software Engineer, <a href="">Megatama Setiaji</a> sebagai DevOps, dan{" "}
          <a href="">Gilang Ramadhan</a> yang berperan dalam administrasi serta
          penyusunan proposal. Tim ini dibimbing langsung oleh{" "}
          <a href="">Muhammad Anggi Rifa'i</a>, dosen di Program Studi Teknik
          Informatika.
        </p>
      </div>
      <div className="flex gap-x-2 items-center">
        <h1 className="underline font-bold md:text-3xl">
          Cerita di Balik CAKRA
        </h1>
        <Info size={32} />
      </div>
      <div className="py-5">
        <p>
          CAKRA merupakan singkatan dari Cepat, Akurat, Koordinasi Respon Aman.
          Awalnya, CAKRA dirancang untuk mengikuti kompetisi di luar kampus oleh
          Radjikin Septiawan, yang menjabat sebagai Ketua Departemen Litbang
          HIMATIF UPB periode 2026/2027.
        </p>
        <p>
          Seiring berjalannya waktu, berbagai riset dan percobaan terus
          dilakukan, meski sempat menemui kegagalan dalam sejumlah seleksi
          proposal kompetisi. Berkat semangat pantang menyerah dalam
          mengembangkan ide ini, lahirlah sebuah teknologi yang mengintegrasikan
          Software, Artificial Intelligence, dan Internet of Things.
        </p>
      </div>
    </div>
  );
}
