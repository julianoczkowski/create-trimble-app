import { onMount, Show, type Component } from "solid-js";
import type { JSX } from "solid-js";

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
  children?: JSX.Element;
  /** Callback to receive ref handle for programmatic reset. */
  ref?: (handle: ModusFileDropzoneHandle) => void;
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
 * let dropzoneHandle: ModusFileDropzoneHandle | undefined;
 * <ModusFileDropzone ref={(h) => dropzoneHandle = h} />
 * // Later: dropzoneHandle?.reset();
 *
 * @param {ModusFileDropzoneProps} props - The component props.
 * @returns {JSX.Element} The rendered file dropzone component.
 */
const ModusFileDropzone: Component<ModusFileDropzoneProps> = (props) => {
  let dropzoneEl: (HTMLElement & { reset?: () => Promise<void> }) | undefined;

  onMount(() => {
    props.ref?.({
      reset: async () => {
        if (dropzoneEl?.reset) {
          await dropzoneEl.reset();
        }
      },
    });
  });

  return (
    <modus-wc-file-dropzone
      ref={(el) => (dropzoneEl = el as HTMLElement & { reset?: () => Promise<void> })}
      accept-file-types={props.acceptFileTypes}
      custom-class={props.customClass}
      disabled={props.disabled}
      file-dragged-over-instructions={props.fileDraggedOverInstructions}
      include-state-icon={props.includeStateIcon ?? true}
      instructions={props.instructions}
      invalid-file-type-message={props.invalidFileTypeMessage}
      max-file-count={props.maxFileCount}
      max-file-name-length={props.maxFileNameLength}
      max-total-file-size-bytes={props.maxTotalFileSizeBytes}
      multiple={props.multiple}
      success-message={props.successMessage}
      aria-label={props.ariaLabel}
      on:fileSelect={(e: CustomEvent<FileList>) => props.onFileSelect?.(e)}
    >
      <Show when={props.children}>
        <div slot="dropzone">{props.children}</div>
      </Show>
    </modus-wc-file-dropzone>
  );
};

export default ModusFileDropzone;
