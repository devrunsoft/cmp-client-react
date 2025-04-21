import { Components } from "@mui/material/styles/components";

import { alpha, Theme } from "@mui/material/styles";
import { Opacity } from "@mui/icons-material";

// @ts-ignore
const components = (theme: Theme): Components => ({
  MuiListItemButton: {
    defaultProps: {},
    styleOverrides: {
      root: {
        "&.Mui-selected": {
          backgroundColor: "rgba(246, 197, 23, 0.1)",
        },
        "&.Mui-selected:hover": {
          backgroundColor: "rgba(246, 197, 23, 0.2)",
        },
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: "12px",
      },
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: theme.palette.tooltip,
        color: theme.palette.text.tooltip,
      },
      arrow: {
        color: theme.palette.tooltip,
      },
    },
  },

  MuiTypography: {
    defaultProps: {
      component: "p",
    },
  },

  MuiTextField: {},

  MuiRadio: {
    defaultProps: {
      color: "secondary",
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: "10px",
        // border: "1px solid rgba(228, 228, 228, 1) !important",
        padding: "4px 6px",
        "& input::placeholder": {
          color: theme.palette.grey["600"],
          opacity: 1,
        },
      },
      multiline: {
        borderRadius: "8px",
        "& textarea": { padding: 0 },
      },
      input: {
        padding: "10px",
        fontSize: "16px",
        color: theme.palette.text.secondary,
        fontWeight: "400",
        lineHeight: "24px",
        // font-size: 16px;
        // font-weight: 400;
        // line-height: 24px;
      },
      adornedStart: {
        paddingRight: "10px",
      },
      adornedEnd: {
        paddingLeft: "10px",
      },
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        padding: "8px",
        minHeight: "24px",
      },
      icon: {
        marginInline: "8px",
      },
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: {
        minHeight: "24px",
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        fontSize: theme.typography.caption.fontSize,
        display: "block",
        textAlign: "right",
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      root: {
        "& .MuiModal-backdrop": {
          background: theme.palette.dialogBackdrop,
        },
      },
    },
  },

  MuiCheckbox: {
    defaultProps: { color: "secondary" },
    styleOverrides: {
      sizeSmall: {
        padding: "5px",
        "& .MuiSvgIcon-root": {
          fontSize: "18px",
        },
      },
    },
  },

  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    variants: [
      {
        props: { variant: "contained" }, // Custom variant
        style: {
          borderRadius: "50px",
          padding: "10px 46px",
          color: "white",
        },
      },
      {
        props: { variant: "outlined" },
        style: {
          borderRadius: "10px",
          padding: "10px 46px",
        },
      },
    ],

    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.color === "warning" && {
          borderColor: theme.palette.warning.main,
          color: theme.palette.warning.main,
          "&:hover": {
            color: "white",
            backgroundColor: theme.palette.warning.light,
          },
        }),
        ...(ownerState.color === "error" && {
          borderColor: theme.palette.error.main,
          color: theme.palette.error.main,
          "&:hover": {
            color: "white",
            backgroundColor: theme.palette.error.light,
          },
        }),
        ...(ownerState.color === "primary" && {
          borderColor: theme.palette.primary.main,
          "&:hover": {
            color: "white",
            backgroundColor: theme.palette.primary.light,
          },
        }),
        "&.MuiLoadingButton-root": {
          "& .MuiLoadingButton-loadingIndicator": {},
        },
      }),
    },
  },

  MuiTable: {
    styleOverrides: {
      root: {
        borderRight: "1px solid",
        borderColor: theme.palette.grey["200"],
      },
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: {
        "&.Mui-selected": {
          background: alpha(theme.palette.primary.main, 0.2) + "!important",
        },
      },
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: "1px solid",
        borderLeft: "1px solid",
        borderColor: theme.palette.grey["200"],
        ...(theme.typography.labelSm || {}),
        fontSize: theme.typography.labelSm.fontSize,
        textAlign: "left",
        // direction: "ltr",
        minWidth: "0",
        padding: "12px 5px",
        "&::last-child": {
          border: "none",
        },
      },
      head: {
        fontWeight: "700 !important",
        borderTop: "1px solid",
        borderColor: theme.palette.grey["200"],
      },
    },
  },

  MuiPagination: {
    styleOverrides: {
      root: {
        "& .MuiPaginationItem-root": {
          fontSize: "12px",
          color: theme.palette.text.primary,
          "&.Mui-selected": {
            border: `1px solid ${theme.palette.grey["500"]}`,
            color: theme.palette.grey["500"],
            background: "transparent",
          },
        },
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: "8px",
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      rounded: {
        borderColor: theme.palette.grey["300"],
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        color: theme.palette.text.secondary,
        "&.Mui-selected": {
          background: theme.palette.grey["200"],
        },
      },
    },
  },

  MuiSelect: {
    styleOverrides: {
      select: {
        paddingRight: "10px !important",
        paddingLeft: "32px",
      },
      icon: {
        right: "unset !important",
        left: "7px !important",
        top: "calc(50% - 12px)",
      },
    },
  },

  MuiAutocomplete: {
    styleOverrides: {
      inputRoot: {
        padding: "3px",
        maxHeight: "42.5px",
        paddingRight: "3px !important",
        paddingLeft: "39px",
      },
      endAdornment: {
        right: "unset !important",
        left: "9px",
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      deleteIcon: {
        marginLeft: "10px",
        marginRight: "4px",
      },
      icon: {
        marginLeft: "-6px",
        marginRight: "10px",
      },
    },
  },
});

export default components;
