import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LuMapPin } from "react-icons/lu";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

interface StoreBoxProps {
  store: any;
  setStore: React.Dispatch<React.SetStateAction<any>>;
}

export default function StoreBox({ store, setStore }: StoreBoxProps) {
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    store?.bizcnd_code_nm
                      ? `/images/markers/${store?.bizcnd_code_nm}.png`
                      : "images/markers/default.png"
                  }
                  alt="아이콘 이미지"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold">{store?.upso_nm}</div>
                  <div className="text-sm">{store?.cob_code_nm}</div>
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
            <div className="mt-4 flex gap-2 items-center">
              <LuMapPin />
              {store.rdn_code_nm}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <FaPhoneAlt />
              {store.tel_no}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              {store.crtfc_gbn_nm}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <FaCheck />
              {store.bizcnd_code_nm}
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.alert("상세보기 작업중")}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >상세보기</button>
        </>
      )}
    </div>
  );
}
