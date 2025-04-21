import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";


export default function Chart({sx, ...props}:SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props} sx={{...(sx || {}), fill: 'none'}}>
<path d="M3 12C3 16.9706 7.02944 21 12 21C14.4853 21 16.7353 19.9926 18.364 18.364M3 12C3 7.02944 7.02944 3 12 3M3 12H12M12 3C16.9706 3 21 7.02944 21 12C21 14.4853 19.9926 16.7353 18.364 18.364M12 3V12M18.364 18.364L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  )
}
