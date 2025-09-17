import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

import { BrandLogo } from '../../components/brand-logo/brand-logo';

export interface RouteLink {
  routerLink?: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css'],
  standalone: true,
  imports: [BrandLogo, RouterOutlet, RouterLink, RouterLinkActive, TooltipModule, TranslateModule],
})
export default class MainPageComponent {
  readonly routes: RouteLink[] = [
    {
      routerLink: 'dummy-api',
      label: 'i18n.MainPage.Tabs.ngopenapiDemo',
    },
    {
      routerLink: 'table',
      label: 'i18n.MainPage.Tabs.tableDemo',
    },
  ];
}
