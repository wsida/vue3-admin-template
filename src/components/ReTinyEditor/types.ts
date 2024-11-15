export interface ReTinyEditorProps {
  modelValue: string;
  disabled?: boolean;
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  autoFocus?: boolean;
  resize?: true | false | "both";
  tinyOption?: any;
}
