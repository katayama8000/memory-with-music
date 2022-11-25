import { showNotification } from '@mantine/notifications';

export const toast = (title: string, message: string, color: string) => {
  showNotification({
    color: color,
    message: message,
    title: title,
  });
};
