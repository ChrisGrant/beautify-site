---
layout: post
author: godds
title: Design for delight
summary: TODO
categories:
---

If you take a moment to think about the brands and applications that truly engage us, one
thing they often have in common is that they include small moments that make you smile.
They have gone the extra mile to add playful details that surprise and delight.  Take, for
example, [innocent smoothies](http://www.innocentdrinks.co.uk/).  Look on the bottom of
one of their cartons and you will see a light-hearted message.  Alternatively, phone their
helpline, or bananaphone as they call it, and try not to have your day brightened by the
quirky greeting you will receive.

<img src="{{ site.baseurl }}/assets/design-for-delight/Innocent_Smoothies.jpg" alt="Innocent Smoothies" class="align-center" />

These fun details that brands and applications introduce aren't mere gimmicks.  This extra
attention to detail helps create an engaging brand or application that you remember and
want to share.

A very well known example of this in the world of technology/applications are
[Google Doodles](http://www.google.com/doodles/finder/2013/All%20doodles).  These are
re-imaginings of the Google logo that constitutes the main graphical element on its
search home page, based around some significant event associated with that particular day.
They do not affect the functionality of the search page, but can be a [worryingly engaging](http://www.google.com/doodles/les-pauls-96th-birthday)
distraction.

<div class="row">
    <div class="col-lg-4 col-md-4 col-sm-6">
        <a href="http://www.google.com/doodles/saint-andrews-day-2013" target="_blank">
            <img src="http://lh4.ggpht.com/lOBKgk7TFOlBynzcRbbsagOS8sMxE-pSaN3w40iMrvHKo2KuNUiQMahYL5HfmCZ8uIutYvMmWmTS-npApgir-zrFdF5ZbCy_BS_jQ5brhw" alt="Saint Andrew's Day 2013" style="width: 100%" />
        </a>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6">
        <a href="http://www.google.com/doodles/friedrich-nietzsches-169th-birthday" target="_blank">
            <img src="http://lh3.ggpht.com/-h1NSkVtXqpm2TInRYF8pBbSei5dIcrnY1S6ASMlSfnP0juR1jIHKI04t8mgjWAF5hQFGGtrtlJW0i-_jKpkk9c62Ru9D4HU3Ep2RZE" alt="Friedrich Nietzsche's 169th Birthday" style="width: 100%" />
        </a>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6">
        <a href="http://www.google.com/doodles/agustin-laras-113th-birthday-latam" target="_blank">
            <img src="http://lh5.ggpht.com/pIpsoV0N4FZbMuPB1JOvI2TanzAZrQ4lpSOIUy3of39xQAVdx4sNYmVv2nUc7BWnxvVBZ0gtAEYXVQ0kYn6rwfYMvc51KTQwdbjyJ0nm" alt="Agustin Lara's 113th Birthday" style="width: 100%" />
        </a>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6">
        <a href="http://www.google.com/doodles/100th-anniversary-of-the-first-aviation-loop-de-loop-by-petr-nesterov" target="_blank">
            <img src="http://lh3.ggpht.com/uko_EJQTbroWnVRi1gi00WHUCdQCQ_wryU1AAaKjoEOsfjyMqvcWjNzJqesba0f0X7rthVqetYy01pbPcXSv7SXGOldvuF4c0S8_mqcU" alt="100th anniversary of the first aviation loop de loop by Petr Nesterov" style="width: 100%" />
        </a>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6">
        <a href="http://www.google.com/doodles/colombia-independence-day-2013" target="_blank">
            <img src="http://lh4.ggpht.com/OMW7jrOa7pcEYq23FcWiH0Nf4ttGvJJBA9FBH6CfQai-hv4EVWX82p-CTtJlJWQ8eUTS_0zLpXRfujV-OqbCuyXOPlEDAW-gDfVzqu7Z" alt="Columbia Independence Day 2013" style="width: 100%" />
        </a>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6">
        <a href="http://www.google.com/doodles/the-100th-tour-de-france" target="_blank">
            <img src="http://lh4.ggpht.com/_nwM2QxL19m7wZ5Up-0OMsjo_u-TrvPfG7VUmD-RhGnqKITEUY-CWjf3IBRgHWNG3QDZMIcijyfwblQtqNDIvtU_lYaBTwOOIEMYaMjc" alt="The 100th Tour de France" style="width: 100%" />
        </a>
    </div>
</div>

However, for all that delight attributes can significantly boost satisfaction, over time they
can become a basic, expected attribute, as explained in the [Kano model](http://en.wikipedia.org/wiki/Kano_model).
Google Doodles are once again a good example of this.  Originally they happened only very
occasionally, so their overhead to Google was very minimal, but nowadays we expect to see one
almost every day &mdash; the mere presence of a Doodle is no longer something to mention to
 others &mdash; and there is a [whole team](http://www.google.com/doodles/about) dedicated to
producing them.  The lesson here is that if you want to introduce moments of delight into your
application (and you should!), be sure to really consider what you are doing.

For example, introducing elements [inspired by Google Doodles](http://www.sitepoint.com/copy-great-designers-steal/)
into an iOS app, in particular, could be quite awkward and labour-intensive.  The native controls are
inflexible, thereby providing little scope for designers to get creative without significant
development effort (even though these moments of delight shouldn't alter the utility of
the app).  Furthermore, the moment there is development effort involved, there is
an opportunity for bugs to creep in, resulting in a need for more comprehensive testing.
 Very quickly, the overhead of introducing a moment of delight like this becomes too
large and the idea is scrapped.

By using the beautify framework to style your app the real pain points of that
overhead disappear.  A designer can change the appearance of your app without any
development effort.  Using the approach of statically including your beautify theme with
a build, getting the resulting changes out there would still require a release build and
an app update through the AppStore.  However, with a very small one-off effort, it
is straightforward to take advantage of beautify's ability to re-theme your app at run-time
in order to have timely control over what your users see without the need for app updates.

Take, for example, our HOMR app.  It lets you find properties to buy and/or rent. It is
a fairly simple, dry concept; probably not something anyone is going to get particularly
excited about.  By applying seasonal themes to the app without impacting the functionality
of the app, it quickly becomes more fun, and this attention to detail leaves the
impression on the user that we really do care.

<div class="row">
    <div class="col-lg-6 col-md-6 col-sm-6">
        <small>Default Theme</small>
        <img src="{{ site.baseurl }}/assets/design-for-delight/default.png" style="width: 100%" />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
        <small>Winter Theme</small>
        <img src="{{ site.baseurl }}/assets/design-for-delight/winter.png" style="width: 100%" />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
        <small>Halloween Theme</small>
        <img src="{{ site.baseurl }}/assets/design-for-delight/halloween.png" style="width: 100%" />
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6">
        <small>Easter Theme (ouch, my eyes!)</small>
        <img src="{{ site.baseurl }}/assets/design-for-delight/easter.png" style="width: 100%" />
    </div>
</div>

<small style="font-style: italic">Note: HOMR is an internal app we use for testing (based
off the native iOS <a href="http://propertycross.com">PropertyCross</a> build). It is not and will
never be publicly available.</small>

<p></p>

It took barely any time at all to knock up these themes, and with the help of beautify I was
able to add timely elements of delight to the app without the need for any rebuilds or
other developer involvement.

I challenge you all to add moments of delight to your apps, and to do so in ways that do
not add a significant on-going overhead.

Regards, Graham O.