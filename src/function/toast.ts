import { showNotification } from "@mantine/notifications";

export const toast = (title: string, message: string, color: string) => {
  showNotification({
    title: title,
    message: message,
    color: color,
  });
};
