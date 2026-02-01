"use client";

import { useState } from "react";
import DemoExample from "../../components/DemoExample";
import DemoPage from "../../components/DemoPage";
import ModusChip from "../../components/ModusChip";
import ModusButton from "../../components/ModusButton";

interface Tag {
  id: string;
  label: string;
}

export default function ChipDemoPage() {
  // Removable tags demo state
  const [activeTags, setActiveTags] = useState<Tag[]>([
    { id: "urgent", label: "Urgent" },
    { id: "review", label: "Needs Review" },
    { id: "approved", label: "Approved" },
    { id: "archived", label: "Archived" },
  ]);
  const [removedTags, setRemovedTags] = useState<Tag[]>([]);

  const removeTag = (tagId: string) => {
    const tag = activeTags.find((t) => t.id === tagId);
    if (tag) {
      setActiveTags((tags) => tags.filter((t) => t.id !== tagId));
      setRemovedTags((tags) => [...tags, tag]);
    }
  };

  const restoreTags = () => {
    setActiveTags((tags) => [...tags, ...removedTags]);
    setRemovedTags([]);
  };

  return (
    <DemoPage
      title="Modus Chip"
      description="Compact visual elements for tags, selections, or status pills. Chips support filled/outline variants, three sizes, active/error/disabled states, and optional remove buttons."
    >
      <DemoExample
        title="Removable Tags"
        description="Chips with remove buttons for deletable items like tags, filters, or selections."
      >
        <div className="p-6 rounded-lg bg-card border-default">
          <div className="text-base font-semibold mb-2 text-foreground">
            Applied Tags
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            Click the X to remove tags
          </div>
          {activeTags.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {activeTags.map((tag) => (
                <ModusChip
                  key={tag.id}
                  label={tag.label}
                  showRemove
                  onChipRemove={() => removeTag(tag.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground italic">
              No tags applied
            </div>
          )}
          {removedTags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-default flex items-center gap-3">
              <div className="text-sm text-muted-foreground">Removed:</div>
              {removedTags.map((tag) => (
                <ModusChip key={tag.id} label={tag.label} disabled size="sm" />
              ))}
              <ModusButton
                color="primary"
                variant="borderless"
                size="sm"
                onButtonClick={restoreTags}
                className="ml-2"
              >
                Restore all
              </ModusButton>
            </div>
          )}
        </div>
      </DemoExample>

      <DemoExample
        title="Chip Variants"
        description="Two visual styles: filled (solid background) and outline (transparent with border)."
      >
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-sm font-medium mb-3 text-muted-foreground">
              Filled (Default)
            </div>
            <div className="flex flex-wrap gap-3">
              <ModusChip label="Default" variant="filled" />
              <ModusChip label="Active" variant="filled" active />
              <ModusChip label="Removable" variant="filled" showRemove />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-3 text-muted-foreground">
              Outline
            </div>
            <div className="flex flex-wrap gap-3">
              <ModusChip label="Default" variant="outline" />
              <ModusChip label="Active" variant="outline" active />
              <ModusChip label="Removable" variant="outline" showRemove />
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Chip Sizes"
        description="Three size options: sm (20px), md (24px), and lg (28px) for different contexts."
      >
        <div className="flex flex-wrap items-center gap-4">
          <ModusChip label="Small" size="sm" />
          <ModusChip label="Medium" size="md" />
          <ModusChip label="Large" size="lg" />
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <ModusChip label="Small" size="sm" variant="outline" active />
          <ModusChip label="Medium" size="md" variant="outline" active />
          <ModusChip label="Large" size="lg" variant="outline" active />
        </div>
      </DemoExample>

      <DemoExample
        title="States"
        description="Active state for selections, disabled state for unavailable options, and error state for validation."
      >
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-sm font-medium mb-3 text-muted-foreground">
              Active State
            </div>
            <div className="flex flex-wrap gap-3">
              <ModusChip label="Selected" active />
              <ModusChip label="Pressed" active variant="outline" />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-3 text-muted-foreground">
              Disabled State
            </div>
            <div className="flex flex-wrap gap-3">
              <ModusChip label="Disabled" disabled />
              <ModusChip label="Disabled Outline" disabled variant="outline" />
              <ModusChip label="Disabled Active" disabled active />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-3 text-muted-foreground">
              Error State
            </div>
            <div className="flex flex-wrap gap-3">
              <ModusChip label="Invalid" hasError />
              <ModusChip label="Error" hasError variant="outline" />
              <ModusChip label="Remove Error" hasError showRemove />
            </div>
          </div>
        </div>
      </DemoExample>

      <DemoExample
        title="Status Pills"
        description="Use chips as status indicators with appropriate styling."
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-muted-foreground">
              Order Status:
            </div>
            <ModusChip label="Pending" variant="outline" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-muted-foreground">Active:</div>
            <ModusChip label="In Progress" active />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-muted-foreground">Completed:</div>
            <ModusChip label="Done" variant="filled" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm text-muted-foreground">Error:</div>
            <ModusChip label="Failed" hasError />
          </div>
        </div>
      </DemoExample>
    </DemoPage>
  );
}
