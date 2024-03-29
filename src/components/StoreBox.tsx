"use client";

import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LuMapPin } from "react-icons/lu";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentStoreState } from "@/atom";
import Like from "./Like";

export default function StoreBox() {
  const store = useRecoilValue(currentStoreState);
  const setStore = useSetRecoilState(currentStoreState);
  const router = useRouter();

  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : "/images/markers/default.png"
                  }
                  alt="아이콘 이미지"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold">{store?.name}</div>
                  <div className="text-sm">{store?.storeType}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStore(null);
                }}
              >
                <IoMdClose />
              </button>
            </div>
            <div className="flex justify-between gap-4">
              <div className="mt-4 flex gap-2 items-center col-span-3">
                <LuMapPin />
                {store.address}
              </div>
              <Like storeId={store.id} />
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <FaPhoneAlt />
              {store.phone}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              {store.foodCertifyName}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <FaCheck />
              {store.category}
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/stores/${store.id}`)}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
