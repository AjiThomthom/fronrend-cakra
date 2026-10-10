// global.d.ts
interface Window {
  turnstile?: {
    render: (
      container: string | HTMLElement,
      options?: Record<string, any>,
    ) => string;
    reset: (widgetId?: string) => void;
    remove: (widgetId?: string) => void;
  };
}
