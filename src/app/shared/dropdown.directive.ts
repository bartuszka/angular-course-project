import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective implements OnInit {
  private droppedElement: any;
  private isOpen: boolean = false;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.droppedElement = this.elRef.nativeElement.parentNode.lastChild;
  }

  @HostListener('document:click', ['$event']) documentClickClose(event: Event): void {
    this.elRef.nativeElement === event.target ? this.isOpen = !this.isOpen : this.isOpen = false;
    this.isOpen ?
      this.renderer.addClass(this.droppedElement, 'show') :
      this.renderer.removeClass(this.droppedElement, 'show');
  }
}
