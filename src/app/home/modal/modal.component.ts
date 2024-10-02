import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [ReactiveFormsModule]
})
export class ModalComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      from_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      from_email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  async send(): Promise<void> {
    if (this.form.valid) {  // Asegúrate de que el formulario es válido antes de enviar
      console.log('Sending email...');
      console.log(this.form.value);
      emailjs.init('YJ4Ybd_Ct7vKR-5e3');
      try {
        let response = await emailjs.send('service_zyxd8o4', 'template_n1csuhg', {
          from_name: this.form.value.from_name,
          phone_number: this.form.value.phone_number,
          from_email: this.form.value.from_email,
          message: this.form.value.message
        });
        console.log('Email sent successfully!', response.status, response.text);
        alert("Email sent successfully!");
        this.form.reset();
      } catch (error) {
        console.error('Failed to send email. Error:', error);
        alert("Failed to send email. Error:");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  }

  buttonText: string = 'Contact me';
  changeButtonText(newText: string): void {
    this.buttonText = newText;
  }
}
