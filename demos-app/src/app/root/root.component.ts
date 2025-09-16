import { AsyncPipe } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { TieredMenu } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  standalone: true,
  providers: [DialogService, MessageService, ConfirmationService, TranslateService],
  imports: [AsyncPipe, ConfirmDialogModule, RouterOutlet, ToastModule],
})
export class RootComponent {
  readonly rootMenu = viewChild.required(TieredMenu);

  readonly translate = inject(TranslateService);
  readonly primeNgConfig = inject(PrimeNG);
}
