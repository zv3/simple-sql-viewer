export enum ButtonVariant {
  Solid = 'solid',
  Ghost = 'ghost',
  Outline = 'outline',
}

export enum ButtonSize {
  Small = 'small',
  Default = 'default',
  Large = 'large',
}

export enum ButtonColor {
  Blue = 'blue',
}

export interface ButtonProps {
  label: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
}
