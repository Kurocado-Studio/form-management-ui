export const scrollToElement = (id?: string): void => {
  requestAnimationFrame(() => {
    const element = document.querySelector(`#${CSS.escape(id ?? '')}`);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  });
};
