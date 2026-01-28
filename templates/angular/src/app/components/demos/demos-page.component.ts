import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Landing page for component demos.
 *
 * Provides a navigation hub listing all available Modus component demos
 * organized by category with brief descriptions.
 */
@Component({
  selector: 'app-demos-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex flex-col gap-6 p-6">
      <div class="flex flex-col gap-2">
        <div class="text-3xl font-semibold text-foreground">Component Demos</div>
        <div class="text-base text-foreground-80">
          Interactive examples showcasing Modus Web Components in Angular
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Layout Components -->
        <div class="flex flex-col gap-3">
          <h2 class="text-xl font-semibold text-foreground">Layout</h2>
          <a
            routerLink="/demos/card"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Card</div>
            <div class="text-sm text-muted-foreground">
              Flexible container for grouping related content with optional header and footer slots
            </div>
          </a>
          <a
            routerLink="/demos/accordion"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Accordion</div>
            <div class="text-sm text-muted-foreground">
              Collapsible panels for organizing and displaying content in a compact space
            </div>
          </a>
        </div>

        <!-- Navigation Components -->
        <div class="flex flex-col gap-3">
          <h2 class="text-xl font-semibold text-foreground">Navigation</h2>
          <a
            routerLink="/demos/breadcrumbs"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Breadcrumbs</div>
            <div class="text-sm text-muted-foreground">
              Hierarchical navigation path showing the current location within the application
            </div>
          </a>
          <a
            routerLink="/demos/dropdown"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Dropdown Menu</div>
            <div class="text-sm text-muted-foreground">
              Compact menu that opens on demand to display multiple actions or options
            </div>
          </a>
          <a
            routerLink="/demos/menu"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Menu</div>
            <div class="text-sm text-muted-foreground">
              Navigation and action lists for organizing related items in a consistent way
            </div>
          </a>
          <a
            routerLink="/demos/navbar"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Navbar</div>
            <div class="text-sm text-muted-foreground">
              Top-level navigation bar with user profile, search, and application-wide controls
            </div>
          </a>
          <a
            routerLink="/demos/side-navigation"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Side Navigation</div>
            <div class="text-sm text-muted-foreground">
              Collapsible vertical navigation with icons that remain visible when collapsed
            </div>
          </a>
        </div>

        <!-- Form Components -->
        <div class="flex flex-col gap-3">
          <h2 class="text-xl font-semibold text-foreground">Form</h2>
          <a
            routerLink="/demos/autocomplete"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Autocomplete</div>
            <div class="text-sm text-muted-foreground">
              Input field with dropdown suggestions for quick selection
            </div>
          </a>
          <a
            routerLink="/demos/checkbox"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Checkbox</div>
            <div class="text-sm text-muted-foreground">
              Selection control for enabling or disabling options in forms
            </div>
          </a>
          <a
            routerLink="/demos/date"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Date</div>
            <div class="text-sm text-muted-foreground">
              Date input with calendar picker for selecting dates
            </div>
          </a>
          <a
            routerLink="/demos/input-feedback"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Input Feedback</div>
            <div class="text-sm text-muted-foreground">
              Validation messages and guidance for form inputs to communicate state and information
            </div>
          </a>
          <a
            routerLink="/demos/input-label"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Input Label</div>
            <div class="text-sm text-muted-foreground">
              Clear identification labels for form controls to improve accessibility and usability
            </div>
          </a>
          <a
            routerLink="/demos/number-input"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Number Input</div>
            <div class="text-sm text-muted-foreground">
              Controlled input for entering numeric values with min, max, and step validation
            </div>
          </a>
          <a
            routerLink="/demos/radio"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Radio</div>
            <div class="text-sm text-muted-foreground">
              Selection control for choosing a single option from a group of related options
            </div>
          </a>
          <a
            routerLink="/demos/select"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Select</div>
            <div class="text-sm text-muted-foreground">
              Dropdown menu for choosing from a list of options when space is limited
            </div>
          </a>
          <a
            routerLink="/demos/switch"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Switch</div>
            <div class="text-sm text-muted-foreground">
              Toggle control for binary on/off states like enabling features or settings
            </div>
          </a>
          <a
            routerLink="/demos/text-input"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Text Input</div>
            <div class="text-sm text-muted-foreground">
              Single-line text input for names, emails, passwords, and other text-based form data
            </div>
          </a>
          <a
            routerLink="/demos/textarea"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Textarea</div>
            <div class="text-sm text-muted-foreground">
              Multi-line text input for longer content like comments, descriptions, or messages
            </div>
          </a>
          <a
            routerLink="/demos/time-input"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Time Input</div>
            <div class="text-sm text-muted-foreground">
              Time selection input for scheduling appointments or selecting specific times
            </div>
          </a>
        </div>

        <!-- Feedback Components -->
        <div class="flex flex-col gap-3">
          <h2 class="text-xl font-semibold text-foreground">Feedback</h2>
          <a
            routerLink="/demos/alert"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Alert</div>
            <div class="text-sm text-muted-foreground">
              Messages for notifying users about important information or actions
            </div>
          </a>
          <a
            routerLink="/demos/loader"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Loader</div>
            <div class="text-sm text-muted-foreground">
              Indicators showing that an action is in progress during asynchronous operations
            </div>
          </a>
          <a
            routerLink="/demos/modal"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Modal</div>
            <div class="text-sm text-muted-foreground">
              Overlay dialogs for focused interactions like confirmations, forms, or detailed views
            </div>
          </a>
          <a
            routerLink="/demos/progress"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Progress</div>
            <div class="text-sm text-muted-foreground">
              Progress bars indicating the completion status of a task or process
            </div>
          </a>
        </div>

        <!-- Display Components -->
        <div class="flex flex-col gap-3">
          <h2 class="text-xl font-semibold text-foreground">Display</h2>
          <a
            routerLink="/demos/avatar"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Avatar</div>
            <div class="text-sm text-muted-foreground">
              User profile images or initials displayed in circular or square shapes
            </div>
          </a>
          <a
            routerLink="/demos/badge"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Badge</div>
            <div class="text-sm text-muted-foreground">
              Small status indicators, labels, or counters for notifications and states
            </div>
          </a>
          <a
            routerLink="/demos/chip"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Chip</div>
            <div class="text-sm text-muted-foreground">
              Compact elements for displaying selections, filters, or tags
            </div>
          </a>
          <a
            routerLink="/demos/divider"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Divider</div>
            <div class="text-sm text-muted-foreground">
              Separator elements for organizing content into clear sections
            </div>
          </a>
          <a
            routerLink="/demos/icon"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Icon</div>
            <div class="text-sm text-muted-foreground">
              Visual communication symbols to enhance user understanding and improve usability
            </div>
          </a>
          <a
            routerLink="/demos/pagination"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Pagination</div>
            <div class="text-sm text-muted-foreground">
              Navigation controls for navigating through multiple pages of content
            </div>
          </a>
          <a
            routerLink="/demos/rating"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Rating</div>
            <div class="text-sm text-muted-foreground">
              Visual rating system for collecting user feedback through stars or smileys
            </div>
          </a>
          <a
            routerLink="/demos/skeleton"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Skeleton</div>
            <div class="text-sm text-muted-foreground">
              Loading placeholders that mimic content shape to improve perceived performance
            </div>
          </a>
          <a
            routerLink="/demos/slider"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Slider</div>
            <div class="text-sm text-muted-foreground">
              Range input for selecting numeric values by dragging along a track
            </div>
          </a>
          <a
            routerLink="/demos/stepper"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Stepper</div>
            <div class="text-sm text-muted-foreground">
              Visual indicator showing progress through a multi-step process or workflow
            </div>
          </a>
          <a
            routerLink="/demos/tooltip"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Tooltip</div>
            <div class="text-sm text-muted-foreground">
              Contextual information displayed on hover or focus to provide helpful hints
            </div>
          </a>
        </div>

        <!-- Actions -->
        <div class="flex flex-col gap-3">
          <h2 class="text-xl font-semibold text-foreground">Actions</h2>
          <a
            routerLink="/button-demo"
            class="p-4 rounded-lg bg-card border-default hover:bg-muted transition-colors"
          >
            <div class="text-lg font-medium text-card-foreground mb-1">Button</div>
            <div class="text-sm text-muted-foreground">
              Interactive elements for triggering actions and providing clear call-to-action
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
})
export class DemosPageComponent {}
