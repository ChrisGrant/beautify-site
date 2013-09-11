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

The following gives you brief introduction to beautify for iOS, and how to use it within your applications. 

## The beautify process

The following is a brief description of the process before we get into the details.

1. Download and add the framework to your app. The beautify framework will magically enhance the graphical capabilities of the existing UI controls, adding shadows, gradients and much more ...
2. Add a couple of lines of code to your app that will cause it to connect to the design server.
3. Login to the web-based designer
4. Get creative live-styling your app!
5. When you are done, grab the design as a JSON file and include it in your app.
6. For the release build, add the more lightweight release version of our framework (excludes the streaming magic), and point it to the JSON file.
7. Bask in the glory of your beautiful app and profit!

That all sounds pretty simple doesn't it? If you need more detailed instructions read on ...   

## Enabling beautify within your app

### Obtain the iOS framework

The first step is to obtain a copy of the beautify framework. There are two separate version of the framework, one for development builds, which includes the code required to connect to the web-based beautify designer, and one for release builds which just contains the UI enhancement and style roll-out code.

Both frameworks are included in the following download:

 + [Beautify.zip]({{ site.baseurl }}releases/Beautify.0.0.2.zip)

### Add the required frameworks to your app

In order to use beautify you need to add the framework to your project:

 + Drag **ThemeRoller.embeddedframework** into your project 

Beautify also depends on the following framework which you must also add to your application:  

 + **CFNetwork.framework** †
 + **Security.framework** †
 + **libicucore.dylib** †
 + **QuartzCore.framework**

Please note, the frameworks marked with a dagger (†) are not required for release builds of your app.

### Enabled beautify within your project

Within **AppDelegate.h** import the framework header:

    #import <ThemeRoller/beautify.h>

Then within the existing `application:didFinishLaunchingWithOptions:` method add the following:

    [[SCBeautify instance] activate];

When the theme roller has been activated, every instance of an 'enhanced' control will have a renderer associated with it. You can use the renderer to alter the style of individual UI controls.

    // access the renderer for my button
    SCButtonRenderer* renderer = self.myButton.renderer;

    // apply a big fat red border to the normal state
    SCBorder* border = [[SCBorder alloc] initWithColor:[UIColor redColor] width:30.0f radius:15.0f];
    [renderer setBorder:border forState:UIControlStateNormal];

At this point you will find that the UIKit controls are now *much* more versatile. Have fun adding gradients to your buttons, shadows to your images and more ...

## Starting a live design session

### Creating an account

If this is the first time you have used beautify, you need to sign in via the web based interface at [beautify.nodejitsu.com](http://beautify.nodejitsu.com/). Pick a suitable username and password and don't forget them (we haven't written the password reset logic yet!).

If you have already signed up visit [beautify.nodejitsu.com](beautify.nodejitsu.com) and login to your personal design session.

### Connecting your device

In order to live-style your app you need to make a connection to the web-based beautify designer. To make a connection, initiate a design session after activating beautify as follows:

	[[SCBeautify instance] activate];
	[[SCBeuatifyStreamer instance] initiateDesignSessionWithUsername:@"yourUsername" andPassword:@"yourPassword"];

The theme streamer creates a socket connection to the beautify designer. Any changes made via the web-based designer should be reflected immediately on your device. You can even connect multiple devices to a single session!

**NOTE:** your username / password are not sent to the server, instead they are combined to create a unique design session ID.

### Make it beautiful

Once you have logged in to the designer and started your device with the theme streamer code above you should now be in a position to live-style your app. Go ahead ... have fun ... go crazy!

## Releasing your app

Have you finished playing with the designer? ... yes? ... good. It's now time to create a release build of your application.

From the web-based designer hit the export button, then copy / paste the JSON into a file. Place this file within your application, giving it a suitable name. **BeautifyRocks.json** will do.  

For the release build there are just two framework dependencies:

 + **ThemeRoller.embeddedframework** 
 + **QuartzCore.framework**

Within the `application:didFinishLaunchingWithOptions:` method you just need to activate and load your designs as follows:

    [[SCBeautify instance] activateWithStyle:@"BeautifyRocks"];

And that's it!

Wow - that really was simple wasn't it? 

Thoughts, bugs, ideas, money and other offers - give us a shout  -enquiries@beautify.io

# Release Notes

The following is a few notes regarding the current Beautify for iOS framework that might help you in your development:

 + We currently beautify the following controls: `UITextField`, `UIButton`, `UILabel`, `UINavigationBar`, `UITableViewCell`, `UISwitch`, `UIViewController`, `UIImageView` and `UIBarButtonItem` - there will be more to follow ...
 + We only beautify custom buttons.
 + We only beautify rounded text fields.
 + We have added a highlighted state to `UITextField` which is indicates when a text field is being edited. We think this is pretty cool!
 


