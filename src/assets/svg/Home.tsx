import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";


export default function Home({sx, ...props}:SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 23 20" {...props} sx={{...(sx || {}), fill: 'none'}}>
      <path d="M11.75 3.16471L17.375 8.45882V17.6471H15.125V10.5882H8.375V17.6471H6.125V8.45882L11.75 3.16471ZM11.75 0L0.5 10.5882H3.875V20H10.625V12.9412H12.875V20H19.625V10.5882H23L11.75 0Z" fill="currentColor"/>
    </SvgIcon>
  )
}