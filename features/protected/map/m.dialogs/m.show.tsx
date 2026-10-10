import { CameraSchema } from "@/@types/camera.type";
import { useTokenJWT } from "@/context/user.context";
import { StreamSocketCamera } from "@/services/camera.service";
import {
  getDetailCamera,
  getDetailCameraPublic,
} from "@/services/maps.service";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Trash } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

// HARUS sama dengan codec stream dari backend (cek pakai ffprobe)
const MIME_CODEC = 'video/mp4; codecs="avc1.42E01E"';
const MAX_BUFFER_SECONDS = 10; // buffer lebih dari ini dibuang biar memori tidak bengkak

export default function MapsDialogsShow() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const page = searchParams.get("page");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const user = useTokenJWT();

  const [selectedCamera, setSelectedCamera] = useState<CameraSchema>();
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [streamError, setStreamError] = useState<string | null>(null);

  const closeDialog = () => router.back();

  useEffect(() => {
    if (!id) {
      setSelectedCamera(undefined);
      return;
    }

    let cancelled = false;

    const fetchDetail = async () => {
      try {
        let response: CameraSchema | undefined;
        if (
          pathname === `/${params.slugs}/map` ||
          pathname === `/${params.slugs}/device`
        ) {
          response = await getDetailCamera(id, params.slugs as string);
        } else if (pathname === "/maps") {
          response = await getDetailCameraPublic(id);
        }
        if (!cancelled) setSelectedCamera(response);
      } catch (err) {
        console.error("Failed to fetch camera detail", err);
      }
    };

    fetchDetail();
    return () => {
      cancelled = true;
    };
  }, [id, pathname, params.slugs]);

  useEffect(() => {
    if (!selectedCamera || !videoEl) return;

    setStreamError(null);

    const stream = StreamSocketCamera(id as string, videoEl, {
      mimeCodec: MIME_CODEC,
      maxBufferSeconds: MAX_BUFFER_SECONDS,
      onError: setStreamError,
    });

    return () => stream.close();
  }, [selectedCamera, videoEl]);

  const handleDelete = () => {
    const cameraId = selectedCamera?.cctv_public_id;
    const isDevice = pathname === `/${params.slugs}/device`;
    router.push(
      isDevice
        ? `?confirmation=delete&id=${cameraId}&page=${page}`
        : `?confirmation=delete&id=${cameraId}`,
    );
  };

  return (
    <Dialog open={!!id} onClose={closeDialog}>
      <DialogTitle>
        <Typography>{selectedCamera?.camera_name}</Typography>
      </DialogTitle>
      <hr className="text-gray-300" />
      <DialogContent>
        <div className="w-full aspect-video bg-black rounded-md overflow-hidden flex items-center justify-center shadow-inner relative">
          {id && selectedCamera ? (
            <video
              ref={setVideoEl}
              className="w-full h-full object-cover"
              controls={false}
              playsInline
              autoPlay
              muted
            />
          ) : (
            <div className="bg-black" />
          )}
          {streamError && (
            <span className="absolute text-sm text-white/80">
              {streamError}
            </span>
          )}
        </div>
        <p>{selectedCamera?.location_description}</p>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          color="success"
          onClick={closeDialog}
        >
          Close
        </Button>
        <Button
          onClick={handleDelete}
          size="small"
          disabled={!user || user.role === "VISITOR"}
          className="flex items-center gap-x-4"
          variant="contained"
          color="error"
        >
          <Trash size={18} /> Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
