"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="w-full h-screen mx-auto pt-[30%] text-black text-center font-semibold">
          다시 시도해주세요.
        </div>
        <button
          onClick={() => reset()}
          className="mt-4 mx-auto bg-red-600 text-white px-4 py-2.5 rounded-md hover:bg-red-500"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
