import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-redeem-coupon',
  templateUrl: './redeem-coupon.component.html',
  styleUrls: ['./redeem-coupon.component.css']
})
export class RedeemCouponComponent {

  constructor(private bottomSheetRef:MatBottomSheetRef<RedeemCouponComponent>) {
    bottomSheetRef.disableClose=false
  }

  closeMat_Sheet(){
    this.bottomSheetRef.dismiss()
  }
}
