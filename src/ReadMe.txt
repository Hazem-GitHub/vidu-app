Videos App ( VidU )
---------------------
Framework: Angular version 10
UI components and app theming: Material UI

Brief:
------
This app is created using Angular framework, and it's a singlepage Progressive web app (SPA-PWA) working offline and loading static content with the help of service worker to cache all the essential files used by the app in order to work offline

The app idea is to integrate with Youtube Official API V3 to get data of a specific channel Here i choosed Muzli channel and populate all the videos of this channel to the Home screen in a table view with filtering, columns ordering and also paginating results

On viewing details of a specific video we can access all important info of that video like # of views, # of likes, video Length or duration, title and description aslo thumbnails.

Descisions:
------------
1- I used Angular Material for UI components because it's very clean and helpful with Angular framework
2- I used angular service to intergrate with Youtube API with Search method to query the list of videos in a channel "MUZLI channel" and Videos method for details about a specific video
3- I used service workers for caching static skeleton of the app and displaying it offline
4- I used browser local storage to store rating and favorite list of the populated videos


Design:
-------
Simple, clean and user friendly design for a small app.
I also designed a small logo for the app on illustrator.
I aslo used a custom theme coloring for Angular material.