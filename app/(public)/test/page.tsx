"use client";
import axios from "axios";
import { useEffect, useRef } from "react";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const pc = new RTCPeerConnection();
    pc.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };

    async function connect() {
      pc.addTransceiver("video", {
        direction: "recvonly",
      });
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const body = {
        sdp: offer.sdp,
        type: offer.type,
      };
      const response = await axios.post(
        "http://localhost:8001/stream/v1.0/offer/0663852f-aa48-4870-9ac5-06c82318a746",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const answer = response.data;

      await pc.setRemoteDescription(answer);
    }
    connect();

    return () => {
      pc.close();
    };
  }, []);

  return <video autoPlay playsInline ref={videoRef}></video>;
}
