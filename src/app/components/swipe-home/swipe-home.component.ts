import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-swipe-home',
  templateUrl: './swipe-home.component.html',
  styleUrl: './swipe-home.component.css'
})
export class SwipeHomeComponent implements OnInit {

  @HostListener('window:resize', ['$event'])

  scrHeight: any;
  scrWidth: any;


  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  // Constructor
  constructor() {

  }

  qoutesList !: string[];
  currentQuote !: string;
  numbers = [0, 1];
  blurTention = 0
  isMouseDown = false;
  right !: boolean | null;
  left !: boolean | null;


  ngOnInit(): void {
    this.currentQuote = "Service is making the most of the present moment, with the means at your disposal, for the greater good.";

    document.getElementById('quotesContainer')?.addEventListener("mousedown", (event) => {

      document.getElementById('quotesContainer')?.classList.add('blur-[0.2rem]')
      console.log(this.left, this.right)

    })

    this.getScreenSize();


    document.getElementById('quotesContainer')?.addEventListener("mouseleave", () => {
      this.isMouseDown = true;
      document.getElementById('quotesContainer')?.classList.remove('blur-[0.2rem]')
    })

    const draggableElement = document.getElementById('quotesContainer');
    if (draggableElement) {
      draggableElement.addEventListener('mousedown', (event) => this.onDragStart(event));
      draggableElement.addEventListener('mousemove', (event) => this.onDragMove(event));
      draggableElement.addEventListener('mouseup', this.onDragEnd);
      // Handle drag leaving the element
    }

  }


  initialX = 0;
  isDragging: boolean = false;


  onDragStart(event: MouseEvent): void {
    this.initialX = event.clientX; // Store the initial X position
    this.isDragging = true;         // Set dragging state to true
  }

  onDragMove(event: MouseEvent): void {
    if (!this.isDragging) return;  // Do nothing if not dragging

    const currentX = event.clientX; // Get the current X position
    if (currentX > this.initialX) {

      document.getElementById('cross')?.classList.add('fill-[#FA5041]')
      document.getElementById('cross')?.classList.remove('fill-white')
      document.getElementById('crossbg')?.classList.remove('bg-[#FA5041]')
      document.getElementById('crossbg')?.classList.add('shadow-white')


      document.getElementById('heart')?.classList.remove('fill-green-400')
      document.getElementById('heart')?.classList.add('fill-white')
      document.getElementById('heartbg')?.classList.add('bg-green-400')
      document.getElementById('heartbg')?.classList.remove('shadow-white')
      console.log('Dragged to the right');


    } else if (currentX < this.initialX) {
      document.getElementById('cross')?.classList.remove('fill-[#FA5041]')
      document.getElementById('cross')?.classList.add('fill-white')
      document.getElementById('crossbg')?.classList.add('bg-[#FA5041]')
      document.getElementById('crossbg')?.classList.remove('shadow-white')
      console.log('Dragged to the left');


      document.getElementById('heart')?.classList.add('fill-green-400')
      document.getElementById('heart')?.classList.remove('fill-white')
      document.getElementById('heartbg')?.classList.remove('bg-green-400')
      document.getElementById('heartbg')?.classList.add('shadow-white')
    }
  }

  onDragEnd(): void {
    this.isDragging = false;






    // Reset dragging state
  }


  drop(event: CdkDragDrop<unknown>) {
    moveItemInArray(this.numbers, event.previousIndex, event.currentIndex);

    console.log(event.distance.x, event.previousIndex)
    if (event.distance.x > 0) {
      this.left = false
      this.right = true
    }

    if (event.distance.x < 0) {
      this.right = false
      this.left = true
    }


    if (event.distance.x > (this.scrWidth / 2) + 50) {
      this.right = true
      document.getElementById("quotesContainer")?.classList.add("scale-0")

      this.currentQuote = "Love is acting with what you know, in the space you're in, and with the time you’ve got.";
    }

    if (event.distance.x < -(this.scrWidth / 2) - 50) {
      this.left = true
      document.getElementById("quotesContainer")?.classList.add("scale-0")
    }

  }





  /**
   * Predicate function that only allows even numbers to be
   * sorted into even indices and odd numbers at odd indices.
   */
  sortPredicate(index: number, item: CdkDrag<number>) {
    return (index + 1) % 2 === item.data % 2;
  }
}


