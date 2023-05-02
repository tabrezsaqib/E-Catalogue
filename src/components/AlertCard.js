import { Slide, Snackbar, Alert } from "@mui/material";
import { useAlert } from "./context/AlertProvider";
import { useMediaQuery } from "@mui/material";

const AlertCard = () => {
  const { isOpen, type, message, onClose } = useAlert();
  const isDesktop = useMediaQuery("(min-width: 40em)");
  const isWide = useMediaQuery("(min-height: 60em");

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      <Alert
        onClose={onClose}
        variant="filled"
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertCard;
