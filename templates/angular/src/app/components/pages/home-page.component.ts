import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4 text-foreground">Home</h1>
      <p class="text-foreground">Welcome to the Modus Angular Application</p>
    </div>
  `,
})
export class HomePageComponent {}
