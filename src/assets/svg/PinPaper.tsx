import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";


export default function PinPaper({sx, ...props}:SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props} sx={{...(sx || {}), fill: 'none'}}>
<path d="M8 17H16M8 13H14M9 4.5H5V21H19V4.5H15M9 4.5V6H15V4.5M9 4.5V3H15V4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  )
}
