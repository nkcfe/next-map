import Navbar from "@/components/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </SessionProvider>
    </QueryClientProvider>
  );
}
