import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-popover',
  imports: [],
  templateUrl: './popover.html',
  styleUrl: './popover.scss'
})
export class Popover implements AfterViewInit, OnDestroy {
  @Input() mainContent: string | undefined;
  @Input() hoverMessage: string | undefined;

  @ViewChild('popoverWrapper') popoverWrapper: ElementRef | undefined;
  private popoverInstance: any;

  ngAfterViewInit() {
    if (this.popoverWrapper && bootstrap) {
      this.popoverInstance = new bootstrap.Popover(this.popoverWrapper.nativeElement, {
        trigger: 'hover focus',
        content: this.hoverMessage,
        container: 'body',
        placement: 'bottom'
      })
    }
  }

  ngOnDestroy() {
    if (this.popoverInstance) {
      this.popoverInstance.dispose();
    }
  }
}

