import { Directive, Input, OnDestroy, inject } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { Subject, Subscription, delay } from 'rxjs';

@Directive({
    selector: '[appTooltip]',
    standalone: true
})
export class TooltipDirective implements OnDestroy {
    @Input() set pTooltip(tooltip: string) {
        this._watcher.next(tooltip);
    }
    private _tooltip = inject(Tooltip)
    private _watcher: Subject<string> = new Subject();
    private _subscription: Subscription = this._watcher.pipe(delay(0)).subscribe(() => {
        const { clientWidth, scrollWidth } = this._tooltip.el.nativeElement;
        const tooltipStyleClassArray = `${this._tooltip._tooltipOptions.tooltipStyleClass || ''}`
            .split(' ')
            .filter((classname) => classname && classname !== 'hidden');
        if (scrollWidth <= clientWidth) {
            tooltipStyleClassArray.push('hidden');
        }
        this._tooltip._tooltipOptions.tooltipStyleClass = tooltipStyleClassArray.join(' ');
    });
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
