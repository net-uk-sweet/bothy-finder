import React from "react";

import { ResultType, Munro } from "./types";
import { isMunro } from "./utils";

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
        const { name, grid, url } = item;
        return (
          <li key={`${name}${grid}`}>
            <article onClick={handleItemClick(item)}>
              <h1>{name}</h1>
              <dl>
                <div>
                  <dt>Grid reference:</dt>
                  <dd>{grid}</dd>
                </div>
                {isMunro(item) && (
                  <div>
                    <dt>Height:</dt>
                    <dd>{(item as Munro).height} metres</dd>
                  </div>
                )}
              </dl>
              <a href={url}>More info</a>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
