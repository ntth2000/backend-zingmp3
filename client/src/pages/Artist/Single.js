import React from "react";
import Card from "~/components/Card";

const Single = ({ data }) => {
  return (
    <div className="row">
      {data.items?.map((item, index) => {
        return (
          <div className="col p-28 l-2-4 m-3 c-6" key={index}>
            <Card
              data={item}
              showDesc={false}
              showArtists={!data.itemType}
              showDate={data.itemType}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Single;
