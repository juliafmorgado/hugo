---
title: How can I become an Open Source contributor? (The ultimate guide)
author: Julia Furst Morgado
date: 2022-12-26T11:36:55.320Z
lastmod: 2023-01-08T10:34:28-05:00
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/2022-12-26_how-can-i-become-an-open-source-contributor-the-ultimate-guide_0.jpeg
tags: 
    - Open Source
    - Tips
    - Guides
slug: /guide-to-become-open-source-contributor


image: "https://blog-imgs-23.s3.amazonaws.com/2022-12-26_how-can-i-become-an-open-source-contributor-the-ultimate-guide_0.jpeg" 
images:
 - "https://blog-imgs-23.s3.amazonaws.com/2022-12-26_how-can-i-become-an-open-source-contributor-the-ultimate-guide_0.jpeg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-12-26_how-can-i-become-an-open-source-contributor-the-ultimate-guide_1.png"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-12-26_how-can-i-become-an-open-source-contributor-the-ultimate-guide_2.png"

---

If you're asking yourself this 👆question (I know many of you are), you've come to the right place.

Many apps you use today contain a significant amount of open source software (OSS), and the number of businesses employing open source is consistently growing. Despite this, only a limited number of people contribute to and maintain it.

There is a lot of work behind open source, and we could use your help! Keep reading to find out about how you can contribute and where you can get started.

> “Contributing to open source can be a rewarding way to learn, teach, and build expertise in just about any skill you can imagine.” (Open Source Guide)

### Why contribute?

There are many reasons why you might want to contribute to open source.
In my case, I started after going to [KubeCon](/from-kubecon-to-my-first-keynote-as-a-devrel-203b1c9bfb4b) where I learned about many exciting projects and wanted to help & get involved with the CNCF community.

