import React, { Children } from "react";

type CardProps = {
  showImg: boolean;
  children: React.ReactNode;
};
export default function Card({ showImg, children }: CardProps) {
  return (
    <div className="card w-96 bg-base-100 shadow-sm">
      {showImg && (
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}
