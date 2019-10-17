import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnChanges {
    constructor(
        private router: Router,
        // private authenticationService: AuthenticationService
    ) {

    }

    ngOnInit() {
        // this.router.events.subscribe(event => {
        //     if (event instanceof NavigationEnd) {
        //         if (document.getElementById('scr1') !=null) {
        //             document.getElementById('scr1').remove();
        //         }
        //         if (document.getElementById('scr2') !=null) {
        //           document.getElementById('scr2').remove();
        //       }
        //       if (document.getElementById('scr3') !=null) {
        //         document.getElementById('scr3').remove();
        //     }
        //         const node = document.createElement('script');
        //         node.src = 'assets/customer/js/jquery-2.2.4.min.js';
        //         node.type = 'text/javascript';
        //         node.async = true;
        //         node.id = 'scr1';
        //         node.charset = 'utf-8';
        //         document.getElementsByTagName('head')[0].appendChild(node);

        //         const node1 = document.createElement('script');
        //         node1.src = 'assets/customer/js/swiper.jquery.min.js';
        //         node1.type = 'text/javascript';
        //         node1.async = true;
        //         node1.id = 'scr2';
        //         node1.charset = 'utf-8';
        //         document.getElementsByTagName('head')[0].appendChild(node1);

        //         const node2 = document.createElement('script');
        //         node2.src = 'assets/customer/js/global.js';
        //         node2.type = 'text/javascript';
        //         node2.async = true;
        //         node2.id = 'scr3';
        //         node2.charset = 'utf-8';
        //         document.getElementsByTagName('head')[0].appendChild(node2);
        //     }
        // });
    }
    ngOnChanges(): void {
    //   this.router.events.subscribe(event => {
    //     if (event instanceof NavigationEnd) {
    //         if (document.getElementById('scr1') !=null) {
    //             document.getElementById('scr1').remove();
    //         }
    //         if (document.getElementById('scr2') !=null) {
    //           document.getElementById('scr2').remove();
    //       }
    //       if (document.getElementById('scr3') !=null) {
    //         document.getElementById('scr3').remove();
    //     }
    //         const node = document.createElement('script');
    //         node.src = 'assets/customer/js/jquery-2.2.4.min.js';
    //         node.type = 'text/javascript';
    //         node.async = true;
    //         node.id = 'scr1';
    //         node.charset = 'utf-8';
    //         document.getElementsByTagName('head')[0].appendChild(node);

    //         const node1 = document.createElement('script');
    //         node1.src = 'assets/customer/js/swiper.jquery.min.js';
    //         node1.type = 'text/javascript';
    //         node1.async = true;
    //         node1.id = 'scr2';
    //         node1.charset = 'utf-8';
    //         document.getElementsByTagName('head')[0].appendChild(node1);

    //         const node2 = document.createElement('script');
    //         node2.src = 'assets/customer/js/global.js';
    //         node2.type = 'text/javascript';
    //         node2.async = true;
    //         node2.id = 'scr3';
    //         node2.charset = 'utf-8';
    //         document.getElementsByTagName('head')[0].appendChild(node2);
    //     }
    // });
    }
}