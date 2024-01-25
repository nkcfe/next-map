import Link from "next/link";

interface PaginationProps {
  total: number;
  page: string;
}

export default function Pagination({ total, page }: PaginationProps) {
  return (
    <div className="py-6 w-full px-10 flex justify-center gap-3 bg-white my-10 flex-wrap text-black">
      {total <= 10 ? (
        [...Array(total)].map((x, i) => (
          <Link href={{ pathname: "/stores", query: { page: i + 1 } }} key={i}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white ${
                i + 1 === parseInt(page, 10)
                  ? "text-blue-600 font-bold"
                  : "text-gray-300"
              }`}
            >
              {i + 1}
            </span>
          </Link>
        ))
      ) : (
        <>
          {Number(page) > 1 && (
            <Link
              href={{
                pathname: "/stores",
                query: { page: Number(page) - 1 },
              }}
            >
              <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
                이전
              </span>
            </Link>
          )}

          <Link href={{ pathname: "/stores", query: { page: Number(page) } }}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white text-blue`}
            >
              {page}
            </span>
          </Link>
          {total > Number(page) && (
            <Link
              href={{
                pathname: "/stores",
                query: { page: Number(page) + 1 },
              }}
            >
              <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
