import { CommentApiResponse } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

/* eslint-disable @next/next/no-img-element */
interface CommentListProps {
  comments?: CommentApiResponse;
  refetch?: () => void;
  displayStore?: boolean;
}

export default function CommentList({
  comments,
  refetch,
  displayStore,
}: CommentListProps) {
  const { data: session } = useSession();

  const handleDeleteComment = async (id: number) => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      try {
        const result = await axios.delete(`/api/comments?id=${id}`);

        if (result.status === 200) {
          toast.success("댓글 삭제에 성공했습니다.");
          refetch && refetch();
        } else {
          toast.error("댓글 삭제에 실패했습니다.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="my-10">
      {comments?.data && comments?.data?.length > 0 ? (
        comments?.data?.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center space-x-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8"
          >
            <div>
              <img
                src={comment?.user?.image || "/images/markers/default.png"}
                width={40}
                height={40}
                className="rounded-full bg-gray-10"
                alt="profile image"
              />
            </div>
            <div className="flex flex-col space-y-1 flex-1">
              <div>
                {comment?.user?.name ?? "사용자"} |{" "}
                {comment?.user?.email ?? "이메일없음"}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
              </div>
              <div className="text-black mt-1 text-bse">{comment.body}</div>
              {displayStore && (
                <div className="mt-2">
                  <Link
                    href={`/stores/${comment?.store?.id}`}
                    className="underline font-medium text-blue-600 hover:text-blue-400"
                  >
                    {comment?.store?.name}
                  </Link>
                </div>
              )}
            </div>
            <div>
              {comment.userId === session?.user.id && (
                <button
                  type="button"
                  className="underline text-gray-500 hover:text-gray-400"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  삭제
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 border border-gray-200 rounded-md text-sm text-gray-400">
          댓글이 없습니다.
        </div>
      )}
    </div>
  );
}
