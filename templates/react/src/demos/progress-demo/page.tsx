"use client";

import { useState, useEffect } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusProgress from "../../components/ModusProgress";
import ModusButton from "../../components/ModusButton";

export default function ProgressDemoPage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [onboardingProgress, setOnboardingProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate upload progress
  useEffect(() => {
    if (isUploading && uploadProgress < 100) {
      const timer = setTimeout(() => {
        setUploadProgress((prev) => Math.min(prev + Math.random() * 15, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (uploadProgress >= 100) {
      setIsUploading(false);
    }
  }, [isUploading, uploadProgress]);

  // Simulate onboarding progress
  useEffect(() => {
    if (onboardingProgress < 100) {
      const timer = setTimeout(() => {
        setOnboardingProgress((prev) =>
          Math.min(prev + Math.random() * 8, 100)
        );
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [onboardingProgress]);

  // Simulate download progress
  useEffect(() => {
    if (isDownloading && downloadProgress < 100) {
      const timer = setTimeout(() => {
        setDownloadProgress((prev) => Math.min(prev + Math.random() * 12, 100));
      }, 150);
      return () => clearTimeout(timer);
    } else if (downloadProgress >= 100) {
      setIsDownloading(false);
    }
  }, [isDownloading, downloadProgress]);

  const startUpload = () => {
    setUploadProgress(0);
    setIsUploading(true);
  };

  const startDownload = () => {
    setDownloadProgress(0);
    setIsDownloading(true);
  };

  const resetProgress = () => {
    setUploadProgress(0);
    setOnboardingProgress(0);
    setDownloadProgress(0);
    setIsUploading(false);
    setIsDownloading(false);
    setIsProcessing(false);
  };

  return (
    <DemoPage
      title="Modus Progress"
      description="Progress indicators show how close a task is to completion. Use determinate values when you know the total work and switch to indeterminate when you do not."
    >
      <DemoExample
        title="Animated Linear Progress"
        description="Simulated file upload with real-time progress updates."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <ModusButton onButtonClick={startUpload} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Start Upload"}
            </ModusButton>
            <div className="text-sm text-foreground opacity-80">
              {isUploading ? "Uploading design files..." : "Ready to upload"}
            </div>
          </div>
          <ModusProgress
            value={uploadProgress}
            max={100}
            label={`${Math.round(uploadProgress)}%`}
          />
          {uploadProgress >= 100 && (
            <div className="text-sm text-success">Upload complete!</div>
          )}
        </div>
      </DemoExample>

      <DemoExample
        title="Animated Radial Progress"
        description="Customer onboarding completion with smooth animation."
      >
        <div className="flex items-center gap-6">
          <ModusProgress variant="radial" value={onboardingProgress} max={100}>
            <div className="text-sm font-semibold text-foreground">
              {Math.round(onboardingProgress)}%
            </div>
          </ModusProgress>
          <div className="text-sm text-foreground opacity-80">
            Customer onboarding flow completion rate
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Indeterminate Progress"
        description="Use when you don't know how long a task will take."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <ModusButton onButtonClick={() => setIsProcessing(!isProcessing)}>
              {isProcessing ? "Stop Processing" : "Start Processing"}
            </ModusButton>
            <div className="text-sm text-foreground opacity-80">
              {isProcessing ? "Processing data..." : "Ready to process"}
            </div>
          </div>
          <ModusProgress indeterminate />
        </div>
      </DemoExample>

      <DemoExample
        title="Multiple Progress Bars"
        description="Simultaneous operations with different progress rates."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <ModusButton onButtonClick={startDownload} disabled={isDownloading}>
              {isDownloading ? "Downloading..." : "Start Download"}
            </ModusButton>
            <div className="text-sm text-foreground opacity-80">
              {isDownloading
                ? "Downloading large file..."
                : "Ready to download"}
            </div>
          </div>
          <ModusProgress
            value={downloadProgress}
            max={100}
            label={`${Math.round(downloadProgress)}%`}
          />
          {downloadProgress >= 100 && (
            <div className="text-sm text-success">Download complete!</div>
          )}
        </div>
      </DemoExample>

      <DemoExample
        title="Custom Styled Progress"
        description="Progress bars with custom dimensions and styling."
      >
        <div className="space-y-4">
          <div className="text-sm text-foreground opacity-80">
            Custom sized progress indicators
          </div>
          <div className="space-y-2">
            <div className="text-xs text-foreground opacity-60">Thin bar</div>
            <ModusProgress
              value={75}
              max={100}
              customClass="thin-progress"
              label="75%"
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs text-foreground opacity-60">Thick bar</div>
            <ModusProgress
              value={45}
              max={100}
              customClass="thick-progress"
              label="45%"
            />
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Control Panel"
        description="Reset all progress indicators to their initial state."
      >
        <div className="flex items-center gap-4">
          <ModusButton onButtonClick={resetProgress}>
            Reset All Progress
          </ModusButton>
          <div className="text-sm text-foreground opacity-80">
            Reset all progress indicators to 0%
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
