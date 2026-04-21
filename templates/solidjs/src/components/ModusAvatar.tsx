import { createEffect, type Component } from "solid-js";

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
 * imgSrc is set as a JS property via ref + createEffect because
 * Stencil lowercases JSX attributes (imgSrc -> imgsrc) which the
 * web component doesn't recognize.
 * @param props - The component props.
 * @returns The rendered avatar component.
 */
const ModusAvatar: Component<ModusAvatarProps> = (props) => {
  let avatarEl: HTMLElement | undefined;

  createEffect(() => {
    const avatar = avatarEl as Record<string, unknown> | undefined;
    if (!avatar) return;
    if (props.imgSrc) {
      avatar.imgSrc = props.imgSrc;
    }
  });

  return (
    <modus-wc-avatar
      ref={(el) => (avatarEl = el as HTMLElement)}
      alt={props.alt}
      initials={props.initials ?? ""}
      shape={props.shape ?? "circle"}
      size={props.size ?? "md"}
      customClass={props.customClass}
    />
  );
};

export default ModusAvatar;
