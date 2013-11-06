---
layout: post
author: cgrant
title: Sentri - the first beautified app submitted to the App Store
summary: Chris Grant talks about Sentri, an iOS app that tracks your location, that he wrote for a but of fun over the weekend.  
categories:
---

Sentri is a location tracking app for iPhone. It allows you to track your every move and see where you've been, how many times, and when you last visited! You can configure how often your location is stored and whether your location is tracked even when the app is in the background! All the data is stored locally and your data will never be uploaded to any external servers.

<table>
<tr>
<td><img src="{{ site.baseurl }}/assets/sentri/Sentri1_small.png"/></td>
<td><img src="{{ site.baseurl }}/assets/sentri/Sentri2_small.png"/></td>
<td><img src="{{ site.baseurl }}/assets/sentri/Sentri3_small.png"/></td>
</tr>
</table>

It's something I've always wondered about building. Ever since it was revealed that Apple was [tracking the locations of it's iPhone users](http://www.wired.com/gadgetlab/2011/04/iphone-tracks/) and uploading this data to their own servers. Since background location services were introduced in iOS, I've been wanting to get the opportunity to put something similar together. I had a spare few hours over a couple of days this weekend, so decided to have a go and see what I could come up with!

###Using Beautify to Style Sentri

One of the great things about Beautify is that you can just drop in the frameworks and make changes to the styles of your app immediately. This means not having to go back into Xcode, tweak a few numbers in `UIColor` constructors, then rebuild and redeploy the app. This sounds trivial, but when you're trying to choose the perfect color scheme for your app it can become a huge time sink! Being able to live-style Sentri with Beautify meant that I could get something with a lot of custom styling up and running in no time.

I spent most of my time trying to find a color for that navigation bar that worked nicely on top of the map view. I tried all kinds of colors before I was happy, and thanks to Beautify this didn't take long at all. Having the option to customize the switch and slider in the settings screen was great too. I'm a huge fan of simple, stylish apps that are great at doing one job. With the help of Beautify, I was able to achieve this in a single weekend!

You can download sentri for free now from the <a href="http://bit.ly/1iM8FMZ">App Store</a>.

- Chris G.
