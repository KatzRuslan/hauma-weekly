import { __decorate } from "tslib";
import { Directive, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserFullname } from "../../redux/selectors/user.selectors";
import { Tooltip } from 'primeng/tooltip';
import { Subject, delay } from 'rxjs';
let TooltipDirective = class TooltipDirective {
    constructor() {
        this._store$ = inject(Store);
        this._tooltip = inject(Tooltip);
        this._watcher = new Subject();
        this._subscriptions = [
            this._watcher.pipe(delay(0)).subscribe(() => {
                const { clientWidth, scrollWidth } = this._tooltip.el.nativeElement;
                const tooltipStyleClassArray = `${this._tooltip._tooltipOptions.tooltipStyleClass || ''}`
                    .split(' ')
                    .filter((classname) => classname && classname !== 'hidden');
                if (scrollWidth <= clientWidth) {
                    tooltipStyleClassArray.push('hidden');
                }
                this._tooltip._tooltipOptions.tooltipStyleClass = tooltipStyleClassArray.join(' ');
            }),
            this._store$.select(getUserFullname).subscribe(() => this._watcher.next(''))
        ];
    }
    set pTooltip(tooltip) {
        this._watcher.next(tooltip);
    }
    ngOnDestroy() {
        this._subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
};
__decorate([
    Input()
], TooltipDirective.prototype, "pTooltip", null);
TooltipDirective = __decorate([
    Directive({
        selector: '[appTooltip]',
        standalone: true
    })
], TooltipDirective);
export { TooltipDirective };
//# sourceMappingURL=tooltip.directive.js.map