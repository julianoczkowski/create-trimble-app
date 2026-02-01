import { useRef, useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusFileDropzone, {
  type ModusFileDropzoneHandle,
} from "../../components/ModusFileDropzone";
import ModusButton from "../../components/ModusButton";
import ModusProgress from "../../components/ModusProgress";

export default function FileDropzoneDemoPage() {
  const dropzoneRef = useRef<ModusFileDropzoneHandle>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (event: CustomEvent<FileList>) => {
    const files = event.detail;
    const fileNames: string[] = [];
    for (let i = 0; i < files.length; i++) {
      fileNames.push(`${files[i].name} (${formatFileSize(files[i].size)})`);
    }
    setSelectedFiles(fileNames);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleReset = async () => {
    await dropzoneRef.current?.reset();
    setSelectedFiles([]);
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <DemoPage
      title="Modus File Dropzone"
      description="File dropzone allows users to drag and drop files for upload, with built-in validation for file types, sizes, counts, and filename lengths."
    >
      <DemoExample
        title="Basic File Dropzone"
        description="A simple file dropzone accepting document files."
      >
        <ModusFileDropzone
          acceptFileTypes=".doc, .docx, .pdf"
          instructions="Drag files here or browse to upload (.doc, .docx, .pdf)"
          onFileSelect={handleFileSelect}
        />
        {selectedFiles.length > 0 && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="text-sm font-medium text-foreground mb-2">
              Selected Files:
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              {selectedFiles.map((file, index) => (
                <div key={`file-${index}`}>{file}</div>
              ))}
            </div>
          </div>
        )}
      </DemoExample>

      <DemoExample
        title="Multiple File Selection"
        description="Allow users to select multiple files at once."
      >
        <ModusFileDropzone
          acceptFileTypes="image/*"
          multiple
          instructions="Select multiple image files (drag or click)"
        />
      </DemoExample>

      <DemoExample
        title="With Validation Constraints"
        description="Set limits on file count, total size, and filename length."
      >
        <ModusFileDropzone
          acceptFileTypes=".doc, .docx, .pdf"
          multiple
          maxFileCount={3}
          maxFileNameLength={20}
          maxTotalFileSizeBytes={10485760}
          invalidFileTypeMessage="Invalid file format. Please upload .doc, .docx, or .pdf files."
          instructions="Upload files (max 3 files, 10MB total, filename max 20 chars)"
        />
      </DemoExample>

      <DemoExample
        title="Custom Messages"
        description="Customize success, error, and drag-over messages."
      >
        <ModusFileDropzone
          acceptFileTypes=".jpg, .jpeg, .png, .gif"
          multiple
          instructions="Upload your images here"
          fileDraggedOverInstructions="Release to upload your images"
          successMessage="Images uploaded successfully!"
          invalidFileTypeMessage="Only image files (.jpg, .png, .gif) are allowed"
        />
      </DemoExample>

      <DemoExample
        title="With Progress Indicator"
        description="Add custom content like progress bars using the slot."
      >
        <div className="flex flex-col gap-4">
          <ModusFileDropzone
            acceptFileTypes=".pdf, .doc, .docx"
            successMessage="Files ready for upload!"
            instructions="Drag files here or browse to upload"
            onFileSelect={simulateUpload}
          >
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-64 mt-4">
                <ModusProgress
                  value={uploadProgress}
                  label={`${uploadProgress}% Uploaded`}
                />
              </div>
            )}
          </ModusFileDropzone>
          {uploadProgress === 100 && (
            <div className="text-sm text-success">Upload complete!</div>
          )}
        </div>
      </DemoExample>

      <DemoExample
        title="Without State Icon"
        description="Hide the upload/success/error icons for a minimal appearance."
      >
        <ModusFileDropzone
          acceptFileTypes=".csv, .xlsx"
          includeStateIcon={false}
          instructions="Drop spreadsheet files here (.csv, .xlsx)"
        />
      </DemoExample>

      <DemoExample
        title="Disabled State"
        description="Disable the dropzone when file upload is not available."
      >
        <ModusFileDropzone
          disabled
          instructions="File upload is currently disabled"
        />
      </DemoExample>

      <DemoExample
        title="Programmatic Reset"
        description="Reset the dropzone state using a ref."
      >
        <div className="flex flex-col gap-4">
          <ModusFileDropzone
            ref={dropzoneRef}
            acceptFileTypes=".txt, .md"
            instructions="Upload text files, then use the reset button"
          />
          <ModusButton
            variant="outlined"
            color="secondary"
            onButtonClick={handleReset}
          >
            Reset Dropzone
          </ModusButton>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
