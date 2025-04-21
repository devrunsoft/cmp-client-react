import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";


export default function ArrowDown({sx, ...props}:SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 20 20" {...props} sx={{...(sx || {}), fill: 'none'}}>
<g clipPath="url(#clip0_543_774)">
<path d="M6.175 7.1582L10 10.9749L13.825 7.1582L15 8.3332L10 13.3332L5 8.3332L6.175 7.1582Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_543_774">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
    </SvgIcon>
  )
}
