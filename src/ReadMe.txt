Videos App ( VidU )
---------------------
Framework used: Angular version 10
UI components, typography, icons and app theme: Angular Material

Project General Idea:
------
This app is created using Angular framework, and it's a singlepage Progressive web app (SPA-PWA) working offline and loading static content with the help of service worker to cache all the essential files used by the app in order to work offline.
The app idea is to integrate with Youtube Official API V3 to get data of a specific channel Here i choosed Muzli channel and populate all the videos of this channel to the Home screen in a table view with filtering, columns ordering and also paginating results
On viewing details of a specific video we can access all important info of that video like # of views, # of likes, video Length or duration, title and description aslo thumbnails.

Descisions:
------------
1- Used Angular Material for UI components because it's very clean and helpful with Angular framework
2- Used angular service to intergrate with Youtube API with Search method to query the list of videos in a channel "MUZLI channel" and Videos method for details about a specific video
3- Used service workers for caching static skeleton of the app and displaying it offline
4- Used local storage to store rating and favorite list of the populated videos
5- Made Favorite buttons on videos list for better user experience with two main benefits:
    a- Showing which video is add to our favorite list in a macro view(videos list).
    b- Ability to add to favorite list from the list instead of going to the video details to do that.


Design:
-------
1- Customizing a new Angular material theme.
2- Designing Simple, clean, Easy to use and user friendly layout.
3- Designed a small logo for the app on illustrator.
4- Designing Background image for the app body.
