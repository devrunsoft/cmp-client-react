// import Skeleton from "@mui/material/Skeleton";
// import {useAppDispatch, useAppSelector} from "state";
// // import {selectRole} from "state/slice/user";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import ArrowDown from "assets/svg/ArrowDown";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// import {useState} from "react";
// import {useNavigate} from "react-router-dom";

// export default function RoleMenu({loading}: {loading:boolean}) {
//   // const userState = useAppSelector(state => state.user);
//   const roles = userState?.user?.postStatementOrPositions;
//   const selectedRoleID = userState?.selectedRoleID;

//   const navigate = useNavigate();

//   const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

//   const dispatch = useAppDispatch()

//   const handleChangeRole = (id:number) => {
//     if (selectedRoleID !== id) {
//       dispatch(selectRole(id));
//       navigate('/');
//     };
//     setAnchor(null);
//   }

//   if (loading) return <Skeleton variant="rectangular" width="109px" height="38px" />;
//   if (!roles) return null;

//   const selectedRole = roles.find(i => i.id === selectedRoleID);

//   return (
//     <>
//       <Button
//         endIcon={<ArrowDown sx={{fontSize: "24px", color: "text.primary"}} />}
//         onClick={e => setAnchor(e.currentTarget)}
//         variant="outlined"
//         sx={{borderColor: "text.primary", padding: "9px 10px"}}
//       >
//         <Typography variant="labelSm" color="text.primary">
//           {selectedRole?.roleName}
//         </Typography>
//       </Button>

//       <Menu
//         open={!!anchor}
//         onClose={() => setAnchor(null)}
//         anchorEl={anchor}
//         PaperProps={{
//           sx: {
//             minWidth: "260px",
//           }
//         }}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "left"
//         }}
//       >
//         {
//           roles.map(i => (
//             <MenuItem
//               onClick={() => handleChangeRole(i.id)}
//               key={i.id}
//               selected={i.id === selectedRoleID}
//             >
//               <Typography variant="labelSm" color="inherit">
//                 {i.roleName}
//               </Typography>
//             </MenuItem>
//           ))
//         }
//       </Menu>
//     </>
//   )
// }
