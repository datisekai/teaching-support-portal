import React from "react";
import MyCard from "./MyCard";

type Props = {
  data: { label: string; content: string }[];
};
const IntroCard: React.FC<Props> = ({ data }) => {
  return (
    <MyCard containerClassName="tw-mb-8">
      <div>
        {data.map((item, index) => (
          <div key={index} className="tw-flex tw-gap-4">
            <h3 className="tw-font-bold">{item.label}:</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </MyCard>
  );
};

export default IntroCard;
