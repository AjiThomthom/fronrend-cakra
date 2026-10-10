import { CameraSchema } from "@/@types/camera.type";
import {
  selectCameraCategory,
  updateCameraCategory,
} from "@/services/maps.service";
import {
  Badge,
  Button,
  Chip,
  Container,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { EyeIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCameraContext } from "../d.hooks/device.hooks";
import { useTokenJWT } from "@/context/user.context";

export default function DeviceTable() {
  const { camera, setCameras, setCount, selected, count } = useCameraContext();
  const router = useRouter();
  const page = useSearchParams().get("page");
  const user = useTokenJWT();
  const params = useParams();
  const getAllCamerasData = async () => {
    if (!page) {
      router.push("?page=1");
      return;
    }

    const response = await selectCameraCategory(
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
  };

  const updateCategory = async (body: string, id: string) => {
    setCameras((prev) =>
      prev.map((item) =>
        item.cctv_public_id == id ? { ...item, category: body } : item,
      ),
    );
    const payload = {
      category: body as string,
    };
    const response = await updateCameraCategory(
      payload,
      id,
      params.slugs as string,
    );
    return response;
  };

  useEffect(() => {
    getAllCamerasData();
  }, [selected, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    router.push(`?page=${value}`);
  };

  return (
    <Container>
      <TableContainer
        className="w-full my-4 shadow-xl overflow-x-auto"
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow className=" bg-black/20 font-semibold">
              <TableCell>Nomor</TableCell>
              <TableCell>Nama CCTV</TableCell>
              <TableCell className="hidden sm:table-cell">Latitude</TableCell>
              <TableCell className="hidden sm:table-cell">Longitude</TableCell>
              <TableCell className="hidden md:table-cell">Kategori</TableCell>
              <TableCell>Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="w-full">
            {camera && camera.length > 0 ? (
              camera.map((item, index) => (
                <TableRow
                  key={item.cctv_public_id ?? index}
                  className="cursor-pointer hover:bg-lime-300/20 even:bg-black/5"
                  onClick={() =>
                    (window.location.href = `/${user?.slug}/map?lat=${item.latitude}&lng=${item.longitude}`)
                  }
                >
                  <TableCell>{(Number(page) - 1) * 20 + index + 1}</TableCell>
                  <TableCell className="max-w-[140px] truncate sm:max-w-none">
                    {item.camera_name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {item.latitude}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {item.longitude}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user?.role == "OWNER" || user?.role == "STAFF" ? (
                      <Select
                        value={item.category}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateCategory(
                            e.target.value,
                            item.cctv_public_id as string,
                          );
                        }}
                        renderValue={(value) => (
                          <Chip
                            size="small"
                            color={value === "PUBLIC" ? "success" : "warning"}
                            label={value === "PUBLIC" ? "Public" : "Private"}
                          />
                        )}
                        sx={{
                          minWidth: 120,
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "& .MuiSelect-select": {
                            p: 0,
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      >
                        <MenuItem value="PUBLIC">
                          <Chip size="small" color="success" label="Public" />
                        </MenuItem>

                        <MenuItem value="PRIVATE">
                          <Chip size="small" color="warning" label="Private" />
                        </MenuItem>
                      </Select>
                    ) : (
                      <Chip
                        color={
                          item.category === "PUBLIC" ? "success" : "warning"
                        }
                        label={
                          item.category === "PUBLIC" ? `Public` : "Private"
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="success"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`?page=${page}&id=${item.cctv_public_id}`);
                      }}
                    >
                      <EyeIcon size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Belum ada Kamera ditambahkan!</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-center my-4">
          <Pagination
            count={count.total_page || 1}
            page={Number(page)}
            onChange={handlePageChange}
            color="standard"
            variant="outlined"
            shape="rounded"
          />
        </div>
      </TableContainer>
    </Container>
  );
}
