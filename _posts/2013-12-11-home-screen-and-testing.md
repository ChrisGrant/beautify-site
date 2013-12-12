---
layout: post
author: ceberhardt
title: Beta update with shared themes and a new home page
summary: We have released an update to the beautify beta which has a new 'home' screen that shows mini previews of the various themes. 
categories:
---
Our aim is to rapidly evolve the beautify beta and so far we have managed three releases in quick succession. However, some of you may have noticed that it has been around five weeks since our <a href="{{ site.baseurl }}2013/11/01/beta-updates.html">last release</a>. This is not because we have slowed down, far from it! instead we have been investing some more effort in testing and infrastructure. 

We now have a full set of automated UI tests that will allow us to release more frequently and with greater confidence in the future. We also have improved logging, unit tests and build systems. We'll probably share some of the interesting details with you in the near future. But for now, back to beautify ...

###Home screen

Probably the most noticeable new feature in this release is the home screen: 

<img src="{{ site.baseurl }}/assets/beautify-new-home-page.png"/>

The idea here is that you can quickly see a range of themes at-a-glance. We have also started work on a 'Shared Themes' section which will allow you to share your creations with other beautify users in a future release.

###HTTPS websockets

Another significant change we have made is to use HTTPS for the websocket communication with the iOS device / simulator. This solves the issue that some of our user's were facing where their ISP was blocking or corrupting websocket data.

###Pop-out theme previews

Some of our users also pointed out that they kept having to switch between the editor and their themes list in order to preview the theme they were working on. in this release we have added a pop-out preview that will always display the theme being streamed to your iOS device. As this is a separate window, you can position it where you like.

You can access this new pop-out using the button indicated below:  

<img src="{{ site.baseurl }}/assets/beautify-pop-out-preview.jpg"/>

###And finally

If you have any thoughts or ideas, please get in touch.

And if you haven't already signed up to the beautify beta (why not?!) - then you can register below:

<form id="interest" action="http://beautify.us7.list-manage.com/subscribe/post?u=1e6e13d9f376ab2b22c458c4c&amp;id=cf1cde751c" method="post" class="row">
  <input type="email" name="EMAIL" placeholder="EMAIL" class="col-lg-6 col-md-6 col-sm-12 col-xs-12"> </input>
  <button type="submit" class="btn col-lg-5 col-lg-offset-1 col-md-5 col-md-offset-1 col-sm-12 col-xs-12">REGISTER</button>
</form>

Regards, Colin E.
