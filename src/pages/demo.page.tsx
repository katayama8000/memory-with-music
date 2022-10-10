/* eslint-disable react-hooks/exhaustive-deps */
import { useGetArticles } from "@hooks/useGetArticles";
import { AuthLayout } from "@pages/Layout";
import { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Demo: CustomNextPage = () => {
  const { articles, isError, isLoading } = useGetArticles();
  const router = useRouter();

  const pageChangeHandler = () => {
    const answer = window.confirm(
      "コメント内容がリセットされます、本当にページ遷移しますか？"
    );
    if (!answer) {
      throw "Abort route";
    }
  };

  useEffect(() => {
    router.events.on("routeChangeStart", pageChangeHandler);
    return () => {
      router.events.off("routeChangeStart", pageChangeHandler);
    };
  }, []);

  return (
    <div>
      <div>demo</div>
      <button
        onClick={() => {
          console.log(articles);
        }}
      >
        button
      </button>
    </div>
  );
};

Demo.getLayout = AuthLayout;
export default Demo;
