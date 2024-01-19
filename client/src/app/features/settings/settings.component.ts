import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  host: { class: 'flex overflow-hidden w-full h-full w-screen' }
})
export class SettingsComponent {

}
