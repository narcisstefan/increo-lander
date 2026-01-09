import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-application-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './application-form.component.html',
    styleUrl: './application-form.component.scss'
})
export class ApplicationFormComponent {
    isSubmitted = signal(false);
    isSubmitting = signal(false);
    fileName = signal<string | null>(null);

    readonly professions = [
        'Zidar',
        'Dulgher',
        'Fierar Betonist',
        'Electrician',
        'Faianțar',
        'Rigipsar',
        'Tâmplar',
        'Finisor',
        'Instalator',
        'Șef de Șantier',
        'Altă meserie'
    ];

    readonly experienceOptions = [
        '1-2 ani',
        '3-5 ani',
        '5-10 ani',
        '10+ ani'
    ];

    readonly languages = [
        { id: 'german', label: 'Germană' },
        { id: 'italian', label: 'Italiană' },
        { id: 'french', label: 'Franceză' },
        { id: 'portuguese', label: 'Portugheză' },
        { id: 'english', label: 'Engleză' }
    ];

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{8,}$/)]],
            profession: ['', Validators.required],
            experience: ['', Validators.required],
            german: [false],
            italian: [false],
            french: [false],
            portuguese: [false],
            english: [false],
            cv: [null]
        });
    }

    get hasLanguageSelected(): boolean {
        return this.languages.some(lang => this.form.get(lang.id)?.value === true);
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.fileName.set(file.name);
            this.form.patchValue({ cv: file });
        }
    }

    removeFile(): void {
        this.fileName.set(null);
        this.form.patchValue({ cv: null });
    }

    onSubmit(): void {
        // Check language validation
        if (!this.hasLanguageSelected) {
            return;
        }

        if (this.form.valid) {
            this.isSubmitting.set(true);

            // Simulate API call
            setTimeout(() => {
                console.log('Form submitted:', this.form.value);
                this.isSubmitting.set(false);
                this.isSubmitted.set(true);
            }, 1500);
        } else {
            // Mark all fields as touched to show errors
            Object.keys(this.form.controls).forEach(key => {
                this.form.get(key)?.markAsTouched();
            });
        }
    }

    resetForm(): void {
        this.form.reset();
        this.fileName.set(null);
        this.isSubmitted.set(false);
    }
}
