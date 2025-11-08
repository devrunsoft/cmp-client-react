import { useEffect, useRef, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog, { DialogPropsType } from "uikit/src/Dialog";
import { GoPlusCircle } from "react-icons/go";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { useLoading } from "components/loading/loading_context";
import { SignCompanyContractApi } from "data/api/contract/sign_contract_api";
import { CompanyContractEntity } from "common/domain/entity/contract_entity";
import { SignCompanyContractCommand } from "common/domain/command/sign_contract_command";
import { CompanyContractEnum } from "common/domain/enum/contract_status";

type Props = Omit<DialogPropsType, "size"> & {
  model: CompanyContractEntity;
  refresh: () => void;
};

export default function SignContract({
  model,
  onClose,
  refresh,
  ...props
}: Props) {
  const { setLoading } = useLoading();
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [name, setName] = useState("");

  useEffect(() => {
    if (props.open) {
      setName(model.Sign ?? "");
    }
  }, [props.open]);

  const onCancel = () => {
    onClose();
  };

  const handleSubmit = async () => {
    if (!name) {
      return toast.error("Please Sign The contract");
    }
    try {
      setLoading(true);
      var command: SignCompanyContractCommand = {
        Sign: name,
      };
      var result = await SignCompanyContractApi(model.Id!, command);
      result.fold(
        (error) => {
          setLoading(false);
        },
        (data) => {
          refresh();
          onClose();
          setLoading(false);
        }
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      {...props}
      size="lg"
      title="Sign Contract"
      onClose={onClose}
      actions={[
        ...[
          model.Sign == null && [
            <LoadingButton variant="outlined" onClick={onClose}>
              Cancel
            </LoadingButton>,
            <LoadingButton
              onClick={handleSubmit}
              variant="contained"
              loading={false}
              disabled={ false }
              endIcon={<GoPlusCircle size={20} />}
            >
              Sign
            </LoadingButton>,
          ],
        ],
        ...[
          model.Status == CompanyContractEnum.Signed && [
            <LoadingButton
              loading={false}
              disabled={ false }
              color="default"
              variant="outlined"
              onClick={(_) => reactToPrintFn()}
            >
              Print
            </LoadingButton>,
          ],
        ],
      ]}
    >
      <Box ref={contentRef} className="print-content">
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Box
            sx={{ "& ol, & ul": { paddingInlineStart: "20px" } }}
            dangerouslySetInnerHTML={{ __html: model.Content }}
          />

          {model.Sign == null && (
            <Box
              mt={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="body1" gutterBottom>
                Enter your first and last name as a digital signature:
              </Typography>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  fontSize: "18px",
                  padding: "8px",
                  marginBottom: "20px",
                  width: "100%",
                  maxWidth: 400,
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "40px",
                  fontWeight: "bold",
                  border: "1px solid black",
                  p: 2,
                  minWidth: 200,
                  textAlign: "center",
                }}
              >
                {name || "Your Signature"}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Dialog>
  );
}
