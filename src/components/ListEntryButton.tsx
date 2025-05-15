import { Button } from "./ui/button";

type Props = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
};

const styles = {
  container: "p-1 max-h-fit",
  buttonBase: "w-full h-full border-2 justify-start text-left",
  selected: "border-zinc-100 text-white",
  inner: "flex items-center gap-3.5",
  iconBox: "w-10 h-10 flex items-center justify-center bg-zinc-800 text-xl",
  textBlock: "flex flex-col",
  title: "truncate text-sm font-medium",
  subtitle: "truncate text-xs text-zinc-400",
};

const ListEntryButton = ({
  icon,
  title,
  subtitle,
  selected,
  onClick,
}: Props) => {
  return (
    <div className={`${styles.container} ${selected && styles.selected}`}>
      <Button onClick={onClick} className={`${styles.buttonBase} `}>
        <div className={styles.inner}>
          {icon && <div className={styles.iconBox}>{icon}</div>}
          <div className={styles.textBlock}>
            <span className={styles.title}>{title}</span>
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>
        </div>
      </Button>
    </div>
  );
};

export default ListEntryButton;
