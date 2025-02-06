// Using Web Notifications API (free)
export const setupNotifications = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Notification permission denied');
  }
};

export const showNotification = (title, options) => {
  return new Notification(title, options);
};
