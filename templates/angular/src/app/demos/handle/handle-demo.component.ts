import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from '../shared/demo-page.component';
import { DemoExampleComponent } from '../shared/demo-example.component';
import { ModusHandleComponent } from '../../components/modus-handle.component';

/**
 * Demo page showcasing the Modus Handle component.
 */
@Component({
  selector: 'app-handle-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusHandleComponent],
  template: `
    <demo-page
      title="Modus Handle"
      description="Handle is a draggable component for resizing adjacent elements. It supports both bar and button styles, horizontal and vertical orientations, and keyboard navigation."
    >
      <demo-example title="Horizontal Bar Handle" description="Drag the handle to resize panels.">
        <div class="flex h-64 border-default rounded-lg overflow-hidden">
          <div id="h-left-panel-1" class="bg-card p-4 min-w-24 w-[200px]">
            <div class="text-sm font-medium text-foreground">Left Panel</div>
            <div class="text-xs text-muted-foreground mt-2">Drag the handle to resize</div>
          </div>
          <modus-handle
            orientation="horizontal"
            leftTarget="#h-left-panel-1"
            rightTarget="#h-right-panel-1"
          />
          <div id="h-right-panel-1" class="bg-muted p-4 flex-1 min-w-24">
            <div class="text-sm font-medium text-foreground">Right Panel</div>
            <div class="text-xs text-muted-foreground mt-2">This panel resizes automatically</div>
          </div>
        </div>
      </demo-example>

      <demo-example title="Vertical Bar Handle" description="Resize panels vertically by dragging up or down.">
        <div class="flex flex-col h-80 border-default rounded-lg overflow-hidden">
          <div id="v-top-panel-1" class="bg-card p-4 min-h-16 h-[120px]">
            <div class="text-sm font-medium text-foreground">Top Panel</div>
            <div class="text-xs text-muted-foreground mt-2">
              Drag the handle below to resize
            </div>
          </div>
          <modus-handle
            orientation="vertical"
            leftTarget="#v-top-panel-1"
            rightTarget="#v-bottom-panel-1"
          />
          <div id="v-bottom-panel-1" class="bg-muted p-4 flex-1 min-h-16">
            <div class="text-sm font-medium text-foreground">Bottom Panel</div>
            <div class="text-xs text-muted-foreground mt-2">This panel resizes automatically</div>
          </div>
        </div>
      </demo-example>

      <demo-example title="Button Type Handle" description="Button-style handle with a drag icon.">
        <div class="flex h-64 border-default rounded-lg overflow-hidden">
          <div id="btn-left-panel" class="bg-card p-4 min-w-24 w-[200px]">
            <div class="text-sm font-medium text-foreground">Panel A</div>
            <div class="text-xs text-muted-foreground mt-2">Button handle style</div>
          </div>
          <modus-handle
            type="button"
            orientation="horizontal"
            buttonColor="primary"
            buttonVariant="outlined"
            leftTarget="#btn-left-panel"
            rightTarget="#btn-right-panel"
          />
          <div id="btn-right-panel" class="bg-muted p-4 flex-1 min-w-24">
            <div class="text-sm font-medium text-foreground">Panel B</div>
            <div class="text-xs text-muted-foreground mt-2">Click and drag the button</div>
          </div>
        </div>
      </demo-example>

      <demo-example title="Button Handle Variants" description="Different button colors and styles.">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex h-48 border-default rounded-lg overflow-hidden">
            <div id="btn-var-left-1" class="bg-card p-4 min-w-20 w-[120px]">
              <div class="text-xs font-medium text-foreground">Primary Filled</div>
            </div>
            <modus-handle
              type="button"
              orientation="horizontal"
              buttonColor="primary"
              buttonVariant="filled"
              leftTarget="#btn-var-left-1"
              rightTarget="#btn-var-right-1"
            />
            <div id="btn-var-right-1" class="bg-muted p-4 flex-1 min-w-20">
              <div class="text-xs text-muted-foreground">Resize me</div>
            </div>
          </div>
          <div class="flex h-48 border-default rounded-lg overflow-hidden">
            <div id="btn-var-left-2" class="bg-card p-4 min-w-20 w-[120px]">
              <div class="text-xs font-medium text-foreground">Secondary Outlined</div>
            </div>
            <modus-handle
              type="button"
              orientation="horizontal"
              buttonColor="secondary"
              buttonVariant="outlined"
              leftTarget="#btn-var-left-2"
              rightTarget="#btn-var-right-2"
            />
            <div id="btn-var-right-2" class="bg-muted p-4 flex-1 min-w-20">
              <div class="text-xs text-muted-foreground">Resize me</div>
            </div>
          </div>
          <div class="flex h-48 border-default rounded-lg overflow-hidden">
            <div id="btn-var-left-3" class="bg-card p-4 min-w-20 w-[120px]">
              <div class="text-xs font-medium text-foreground">Tertiary Borderless</div>
            </div>
            <modus-handle
              type="button"
              orientation="horizontal"
              buttonColor="tertiary"
              buttonVariant="borderless"
              leftTarget="#btn-var-left-3"
              rightTarget="#btn-var-right-3"
            />
            <div id="btn-var-right-3" class="bg-muted p-4 flex-1 min-w-20">
              <div class="text-xs text-muted-foreground">Resize me</div>
            </div>
          </div>
          <div class="flex h-48 border-default rounded-lg overflow-hidden">
            <div id="btn-var-left-4" class="bg-card p-4 min-w-20 w-[120px]">
              <div class="text-xs font-medium text-foreground">Warning Filled</div>
            </div>
            <modus-handle
              type="button"
              orientation="horizontal"
              buttonColor="warning"
              buttonVariant="filled"
              leftTarget="#btn-var-left-4"
              rightTarget="#btn-var-right-4"
            />
            <div id="btn-var-right-4" class="bg-muted p-4 flex-1 min-w-20">
              <div class="text-xs text-muted-foreground">Resize me</div>
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example title="Handle Sizes" description="Different bar sizes for the handle component.">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex h-40 border-default rounded-lg overflow-hidden">
            <div id="size-left-1" class="bg-card p-4 min-w-20 w-[100px]">
              <div class="text-xs font-medium text-foreground">Default</div>
            </div>
            <modus-handle
              size="default"
              orientation="horizontal"
              leftTarget="#size-left-1"
              rightTarget="#size-right-1"
            />
            <div id="size-right-1" class="bg-muted p-4 flex-1 min-w-20"></div>
          </div>
          <div class="flex h-40 border-default rounded-lg overflow-hidden">
            <div id="size-left-2" class="bg-card p-4 min-w-20 w-[100px]">
              <div class="text-xs font-medium text-foreground">Large</div>
            </div>
            <modus-handle
              size="lg"
              orientation="horizontal"
              leftTarget="#size-left-2"
              rightTarget="#size-right-2"
            />
            <div id="size-right-2" class="bg-muted p-4 flex-1 min-w-20"></div>
          </div>
          <div class="flex h-40 border-default rounded-lg overflow-hidden">
            <div id="size-left-3" class="bg-card p-4 min-w-20 w-[100px]">
              <div class="text-xs font-medium text-foreground">Extra Large</div>
            </div>
            <modus-handle
              size="xl"
              orientation="horizontal"
              leftTarget="#size-left-3"
              rightTarget="#size-right-3"
            />
            <div id="size-right-3" class="bg-muted p-4 flex-1 min-w-20"></div>
          </div>
          <div class="flex h-40 border-default rounded-lg overflow-hidden">
            <div id="size-left-4" class="bg-card p-4 min-w-20 w-[100px]">
              <div class="text-xs font-medium text-foreground">2X Large</div>
            </div>
            <modus-handle
              size="2xl"
              orientation="horizontal"
              leftTarget="#size-left-4"
              rightTarget="#size-right-4"
            />
            <div id="size-right-4" class="bg-muted p-4 flex-1 min-w-20"></div>
          </div>
        </div>
      </demo-example>

      <demo-example title="Custom Default Split" description="Set the initial split percentage for panels.">
        <div class="flex flex-col gap-4">
          <div class="text-sm text-muted-foreground">30/70 Split</div>
          <div class="flex h-48 border-default rounded-lg overflow-hidden">
            <div id="split-left-1" class="bg-card p-4 min-w-20">
              <div class="text-xs font-medium text-foreground">30%</div>
            </div>
            <modus-handle
              orientation="horizontal"
              [defaultSplit]="30"
              leftTarget="#split-left-1"
              rightTarget="#split-right-1"
            />
            <div id="split-right-1" class="bg-muted p-4 flex-1 min-w-20">
              <div class="text-xs font-medium text-foreground">70%</div>
            </div>
          </div>
          <div class="text-sm text-muted-foreground">70/30 Split</div>
          <div class="flex h-48 border-default rounded-lg overflow-hidden">
            <div id="split-left-2" class="bg-card p-4 min-w-20">
              <div class="text-xs font-medium text-foreground">70%</div>
            </div>
            <modus-handle
              orientation="horizontal"
              [defaultSplit]="70"
              leftTarget="#split-left-2"
              rightTarget="#split-right-2"
            />
            <div id="split-right-2" class="bg-muted p-4 flex-1 min-w-20">
              <div class="text-xs font-medium text-foreground">30%</div>
            </div>
          </div>
        </div>
      </demo-example>

      <demo-example title="Keyboard Navigation" description="Handle supports keyboard navigation.">
        <div class="flex flex-col gap-4">
          <div class="p-4 bg-muted rounded-lg">
            <div class="text-sm font-medium text-foreground mb-2">Keyboard Controls:</div>
            <div class="text-xs text-muted-foreground space-y-1">
              <div>Arrow Keys: Move handle 5px per press</div>
              <div>Shift + Arrow Keys: Move handle 15px per press</div>
              <div>Tab: Focus the handle element</div>
            </div>
          </div>
          <div class="flex h-48 border-default rounded-lg overflow-hidden">
            <div id="kb-left" class="bg-card p-4 min-w-24 w-[200px]">
              <div class="text-sm font-medium text-foreground">Focus Here</div>
              <div class="text-xs text-muted-foreground mt-2">Tab to handle, use arrow keys</div>
            </div>
            <modus-handle
              orientation="horizontal"
              leftTarget="#kb-left"
              rightTarget="#kb-right"
              ariaLabel="Resize panels using arrow keys"
            />
            <div id="kb-right" class="bg-muted p-4 flex-1 min-w-24">
              <div class="text-sm font-medium text-foreground">Right Panel</div>
            </div>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class HandleDemoPageComponent {}
