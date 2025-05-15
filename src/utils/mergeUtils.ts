import type { Message } from "@/types/types";

export const mergeOptimisticUpdate = (
  server: Message[],
  localMessages: Message[]
) => {
  const merged = [...server];
  for (const local of localMessages) {
    const exists = merged.some((msg) => {
      return (
        msg.text === local.text &&
        msg.direction === local.direction &&
        Math.abs(
          new Date(msg.createdAt).getTime() -
            new Date(local.createdAt).getTime()
        ) < 5000
      );
    });

    if (!exists) {
      merged.push(local);
    }
  }
  return merged;
};
