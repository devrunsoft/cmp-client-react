import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";


export default function Message({sx, ...props}:SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props} sx={{...(sx || {}), fill: 'none'}}>
<path d="M8 8H16M8 12H13M7 16V21L12 16H20V4H4V16H7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  )
}
