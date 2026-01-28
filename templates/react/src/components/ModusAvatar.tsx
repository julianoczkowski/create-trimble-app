import { ModusWcAvatar } from "@trimble-oss/moduswebcomponents-react";

/**
 * Props for the ModusAvatar component.
 */
export interface ModusAvatarProps {
  /** The alternative text for the avatar image. */
  alt: string;
  /** The source URL of the avatar image. */
  imgSrc?: string;
  /** The shape of the avatar. */
  shape?: 'circle' | 'square';
  /** The size of the avatar. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** A custom CSS class to apply to the avatar. */
  customClass?: string;
}

/**
 * Renders a Modus avatar component.
 * @param {ModusAvatarProps} props - The component props.
 * @param {string} props.alt - The alternative text for the avatar image.
 * @param {string} [props.imgSrc=""] - The source URL of the avatar image.
 * @param {'circle' | 'square'} [props.shape='circle'] - The shape of the avatar.
 * @param {'xs' | 'sm' | 'md' | 'lg'} [props.size='md'] - The size of the avatar.
 * @param {string} [props.customClass] - A custom CSS class to apply to the avatar.
 * @returns {JSX.Element} The rendered avatar component.
 */
export default function ModusAvatar({
  alt,
  imgSrc = '',
  shape = 'circle',
  size = 'md',
  customClass,
}: ModusAvatarProps) {
  return (
    <ModusWcAvatar
      alt={alt}
      imgSrc={imgSrc}
      shape={shape}
      size={size}
      customClass={customClass}
    />
  );
}
