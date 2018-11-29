import { Component, Inject, OnInit  } from '@angular/core';
import { AppService } from '../app.service'
import { MatDialog } from '@angular/material';
//import { EditDialogComponent } from '../editdialog/editdialog.component';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})

export class DescriptionComponent {
    items: Description[];
    item: Description;
    selFlag: Boolean;
    selectedItem: Description;
    svSelected: Description = null;
    editText: String = "Edit";
    itemUrl = 'http://localhost:5000/' + 'api/Description';

    /* local host - using a provider
      The parameter simultaneously defines a private appService property and identifies it as an AppService injection site.
      When Angular creates this component, the Dependency Injection system sets the appService parameter to the singleton instance of AppService.
      See https://angular.io/tutorial/toh-pt4
    */
    constructor(
      private appService: AppService, 
      public dialog: MatDialog) {
    }  

    /*
    // local host - not using a provider
    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get('http://localhost:5000/' + 'api/Description').subscribe(result => {
            this.items = result.json() as Owner[];
        }, error => console.error(error));
    }
    */

    // The ngOnInit is a lifecycle hook Angular calls ngOnInit shortly after creating a component. It's a good place to put initialization logic.
    //  https://angular.io/tutorial/toh-pt1
    ngOnInit() {
        this.getItems(this.itemUrl);
    }

    onSelect(item: Description): void {
      if (this.svSelected == item) {
        this.selectedItem = null;
        this.editText = "Edit";
      }
      else {
        this.selectedItem = item;
        this.svSelected = item;
        this.editText = "Cancel Edit";
      }
    }

    onDelete(item: Description, index) {
    /*
      A dialog is opened by calling the open method with a component to be loaded and an optional config object.
      The open method will return an instance of MatDialogRef: https://material.angular.io/components/dialog/overview
    */
      // this.selectedItem = item;
      /*
      let dialogRef = this.dialog.open(EditDialogComponent, {
        width: 'auto',
        height: 'auto'
        //data: { desc: item.desc, createdAtUtc: item.createdAtUtc }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.selectedItem = null;
        console.log('The dialog was closed');
        
        //this.animal = result;
      });
      */
      
      // https://stackoverflow.com/questions/43962481/angular-2-get-element-data-and-remove-it
      if(window.confirm('Please confirm deletion of row')) {
        // this.delete(this.selectedItem);    // physically delete record: not working yet
        this.items.splice(index, 1);          // remove row from array items
      } else {
        return false;
      }
    }

    /*
    The new version waits for the Observable to emit the array of items — which could happen now or several minutes from now.
    Then subscribe passes the emitted array to the callback, which sets the component's items property.

    This asynchronous approach will work when the appService requests items from the server.
    https://angular.io/tutorial/toh-pt4
    */
    getItems(itemUrl:string): void {
      this.appService.getItems(this.itemUrl)
        .subscribe(items => {this.items = items;
        })
    }

    /*
    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.appService.addItem({ name } as item)
        .subscribe(item => {
          this.items.push(item);
        });
    } */

    delete(item: Description): void {
      alert("id:" + item.id + " name: " + item.desc);
      this.appService.deleteItem(item, this.itemUrl).subscribe();
    }

}

export interface Description {
    id: string;
    desc: string;
    tag: Number;
    createdAtUtc: Date;
}