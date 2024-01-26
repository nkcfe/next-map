import { StoreType } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import { IoMdHeart, IoIosHeartEmpty } from "react-icons/io";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session, status } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);
    return data as StoreType;
  };

  const { data: store, refetch } = useQuery(
    `like-store=${storeId}`,
    fetchStore,
    {
      enabled: !!storeId,
      refetchOnWindowFocus: false,
    }
  );

  const toggleLike = async () => {
    if (session?.user && store) {
      try {
        const like = await axios.post("/api/likes", {
          storeId: store.id,
        });

        if (like.status === 201) {
          toast.success("가게를 찜했습니다.");
        } else {
          toast.warn("찜을 취소했습니다.");
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    } else if (status === "unauthenticated") {
      toast.warn("로그인이 필요합니다.");
    }
  };

  return (
    <button type="button" onClick={toggleLike}>
      {status === "authenticated" && store?.likes?.length ? (
        <IoMdHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <IoIosHeartEmpty className="hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
}
