import { SummaryType } from "@/@types/home.type";
import { Button, Paper } from "@mui/material";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";

const MapShortcut = dynamic(
  () => import("../../../../components/map-shortcut"),
  {
    ssr: false,
  },
);
export default function HomeMaps(data: { data: SummaryType }) {
  const count = data.data.count;
  if (!data) return null;
  const router = useRouter();
  const params = useParams();
  return (
    <div>
      <Paper className="px-2 w-80 md:w-full overflow-hidden  py-3">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-[14px] md:text-[16px]">
              Peta Wilayah
            </h1>
            <p className="text-gray-400 text-[12px] md:text-sm">
              {count.total} titik CCTV aktif
            </p>
          </div>
          <Button
            onClick={() => (window.location.href = `/${params.slugs}/map`)}
            color="success"
            variant="text"
            size="small"
          >
            Lihat detail lengkap <ArrowRight className="mx-3" />
          </Button>
        </div>
        <div className="w-full h-96 mt-3 rounded-md overflow-hidden">
          <MapShortcut data={data.data.camera} />
        </div>
      </Paper>
    </div>
  );
}
