import type { Component } from "solid-js";

/**
 * Props for the ModusAvatar component.
 */
export interface ModusAvatarProps {
  /** The alternative text for the avatar image. */
  alt: string;
  /** The source URL of the avatar image. */
  imgSrc?: string;
  /** Initials displayed when no image source is provided. */
  initials?: string;
  /** The shape of the avatar. */
  shape?: "circle" | "square";
  /** The size of the avatar. */
  size?: "xs" | "sm" | "md" | "lg";
  /** A custom CSS class to apply to the avatar. */
  customClass?: string;
}

/**
 * Renders a Modus avatar component.
 * @param props - The component props.
 * @returns The rendered avatar component.
 */
const ModusAvatar: Component<ModusAvatarProps> = (props) => {
  return (
    <modus-wc-avatar
      alt={props.alt}
      imgSrc={props.imgSrc ?? ""}
      initials={props.initials ?? ""}
      shape={props.shape ?? "circle"}
      size={props.size ?? "md"}
      customClass={props.customClass}
    />
  );
};

export default ModusAvatar;
