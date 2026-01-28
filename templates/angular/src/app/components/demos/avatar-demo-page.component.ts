import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusAvatarComponent } from '../modus-avatar.component';

/**
 * Demo page showcasing the Modus Avatar component.
 *
 * Demonstrates avatar features including:
 * - Different sizes (xs, sm, md, lg)
 * - Shapes (circle, square)
 * - With and without image sources
 * - Fallback behavior demonstration
 * - Custom styling examples
 */
@Component({
  selector: 'app-avatar-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusAvatarComponent],
  template: `
    <demo-page
      title="Modus Avatar"
      description="Avatars represent users or entities in the interface. Use avatars to personalize user experiences and provide visual identity."
    >
      <demo-example
        title="Avatar Sizes"
        description="Different sizes for various contexts and display needs."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <modus-avatar alt="Extra Small Avatar" size="xs" initials="X S" />
            <span class="text-xs text-muted-foreground">Extra Small (xs)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-avatar alt="Small Avatar" size="sm" initials="SM" />
            <span class="text-xs text-muted-foreground">Small (sm)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-avatar alt="Medium Avatar" size="md" initials="MD" />
            <span class="text-xs text-muted-foreground">Medium (md)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-avatar alt="Large Avatar" size="lg" initials="LG" />
            <span class="text-xs text-muted-foreground">Large (lg)</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Avatar Shapes"
        description="Circle and square shapes for different design styles."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <modus-avatar alt="Circle Avatar" shape="circle" initials="C" size="md" />
            <span class="text-xs text-muted-foreground">Circle</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-avatar alt="Square Avatar" shape="square" initials="S" size="md" />
            <span class="text-xs text-muted-foreground">Square</span>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Avatars with Images"
        description="Avatars displaying user profile images."
      >
        <div class="flex flex-wrap items-center gap-6">
          <modus-avatar
            alt="User Avatar"
            imgSrc="https://i.pravatar.cc/150?img=1"
            size="md"
            shape="circle"
          />
          <modus-avatar
            alt="User Avatar"
            imgSrc="https://i.pravatar.cc/150?img=2"
            size="md"
            shape="circle"
          />
          <modus-avatar
            alt="User Avatar"
            imgSrc="https://i.pravatar.cc/150?img=3"
            size="md"
            shape="circle"
          />
        </div>
      </demo-example>

      <demo-example
        title="Avatars with Initials"
        description="Avatars displaying user initials when no image is available."
      >
        <div class="flex flex-wrap items-center gap-6">
          <modus-avatar alt="John Doe" initials="J D" size="md" shape="circle" />
          <modus-avatar alt="Jane Smith" initials="J S" size="md" shape="circle" />
          <modus-avatar alt="Bob Johnson" initials="B J" size="md" shape="circle" />
          <modus-avatar alt="Alice Brown" initials="A B" size="md" shape="circle" />
        </div>
      </demo-example>

      <demo-example
        title="Fallback Behavior"
        description="Avatars automatically fall back to initials when image fails to load."
      >
        <div class="flex flex-wrap items-center gap-6">
          <modus-avatar
            alt="User Avatar"
            imgSrc="https://invalid-url.com/image.jpg"
            initials="F B"
            size="md"
            shape="circle"
          />
          <div class="text-sm text-muted-foreground">
            <div class="font-semibold mb-1">Fallback to Initials</div>
            <div>When an image fails to load, the avatar automatically displays initials.</div>
          </div>
        </div>
      </demo-example>

      <demo-example
        title="Size Comparison"
        description="Visual comparison of all avatar sizes side by side."
      >
        <div class="flex flex-wrap items-end gap-8">
          <div class="flex flex-col items-center gap-2">
            <modus-avatar alt="XS Avatar" size="xs" initials="XS" shape="circle" />
            <span class="text-xs text-muted-foreground">xs</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-avatar alt="SM Avatar" size="sm" initials="SM" shape="circle" />
            <span class="text-xs text-muted-foreground">sm</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-avatar alt="MD Avatar" size="md" initials="MD" shape="circle" />
            <span class="text-xs text-muted-foreground">md</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <modus-avatar alt="LG Avatar" size="lg" initials="LG" shape="circle" />
            <span class="text-xs text-muted-foreground">lg</span>
          </div>
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class AvatarDemoPageComponent {}
