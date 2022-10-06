import { NextPage } from "next";
import React from "react";
import { supabase } from "src/lib/supabase/supabase";
import { resetUserInfo } from "@state/state";
import { Button } from "@mantine/core";

const Signout: NextPage = () => {
  const signout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      console.log(error);
      resetUserInfo();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Button
        color={"cyan"}
        onClick={() => {
          signout();
        }}
      >
        signout
      </Button>
    </div>
  );
};

export default Signout;
