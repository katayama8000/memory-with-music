/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Demo() {
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
      <div>aa</div>
    </div>
  );
}

export default Demo;
