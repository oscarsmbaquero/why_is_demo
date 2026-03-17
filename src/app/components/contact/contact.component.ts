import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ThemeService } from '../../../core/services/themeService/theme-service.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { environment } from '../../../enviroment/environment';
import { HttpClient } from '@angular/common/http';
import { weekdayValidator, timeRangeValidator } from '../../../core/utils/validators';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TranslateModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private readonly appointmentStartTime = '09:00';
  private readonly appointmentEndTime = '19:00';
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  showCalendarFields = false;
  showInfo = false;

  constructor(
    private fb: FormBuilder,
    public themeService: ThemeService,
    private http: HttpClient,
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
      cita: [false],
      fecha: [''],
      hora: [''],
    });
  }

  toggleCalendarFields() {
    this.showCalendarFields = !this.showCalendarFields;
    
    if (this.showCalendarFields) {
      this.contactForm.patchValue({ cita: true });
      this.contactForm
        .get('fecha')
        ?.setValidators([Validators.required, weekdayValidator()]);
      this.contactForm
        .get('hora')
        ?.setValidators([
          Validators.required,
          timeRangeValidator(this.appointmentStartTime, this.appointmentEndTime),
        ]);
    } else {
      this.contactForm.patchValue({ cita: false });
      this.contactForm.get('fecha')?.clearValidators();
      this.contactForm.get('hora')?.clearValidators();
      this.contactForm.patchValue({ fecha: '', hora: '' });
    }
    
    this.contactForm.get('fecha')?.updateValueAndValidity();
    this.contactForm.get('hora')?.updateValueAndValidity();
  }


  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      const formData = this.contactForm.value;
      const hasAppointment = !!formData.cita && !!formData.fecha && !!formData.hora;
      const templateParams: any = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        mensaje: formData.mensaje,
        cita: hasAppointment,
        to_name: 'Why? IA',
      };
      
      if (hasAppointment) {
        templateParams.fecha = formData.fecha;
        templateParams.hora = formData.hora;
      }

      try {
        await emailjs.send(
          environment.emailjs.serviceId,
          environment.emailjs.templateId,
          templateParams,
          environment.emailjs.publicKey,
        );
        
        const webhookData: any = {
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          mensaje: formData.mensaje,
          cita: hasAppointment,
          fecha: hasAppointment ? formData.fecha : null,
          hora: hasAppointment ? formData.hora : null,
          source: 'angular-form',
        };
        
        console.log('Datos a enviar:', webhookData);
        
        await this.http
          .post(
            'https://abolitionary-verline-erethismic.ngrok-free.dev/webhook/3f23f79a-827d-4645-81a7-2ddae1528a17',
            webhookData,
          )
          .toPromise();

        console.log('Email enviado exitosamente');
        this.submitSuccess = true;
        this.contactForm.reset({
          nombre: '',
          telefono: '',
          email: '',
          mensaje: '',
          cita: false,
          fecha: '',
          hora: '',
        });
        this.contactForm.get('fecha')?.clearValidators();
        this.contactForm.get('hora')?.clearValidators();
        this.contactForm.get('fecha')?.updateValueAndValidity();
        this.contactForm.get('hora')?.updateValueAndValidity();
        this.showCalendarFields = false;

        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      } catch (error) {
        console.error('Error al enviar email:', error);
        this.submitError = true;

        // Ocultar mensaje de error después de 5 segundos
        setTimeout(() => {
          this.submitError = false;
        }, 5000);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
