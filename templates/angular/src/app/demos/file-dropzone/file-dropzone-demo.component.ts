import { Component, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusFileDropzoneComponent } from '../../components/modus-file-dropzone.component';
import { ModusButtonComponent } from '../../components/modus-button.component';
import { ModusProgressComponent } from '../../components/modus-progress.component';

/**
 * Demo page showcasing the Modus File Dropzone component.
 */
@Component({
  selector: 'app-file-dropzone-demo-page',
  standalone: true,
  imports: [
    CommonModule,
    DemoPageComponent,
    DemoExampleComponent,
    ModusFileDropzoneComponent,
    ModusButtonComponent,
    ModusProgressComponent,
  ],
  template: `
    <demo-page
      title="Modus File Dropzone"
      description="File dropzone allows users to drag and drop files for upload, with built-in validation for file types, sizes, counts, and filename lengths."
    >
      <demo-example title="Basic File Dropzone" description="A simple file dropzone accepting document files.">
        <modus-file-dropzone
          acceptFileTypes=".doc, .docx, .pdf"
          instructions="Drag files here or browse to upload (.doc, .docx, .pdf)"
          (fileSelect)="handleFileSelect($event)"
        />
        @if (selectedFiles().length > 0) {
          <div class="mt-4 p-4 bg-muted rounded-lg border-default">
            <div class="text-sm font-medium text-foreground mb-2">Selected Files:</div>
            <div class="text-sm text-muted-foreground space-y-1">
              @for (file of selectedFiles(); track file) {
                <div>{{ file }}</div>
              }
            </div>
          </div>
        }
      </demo-example>

      <demo-example title="Multiple File Selection" description="Allow users to select multiple files at once.">
        <modus-file-dropzone
          acceptFileTypes="image/*"
          [multiple]="true"
          instructions="Select multiple image files (drag or click)"
        />
      </demo-example>

      <demo-example
        title="With Validation Constraints"
        description="Set limits on file count, total size, and filename length."
      >
        <modus-file-dropzone
          acceptFileTypes=".doc, .docx, .pdf"
          [multiple]="true"
          [maxFileCount]="3"
          [maxFileNameLength]="20"
          [maxTotalFileSizeBytes]="10485760"
          invalidFileTypeMessage="Invalid file format. Please upload .doc, .docx, or .pdf files."
          instructions="Upload files (max 3 files, 10MB total, filename max 20 chars)"
        />
      </demo-example>

      <demo-example title="Custom Messages" description="Customize success, error, and drag-over messages.">
        <modus-file-dropzone
          acceptFileTypes=".jpg, .jpeg, .png, .gif"
          [multiple]="true"
          instructions="Upload your images here"
          fileDraggedOverInstructions="Release to upload your images"
          successMessage="Images uploaded successfully!"
          invalidFileTypeMessage="Only image files (.jpg, .png, .gif) are allowed"
        />
      </demo-example>

      <demo-example title="With Progress Indicator" description="Add custom content like progress bars.">
        <div class="flex flex-col gap-4">
          <modus-file-dropzone
            acceptFileTypes=".pdf, .doc, .docx"
            successMessage="Files ready for upload!"
            instructions="Drag files here or browse to upload"
            (fileSelect)="simulateUpload()"
          >
            @if (uploadProgress() > 0 && uploadProgress() < 100) {
              <div slot="dropzone" class="w-64 mt-4">
                <modus-progress [value]="uploadProgress()" [label]="uploadProgress() + '% Uploaded'" />
              </div>
            }
          </modus-file-dropzone>
          @if (uploadProgress() === 100) {
            <div class="text-sm text-success">Upload complete!</div>
          }
        </div>
      </demo-example>

      <demo-example title="Without State Icon" description="Hide the state icons for a minimal appearance.">
        <modus-file-dropzone
          acceptFileTypes=".csv, .xlsx"
          [includeStateIcon]="false"
          instructions="Drop spreadsheet files here (.csv, .xlsx)"
        />
      </demo-example>

      <demo-example title="Disabled State" description="Disable the dropzone when file upload is not available.">
        <modus-file-dropzone [disabled]="true" instructions="File upload is currently disabled" />
      </demo-example>

      <demo-example title="Programmatic Reset" description="Reset the dropzone state using a reference.">
        <div class="flex flex-col gap-4">
          <modus-file-dropzone
            #resetDropzone
            acceptFileTypes=".txt, .md"
            instructions="Upload text files, then use the reset button"
          />
          <modus-button variant="outlined" color="secondary" (buttonClick)="handleReset()">
            Reset Dropzone
          </modus-button>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class FileDropzoneDemoPageComponent {
  @ViewChild('resetDropzone') private readonly resetDropzone?: ModusFileDropzoneComponent;

  readonly selectedFiles = signal<string[]>([]);
  readonly uploadProgress = signal<number>(0);

  private uploadIntervalId: number | undefined;

  handleFileSelect(files: FileList): void {
    const fileNames: string[] = [];
    for (let i = 0; i < files.length; i += 1) {
      fileNames.push(`${files[i].name} (${this.formatFileSize(files[i].size)})`);
    }
    this.selectedFiles.set(fileNames);
  }

  async handleReset(): Promise<void> {
    await this.resetDropzone?.reset();
    this.selectedFiles.set([]);
  }

  simulateUpload(): void {
    this.uploadProgress.set(0);
    if (this.uploadIntervalId) {
      window.clearInterval(this.uploadIntervalId);
    }
    this.uploadIntervalId = window.setInterval(() => {
      this.uploadProgress.update((value) => {
        if (value >= 100) {
          if (this.uploadIntervalId) {
            window.clearInterval(this.uploadIntervalId);
            this.uploadIntervalId = undefined;
          }
          return 100;
        }
        return value + 10;
      });
    }, 300);
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const kilo = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const index = Math.floor(Math.log(bytes) / Math.log(kilo));
    return `${parseFloat((bytes / Math.pow(kilo, index)).toFixed(2))} ${sizes[index]}`;
  }
}
