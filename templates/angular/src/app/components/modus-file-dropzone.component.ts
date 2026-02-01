import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModusWcFileDropzone } from '@trimble-oss/moduswebcomponents-angular';
import type { Components } from '@trimble-oss/moduswebcomponents';

/**
 * Props supported by the {@link ModusFileDropzoneComponent}.
 */
export interface ModusFileDropzoneProps {
  /** Accepted file types (e.g. `.jpg,.png`). */
  acceptFileTypes?: Components.ModusWcFileDropzone['acceptFileTypes'];
  /** Optional CSS class applied to the dropzone. */
  className?: Components.ModusWcFileDropzone['customClass'];
  /** Disables the dropzone interaction. */
  disabled?: Components.ModusWcFileDropzone['disabled'];
  /** Instructions displayed while dragging files. */
  fileDraggedOverInstructions?: Components.ModusWcFileDropzone['fileDraggedOverInstructions'];
  /** Shows contextual icons for upload, success, and error states. */
  includeStateIcon?: Components.ModusWcFileDropzone['includeStateIcon'];
  /** Default instructions displayed in the dropzone. */
  instructions?: Components.ModusWcFileDropzone['instructions'];
  /** Error message shown for invalid file type. */
  invalidFileTypeMessage?: Components.ModusWcFileDropzone['invalidFileTypeMessage'];
  /** Maximum number of files allowed. */
  maxFileCount?: Components.ModusWcFileDropzone['maxFileCount'];
  /** Maximum file name length. */
  maxFileNameLength?: Components.ModusWcFileDropzone['maxFileNameLength'];
  /** Maximum total file size in bytes. */
  maxTotalFileSizeBytes?: Components.ModusWcFileDropzone['maxTotalFileSizeBytes'];
  /** Allow multiple file selection. */
  multiple?: Components.ModusWcFileDropzone['multiple'];
  /** Success message shown after valid upload. */
  successMessage?: Components.ModusWcFileDropzone['successMessage'];
}

/**
 * Angular wrapper for the Modus file dropzone web component.
 */
@Component({
  selector: 'modus-file-dropzone',
  imports: [CommonModule, ModusWcFileDropzone],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <modus-wc-file-dropzone
      [acceptFileTypes]="acceptFileTypes()"
      [customClass]="className()"
      [disabled]="disabled()"
      [fileDraggedOverInstructions]="fileDraggedOverInstructions()"
      [includeStateIcon]="includeStateIcon()"
      [instructions]="instructions()"
      [invalidFileTypeMessage]="invalidFileTypeMessage()"
      [maxFileCount]="maxFileCount()"
      [maxFileNameLength]="maxFileNameLength()"
      [maxTotalFileSizeBytes]="maxTotalFileSizeBytes()"
      [multiple]="multiple()"
      [successMessage]="successMessage()"
      (fileSelect)="handleFileSelect($event)"
    >
      <ng-content select="[slot='dropzone']" slot="dropzone" />
    </modus-wc-file-dropzone>
  `,
})
export class ModusFileDropzoneComponent {
  @ViewChild(ModusWcFileDropzone, { read: ElementRef })
  private readonly dropzoneElement?: ElementRef<HTMLElement>;

  /** Accepted file types (e.g. `.jpg,.png`). */
  readonly acceptFileTypes = input<string | undefined>();

  /** Optional CSS class applied to the dropzone. */
  readonly className = input<string | undefined>();

  /** Disables the dropzone interaction. */
  readonly disabled = input<boolean | undefined>(false);

  /** Instructions displayed while dragging files. */
  readonly fileDraggedOverInstructions = input<string | undefined>();

  /** Shows contextual icons for upload, success, and error states. */
  readonly includeStateIcon = input<boolean | undefined>(true);

  /** Default instructions displayed in the dropzone. */
  readonly instructions = input<string | undefined>();

  /** Error message shown for invalid file type. */
  readonly invalidFileTypeMessage = input<string | undefined>();

  /** Maximum number of files allowed. */
  readonly maxFileCount = input<number | undefined>();

  /** Maximum file name length. */
  readonly maxFileNameLength = input<number | undefined>();

  /** Maximum total file size in bytes. */
  readonly maxTotalFileSizeBytes = input<number | undefined>();

  /** Allow multiple file selection. */
  readonly multiple = input<boolean | undefined>(false);

  /** Success message shown after valid upload. */
  readonly successMessage = input<string | undefined>();

  /** Emits selected files when the user drops or chooses files. */
  readonly fileSelect = output<FileList>();

  /**
   * Resets the dropzone to its initial state.
   */
  async reset(): Promise<void> {
    const element = this.dropzoneElement?.nativeElement as
      | (HTMLElement & { reset?: () => Promise<void> })
      | undefined;
    if (element?.reset) {
      await element.reset();
    }
  }

  handleFileSelect(event: CustomEvent<FileList>): void {
    this.fileSelect.emit(event.detail);
  }
}
