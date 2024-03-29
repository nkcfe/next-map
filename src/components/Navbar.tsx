import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();
  console.log(data);
  return (
    <>
      <div className="navbar">
        <Link href="/" className="navbar__logo">
          nextmap
        </Link>
        <div className="navbar__list">
          <Link
            href="/stores"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            맛집 목록
          </Link>
          <Link
            href="/stores/new"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            맛집 등록
          </Link>
          <Link
            href="/users/likes"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            찜한 가게
          </Link>
          <Link
            href="/users/mypage"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            마이페이지
          </Link>

          {status === "authenticated" ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link
              href="/api/auth/signin"
              className="navbar__list--item"
              onClick={() => setIsOpen(false)}
            >
              로그인
            </Link>
          )}
        </div>
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <IoMdClose /> : <LuMenu />}
        </div>
      </div>
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link
              href="/stores"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              맛집 목록
            </Link>
            <Link
              href="/stores/new"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              맛집 등록
            </Link>
            <Link
              href="/users/likes"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              찜한 가게
            </Link>
            <Link
              href="/users/mypage"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              마이페이지
            </Link>
            {status === "authenticated" ? (
              <button
                type="button"
                onClick={() => signOut()}
                className="navbar__list--item--mobile"
              >
                로그아웃
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                className="navbar__list--item--mobile"
                onClick={() => setIsOpen(false)}
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
