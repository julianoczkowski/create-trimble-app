import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusButton from "../../components/ModusButton";
import ModusModal, { type ModusModalRef } from "../../components/ModusModal";

export default function ModalDemoPage() {
  let centeredModalRef: ModusModalRef | undefined;
  let topModalRef: ModusModalRef | undefined;
  let bottomModalRef: ModusModalRef | undefined;
  let fullscreenModalRef: ModusModalRef | undefined;
  let staticModalRef: ModusModalRef | undefined;
  let customModalRef: ModusModalRef | undefined;

  return (
    <DemoPage
      title="Modus Modal"
      description="Modals focus attention on a short, interruptive task. Keep content concise and provide a clear primary action."
    >
      <DemoExample
        title="Centered Dialog"
        description="Default centered modal for quick confirmations or lightweight forms."
      >
        <div class="space-y-4">
          <ModusButton
            onButtonClick={() => {
              centeredModalRef?.openModal();
            }}
          >
            Open Centered Modal
          </ModusButton>
          <ModusModal
            ref={(h) => { centeredModalRef = h; }}
            modalId="modal-centered"
            ariaLabel="Archive project"
            onClose={() => {}}
            header={
              <div class="text-xl font-semibold text-foreground">
                Archive project
              </div>
            }
            footer={
              <div class="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => {
                    centeredModalRef?.closeModal();
                  }}
                >
                  Cancel
                </ModusButton>
                <ModusButton
                  color="danger"
                  onButtonClick={() => {
                    centeredModalRef?.closeModal();
                  }}
                >
                  Archive
                </ModusButton>
              </div>
            }
          >
            <div class="text-sm text-foreground opacity-80">
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
        <div class="flex gap-4 flex-wrap">
          <ModusButton
            onButtonClick={() => {
              topModalRef?.openModal();
            }}
          >
            Top Position
          </ModusButton>
          <ModusButton
            onButtonClick={() => {
              bottomModalRef?.openModal();
            }}
          >
            Bottom Position
          </ModusButton>
        </div>

        <ModusModal
          ref={(h) => { topModalRef = h; }}
          modalId="modal-top"
          ariaLabel="Top positioned modal"
          onClose={() => {}}
          position="top"
          header={
            <div class="text-xl font-semibold text-foreground">
              Top Modal
            </div>
          }
          footer={
            <div class="flex gap-2">
              <ModusButton
                variant="borderless"
                onButtonClick={() => {
                  topModalRef?.closeModal();
                }}
              >
                Cancel
              </ModusButton>
              <ModusButton
                onButtonClick={() => {
                  topModalRef?.closeModal();
                }}
              >
                Confirm
              </ModusButton>
            </div>
          }
        >
          <div class="text-sm text-foreground opacity-80">
            This modal appears at the top of the screen. Useful for
            notifications or quick actions.
          </div>
        </ModusModal>

        <ModusModal
          ref={(h) => { bottomModalRef = h; }}
          modalId="modal-bottom"
          ariaLabel="Bottom positioned modal"
          onClose={() => {}}
          position="bottom"
          header={
            <div class="text-xl font-semibold text-foreground">
              Bottom Modal
            </div>
          }
          footer={
            <div class="flex gap-2">
              <ModusButton
                variant="borderless"
                onButtonClick={() => {
                  bottomModalRef?.closeModal();
                }}
              >
                Cancel
              </ModusButton>
              <ModusButton
                onButtonClick={() => {
                  bottomModalRef?.closeModal();
                }}
              >
                Confirm
              </ModusButton>
            </div>
          }
        >
          <div class="text-sm text-foreground opacity-80">
            This modal appears at the bottom of the screen. Great for mobile
            interfaces.
          </div>
        </ModusModal>
      </DemoExample>

      <DemoExample
        title="Fullscreen Modal"
        description="Full-screen modals for complex workflows or detailed content."
      >
        <div class="space-y-4">
          <ModusButton
            onButtonClick={() => {
              fullscreenModalRef?.openModal();
            }}
          >
            Open Fullscreen Modal
          </ModusButton>
          <ModusModal
            ref={(h) => { fullscreenModalRef = h; }}
            modalId="modal-fullscreen"
            ariaLabel="Fullscreen modal"
            onClose={() => {}}
            fullscreen={true}
            showFullscreenToggle={true}
            header={
              <div class="text-xl font-semibold text-foreground">
                Fullscreen Modal
              </div>
            }
            footer={
              <div class="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => {
                    fullscreenModalRef?.closeModal();
                  }}
                >
                  Cancel
                </ModusButton>
                <ModusButton
                  onButtonClick={() => {
                    fullscreenModalRef?.closeModal();
                  }}
                >
                  Save Changes
                </ModusButton>
              </div>
            }
          >
            <div class="space-y-4">
              <div class="text-sm text-foreground opacity-80">
                This is a fullscreen modal that covers the entire viewport.
                Perfect for complex forms or detailed content.
              </div>
              <div class="text-sm text-foreground opacity-80">
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
        <div class="space-y-4">
          <ModusButton
            onButtonClick={() => {
              staticModalRef?.openModal();
            }}
          >
            Open Static Modal
          </ModusButton>
          <ModusModal
            ref={(h) => { staticModalRef = h; }}
            modalId="modal-static"
            ariaLabel="Static backdrop modal"
            onClose={() => {}}
            backdrop="static"
            header={
              <div class="text-xl font-semibold text-foreground">
                Important Action
              </div>
            }
            footer={
              <div class="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => {
                    staticModalRef?.closeModal();
                  }}
                >
                  Cancel
                </ModusButton>
                <ModusButton
                  color="danger"
                  onButtonClick={() => {
                    staticModalRef?.closeModal();
                  }}
                >
                  Delete Forever
                </ModusButton>
              </div>
            }
          >
            <div class="text-sm text-foreground opacity-80">
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
        <div class="space-y-4">
          <ModusButton
            onButtonClick={() => {
              customModalRef?.openModal();
            }}
          >
            Open Custom Modal
          </ModusButton>
          <ModusModal
            ref={(h) => { customModalRef = h; }}
            modalId="modal-custom"
            ariaLabel="Custom styled modal"
            onClose={() => {}}
            customClass="expanded-modal"
            header={
              <div class="text-xl font-semibold text-foreground">
                Custom Size Modal
              </div>
            }
            footer={
              <div class="flex gap-2">
                <ModusButton
                  variant="borderless"
                  onButtonClick={() => {
                    customModalRef?.closeModal();
                  }}
                >
                  Cancel
                </ModusButton>
                <ModusButton
                  onButtonClick={() => {
                    customModalRef?.closeModal();
                  }}
                >
                  Save
                </ModusButton>
              </div>
            }
          >
            <div class="text-sm text-foreground opacity-80">
              This modal has custom dimensions applied via CSS classes. The
              modal is wider and taller than the default.
            </div>
          </ModusModal>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
