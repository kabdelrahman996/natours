import { Component, Input } from '@angular/core';
import { Tour } from '../../../tours/interfaces/tour';
import { environment } from '../../../../environments/environment.prod';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-cheap-tours',
  standalone: false,
  templateUrl: './top-cheap-tours.component.html',
  styleUrl: './top-cheap-tours.component.css',
})
export class TopCheapToursComponent {
  @Input() topCheapTours: Tour[] = [];
  imgUrl = environment.imgUrl;

  cylinderRotation: number = 0;
  activeCardIndex: number = 0;
  autoRotateInterval: any;
  isAutoRotating: boolean = true;

  ngOnInit() {
    console.log('TopCheapToursComponent initialized: ', this.topCheapTours);
    this.refreshData();
    setTimeout(() => {
      this.initCylinderCarousel();
    }, 1000);
  }

  refreshData() {
    console.log('Refreshing data...');
  }

  initCylinderCarousel() {
    this.startAutoRotate();
  }

  getCylinderCardTransform(index: number): string {
    const angle = 360 / this.topCheapTours.length;
    const cardAngle = angle * index;
    const radius = 400;

    return `rotateY(${cardAngle}deg) translateZ(${radius}px)`;
  }

  rotateNext() {
    const anglePerCard = 360 / this.topCheapTours.length;
    this.cylinderRotation -= anglePerCard;
    this.updateActiveCard();
  }

  rotatePrev() {
    const anglePerCard = 360 / this.topCheapTours.length;
    this.cylinderRotation += anglePerCard;
    this.updateActiveCard();
  }

  updateActiveCard() {
    const anglePerCard = 360 / this.topCheapTours.length;
    let normalizedRotation = this.cylinderRotation % 360;
    if (normalizedRotation < 0) normalizedRotation += 360;

    this.activeCardIndex =
      Math.round(normalizedRotation / anglePerCard) % this.topCheapTours.length;
  }

  startAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }

    this.isAutoRotating = true;
    this.autoRotateInterval = setInterval(() => {
      this.rotateNext();
    }, 5000);
  }

  stopAutoRotate() {
    this.isAutoRotating = false;
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }

  toggleAutoRotate() {
    if (this.isAutoRotating) {
      this.stopAutoRotate();
    } else {
      this.startAutoRotate();
    }
  }

  goToCard(index: number) {
    const anglePerCard = 360 / this.topCheapTours.length;
    this.cylinderRotation = -anglePerCard * index;
    this.updateActiveCard();
  }

  ngOnDestroy() {
    this.stopAutoRotate();
  }
}
