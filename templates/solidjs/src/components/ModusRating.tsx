import { onMount, onCleanup, createEffect, type Component } from "solid-js";

type RatingVariant = "star" | "heart" | "smiley" | "thumb";
type RatingSize = "sm" | "md" | "lg";

/**
 * Represents the detail of a rating change event.
 */
export interface RatingChangeDetail {
  newRating: number;
}

/**
 * Props for the ModusRating component.
 */
export interface ModusRatingProps {
  variant?: RatingVariant;
  count?: number;
  value?: number;
  allowHalf?: boolean;
  size?: RatingSize;
  disabled?: boolean;
  customClass?: string;
  "aria-label"?: string;
  getAriaLabelText?: (ratingValue: number) => string;
  onRatingChange?: (event: CustomEvent<RatingChangeDetail>) => void;
}

/**
 * Renders a Modus rating component.
 * @param {ModusRatingProps} props - The component props.
 * @returns {JSX.Element} The rendered rating component.
 */
const ModusRating: Component<ModusRatingProps> = (props) => {
  let ratingEl: HTMLElement | undefined;

  createEffect(() => {
    const rating = ratingEl as { getAriaLabelText?: (v: number) => string } | undefined;
    if (!rating) return;
    if (props.getAriaLabelText) {
      rating.getAriaLabelText = props.getAriaLabelText;
    } else {
      rating.getAriaLabelText = undefined;
    }
  });

  onMount(() => {
    if (!ratingEl || !props.onRatingChange) return;

    const handleRatingChange = (e: Event) => {
      props.onRatingChange?.(e as CustomEvent<RatingChangeDetail>);
    };

    ratingEl.addEventListener("ratingChange", handleRatingChange);

    onCleanup(() => {
      ratingEl?.removeEventListener("ratingChange", handleRatingChange);
    });
  });

  return (
    <modus-wc-rating
      ref={(el) => (ratingEl = el as HTMLElement)}
      variant={props.variant ?? "smiley"}
      count={props.count ?? 5}
      value={props.value ?? 0}
      allowHalf={props.allowHalf ?? false}
      size={props.size ?? "md"}
      disabled={props.disabled ?? false}
      custom-class={props.customClass}
      aria-label={props["aria-label"]}
    />
  );
};

export default ModusRating;
