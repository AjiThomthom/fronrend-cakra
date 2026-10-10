type StreamOptions = {
  mimeCodec: string;
  maxBufferSeconds?: number;
  onError?: (message: string) => void;
};

export type CameraStream = { close: () => void };

export const StreamSocketCamera = (
  id: string,
  videoEl: HTMLVideoElement,
  { mimeCodec, maxBufferSeconds = 10, onError }: StreamOptions,
): CameraStream => {
  console.log("masukk");
  if (
    typeof MediaSource === "undefined" ||
    !MediaSource.isTypeSupported(mimeCodec)
  ) {
    onError?.("Browser tidak mendukung format stream ini");
    return { close: () => {} };
  }

  let cancelled = false;
  let sourceBuffer: SourceBuffer | null = null;
  const queue: ArrayBuffer[] = [];

  const mediaSource = new MediaSource();
  const objectUrl = URL.createObjectURL(mediaSource);
  videoEl.src = objectUrl;

  const socket = new WebSocket(
    `${process.env.NEXT_PUBLIC_STREAM_SOCKET_URL}/offer/${id}`,
  );
  socket.binaryType = "arraybuffer";

  const trimBuffer = (force = false) => {
    if (!sourceBuffer || sourceBuffer.updating) return;
    const { buffered } = sourceBuffer;
    if (buffered.length === 0) return;

    const start = buffered.start(0);
    const end = buffered.end(buffered.length - 1);

    if (force || end - start > maxBufferSeconds) {
      try {
        sourceBuffer.remove(start, Math.max(start, end - 3));
      } catch (err) {
        console.error("remove buffer error", err);
      }
    }

    if (end - videoEl.currentTime > 2) {
      videoEl.currentTime = end - 0.5;
    }
  };

  const pump = () => {
    if (
      cancelled ||
      !sourceBuffer ||
      sourceBuffer.updating ||
      mediaSource.readyState !== "open" ||
      queue.length === 0
    ) {
      return;
    }

    const chunk = queue.shift()!;
    try {
      sourceBuffer.appendBuffer(chunk);
    } catch (err) {
      if ((err as DOMException).name === "QuotaExceededError") {
        queue.unshift(chunk);
        trimBuffer(true);
      } else {
        console.error("appendBuffer error", err);
      }
    }
  };

  mediaSource.addEventListener(
    "sourceopen",
    () => {
      if (cancelled) return;

      sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
      sourceBuffer.mode = "sequence";

      sourceBuffer.addEventListener("updateend", () => {
        trimBuffer();
        pump();
      });
      sourceBuffer.addEventListener("error", (e) =>
        console.error("SourceBuffer error", e),
      );

      pump();
    },
    { once: true },
  );

  socket.onmessage = (event) => {
    if (cancelled) return;
    queue.push(event.data as ArrayBuffer);
    // console.log(
    //   "[WS RECEIVE] Received chunk of size: ",
    //   (event.data as ArrayBuffer).byteLength,
    // "bytes",
    // );
    pump();
  };

  socket.onerror = (error) => {
    console.error("Websocket error", error);
    if (!cancelled) onError?.("Koneksi stream terputus");
  };

  socket.onclose = () => {
    if (!cancelled) onError?.("Koneksi stream terputus");
  };

  const close = () => {
    cancelled = true;
    queue.length = 0;

    socket.onmessage = null;
    socket.onerror = null;
    socket.onclose = null;
    socket.close();

    try {
      if (mediaSource.readyState === "open") mediaSource.endOfStream();
    } catch (e) {
      console.error("Error ending media source stream", e);
    }

    videoEl.pause();
    videoEl.removeAttribute("src");
    videoEl.load();
    URL.revokeObjectURL(objectUrl);
  };

  return { close };
};
