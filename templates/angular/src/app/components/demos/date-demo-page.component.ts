import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageComponent } from './demo-page.component';
import { DemoExampleComponent } from './demo-example.component';
import { ModusDateComponent } from '../modus-date.component';

/**
 * Demo page showcasing the Modus Date component.
 *
 * Demonstrates date input features including:
 * - Basic date input
 * - Different sizes (sm, md, lg)
 * - Date formats
 * - Min and max date constraints
 * - Feedback messages
 * - Disabled and read-only states
 * - Required field
 */
@Component({
  selector: 'app-date-demo-page',
  standalone: true,
  imports: [CommonModule, DemoPageComponent, DemoExampleComponent, ModusDateComponent],
  template: `
    <demo-page
      title="Modus Date"
      description="Date inputs allow users to select dates from a calendar picker or enter dates manually. Use date inputs for birth dates, appointment scheduling, date ranges, and any scenario requiring date selection."
    >
      <demo-example
        title="Basic Date Input"
        description="Simple date input with label for date selection."
      >
        <div class="flex flex-col gap-4">
          <modus-date label="Select Date" [value]="selectedDate()" (inputChange)="handleDateChange($event)" />
          @if (selectedDate()) {
            <div class="mt-4 p-4 rounded-lg bg-muted text-muted-foreground">
              <div class="font-semibold mb-2">Selected Date:</div>
              <div class="text-sm">{{ selectedDate() }}</div>
            </div>
          }
        </div>
      </demo-example>

      <demo-example
        title="Date Sizes"
        description="Different sizes for various contexts and visual hierarchy."
      >
        <div class="flex flex-col gap-4">
          <modus-date label="Small Date Input" size="sm" />
          <modus-date label="Medium Date Input (Default)" size="md" />
          <modus-date label="Large Date Input" size="lg" />
        </div>
      </demo-example>

      <demo-example
        title="Date Formats"
        description="Different date format options for various locales and preferences."
      >
        <div class="flex flex-col gap-4">
          <modus-date label="YYYY-MM-DD Format" format="yyyy-mm-dd" />
          <modus-date label="DD-MM-YYYY Format" format="dd-mm-yyyy" />
          <modus-date label="YYYY/MM/DD Format" format="yyyy/mm/dd" />
          <modus-date label="DD/MM/YYYY Format" format="dd/mm/yyyy" />
          <modus-date label="MMM DD, YYYY Format" format="MMM DD, YYYY" />
        </div>
      </demo-example>

      <demo-example
        title="Date Constraints"
        description="Set minimum and maximum dates to restrict date selection."
      >
        <div class="flex flex-col gap-4">
          <modus-date
            label="Start Date (Min: Today)"
            [min]="minDate()"
            [value]="startDate()"
            (inputChange)="handleStartDateChange($event)"
          />
          <modus-date
            label="End Date (Max: 1 Year from Start)"
            [min]="startDate()"
            [max]="maxDate()"
            [value]="endDate()"
            (inputChange)="handleEndDateChange($event)"
          />
        </div>
      </demo-example>

      <demo-example
        title="Feedback Messages"
        description="Display validation feedback with different severity levels."
      >
        <div class="flex flex-col gap-4">
          <modus-date
            label="Date with Success Feedback"
            [feedback]="{
              level: 'success',
              message: 'Date is valid'
            }"
          />
          <modus-date
            label="Date with Warning Feedback"
            [feedback]="{
              level: 'warning',
              message: 'Please verify the date'
            }"
          />
          <modus-date
            label="Date with Error Feedback"
            [feedback]="{
              level: 'error',
              message: 'Invalid date format'
            }"
          />
          <modus-date
            label="Date with Info Feedback"
            [feedback]="{
              level: 'info',
              message: 'Select a date within the next 30 days'
            }"
          />
        </div>
      </demo-example>

      <demo-example
        title="Disabled and Read-Only States"
        description="Date inputs in disabled and read-only states."
      >
        <div class="flex flex-col gap-4">
          <modus-date label="Disabled Date Input" [disabled]="true" value="2024-01-15" />
          <modus-date label="Read-Only Date Input" [readOnly]="true" value="2024-06-20" />
        </div>
      </demo-example>

      <demo-example
        title="Required Field"
        description="Mark date inputs as required for form validation."
      >
        <div class="flex flex-col gap-4">
          <modus-date label="Birth Date (Required)" [required]="true" />
          <modus-date label="Appointment Date (Required)" [required]="true" />
        </div>
      </demo-example>

      <demo-example
        title="Bordered and Borderless"
        description="Date inputs with and without borders."
      >
        <div class="flex flex-col gap-4">
          <modus-date label="Bordered Date Input (Default)" [bordered]="true" />
          <modus-date label="Borderless Date Input" [bordered]="false" />
        </div>
      </demo-example>
    </demo-page>
  `,
})
export class DateDemoPageComponent {
  readonly selectedDate = signal<string>('');
  readonly startDate = signal<string>('');
  readonly endDate = signal<string>('');

  readonly minDate = signal<string>(this.getTodayDate());
  readonly maxDate = signal<string>(this.getOneYearFromNowDate());

  private getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  private getOneYearFromNowDate(): string {
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    return oneYearFromNow.toISOString().split('T')[0];
  }

  handleDateChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.selectedDate.set(target.value);
    console.log('Date changed:', target.value);
  }

  handleStartDateChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.startDate.set(target.value);
    console.log('Start date changed:', target.value);
  }

  handleEndDateChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.endDate.set(target.value);
    console.log('End date changed:', target.value);
  }
}

