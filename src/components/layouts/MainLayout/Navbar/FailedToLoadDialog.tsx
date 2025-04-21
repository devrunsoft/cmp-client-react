import Dialog, { DialogPropsType } from "uikit/src/Dialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

export default function FailedToLoadDialog({
  open,
  onTryAgain,
}: {
  onTryAgain: () => void;
  open: boolean;
}) {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={() => ""}
      title="خطا"
      size="xs"
      color={theme.palette.error.main}
      actions={
        <div className="flex justify-center w-full">
          <Button
            variant="contained"
            fullWidth
            onClick={(_) => onTryAgain()}
            color="error"
          >
            Try Again
          </Button>
        </div>
      }
    >
      <Typography variant="titleSm" textAlign="center" my="25px">
        خطایی رخ داد. لطفا اتصال اینترنت خود را بررسی کنید.
      </Typography>
    </Dialog>
  );
}
