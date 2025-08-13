 export const vibrate = () => {
    const duration = 30
  if (navigator.vibrate) {
    navigator.vibrate(duration);
  }
};
