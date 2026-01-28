import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-components-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4 text-foreground">Components</h1>
      <p class="text-foreground">Component library documentation and examples</p>
    </div>
  `,
})
export class ComponentsPageComponent {}

