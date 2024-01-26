import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/db";
import { LikeApiResponse, LikeInterface } from "@/interface";

interface ResponseType {
  page?: string;
  limit?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeApiResponse | LikeInterface>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401);
  }

  if (req.method === "POST") {
    // 찜하기 로직 처리
    const { storeId }: { storeId: number } = req.body;

    // Like 데이터가 있는지 확인
    let like = await prisma.like.findFirst({
      where: {
        storeId,
        userId: session?.user?.id,
      },
    });
    // 만약 이미 찜을 했다면, 해당 like data 삭제. 아니라면 생성
    if (like) {
      // 이미 찜 한 상황
      like = await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return res.status(204).json(like);
    } else {
      // 찜을 하지 않은 상황
      like = await prisma.like.create({
        data: {
          storeId,
          userId: session?.user?.id as number,
        },
      });
      return res.status(201).json(like);
    }
  } else {
    // GET 요청
    const count = await prisma.like.count({
      where: { userId: session?.user?.id },
    });
    const { page = "1", limit = "10" }: ResponseType = req.query;
    const skipPage = Number(page) - 1; // 1페이지는 0으로 계산

    const likes = await prisma.like.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        userId: session?.user?.id,
      },
      include: {
        store: true,
      },
      skip: skipPage * Number(limit),
      take: Number(limit),
    });
    return res.status(200).json({
      data: likes,
      page: Number(page),
      totalPage: Math.ceil(count / Number(limit)),
    });
  }
}