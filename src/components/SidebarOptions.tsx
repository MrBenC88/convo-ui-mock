import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

const styles = {
  avatarBlock:
    "flex items-center gap-3 px-4 pb-4 border-b border-zinc-800 mb-4",
  avatar: "w-9 h-9 flex items-center justify-center rounded-full bg-zinc-500",
  name: "font-medium",
  subtext: "text-zinc-400 text-sm",
};

const SidebarOptions = () => {
  return (
<div className={styles.avatarBlock}>
      <Avatar className={styles.avatar}>
        <AvatarFallback>B</AvatarFallback>
      </Avatar>
      <div>
        <div className={styles.name}>Ben</div>
        <div className={styles.subtext}>Product Team</div>
      </div>
    </div>
  );
};

export default SidebarOptions;
