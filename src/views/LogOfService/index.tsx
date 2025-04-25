import { Box, Button, Typography } from "@mui/material";
import BoxItem from "uikit/src/BoxItem";
import Gap from "uikit/src/Gap";
import { DataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";
import { Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Empty from "cmp-core/src/Empty";
import { useClientServiceGetAll } from "data/repository/service";
import { BaseServiceAppointmentEntity } from "common/domain/entity/service_appointment_entity";
import { getStatusStyleFromString } from "cmp-core/src/Enum/serviceStatus";
import convertMinutesToTimeFrom from "cmp-core/src/utils/convertMinuteToString";

export default function ClientServiceLog() {
  const request = useClientServiceGetAll();

  const navigate = useNavigate();
  const [data, setData] = useState<BaseServiceAppointmentEntity[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {}, [data]);

  const loadData = () => {
    request.call({
      onSuccess: (res) => {
        setData(res.data);
      },
    });
  };
  //   const onAdd = () => {
  //     navigate(`/client-dashboard/${id}`);
  //   };

  return (
    <DataFetchingWrapper loading={request.loading}>
      <Box
        sx={{
          padding: "16px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="titleSm" fontSize={20} sx={{ textAlign: "left" }}>
          Log of Services
        </Typography>
        {/* <Button
          onClick={(_) => onAdd()}
          startIcon={<Plus />}
          variant="contained"
          sx={{ borderRadius: AppConstants.Radius }}
        >
          Add
        </Button> */}
      </Box>
      <Gap />
      <Box
        sx={{
          padding: "16px",
          flexGrow: 1, // Takes available space
          overflowY: "auto", // Enables scrolling
          width: "100%",
        }}
      >
        {data.length ? (
          data?.map((e) => (
            <BoxItem>
              <Box className="w-full">
                <Box className="flex justify-between">
                  <Typography
                    variant="titleSm"
                    fontWeight={400}
                    sx={{ textAlign: "left" }}
                  >
                    {e.Product?.Name}
                  </Typography>
                  <Box
                    sx={{
                      top: 10,
                      right: 10,
                      backgroundColor: getStatusStyleFromString(e.Status ?? "")
                        .background,
                      color: getStatusStyleFromString(e.Status ?? "").color,
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "4px 10px",
                      textAlign: "center",
                      borderRadius: "10px",
                      textTransform: "capitalize",
                      display: "inline-block",
                    }}
                  >
                    {e.Status}
                  </Box>
                </Box>
                <Gap size={2} />
                <Typography
                  variant="titleSm"
                  fontWeight={400}
                  sx={{ textAlign: "left", color: "#666666" }}
                >
                  {e.ProductPrice?.Name}
                </Typography>
                <Gap size={3} />
                <Typography
                  variant="titleSm"
                  fontWeight={400}
                  sx={{ textAlign: "left", color: "#666666" }}
                >
                  {new Date(e.StartDate!)?.toLocaleDateString()}
                  {" - "}
                  {convertMinutesToTimeFrom(e.FromHour ?? 0)} to{" "}
                  {convertMinutesToTimeFrom(e.ToHour ?? 0)}
                </Typography>
              </Box>
            </BoxItem>
          ))
        ) : (
          <Empty />
        )}
      </Box>
    </DataFetchingWrapper>
  );
}
