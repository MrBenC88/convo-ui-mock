import { type ReactNode } from "react";

type Props = {
  sidebar?: ReactNode;
  children: ReactNode;
};

const styles = {
  layout: "flex h-screen w-screen bg-zinc-950 text-white overflow-hidden",
  main: "flex-1 overflow-y-auto",
};

const Layout = ({ sidebar, children }: Props) => {
  return (
    <div className={styles.layout}>
      {sidebar}
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
