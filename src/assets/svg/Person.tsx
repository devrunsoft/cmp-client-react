import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";


export default function Person({sx, ...props}:SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props} sx={{...(sx || {}), fill: 'none'}}>
<path d="M16 15.5H8C5.79086 15.5 4 17.2909 4 19.5V21.5H20V19.5C20 17.2909 18.2091 15.5 16 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 11.5C14.2091 11.5 16 9.70914 16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.70914 9.79086 11.5 12 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  )
}
