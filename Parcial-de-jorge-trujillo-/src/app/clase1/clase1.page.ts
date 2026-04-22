import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonAccordion, 
  IonAccordionGroup, IonItem, IonLabel, IonButton, ActionSheetController, 
  IonAlert, IonBadge, IonList, IonIcon, IonTabButton, IonTabBar,
  IonBreadcrumbs, IonBreadcrumb, IonCard, IonCardContent, IonCardHeader, 
  IonCardSubtitle, IonCardTitle, IonCheckbox, IonChip, IonAvatar, IonDatetime,
  IonDatetimeButton, IonModal, IonPicker, IonPickerColumn, IonPickerColumnOption,
  IonButtons, IonFab, IonFabButton, IonFabList, IonCol, IonGrid, IonRow, IonInfiniteScroll,
  IonInfiniteScrollContent, IonInput, IonInputPasswordToggle, IonInputOtp, IonImg,
  IonThumbnail, IonPopover, IonLoading, IonProgressBar, IonListHeader,IonSkeletonText,
  IonSpinner, IonRadio, IonRadioGroup, IonRange, IonRefresher, IonRefresherContent,
  RefresherCustomEvent, IonReorder, IonReorderGroup, ReorderEndCustomEvent, IonSearchbar,
  IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonSelect, IonSelectOption,
  IonToast, IonToggle, IonText 
  } from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';
import { addIcons } from 'ionicons';
import { calendar, camera, closeCircle, film, flash, heart, home, musicalNote, pin, close, 
  chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, globe, document,
  logoIonic, airplane, bluetooth, call, wifi, warning} from 'ionicons/icons';

@Component({
  selector: 'app-clase1',
  templateUrl: './clase1.page.html',
  styleUrls: ['./clase1.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton,
    IonAlert, IonBadge, IonList, IonIcon, IonTabButton, IonTabBar, IonBreadcrumbs, 
    IonBreadcrumb, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCheckbox, IonChip, IonAvatar, IonDatetime, IonDatetimeButton, IonModal, IonPicker, 
    IonPickerColumn, IonPickerColumnOption, IonButtons, IonFab, IonFabButton, IonFabList,
    IonCol, IonGrid, IonRow, IonInfiniteScroll, IonInfiniteScrollContent, IonInput,
    IonInputPasswordToggle, IonInputOtp, IonImg, IonThumbnail, IonPopover, IonLoading,
    IonProgressBar, IonListHeader, IonSkeletonText, IonSpinner, IonRadio, IonRadioGroup,
    IonRange, IonRefresher, IonRefresherContent, IonReorder, IonReorderGroup, IonSearchbar,
    IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonSelect,
    IonSelectOption, IonToast, IonToggle, IonText 

  ],
})
export class Clase1Page implements OnInit {

  //segundo componente - hoja de accion
  constructor(private actionSheetCtrl: ActionSheetController) { 
    
     addIcons({ heart, calendar, musicalNote });  //cuarto componente - insignias con iconos
     addIcons({ camera, film, flash, home });   //quinto componente - migas de pan
     addIcons({ close, closeCircle, pin });   //noveno componente - chip
     addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });   //duoceimo componente - botones de acción flotantes
     addIcons({ logoIonic });
     addIcons({ airplane, bluetooth, call, wifi });
     addIcons({ warning });
  }

  //quinceavo componente - scroll infinito
  items: string[] = [];
  ngOnInit() {
    for (let i = 1; i < 51; i++) {
      this.items.push(`Item ${i}`);
    }
  }

  //segundo componente - hoja de accion
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Share',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  //tercer componente - alerta
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(event: CustomEvent<OverlayEventDetail>) {
    console.log(`Dismissed with role: ${event.detail.role}`);
  }

  //decimo componente - contenido
  @ViewChild('ejemplocontent') content!: IonContent;

  scrollToBottom() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the bottom instead of instantly
    this.content.scrollToBottom(500);
  }

  scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    this.content.scrollToTop(500);
  }

  //undecimo componente - selector de fecha y hora
  currentValue = 'javascript';

  onIonChange(event: CustomEvent) {
    this.currentValue = event.detail.value;
  }

  onDidDismiss(event: CustomEvent) {
    console.log('didDismiss', JSON.stringify(event.detail));
  }
  
  @ViewChild('modal2') modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }

  @ViewChild('popover') popover!: HTMLIonPopoverElement;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  //veintiseis componente - refrescar
  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  //veintisiete componente - refrescar
  handleReorderEnd(event: ReorderEndCustomEvent) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group.
    event.detail.complete();
  }
}