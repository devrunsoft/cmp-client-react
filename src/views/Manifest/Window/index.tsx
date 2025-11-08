import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";
import Dialog, { DialogPropsType } from "uikit/src/Dialog";

import useRoleAccess from "hooks/useRoleAccess";
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useReactToPrint } from "react-to-print";
import { LoadingButton } from "@mui/lab";
import ShowManifest from "cmp-core/src/ui/manifest";
import { ManifestStatus } from "cmp-core/src/Enum/manifestStatus";
import {
  useClientManifestGetPaginate,
  useGetManifestAssign,
} from "data/repository/manifest";
import { useAppSelector } from "state/index";
import {
  ManifestDetailEntity,
  ManifestEntity,
} from "cmp-core/src/entity/ManifestEntity";

type Props = Omit<DialogPropsType, "size"> & {
  selected: ManifestEntity;
  refresh: () => void;
};

export default function ManifestWindow({
  selected,
  refresh,
  onClose,
  ...props
}: Props) {
  const [content, setContent] = useState<String>("");
  const [configDelete, setConfirmDelete] = useState<boolean>(false);
  const refreshAddress = useAppSelector((state) => state.addressSlice);
  const request = useClientManifestGetPaginate(refreshAddress.Id ?? 0);
  const requestGet = useGetManifestAssign(refreshAddress.Id, selected?.Id);

  const isLoading = requestGet.loading;
  const { refreshRep } = useRoleAccess();
  const [dialog, setDialog] = useState<boolean>(false);
  const [model, setModel] = useState<ManifestDetailEntity | null>(null);
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const loadData = () => {
    requestGet.call({
      onSuccess: (res) => {
        setModel(res.data);
        setContent("");
        refreshRep();
      },
    });
  };

  useEffect(() => {
    if (!open) {
      setContent("");
    } else {
      loadData();
    }
  }, [props.open]);

  return (
    <Dialog
      onClose={onClose}
      {...props}
      size="xl"
      title="Manifest"
      actions={[
        ...[
          <LoadingButton
            loading={isLoading}
            disabled={ isLoading }
            color="default"
            variant="outlined"
            onClick={(_) => reactToPrintFn()}
          >
            Print
          </LoadingButton>,
        ],
      ]}
    >
      <DataFetchingWrapper loading={isLoading} retry={loadData}>
        <Box ref={contentRef} className="print-content">
          {model && <ShowManifest manifest={model} />}
        </Box>
      </DataFetchingWrapper>
    </Dialog>
  );
}
