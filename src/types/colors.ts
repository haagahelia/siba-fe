interface PaletteColor {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

interface DefaultColor {
  default: string;
}

export interface PaletteContract {
  name: string;
  common: {
    black: string;
    white: string;
  };
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  grey: Record<string, never>; // TODO: define the actual type
  contrastThreshold: number;
  tonalOffset: number;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  divider: string;
  background: {
    paper: string;
    default: string;
  };
  action: {
    active: string;
    hover: string;
    hoverOpacity: number;
    selected: string;
    selectedOpacity: number;
    disabled: string;
    disabledBackground: string;
    disabledOpacity: number;
    focus: string;
    focusOpacity: number;
    activatedOpacity: number;
  };

  // own colors
  activeLinkBackgroundColor: PaletteColor;
  AllocRoom: Record<string, { color: string }>;
  backgroundDarker: DefaultColor;
  borderColor: {
    main: string;
    cardBorder: string;
  };
  borderColorDark: PaletteColor;
  buttonThemeToggle: PaletteColor;
  edit: PaletteColor;
  fontColorDefault: DefaultColor;
  helperText: PaletteColor;
  infoIcon: PaletteColor;

  progressBarBackground: PaletteColor;
  progressBarGreen: PaletteColor;
  progressBarYellow: PaletteColor;
  progressBarRed: PaletteColor;
  progressBarTextNonZero: PaletteColor;
  progressBarTextZero: PaletteColor;

  red: PaletteColor;
  snackbarBackground: DefaultColor;
}
