import { useEffect, useState } from "react";

export const useIsDesktop = (breakpoint = 900) => {
  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth >= breakpoint
  );

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isDesktop;
};
