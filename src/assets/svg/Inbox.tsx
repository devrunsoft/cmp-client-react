import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";


export default function Inbox({sx, ...props}:SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props} sx={{...(sx || {}), fill: 'none'}}>
      <path d="M3 12H8.5L10 15H14L16 12H21M3 12V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V12M3 12L5.75667 4.64888C5.90304 4.25857 6.27616 4 6.693 4H17.307C17.7238 4 18.097 4.25857 18.2433 4.64888L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  )
}
