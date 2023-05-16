import { toast } from "react-toastify";

const CallToast = (msg, type) => {
  const options = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  switch (type) {
    case "error":
      toast.error(msg, options);
      break;
    case "warn":
      toast.warn(msg, options);
      break;
    case "success":
      toast.success(msg, options);
      break;
    case "info":
      toast.info(msg, options);
      break;
    default:
      toast.error(msg, options);
      break;
  }
};

export default CallToast;