Your case might be different. You might want to find a mentor or hone your skills to build their CV, “scratch an itch” (fix a problem you're having), or various other reasons.

### What you need to know before you start

Most open source projects will be hosted on GitHub, so you need to [create an account](https://github.com/signup) there. If you are unfamiliar with GitHub, you can go directly to [the official page](https://docs.github.com/en/get-started/quickstart/hello-world) to learn how to get started.

I assume most people reading this blog post have never contributed to a project in Open Source, so I recommend you use just the GitHub interface instead of cloning the repository to your local machine. Because if you do, you'll need to learn how to use Git (which is VERY important as well) and it can be a little too overwhelming to do all at once.

If watching the videos makes it easier, check out my past [live stream](https://www.youtube.com/watch?v=HCStp-Ln554), where I show how to contribute using the GitHub interface.

If you're feeling bold and want to contribute using Git, I have a [step-by-step video](https://www.youtube.com/watch?v=WYjjpOwAhaU&t=202s) for first-time contributors.

Remember, any project you decide to contribute to should have a community channel (usually on Slack or Discord). Make sure to join them in case you need to ask questions or want to meet other contributors.

Also, most projects are maintained by volunteers, so sometimes the response time for questions/PR's reviews may take a while, depending on the schedule and time zone of each person involved.

### Ways to contribute

There are SO many ways you can contribute to Open Source. You don't even have to be a programmer. You can do many things that don’t involve coding and don’t (have to) take a lot of time.

#### - Write documentation

This is often mentioned as an easy way to get started, as you don’t need to know a lot of programming to contribute. Some skills that might help are writing articulately, attention to detail (like spelling and grammar), coming up with good examples, etc.

Ways you can help:

- Read the documentation to see if it is clear and complete. If not, offer suggestions on how to improve it. Or at least inform maintainers what is unclear to you and why.
- Fix small things, like typos or dead links. * Add missing information, especially if it is something you had to find out for yourself (either with or without the help of the community). Someone else might have the same problem.
- Add (links to) relevant blog posts (even your own).
- Review any open PR’s (pull requests) on the documentation. Look for the abovementioned things: it is clear, complete, correct? Do you see any typos or other mistakes? (Have I mentioned it’s hard to spot typos in something you’ve been working on for a while?)

#### - Translate documentation (aka localization)

If you don’t know how the project works, translating the documentation is an excellent way to learn. That’s how I first started contributing and learning about Kubernetes. Of course, you need to speak [fluently] another language, so the translation matches the original text.

Many people don’t speak or don’t feel comfortable working in English, so your contribution can go a long way!

Some projects that need help with translation:

- [Kubernetes](https://github.com/kubernetes/website)*
- [CNCF Glossary](https://github.com/cncf/glossary)*
- [React](https://translations.reactjs.org/)
- [Python](https://devguide.python.org/documentation/translating/)
- [PHP](http://doc.php.net/tutorial/translating.php)
- [Mozilla Firefox](https://community.mozilla.org/en/activities/localize-mozilla/)
- [Ruby on Rails](https://edgeguides.rubyonrails.org/contributing_to_ruby_on_rails.html)
- [Rocket.chat](https://github.com/RocketChat/docs/blob/master/contributors/how-can-i-help/translating.md)

*More info on those projects at the end of this blog post.

The projects below use a tool called [Crowdin](https://crowdin.com/projects#showcases) that provides an external interface for managing all of the different language translations:

- [GitLab](https://crowdin.com/project/gitlab-ee)
- [NodeJS](https://crowdin.com/project/nodejs-website)
- [Directus](https://locales.directus.io/)
- [Postgre SQL](https://crowdin.com/project/postgresql)
- [Mastodon](https://crowdin.com/project/mastodon)
- [OpenProject](https://crowdin.com/profile/opf)

Suppose you don’t find any localization issues. In that case, you can create new ones (for example, volunteer to translate a blog post) and keep an eye out because every time there’s an update in English, you can volunteer to translate it to your language.

#### - Answer questions

As a user, you can probably help other users with problems you have faced before. Remember, someone probably helped you in the past in one way or another. Share what you have learned!

And if you notice a lot of similar questions, consider adding them to the documentation.

#### - Create issues

The least you can do if you encounter a problem is create an issue. Maintainers might not all use the project the same way and might not be aware of an issue unless you tell them.

Before creating an issue, please check that there isn’t an open issue for the same problem (prevent duplication). If there is, you might be able to add additional helpful information to that issue.

When you create an issue, please be as specific as possible and provide sufficient information to help maintainers understand and reproduce your issue. Many projects use templates requesting the type of information they need; make use of them! Or, if they don’t use a template, maybe you can add one to the project?

And again, if it is something you can fix yourself, please do!

Note: If you are unsure you have found a bug, please contact the community to ask them. It will often be quicker to get help that way, and it might also start up a dialog on the issue, how to reproduce it, etc., which will make it easier to fix.

#### - Label issues

Many projects on GitHub use labels, to signify the type of issues. Which labels are used will vary per project, but labels can help people find a similar issue to theirs (preventing duplicate issues from being created), or help people find issues they could contribute to. Adding the proper labels to issues can help maintainers and users of the project, which is something other maintainers might not have time for.

Note: Sometimes you need specific permissions to add labels to a project, but it’s worth checking out.

#### - Reproduce an issue

When someone opens an issue, a maintainer needs to look at it to understand it. This is where you can help! Is the issue clearly described, and does it contain sufficient information to be reproduced? If you can reproduce it, you might be able to provide additional helpful information.

And if you can’t, you could ask the original author for more information. Or maybe the issue can be closed!

#### - Review PR's

Reviewing PR’s can be a lot of work. If you are not too familiar with the code base, you might not be able to say anything about the overall usefulness or direction of the PR, but you might still be able to help. You could check the readability of the code, see whether the test coverage is good, look for typos, etc. Alternatively, you might be able to build the branch locally and test it to see if it solves whatever issue it was designed to solve. You can still review documentation even if you can’t read code (see yesterday’s post).

#### - Add unit tests

If you know how, you could try to add a unit test that reproduces the issue, which both shows there is an issue and will help get it fixed. And if you can, fix it yourself!

#### - Test new features

Maintainers and contributors don’t always have time to extensively test new features or versions. This is where you can help! Create a new project to test the new feature, or upgrade your existing project to the new version (even if it is still in development). Provide feedback to the people who are working on it.

Note: there might not be open issues registered for test work. That doesn’t mean it’s not needed! You might hear about test work needed when you become a more active community member. If you’d like to do this but are unaware of anything that needs testing, ask the community!

#### - Clean up code

Projects might also benefit from refactoring or cleaning up code. There are plenty of ways the code can be improved, especially if they have been developed over several years by different developers.

#### - Upgrade dependencies

If you notice a project is using outdated dependencies, see if you can upgrade them. Especially if the older versions contain security vulnerabilities. Note that some projects might introduce breaking changes, so always ensure that the project works with the upgraded dependency.

#### - Other

There might be other ways for you to contribute. Even if you’re not a programmer, you might have other skills valuable to a project.

If you do have ways to contribute that are not mentioned here, please let me know in the comments!

### Where to find an Open Source project to contribute to

#### Websites:

If you have no idea where to start, several websites list projects looking for help:
* GitHub itself offers some suggestions on [choosing projects](https://github.com/collections/choosing-projects).
* Have a look on [CodeTriage](https://www.codetriage.com/) for projects with open issues
* Look for issues by project, label (like “good first issue”) and/or tag (for example, your preferred programming language) on [Up-for-grabs](https://up-for-grabs.net/#/)
* You can also find these links and more on [First Timers Only](https://www.firsttimersonly.com/)

#### Projects you use yourself:

Consider helping out with a project you use yourself. You’ll be more familiar with the project, and you might even be able to solve your own problems. If you are already part of their community, you’ll better understand what is needed.

#### Focus on welcoming communities!

Focus on projects that welcome new contributors. Some of the following might help:

- See if there are any issues marked “first timers only”, “good first issue” or something similar; this would signify they are open / looking for new contributors and give you an idea of where to start.
- See how they respond to issues created or PR’s opened (do they ask for more information in a polite or a hostile way, how constructive is feedback on PR’s or issues)
- Check to see if there is a code of conduct, contributing guidelines or things like that (and whether they are enforced)
- Join the communication channel(s) to see how the community interacts Know that there are plenty of projects and communities out there who would love, love, LOVE your help!

### When you shouldn't contribute to open source

#### Employer or contract doesn’t allow it

This might be a valid reason for you not to contribute, especially to the code. You might still be able to help the community by answering questions from other users, sharing your experience, creating issues or adding relevant information to them.

If your employer uses a specific open source project, consider suggesting to become a sponsor. Several projects accept donations through OpenCollective, Patreon, or other platforms. That is a great idea to still be helpful!

#### Not sure if its a bug or how to fix it

If you have a question, please contact the community. Many projects have an active user community willing to help you. If you’re unsure you’ve found a bug, just ask them. They’ll let you know whether you should log an issue. They will also ask you for the information they need to fix it.

If you want to add a feature but don’t know how, there might be people to help you get started. They could point you in the right direction regarding where to make the change or provide insights on where the project is going. Proposing your change before doing a lot of work on it will also prevent you from building a feature that might not align with the project’s direction.

#### Don’t have time

Again, fair enough. You might have other priorities in your life. Not all contributions have to be big or take a lot of time. There might be small things you can do. You might be able to do them at work if they are related to your work (and your employer allows you to!). Engaging with the community by asking and answering questions or logging issues can also benefit the community!

#### Being a noob…

Please don’t underestimate the value of a fresh pair of eyes!

Documentation, especially beginner tutorials, should be easy to follow, even for people new to the project. The project itself should be easy to use. If they are not, this is your chance to provide valuable feedback!

If you are having any problems when using the project, contact the community and let them know. And if they take the time to help you, why not document what you have learned for the next person who comes along?

Even if you are not having any problems right now, you can still read the documentation and provide feedback.

### START NOW

However you are using open source, and however little you feel you have to contribute, there are plenty of small ways to improve it.

I hope I’ve given you some ideas to try. Please find a way to contribute to your favorite open source project now, and let me know if you have any questions!

### Extra info on some OSS projects

#### [Project Glossary CNCF](https://glossary.cncf.io/)

The Cloud Native Glossary aims to explain the concepts of cloud-native applications in clear and simple language, without requiring any prior technical knowledge.

There are many ways to become a contributor to this community. You can contribute with new terms or help translate the glossary. Anyone can contribute, and all contributions are equally important and help the community grow.

Go to [the official](https://glossary.cncf.io/contribute/) "how to contribute" page for more details such as styles, best practices, etc.

In this [link](https://github.com/cncf/glossary/issues?q=is%3Aissue+is%3Aopen+label%3Alang%2Fpt+no%3Aassignee+) you can view all terms pending translation (change the label to your language. For example Hindi would be label:lang/hi, French would be label:lang/fr)

![](https://blog-imgs-23.s3.amazonaws.com/2022-12-26_how-can-i-become-an-open-source-contributor-the-ultimate-guide_1.png#layoutTextWidth)

I recommend that you familiarize yourself first with the dynamics of the project by contributing to the translation of terms before proposing a new term.

The project’s official repository on Github can be found [here](https://github.com/cncf/glossary) .

You can also interact directly with everyone involved in the [CNCF slack](http://cloud-native.slack.com). Join the localization channels in your language, for example #glossary-localization-portuguese or #glossary-localization-hindi.

#### [Project Kubernetes website](https://kubernetes.io/pt-br/)

The same philosophy applies here; anyone can contribute to the documentation. Any improvement of existing content and translation is welcome.

However, this is an exciting project because it's a unique opportunity to help the community and learn more about Kubernetes.

On this [page](https://kubernetes.io/docs/contribute/), you will find guidance on how to contribute to the Kubernetes documentation.

Thanks to our outstanding contributors, you can view the page in another language (change it on the top right corner).

![](https://blog-imgs-23.s3.amazonaws.com/2022-12-26_how-can-i-become-an-open-source-contributor-the-ultimate-guide_2.png#layoutTextWidth)

The project’s official Github repository can be found [here](https://github.com/kubernetes/website/)

You can also speak directly with the people involved and with the various contributors through the [channel on slack](http://kubernetes.slack.com). Again, join the group in your language for example [#kubernetes-docs-pt](https://kubernetes.slack.com/archives/CJ21AS0NA).

* * *
If you liked this article, go follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey) daily, connect with me on on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
