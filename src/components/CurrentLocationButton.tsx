"use client";

import { mapState } from "@/atom";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import FullPageLoader from "./FullPageLoader";

export default function CurrentLocationButton({}) {
  const [loading, setLoading] = useState<boolean>(false);
  const map = useRecoilValue(mapState);

  const handleCurrentPosition = () => {
    setLoading(true);

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success("현재 위치로 이동되었습니다.");
          }

          return currentPosition;
        },
        () => {
          setLoading(false);
          toast.error("현재 위치를 찾을 수 없습니다.");
        },
        options
      );
    }
  };

  return (
    <>
      {loading && <FullPageLoader />}
      <button
        type="button"
        onClick={handleCurrentPosition}
        className=" fixed z-10 p-2 shadow right-10 bottom-20 bg-white rounded-full hover:shadow-lg focus:shadow-lg hover:bg-blue-200"
      >
        <FaLocationArrow className="w-7 h-7 text-blue-500" />
      </button>
    </>
  );
}
