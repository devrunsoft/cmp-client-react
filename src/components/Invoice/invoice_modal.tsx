import React, { useState, useEffect, useCallback } from "react";
;
import { InvoiceEntity } from "cmp-core/src/entity/InvoiceEntity";
import InvoiceComponent from "cmp-core/src/Component/Invoice/InvoiceComponent";
import Gap from "uikit/src/Gap";
import { Box } from "@mui/material";
import Dialog, { DialogPropsType } from "uikit/src/Dialog";
import { useInvoiceGet, useInvoicePay } from "data/repository/invoice";
import { DataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import { MoneyOffSharp, MoneySharp } from "@mui/icons-material";
import { InvoiceStatus } from "common/domain/enum/invoice_enum";

type InvoiceModalProps = Omit<DialogPropsType, "size"> & {
  onClose: () => void;
  refresh: () => void;
  model?: InvoiceEntity;
};

const ShowInvoice: React.FC<InvoiceModalProps> = ({
  onClose,
  model,
  refresh,
  ...props
}: InvoiceModalProps) => {
  const request = useInvoiceGet(model?.Id);
  const requestSend = useInvoicePay(model?.Id!);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const [invoice, setInvoice] = useState<InvoiceEntity | null>(null);

  useEffect(() => {
    if (props.open) {
      loadData();
    }
  }, [props.open]);

  const loadData = () => {
    request.call({
      onSuccess: (res) => {
        setInvoice(res.data);
      },
    });
  };
  const pay = () => {
    requestSend.call({
      onSuccess: (res) => {
        if (res.data) {
          window.location.href = res.data;
        }
      },
    });
  };


  return (
    <Dialog
      {...props}
      size="lg"
      title="Invoice"
      fullHeight={true}
      PaperProps={{}}
      onClose={onClose}
    >
      <DataFetchingWrapper
        retry={loadData}
        loading={request.loading && !request.data?.data}
        error={request.error && !request.data?.data}
      >
        <Box
          sx={{
            margin: "auto",
            p: 4,
            height: "100%",
            width: "100%",
            background: "white",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          
          {invoice && (
            <InvoiceComponent
              title="Invoice"
              number={invoice.InvoiceNumber}
              invoice={invoice}
            />
          )}

          <Gap />

          <Box className="flex justify-end">
            <Gap />

            {invoice?.Status == InvoiceStatus.SendPayment && (
              <LoadingButton
                onClick={() => {
                  pay();
                }}
                variant="contained"
                loading={requestSend.loading}
                color="primary"
                startIcon={<MoneySharp />}
                className="appButton"
              >
                Pay
              </LoadingButton>
            )}
          </Box>
        </Box>
      </DataFetchingWrapper>
    </Dialog>
  );
};

export default React.memo(ShowInvoice);
