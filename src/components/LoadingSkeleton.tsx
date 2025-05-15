import { Skeleton } from "./ui/skeleton";

const styles = {
  container: "pt-2 max-w max-h-fit",
  button:
    "px-5 py-2 pt-3 w-full h-full justify-start text-left hover:bg-zinc-800",
  inner: "flex items-center gap-3.5",
  iconBox: "w-10 h-10 flex items-center justify-center bg-zinc-800",
  textBlock: "flex flex-col gap-1 flex-1",
  title: "h-3 w-2/3 bg-zinc-700 rounded",
  subtitle: "h-2 w-1/2 bg-zinc-600 rounded",
};

const LoadingSkeleton = () => (
  <div className={styles.container}>
    {Array.from({ length: 8 }, (_, i) => (
      <div className={styles.button} key={i}>
        <div className={styles.inner}>
          <div className={styles.iconBox}>
            <Skeleton className="w-6 h-6 rounded" />
          </div>
          <div className={styles.textBlock}>
            <Skeleton className={styles.title} />
            <Skeleton className={styles.subtitle} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
