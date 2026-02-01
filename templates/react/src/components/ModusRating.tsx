

import { useEffect, useRef } from "react";
import { ModusWcRating } from "@trimble-oss/moduswebcomponents-react";

type RatingVariant = "star" | "heart" | "smiley" | "thumb";
type RatingSize = "sm" | "md" | "lg";

/**
 * Represents the detail of a rating change event.
 */
export interface RatingChangeDetail {
  /** The new rating value. */
  newRating: number;
}

/**
 * Props for the ModusRating component.
 */
export interface ModusRatingProps {
  /** The variant of the rating component. */
  variant?: RatingVariant;
  /** The total number of rating items. */
  count?: number;
  /** The current rating value. */
  value?: number;
  /** Whether to allow half ratings. */
  allowHalf?: boolean;
  /** The size of the rating items. */
  size?: RatingSize;
  /** Whether the rating component is disabled. */
  disabled?: boolean;
  /** A custom CSS class to apply to the rating component. */
  customClass?: string;
  /** The ARIA label for the rating component. */
  'aria-label'?: string;
  /** A function to get the ARIA label text for a given rating value. */
  getAriaLabelText?: (ratingValue: number) => string;
  /** A callback function to handle rating changes. */
  onRatingChange?: (event: CustomEvent<RatingChangeDetail>) => void;
}

/**
 * Renders a Modus rating component.
 * @param {ModusRatingProps} props - The component props.
 * @returns {JSX.Element} The rendered rating component.
 */
export default function ModusRating({
  variant = 'smiley',
  count = 5,
  value = 0,
  allowHalf = false,
  size = 'md',
  disabled = false,
  customClass,
  'aria-label': ariaLabel,
  getAriaLabelText,
  onRatingChange,
}: ModusRatingProps) {
  const ratingRef = useRef<HTMLModusWcRatingElement>(null);

  useEffect(() => {
    const rating = ratingRef.current;
    if (!rating) {
      return;
    }

    if (getAriaLabelText) {
      rating.getAriaLabelText = getAriaLabelText;
      return () => {
        rating.getAriaLabelText = undefined;
      };
    }

    return;
  }, [getAriaLabelText]);

  useEffect(() => {
    const rating = ratingRef.current;
    if (!rating || !onRatingChange) {
      return;
    }

    const handleRatingChange = (event: Event) => {
      onRatingChange(event as CustomEvent<RatingChangeDetail>);
    };

    rating.addEventListener("ratingChange", handleRatingChange);

    return () => {
      rating.removeEventListener("ratingChange", handleRatingChange);
    };
  }, [onRatingChange]);

  return (
    <ModusWcRating
      ref={ratingRef}
      variant={variant}
      count={count}
      value={value}
      allowHalf={allowHalf}
      size={size}
      disabled={disabled}
      customClass={customClass}
      aria-label={ariaLabel}
    />
  );
}
