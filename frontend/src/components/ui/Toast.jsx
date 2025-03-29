import { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from "../../lib/utils";

export const Toast = ({ message, type = "success", onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  const colors = {
    success: "bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-800",
    error: "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100 border-red-200 dark:border-red-800",
    info: "bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800",
  };

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center p-4 mb-4 rounded-lg border shadow-md transition-opacity duration-300",
        colors[type],
        isVisible ? "opacity-100" : "opacity-0"
      )}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
        {icons[type]}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => {
            onClose && onClose();
          }, 300);
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
