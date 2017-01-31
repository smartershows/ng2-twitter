import { Component } from '@angular/core';
import { AuthorizedRequestService } from '../ng2-twitter-module';

import { appkey, token } from './apikeys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  result = [];

  constructor(private twitter: AuthorizedRequestService) { }
  
  getHomeTimeline(){
    this.twitter.get(
      'https://api.twitter.com/1.1/statuses/home_timeline.json',
      {
        count: 5
      },
      {
        consumerKey: appkey.consumerKey,
        consumerSecret: appkey.consumerSecret
      },
      {
        token: token.token,
        tokenSecret: token.tokenSecret
      }
    ).subscribe((res)=>{
      this.result = res.json().map(tweet => tweet.text);
    });
  }
}
