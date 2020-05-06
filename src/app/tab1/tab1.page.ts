import { Component } from '@angular/core';
import { ModalController, IonRouterOutlet, AnimationController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';

import { Plugins, KeyboardInfo } from "@capacitor/core";
const { Keyboard } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private modalCtrl: ModalController,
    private routerOutLet: IonRouterOutlet,
    private animationCtrl: AnimationController,
    ) {}

  async presentModal() {

    const enterAnimation = (baseEl: any) => {
      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector("ion-backdrop")!)
        .fromTo("opacity", "0.01", "0.33");

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector(".modal-wrapper")!)
        .fromTo("transform", "translateY(100vh)", "translateY(50vh)");

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing("cubic-bezier(0.32,0.72,0,1)")
        .duration(320)
        .onFinish(() => {
          baseEl.querySelector("ion-input").setFocus();
        })
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: any) => {
      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector("ion-backdrop")!)
        .fromTo("opacity", "0.33", "0.0");

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector(".modal-wrapper")!)
        .fromTo("transform", "translateY(50vh)", "translateY(100vh)");

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing("cubic-bezier(0.32,0.72,0,1)")
        .duration(320)
        .beforeAddWrite(() => {
          Keyboard.hide();
        })
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };



    const modal = await this.modalCtrl.create({
      component: ModalPagePage,
      swipeToClose: true,
      cssClass: "css-modal",
      enterAnimation,
      leaveAnimation,
      presentingElement: this.routerOutLet.parentOutlet.nativeEl,
    });
    return await modal.present();
  }
}
