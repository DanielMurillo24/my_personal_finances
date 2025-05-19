import { useState } from "react";
import Swal from "sweetalert2";

const DEFAULT_TITLE = "Are you sure?";
const DEFAULT_TEXT = "This action cannot be undone.";
const DEFAULT_ICON = "warning";
const DEFAULT_CONFIRM_BUTTON_TEXT = "Yes, do it!";
const DEFAULT_CONFIRM_BUTTON_COLOR = "#d33";
const DEFAULT_CANCEL_BUTTON_COLOR = "#3085d6";
const DEFAULT_SUCCESS_TITLE = "Done!";
const DEFAULT_SUCCESS_TEXT = "Action completed successfully.";

/**
 * Hook que muestra un mensaje de confirmación y ejecuta una acción si se confirma.
 * Incluye soporte para loading.
 */
export const useConfirmAction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const confirmAndRun = async ({
    title = DEFAULT_TITLE,
    text = DEFAULT_TEXT,
    icon = DEFAULT_ICON,
    confirmButtonText = DEFAULT_CONFIRM_BUTTON_TEXT,
    confirmButtonColor = DEFAULT_CONFIRM_BUTTON_COLOR,
    cancelButtonColor = DEFAULT_CANCEL_BUTTON_COLOR,
    successMessage = DEFAULT_SUCCESS_TITLE,
    successText = DEFAULT_SUCCESS_TEXT,
    onConfirm,
  }) => {
    const result = await Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor,
      cancelButtonColor,
      confirmButtonText,
    });

    if (result.isConfirmed && typeof onConfirm === "function") {
      setIsLoading(true);
      try {
        await onConfirm();
        await Swal.fire(successMessage, successText, "success");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { confirmAndRun, isLoading };
};
