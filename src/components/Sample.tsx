import React from "react";
import { Button } from "src/lib/mantine";

type Props = {
  child: string;
};
export const Sample: React.FC<Props> = ({ child }) => {
  return (
    <div>
      <div className="text-green-500">{child}</div>
      <Button dent className="m-3">
        Hello Button
      </Button>
      <Button className="m-3">Hello Button</Button>
    </div>
  );
};
