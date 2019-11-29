import React from "react";

import { ResultType } from "./types";

export default function List({
  items,
  onItemClick
}: {
  items: ResultType[];
  onItemClick: (item: ResultType) => void;
}) {
  const handleItemClick = (item: ResultType) => (e: any) => onItemClick(item);
  return (
    <ul>
      {items.map((item: ResultType) => {
        const { name, grid } = item;
        return (
          <li key={`${name}${grid}`}>
            <button onClick={handleItemClick(item)}>{name}</button>
          </li>
        );
      })}
    </ul>
  );
}
