export type YearData = Record<string, number>;

export type KabupatenEntry = {
  kabupaten: string;
  lat: number;
  lng: number;
  data: Record<string, YearData>;
};

export type RawEntry = {
  nama_kabupaten_kota: string;
  tempat_kejadian: string;
  jumlah_kekerasan: number;
  tahun: number;
};

export type FlatRow = {
  kabupaten: string;
  kategori: string;
  tahun: string;
  jumlah: number;
};
