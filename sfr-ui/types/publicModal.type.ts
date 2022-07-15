export interface IPubliModalProps {
  opened: boolean;
  children?: JSX.Element;
  onClose: () => void;
  size?: string | number;
  title?: string;
}
