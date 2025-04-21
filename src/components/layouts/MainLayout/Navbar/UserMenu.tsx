// import Skeleton from "@mui/material/Skeleton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Typography from "@mui/material/Typography";
// import { useAppSelector } from "state";
// import IconButton from "@mui/material/IconButton";
// import { useState } from "react";
// import Person from "assets/svg/Person";
// import Box from "@mui/material/Box";
// import Avatar from "@mui/material/Avatar";
// import Divider from "@mui/material/Divider";
// import Logout from "assets/svg/Logout";
// import { logout } from "core/src/utils/auth";

// export default function UserMenu({ loading }: { loading: boolean }) {
//   const userState = useAppSelector((state) => state.user);
//   const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

//   const user = userState?.user;

//   const handleLogout = () => {
//     setAnchor(null);
//     logout();
//   };

//   if (loading)
//     return <Skeleton variant="circular" width="38px" height="38px" />;
//   return (
//     <>
//       <IconButton
//         onClick={(e) => setAnchor(e.currentTarget)}
//         sx={{
//           border: "1px solid",
//           borderColor: "text.primary",
//           color: "text.primary",
//           p: "6px",
//         }}
//       >
//         <Person sx={{ fontSize: "24px" }} />
//       </IconButton>

//       <Menu
//         open={!!anchor}
//         onClose={() => setAnchor(null)}
//         anchorEl={anchor}
//         PaperProps={{
//           sx: {
//             minWidth: "200px",
//             p: "12px",
//           },
//         }}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//       >
//         <Box className="flex items-center">
//           <Avatar sx={{ width: "40px", height: "40px" }}>
//             {user?.firstName ? user.firstName[0] : undefined}
//           </Avatar>
//           <Typography
//             color="text.primary"
//             variant="labelSm"
//             sx={{ mr: "15px" }}
//           >
//             {user?.firstName} {user?.lastName}
//           </Typography>
//         </Box>
//         <Divider sx={{ my: "10px" }} />
//         <MenuItem onClick={handleLogout} sx={{ px: "5px" }}>
//           <Logout sx={{ ml: "15px", fill: "currentColor !important" }} />
//           <Typography color="inherit" variant="labelSm">
//             خروج
//           </Typography>
//         </MenuItem>
//       </Menu>
//     </>
//   );
// }
