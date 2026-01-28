# Modus Web Components - Angular 20 Wrappers

This directory contains Angular 20 standalone wrapper components for Modus Web Components. Each component is in its own file for better DX and AI-assisted coding.

## Setup

1. **Package Installation**: The `@trimble-oss/moduswebcomponents-angular@1.0.1-ng19` package is installed (works with Angular 20)
2. **Initialization**: The Modus Web Components are initialized in `app.config.ts` using `APP_INITIALIZER` to define custom elements on app startup

## Creating a New Wrapper Component

Follow this pattern to create additional wrapper components using the Stencil-generated Angular components:

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModusWc[ComponentName] } from '@trimble-oss/moduswebcomponents-angular';

@Component({
  selector: 'modus-[component-name]',
  standalone: true,
  imports: [ModusWc[ComponentName]],
  template: `
    <modus-wc-[component-name]
      [prop1]="prop1"
      [prop2]="prop2"
      (eventName)="onEventName($event)"
    >
      <ng-content></ng-content>
    </modus-wc-[component-name]>
  `,
})
export class Modus[ComponentName]Component {
  @Input() prop1: string = 'default';
  @Input() prop2?: boolean = false;
  
  @Output() eventName = new EventEmitter<EventType>();
  
  onEventName(event: CustomEvent<EventType>): void {
    this.eventName.emit(event.detail);
  }
}
```

## Key Points

1. **Standalone Components**: All wrappers are standalone Angular components
2. **Import Angular Components**: Import the Stencil-generated Angular component (e.g., `ModusWcButton`) from `@trimble-oss/moduswebcomponents-angular` and add it to the `imports` array
3. **No CUSTOM_ELEMENTS_SCHEMA**: Not needed since we're using Angular components, not custom elements directly
4. **Event Handling**: Angular components emit `CustomEvent`, so extract `event.detail` before emitting
5. **Content Projection**: Use `<ng-content>` for component content
6. **Export**: Add exports to `index.ts` for easy importing
7. **Available Components**: All components from `@trimble-oss/moduswebcomponents-angular` can be imported (ModusWcButton, ModusWcModal, ModusWcTable, etc.)

## Usage Example

```typescript
import { ModusButtonComponent } from './components';

@Component({
  selector: 'app-root',
  imports: [ModusButtonComponent],
  template: `
    <modus-button 
      color="primary" 
      size="md"
      (buttonClick)="onClick($event)">
      Click Me!
    </modus-button>
  `,
})
export class App {
  onClick(event: MouseEvent | KeyboardEvent): void {
    console.log('Clicked!', event);
  }
}
```

