"use client";

import { useEffect, useState } from "react";

export default function useContent(file: string) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`/api/content?file=${file}`)
      .then((r) => r.json())
      .then(setData);
  }, [file]);
  return data;
}
