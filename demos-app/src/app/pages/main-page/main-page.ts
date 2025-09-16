import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

import { BrandLogo } from '../../components/brand-logo/brand-logo';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css'],
  standalone: true,
  imports: [BrandLogo, RouterOutlet, TooltipModule, TranslateModule],
})
export default class MainPageComponent {}
