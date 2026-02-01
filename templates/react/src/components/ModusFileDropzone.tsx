import { ModusWcFileDropzone } from "@trimble-oss/moduswebcomponents-react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Props for the ModusFileDropzone component.
 */
export interface ModusFileDropzoneProps {
  /** Accepted file types (e.g., '.jpg,.png' or 'image/*'). */
  acceptFileTypes?: string;
  /** Custom CSS class to apply to the dropzone element. */
  customClass?: string;
  /** Disables the file input and dropzone interaction. */
  disabled?: boolean;
  /** Custom instructions shown when files are dragged over the dropzone. */
  fileDraggedOverInstructions?: string;
  /** Show state icon (upload, success, error) in the dropzone. */
  includeStateIcon?: boolean;
  /** Custom instructions shown as the default dropzone message. */
  instructions?: string;
  /** Custom error message when an invalid file type is selected. */
  invalidFileTypeMessage?: string;
  /** Maximum number of files allowed; shows error if exceeded. */
  maxFileCount?: number;
  /** Maximum allowed length of filename (excluding extension); shows error if exceeded. */
  maxFileNameLength?: number;
  /** Maximum total file size in bytes; shows error if exceeded. */
  maxTotalFileSizeBytes?: number;
  /** Allow multiple file selection. */
  multiple?: boolean;
  /** Success message displayed when files are uploaded successfully. */
  successMessage?: string;
  /** Callback when files are selected (via drag-and-drop or file browser). */
  onFileSelect?: (event: CustomEvent<FileList>) => void;
  /** The ARIA label for the dropzone. */
  ariaLabel?: string;
  /** Custom content slot for progress indicators or additional instructions. */
  children?: ReactNode;
}

/**
 * Handle interface for ModusFileDropzone ref methods.
 */
export interface ModusFileDropzoneHandle {
  /** Resets the dropzone to its initial state, clearing all error and success states. */
  reset: () => Promise<void>;
}

/**
 * Renders a Modus file dropzone component for drag-and-drop file uploads.
 *
 * @example
 * // Basic file dropzone
 * <ModusFileDropzone
 *   acceptFileTypes=".doc, .docx, .pdf"
 *   instructions="Drag files here or browse to upload"
 * />
 *
 * @example
 * // Multiple files with validation
 * <ModusFileDropzone
 *   acceptFileTypes="image/*"
 *   multiple
 *   maxFileCount={3}
 *   maxTotalFileSizeBytes={10485760}
 *   instructions="Upload images (max 3 files, 10MB total)"
 *   onFileSelect={(e) => console.log('Files:', e.detail)}
 * />
 *
 * @example
 * // With ref for programmatic reset
 * const dropzoneRef = useRef<ModusFileDropzoneHandle>(null);
 * <ModusFileDropzone ref={dropzoneRef} />
 * // Later: dropzoneRef.current?.reset();
 *
 * @param {ModusFileDropzoneProps} props - The component props.
 * @param {React.Ref<ModusFileDropzoneHandle>} ref - The ref for accessing reset method.
 * @returns {JSX.Element} The rendered file dropzone component.
 */
const ModusFileDropzone = forwardRef<
  ModusFileDropzoneHandle,
  ModusFileDropzoneProps
>(
  (
    {
      acceptFileTypes,
      customClass,
      disabled,
      fileDraggedOverInstructions,
      includeStateIcon = true,
      instructions,
      invalidFileTypeMessage,
      maxFileCount,
      maxFileNameLength,
      maxTotalFileSizeBytes,
      multiple,
      successMessage,
      onFileSelect,
      ariaLabel,
      children,
    },
    ref,
  ) => {
    const dropzoneRef = useRef<HTMLModusWcFileDropzoneElement>(null);

    useImperativeHandle(ref, () => ({
      reset: async () => {
        if (dropzoneRef.current) {
          await dropzoneRef.current.reset();
        }
      },
    }));

    return (
      <ModusWcFileDropzone
        ref={dropzoneRef}
        accept-file-types={acceptFileTypes}
        custom-class={customClass}
        disabled={disabled}
        file-dragged-over-instructions={fileDraggedOverInstructions}
        include-state-icon={includeStateIcon}
        instructions={instructions}
        invalid-file-type-message={invalidFileTypeMessage}
        max-file-count={maxFileCount}
        max-file-name-length={maxFileNameLength}
        max-total-file-size-bytes={maxTotalFileSizeBytes}
        multiple={multiple}
        success-message={successMessage}
        onFileSelect={onFileSelect}
        aria-label={ariaLabel}
      >
        {children && <div slot="dropzone">{children}</div>}
      </ModusWcFileDropzone>
    );
  },
);

ModusFileDropzone.displayName = "ModusFileDropzone";

export default ModusFileDropzone;
