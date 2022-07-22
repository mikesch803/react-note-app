import { useEffect } from "react";

export const useTitle = (page: string) => {
  useEffect(() => {
    document.title = `Note | ${page}`;
  }, []);
};
