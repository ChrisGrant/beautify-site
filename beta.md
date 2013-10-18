---
layout: page
title: Beta
---

# Welcome to the beautify beta

So glad you could join us ...

If you have reached this page, you are lucky enough to have been granted access to the beta version of beautify for iOS. We have been hard at work creating what we think is a pretty awesome tool for creating beautiful apps. But before we add too many whistles and bells we'd like to share it with you and see what you think.

This page contains some (brief) instructions that will get you up and running with beautify. If you get stuck or find and bugs, please give us a shout. - enquiries@beautify.io

Finally, I'd like to ask you a favor. What we need more than anything else is your thoughts, ideas and feelings. We'd love it if you could help us make beautify even better.

From bland to beautiful.

-- Colin E.,[@ColinEberhardt](https://twitter.com/ColinEberhardt), and the Beautify Team, [@Beautifyio](https://twitter.com/Beautifyio).

# Beautifying your app

## The beautify process

The following is a brief description of the process before we get into the details.

1. Download and add the **beautify-ios** and **beautify-ios-streaming** (plus dependencies) frameworks to your app. The **beautify-ios** framework will magically enhance the graphical capabilities of the existing UIKit controls, while the **beautify-ios-streaming** framework connects your app to the web-based designer.
2. Add a couple of lines of code to your app to connect to the design server.
3. Sign up to use the web-based designer, which is located at [beautify.nodejitsu.com](http://beautify.nodejitsu.com/), using the details that will have been sent to you via email.
4. Get creative live-styling your app!
5. When you are done, grab the design as a JSON file and include it in your app.
6. For the release build, you just need the **beautify-ios** framework and your JSON file.
7. Bask in the glory of your beautiful app and profit!

That all sounds pretty simple doesn't it? If you need more detailed instructions read on ...   

## Enabling beautify within your app

### Obtain the iOS framework

The first step is to obtain a copy of the beautify iOS code. There are two separate frameworks that you need in order to run a live design sessions. These are:

+ **beautify-ios** - this framework enhances the capabilities of the UIKit controls, adding shadows, gradients, borders and much more. It is open source and hosted on [GitHub](https://github.com/beautify/beautify-ios).
+ **beautify-ios-streaming** - this framework connects your app to a live design session.

Both frameworks are included in the following download:

 + **TODO:** add S3 download link 

### Add the required frameworks to your app

In order to use beautify you need to add the framework to your project:

 + Copy the **Beautify.framework** into the *Frameworks* group in your project 

Beautify also depends on the following frameworks which you must also add to your application:  

 + **CFNetwork.framework** †
 + **Security.framework** †
 + **libicucore.dylib** †
 + **QuartzCore.framework**

Please note, the frameworks marked with a dagger (†) are not required for release builds of your app.

### Enabled beautify within your project

Within **AppDelegate.m** import the framework header:

    #import <Beautify/Beautify.h>

Then within the existing `application:didFinishLaunchingWithOptions:` method add the following:

    [[BYBeautify instance] activate];

With beautify activated, all the UIKit controls within your application are enhanced. You can gain access to the extra styling properties and methods via the `renderer` property that is added to each control. For full details of the programmatic beautify APIs, see the [beautify-ios GitHub pages](https://github.com/beautify/beautify-ios). 

## Starting a live design session

A faster and more convenient way of styling your application is to connect to a live design session. When you were invited to the beautify beta you will have received details of how to sign up. Do this now!

If you have already signed up visit [beautify.nodejitsu.com](beautify.nodejitsu.com) and login to your personal design session.

### Connecting your device

In order to live-style your app you need to make a connection to the web-based beautify designer. To make a connection, first import the following header:

    #import <BeautifyStreaming/BeautifyStreaming.h>

Then update `application:didFinishLaunchingWithOptions:` as follows: 

    // enhance the UI controls
    [[BYBeautify instance] activate];
    
    // connect to a streaming server
    [[BYBeautifyStreamer instance] initiateDesignSessionWithUsername:@"YourUserNameHere"];

Using your own username of course!

The beautify streamer creates a socket connection to the web-based beautify designer. Any changes made via the web-based designer should be reflected immediately on your device. You can even connect multiple devices to a single session!

### Make it beautiful

Once you have logged in to the designer and started your device with the beautify streamer code above you should now be in a position to live-style your app. Go ahead ... have fun ... go crazy!

## Releasing your app

Have you finished playing with the designer? ... yes? ... good. It's now time to create a release build of your application.

From the web-based designer hit the export button, then copy / paste the JSON into a file. Place this file within your application, giving it a suitable name. **BeautifyRocks.json** will do.  

For the release build there are just two framework dependencies:

 + **Beautify.framework** 
 + **QuartzCore.framework**

Within the `application:didFinishLaunchingWithOptions:` method you just need to activate and load your designs as follows:

    [[BYBeautify instance] activateWithStyle:@"BeautifyRocks"];

And that's it!

Wow - that really was simple wasn't it? 

Thoughts, bugs, ideas, money and other offers - give us a shout  -enquiries@beautify.io

# Release Notes

The following is a few notes regarding the current Beautify for iOS framework that might help you in your development:

 + We currently beautify the following controls: `UITextField`, `UIButton`, `UILabel`, `UINavigationBar`, `UITableViewCell`, `UISwitch`, `UIViewController`, `UIImageView` and `UIBarButtonItem` - there will be more to follow ...
 + We have added a highlighted state to `UITextField` which is indicates when a text field is being edited. We think this is pretty cool!
 


