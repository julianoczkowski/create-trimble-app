"use client";

import { useRef } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusButton from "../../components/ModusButton";
import ModusModal, { type ModusModalRef } from "../../components/ModusModal";

export default function ModalDemoPage() {
  // Modal refs for controlling modals
  const centeredModalRef = useRef<ModusModalRef>(null);
  const topModalRef = useRef<ModusModalRef>(null);
  const bottomModalRef = useRef<ModusModalRef>(null);
  const fullscreenModalRef = useRef<ModusModalRef>(null);
  const staticModalRef = useRef<ModusModalRef>(null);
  const customModalRef = useRef<ModusModalRef>(null);

  return (
    <DemoPage
      title="Modus Modal"
      description="Modals focus attention on a short, interruptive task. Keep content concise and provide a clear primary action."
    >
      <DemoExample
        title="Centered Dialog"
        description="Default centered modal for quick confirmations or lightweight forms."
      >
        <div className="space-y-4">
          <ModusButton
            onButtonClick={() => {
              centeredModalRef.current?.openModal();
            }}
          >
            Open Centered Modal
          </ModusButton>
          <ModusModal
            ref={centeredModalRef}
            modalId="modal-centered"
            ariaLabel="Archive project"
            onClose={() => {}}
            header={
              <div className="text-xl font-semibold text-foreground">
                Archive project
              </div>
            }
            footer={
              <div className="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => {
                    centeredModalRef.current?.closeModal();
                  }}
                >
                  Cancel
                </ModusButton>
                <ModusButton
                  color="danger"
                  onButtonClick={() => {
                    centeredModalRef.current?.closeModal();
                  }}
                >
                  Archive
                </ModusButton>
              </div>
            }
          >
            <div className="text-sm text-foreground opacity-80">
              Archived projects are hidden from your active workspace. You can
              restore them later from the settings panel.
            </div>
          </ModusModal>
        </div>
      </DemoExample>

      <DemoExample
        title="Position Variants"
        description="Different vertical positions for various use cases."
      >
        <div className="flex gap-4 flex-wrap">
          <ModusButton
            onButtonClick={() => {
              topModalRef.current?.openModal();
            }}
          >
            Top Position
          </ModusButton>
          <ModusButton
            onButtonClick={() => {
              bottomModalRef.current?.openModal();
            }}
          >
            Bottom Position
          </ModusButton>
        </div>

        <ModusModal
          ref={topModalRef}
          modalId="modal-top"
          ariaLabel="Top positioned modal"
          onClose={() => {}}
          position="top"
          header={
            <div className="text-xl font-semibold text-foreground">
              Top Modal
            </div>
          }
          footer={
            <div className="flex gap-2">
              <ModusButton
                variant="borderless"
                onButtonClick={() => {
                  topModalRef.current?.closeModal();
                }}
              >
                Cancel
              </ModusButton>
              <ModusButton
                onButtonClick={() => {
                  topModalRef.current?.closeModal();
                }}
              >
                Confirm
              </ModusButton>
            </div>
          }
        >
          <div className="text-sm text-foreground opacity-80">
            This modal appears at the top of the screen. Useful for
            notifications or quick actions.
          </div>
        </ModusModal>

        <ModusModal
          ref={bottomModalRef}
          modalId="modal-bottom"
          ariaLabel="Bottom positioned modal"
          onClose={() => {}}
          position="bottom"
          header={
            <div className="text-xl font-semibold text-foreground">
              Bottom Modal
            </div>
          }
          footer={
            <div className="flex gap-2">
              <ModusButton
                variant="borderless"
                onButtonClick={() => {
                  bottomModalRef.current?.closeModal();
                }}
              >
                Cancel
              </ModusButton>
              <ModusButton
                onButtonClick={() => {
                  bottomModalRef.current?.closeModal();
                }}
              >
                Confirm
              </ModusButton>
            </div>
          }
        >
          <div className="text-sm text-foreground opacity-80">
            This modal appears at the bottom of the screen. Great for mobile
            interfaces.
          </div>
        </ModusModal>
      </DemoExample>

      <DemoExample
        title="Fullscreen Modal"
        description="Full-screen modals for complex workflows or detailed content."
      >
        <div className="space-y-4">
          <ModusButton
            onButtonClick={() => {
              fullscreenModalRef.current?.openModal();
            }}
          >
            Open Fullscreen Modal
          </ModusButton>
          <ModusModal
            ref={fullscreenModalRef}
            modalId="modal-fullscreen"
            ariaLabel="Fullscreen modal"
            onClose={() => {}}
            fullscreen={true}
            showFullscreenToggle={true}
            header={
              <div className="text-xl font-semibold text-foreground">
                Fullscreen Modal
              </div>
            }
            footer={
              <div className="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => {
                    fullscreenModalRef.current?.closeModal();
                  }}
                >
                  Cancel
                </ModusButton>
                <ModusButton
                  onButtonClick={() => {
                    fullscreenModalRef.current?.closeModal();
                  }}
                >
                  Save Changes
                </ModusButton>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="text-sm text-foreground opacity-80">
                This is a fullscreen modal that covers the entire viewport.
                Perfect for complex forms or detailed content.
              </div>
              <div className="text-sm text-foreground opacity-80">
                You can toggle between fullscreen and normal size using the
                button in the header.
              </div>
            </div>
          </ModusModal>
        </div>
      </DemoExample>

      <DemoExample
        title="Static Backdrop"
        description="Modal that doesn't close when clicking outside - user must use explicit actions."
      >
        <div className="space-y-4">
          <ModusButton
            onButtonClick={() => {
              staticModalRef.current?.openModal();
            }}
          >
            Open Static Modal
          </ModusButton>
          <ModusModal
            ref={staticModalRef}
            modalId="modal-static"
            ariaLabel="Static backdrop modal"
            onClose={() => {}}
            backdrop="static"
            header={
              <div className="text-xl font-semibold text-foreground">
                Important Action
              </div>
            }
            footer={
              <div className="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => {
                    staticModalRef.current?.closeModal();
                  }}
                >
                  Cancel
                </ModusButton>
                <ModusButton
                  color="danger"
                  onButtonClick={() => {
                    staticModalRef.current?.closeModal();
                  }}
                >
                  Delete Forever
                </ModusButton>
              </div>
            }
          >
            <div className="text-sm text-foreground opacity-80">
              This modal has a static backdrop. Clicking outside won&apos;t
              close it - you must use the buttons or press Escape.
            </div>
          </ModusModal>
        </div>
      </DemoExample>

      <DemoExample
        title="Custom Styling"
        description="Modal with custom dimensions and styling."
      >
        <div className="space-y-4">
          <ModusButton
            onButtonClick={() => {
              customModalRef.current?.openModal();
            }}
          >
            Open Custom Modal
          </ModusButton>
          <ModusModal
            ref={customModalRef}
            modalId="modal-custom"
            ariaLabel="Custom styled modal"
            onClose={() => {}}
            customClass="expanded-modal"
            header={
              <div className="text-xl font-semibold text-foreground">
                Custom Size Modal
              </div>
            }
            footer={
              <div className="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => {
                    customModalRef.current?.closeModal();
                  }}
                >
                  Cancel
                </ModusButton>
                <ModusButton
                  onButtonClick={() => {
                    customModalRef.current?.closeModal();
                  }}
                >
                  Save
                </ModusButton>
              </div>
            }
          >
            <div className="text-sm text-foreground opacity-80">
              This modal has custom dimensions applied via CSS classes. The
              modal is wider and taller than the default.
            </div>
          </ModusModal>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
