import Swal from 'sweetalert2';

export const useAlert = () => {

  const showAlert = ({ title, text, icon = 'warning', confirmButtonText = 'OK' }) => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
    });
  };

  return { showAlert };
};
