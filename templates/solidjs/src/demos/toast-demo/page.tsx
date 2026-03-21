import { createSignal } from "solid-js";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusToast from "../../components/ModusToast";
import ModusButton from "../../components/ModusButton";
import type {
  ModusToastItem,
  ToastPosition,
  ToastVariant,
} from "../../components/ModusToast";

export default function ToastDemoPage() {
  const [toasts, setToasts] = createSignal<ModusToastItem[]>([]);

  const addToast = (
    variant: ToastVariant,
    position: ToastPosition = "top-end",
    title: string,
    description: string,
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
        <div class="space-y-6">
          <div>
            <div class="text-lg font-semibold text-foreground mb-4">
              Toast Variants
            </div>
            <div class="flex flex-wrap gap-3">
              <ModusButton
                color="primary"
                variant="filled"
                onButtonClick={() =>
                  addToast(
                    "success",
                    "top-end",
                    "Success!",
                    "Your action completed successfully.",
                  )
                }
              >
                Success Toast
              </ModusButton>
              <ModusButton
                color="warning"
                variant="filled"
                onButtonClick={() =>
                  addToast(
                    "warning",
                    "top-end",
                    "Warning!",
                    "Please review your input.",
                  )
                }
              >
                Warning Toast
              </ModusButton>
              <ModusButton
                color="danger"
                variant="filled"
                onButtonClick={() =>
                  addToast(
                    "error",
                    "top-end",
                    "Error!",
                    "Something went wrong.",
                  )
                }
              >
                Error Toast
              </ModusButton>
              <ModusButton
                color="secondary"
                variant="filled"
                onButtonClick={() =>
                  addToast(
                    "info",
                    "top-end",
                    "Info",
                    "Here's some helpful information.",
                  )
                }
              >
                Info Toast
              </ModusButton>
            </div>
          </div>

          <div>
            <div class="text-lg font-semibold text-foreground mb-4">
              Toast Positions
            </div>
            <div class="space-y-4">
              <div class="bg-card border border-border rounded-lg p-4">
                <div class="text-sm font-medium text-muted-foreground mb-3">
                  Top
                </div>
                <div class="flex flex-wrap gap-3">
                  <ModusButton
                    color="secondary"
                    variant="outlined"
                    onButtonClick={() =>
                      addToast(
                        "info",
                        "top-start",
                        "Top Start",
                        "Toast in top-left corner",
                      )
                    }
                  >
                    Top Start
                  </ModusButton>
                  <ModusButton
                    color="secondary"
                    variant="outlined"
                    onButtonClick={() =>
                      addToast(
                        "info",
                        "top-center",
                        "Top Center",
                        "Toast in top-center",
                      )
                    }
                  >
                    Top Center
                  </ModusButton>
                  <ModusButton
                    color="secondary"
                    variant="outlined"
                    onButtonClick={() =>
                      addToast(
                        "info",
                        "top-end",
                        "Top End",
                        "Toast in top-right corner",
                      )
                    }
                  >
                    Top End
                  </ModusButton>
                </div>
              </div>

              <div class="bg-card border border-border rounded-lg p-4">
                <div class="text-sm font-medium text-muted-foreground mb-3">
                  Middle
                </div>
                <div class="flex flex-wrap gap-3">
                  <ModusButton
                    color="secondary"
                    variant="outlined"
                    onButtonClick={() =>
                      addToast(
                        "success",
                        "middle-start",
                        "Middle Start",
                        "Toast in middle-left",
                      )
                    }
                  >
                    Middle Start
                  </ModusButton>
                  <ModusButton
                    color="secondary"
                    variant="outlined"
                    onButtonClick={() =>
                      addToast(
                        "success",
                        "middle-center",
                        "Middle Center",
                        "Toast in center",
                      )
                    }
                  >
                    Middle Center
                  </ModusButton>
                  <ModusButton
                    color="secondary"
                    variant="outlined"
                    onButtonClick={() =>
                      addToast(
                        "success",
                        "middle-end",
                        "Middle End",
                        "Toast in middle-right",
                      )
                    }
                  >
                    Middle End
                  </ModusButton>
                </div>
              </div>

              <div class="bg-card border border-border rounded-lg p-4">
                <div class="text-sm font-medium text-muted-foreground mb-3">
                  Bottom
                </div>
                <div class="flex flex-wrap gap-3">
                  <ModusButton
                    color="secondary"
                    variant="outlined"
                    onButtonClick={() =>
                      addToast(
                        "warning",
                        "bottom-start",
                        "Bottom Start",
                        "Toast in bottom-left",
                      )
                    }
                  >
                    Bottom Start
                  </ModusButton>
                  <ModusButton
                    color="secondary"
                    variant="outlined"
                    onButtonClick={() =>
                      addToast(
                        "warning",
                        "bottom-center",
                        "Bottom Center",
                        "Toast in bottom-center",
                      )
                    }
                  >
                    Bottom Center
                  </ModusButton>
                  <ModusButton
                    color="secondary"
                    variant="outlined"
                    onButtonClick={() =>
                      addToast(
                        "warning",
                        "bottom-end",
                        "Bottom End",
                        "Toast in bottom-right",
                      )
                    }
                  >
                    Bottom End
                  </ModusButton>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="text-lg font-semibold text-foreground mb-4">
              Special Features
            </div>
            <div class="flex flex-wrap gap-3">
              <ModusButton
                color="danger"
                variant="outlined"
                onButtonClick={clearAllToasts}
              >
                Clear All Toasts
              </ModusButton>
            </div>
          </div>

          <ModusToast toasts={toasts()} onDismiss={removeToast} />
        </div>
      </DemoExample>
    </DemoPage>
  );
}
