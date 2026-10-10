import { useMapProvider } from "@/context/map.context";
import { useTokenJWT } from "@/context/user.context";
import {
  searchCamera,
  selectCameraCategory,
  selectCategorySearchKey,
} from "@/services/maps.service";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChevronDown, MapPin, Plus, Search } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { useCameraContext } from "../d.hooks/device.hooks";
import { CameraSchema } from "@/@types/camera.type";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface CameraResponse {
  data: CameraSchema[];
  public: number;
  private: number;
}

export default function DeviceControllers() {
  const { setIsOpen, selectedCoordinat, setSelectedCoordinat } =
    useMapProvider();
  const {
    setCameras,
    setKeyword,
    camera,
    keyword,
    selected,
    setSelected,
    setCount,
    count,
  } = useCameraContext();
  const page = useSearchParams().get("page");
  const addCamera = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setSelectedCoordinat({ lat, lng });
    });
    setIsOpen(true);
  };

  const params = useParams();
  const user = useTokenJWT();
  const router = useRouter();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setSelectedCoordinat({ lat, lng });
    });
  }, []);

  const searchCameraName = async (e: KeyboardEvent<HTMLInputElement>) => {
    router.push("?page=1");
    if (e.key != "Enter") return null;
    if (!keyword.trim()) return window.location.reload();
    try {
      if (selected) {
        const response: CameraSchema[] | any = await selectandSearch();
        if (!response) return null;
        setCount({
          private: response.meta.private,
          public: response.meta.public,
          total_page: response.meta_total_page,
        });
        setCameras(response.data);
        return;
      }

      const response: CameraSchema[] | any = await searchCamera(
        keyword,
        page as string,
      );
      if (!response) return null;
      setCount({
        private: response.meta.private,
        public: response.meta.public,
        total_page: response.meta.total_page,
      });

      setCameras(response.data as any);

      return;
    } catch (error) {
      console.error(error);
    }
  };

  const selectCamera = async (e: SelectChangeEvent<string>) => {
    router.push("?page=1");
    const value = e.target.value;
    setSelected(value);

    if (keyword) {
      const response: CameraSchema[] | any = await selectandSearch();
      if (!response) return null;

      setCount({
        private: response.meta.private,
        public: response.meta.public,
        total_page: response.meta.total_page,
      });

      setCameras(response.data);
      return;
    }

    const response: CameraSchema[] | any = await selectCameraCategory(
      value,
      page as string,
      params.slug as string,
    );
    if (!response) return null;
    setCount({
      private: response.meta.private,
      public: response.meta.public,
      total_page: response.meta.total_page,
    });

    setCameras(response.data as any);
  };

  const selectandSearch = async () => {
    router.push("?page=1");
    if (!keyword) return null;
    try {
      const response: CameraSchema[] | any = await selectCategorySearchKey(
        keyword,
        selected,
        page as string,
        params.slugs as string,
      );
      if (!response) return null;
      setCount({
        private: response.meta.private,
        public: response.meta.public,
        total_page: response.meta.total_page,
      });

      setCameras(response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <Container>
      {/* box ke 1 */}
      <Box>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-xl font-bold md:text-2xl">
              Perangkat Terdaftar
            </h1>
            <p>{count.private + count.public} titik CCTV di wilayah kamu</p>
          </div>
          <Button
            disabled={user.role == "VISITOR"}
            color="success"
            variant="contained"
            onClick={addCamera}
            className="!self-start sm:!self-auto"
          >
            <Plus size={18} />
            Tambah Perangkat
          </Button>
        </div>
      </Box>

      <Box>
        {/* Box ke 2 */}
        <div className="flex flex-col gap-4 sm:flex-row my-5">
          <div
            onClick={() =>
              router.push(
                `/${params.slugs}/map?lat=${selectedCoordinat?.lat}&lng=${selectedCoordinat?.lng}`,
              )
            }
            className="bg-lime-400/20  cursor-pointer rounded-md px-4 py-3 w-full sm:w-1/2 flex justify-between items-center gap-x-2"
          >
            <div className="min-w-0">
              <span className="flex gap-x-2 items-center">
                <div className="animate-pulse bg-green-600 rounded-full w-2 h-2 shrink-0" />
                <p className="text-green-700 flex items-center gap-x-2 text-sm sm:text-base truncate">
                  Lokasi Kamu
                  <span className="bg-green-600 rounded-full w-1 h-1 shrink-0" />
                  LIVE
                </p>
              </span>
              <p className="text-green-700 text-sm sm:text-base truncate">
                {selectedCoordinat?.lat}, {selectedCoordinat?.lng}
              </p>
            </div>
            <MapPin size={28} className="text-green-700 shrink-0" />
          </div>

          <div className="flex bg-black/20 rounded-md w-full sm:w-1/2 px-2 py-3">
            <div className="border-r-2 pr-4 text-center flex-1">
              <h4 className="text-sm">PUBLIK</h4>
              <p className="text-lg text-end font-bold md:text-xl">
                {count.public}
              </p>
            </div>
            <div className="mx-4 text-center flex-1">
              <h4 className="text-sm">PRIVAT</h4>
              <p className="text-lg font-bold text-start md:text-xl">
                {count.private}
              </p>
            </div>
          </div>
        </div>
      </Box>

      {/* Box ke 3 */}

      <Box>
        <div className="w-full">
          <div className="flex gap-x-3">
            <TextField
              variant="outlined"
              color="success"
              autoComplete="off"
              autoCorrect="off"
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={searchCameraName}
              placeholder="CCTV...."
              slotProps={{
                input: {
                  startAdornment: (
                    <Search className="text-green-600 mr-5" size={25} />
                  ),
                },
              }}
              className="w-full"
            />
            <FormControl className="w-40">
              <InputLabel>Kategori</InputLabel>
              <Select value={selected} onChange={selectCamera}>
                <MenuItem value={"SEMUA"}>SEMUA</MenuItem>
                <MenuItem value={"PUBLIC"}>PUBLIC</MenuItem>
                <MenuItem value={"PRIVATE"}>PRIVATE</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </Box>
    </Container>
  );
}
