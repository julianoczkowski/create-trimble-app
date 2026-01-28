"use client";

import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusToast from "../../components/ModusToast";
import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";
import type {
  ModusToastItem,
  ToastPosition,
  ToastVariant,
} from "../../components/ModusToast";

export default function ToastDemoPage() {
  const [toasts, setToasts] = useState<ModusToastItem[]>([]);

  const addToast = (
    variant: ToastVariant,
    position: ToastPosition = "top-end",
    title: string,
    description: string
  ) => {
    const id = `toast-${variant}-${Date.now()}`;
    const newToast: ModusToastItem = {
      id,
      title,
      description,
      variant,
      dismissible: true,
      position,
      delay: variant === "warning" ? null : 4000,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (toastId: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  return (
    <DemoPage
      title="Modus Toast"
      description="Toasts deliver lightweight confirmations or alerts without disrupting workflow. Keep the message brief and allow dismissal."
    >
      <DemoExample
        title="Interactive toast triggers"
        description="Click the buttons below to trigger different toasts in various positions and variants."
      >
        <div className="space-y-6">
          {/* Toast Variants */}
          <div>
            <div className="text-lg font-semibold text-foreground mb-4">
              Toast Variants
            </div>
            <div className="flex flex-wrap gap-3">
              <ModusWcButton
                color="primary"
                variant="filled"
                onButtonClick={() =>
                  addToast(
                    "success",
                    "top-end",
                    "Success!",
                    "Your action completed successfully."
                  )
                }
              >
                Success Toast
              </ModusWcButton>
              <ModusWcButton
                color="warning"
                variant="filled"
                onButtonClick={() =>
                  addToast(
                    "warning",
                    "top-end",
                    "Warning!",
                    "Please review your input."
                  )
                }
              >
                Warning Toast
              </ModusWcButton>
              <ModusWcButton
                color="danger"
                variant="filled"
                onButtonClick={() =>
                  addToast(
                    "error",
                    "top-end",
                    "Error!",
                    "Something went wrong."
                  )
                }
              >
                Error Toast
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="filled"
                onButtonClick={() =>
                  addToast(
                    "info",
                    "top-end",
                    "Info",
                    "Here's some helpful information."
                  )
                }
              >
                Info Toast
              </ModusWcButton>
            </div>
          </div>

          {/* Toast Positions */}
          <div>
            <div className="text-lg font-semibold text-foreground mb-4">
              Toast Positions
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <ModusWcButton
                color="secondary"
                variant="outlined"
                onButtonClick={() =>
                  addToast(
                    "info",
                    "top-start",
                    "Top Start",
                    "Toast in top-left corner"
                  )
                }
              >
                Top Start
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                onButtonClick={() =>
                  addToast(
                    "info",
                    "top-center",
                    "Top Center",
                    "Toast in top-center"
                  )
                }
              >
                Top Center
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                onButtonClick={() =>
                  addToast(
                    "info",
                    "top-end",
                    "Top End",
                    "Toast in top-right corner"
                  )
                }
              >
                Top End
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                onButtonClick={() =>
                  addToast(
                    "success",
                    "middle-start",
                    "Middle Start",
                    "Toast in middle-left"
                  )
                }
              >
                Middle Start
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                onButtonClick={() =>
                  addToast(
                    "success",
                    "middle-center",
                    "Middle Center",
                    "Toast in center"
                  )
                }
              >
                Middle Center
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                onButtonClick={() =>
                  addToast(
                    "success",
                    "middle-end",
                    "Middle End",
                    "Toast in middle-right"
                  )
                }
              >
                Middle End
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                onButtonClick={() =>
                  addToast(
                    "warning",
                    "bottom-start",
                    "Bottom Start",
                    "Toast in bottom-left"
                  )
                }
              >
                Bottom Start
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                onButtonClick={() =>
                  addToast(
                    "warning",
                    "bottom-center",
                    "Bottom Center",
                    "Toast in bottom-center"
                  )
                }
              >
                Bottom Center
              </ModusWcButton>
              <ModusWcButton
                color="secondary"
                variant="outlined"
                onButtonClick={() =>
                  addToast(
                    "warning",
                    "bottom-end",
                    "Bottom End",
                    "Toast in bottom-right"
                  )
                }
              >
                Bottom End
              </ModusWcButton>
            </div>
          </div>

          {/* Special Features */}
          <div>
            <div className="text-lg font-semibold text-foreground mb-4">
              Special Features
            </div>
            <div className="flex flex-wrap gap-3">
              <ModusWcButton
                color="tertiary"
                variant="borderless"
                onButtonClick={() => {
                  // Add multiple toasts at once
                  addToast("success", "top-end", "Batch 1", "First in batch");
                  setTimeout(
                    () =>
                      addToast("info", "top-end", "Batch 2", "Second in batch"),
                    200
                  );
                  setTimeout(
                    () =>
                      addToast(
                        "warning",
                        "top-end",
                        "Batch 3",
                        "Third in batch"
                      ),
                    400
                  );
                }}
              >
                Multiple Toasts
              </ModusWcButton>
              <ModusWcButton
                color="danger"
                variant="outlined"
                onButtonClick={clearAllToasts}
              >
                Clear All Toasts
              </ModusWcButton>
            </div>
          </div>

          {/* Toast Display */}
          <ModusToast toasts={toasts} onDismiss={removeToast} />
        </div>
      </DemoExample>
    </DemoPage>
  );
}
