import React from "react";
import { Link } from "react-router-dom";
import {files} from "../utils/generatePagination";

export function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>React Components Training 1</h1>
      <div>
        {console.log(files)}
        {files.map(({ filename }) => {
          return (
            <div key={filename} style={{ margin: 10 }}>
              <Link to={`/react/${filename}`}>Training {filename}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
