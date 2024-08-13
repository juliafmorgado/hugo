---
title: "The Ultimate eSports Experience: Inside the AWS VALORANT Champions VIP Hospitality 2023"
author: "Julia Furst Morgado"
date: 2023-09-07T11:46:05.964Z
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/valorant2023.png
tags: 
    - AWS
    - Communities
    - Conferences
categories: 
    - Tech
slug: /inside-aws-valorant-champions-vip-hospitality-2023




---

If you think Los Angeles is only about Hollywood celebrities and palm trees, think again. I recently had the privilege to be invited by AWS - Amazon Web Services, to attend the VALORANT final championship. It was two adrenaline-packed days through the world of eSports that left me with a whole new perspective on gaming.

![Julia standing at the Valorant fanfest](https://blog-imgs-23.s3.amazonaws.com/LA-valorant2023.png)

## eSports Is More Than Just Games

Before I dive into the schedule and my wholesome experience, I want to clarify something about [eSports](https://www.esports.net/wiki/guides/what-is-esports/). It's not just a bunch of folks (nerds 😝) playing video games; it's a highly organized, competitive environment where elite gamers battle it out for fame (yes, they are celebs) and fortune. Think of it as the Olympics of gaming, where teams compete in various titles, and fans from all over the world tune in to watch.

At the heart of this eSports extravaganza is Riot Games, a game-developing company that has taken the gaming world by storm with titles like League of Legends and Valorant. Valorant, a tactical first-person shooter with a massive player base, demands precision, teamwork, strategy, and SUPER low latency. 

![Picture of the stadium during the Valorant Championship](https://blog-imgs-23.s3.amazonaws.com/game-valorant.jpeg)

For me, this event was more than just playing the game (since I've probably only played Mario Kart once in my life); it was about seeing how AWS and Riot Games have joined forces to revolutionize the world of eSports.

## A Game-Changing Partnership between AWS and Riot Games

Picture this: [Riot Games](www.riotgames.com), the powerhouse behind some of the most popular titles in the gaming world, and [AWS](www.aws.com), a giant in cloud computing and artificial intelligence, coming together to reshape the landscape of eSports. The result? BOOM, a dynamic collaboration that's taking gaming to the next level.

AWS is the backbone of Riot's entire infrastructure. Its cutting-edge technology optimizes player experience, reduces latency, and ensures that everything runs smoothly. In an eSports world where milliseconds can be the difference between victory and defeat, AWS is a game-changer. Imagine watching your favorite gamers battle it out in real-time, with AWS ensuring that you don't miss a single shot of the action.

## Technical Panel with Geeks and Gamers

One of the highlights of the event was the Technical Panel we had on the first night, where we could hear and ask questions to some of the brightest minds in both gaming and tech. 

[Alex "Goldenboy" Mendez](https://twitter.com/GoldenboyFTW), an eSports host and commentator with a competitive gaming background, started by leading the discussion and explaining how the Valorant game works. He covered topics like the different agents in the game and their roles, some types of weapons, and the overall structure of the Valorant Champions Tour tournaments. What I got from it was: Valorant rewards strategy and tactical thinking. Which requires a combination of aiming skills, map awareness, understanding of agent abilities, decision-making, and cooperation with your team (that's why the team players are always talking to each other during the game). It was also awesome to talk to him in person and on the next day see him on the big screen narrating the game. 

![Golden Boy talk](https://blog-imgs-23.s3.amazonaws.com/golden-boy.png)

Then, there was a panel featuring key technical leaders from AWS ([Jun David](https://www.linkedin.com/in/jundavid/), [Randy James](https://www.linkedin.com/in/randiskull/), and [Shiva Natarajan](https://www.linkedin.com/in/shiva-natarajan-937b6a/)) and Riot Games ([John Knauss](https://www.linkedin.com/in/jrknauss/), [Brian Miller](https://www.linkedin.com/in/brimil01/), and [Gabriel Isenberg](https://www.linkedin.com/in/gabrielisenberg/)). They delved into several technical topics, which I'm going to address next, including the launch of VALORANT and how Riot's player platform evolved to accommodate multiple gamers across the world seamlessly.

![Tech panel of AWS and Riot Games Engineers](https://blog-imgs-23.s3.amazonaws.com/panel-valorant.jpeg)

### Peekers Advantage

One of the biggest technical challenges when it comes to shooter games like [Valorant](www.valorant.com) is peekers advantage.

![Image from Riot Games about Peekers Advantage](https://blog-imgs-23.s3.amazonaws.com/peekers-advantage.png)

[Peeker’s advantage](https://dotesports.com/valorant/news/peekers-advantage-in-valorant-explained) is a complex and often divisive aspect of VALORANT gameplay. It refers to the time difference between a player peeking around a corner and the maximum time a holder has to react before being eliminated. Typically, the peeker sees their opponent first, leaving the holder with less time to react.

To address this often-unwelcome feature and improve gameplay,  Riot Games is implementing several changes:

- **Animation Blending**: Riot is working on updating animation blending to eliminate lag when transitioning from "running" to "standing."
- **Corpse-Blocking**: They are addressing the issue of "corpse-blocking" to ensure constant enemy visibility even after they've been eliminated.
- **Delay in Player Deaths**: Riot plans to introduce a slight delay in player deaths, allowing you to see what the player who defeated you is doing.
- **Optimized Game Client**: The VALORANT game client is being optimized to run at 60FPS on most modern machines, with higher framerates for high refresh rate monitors.
- **Minimal Buffering**: Both clients and servers are being run with minimal buffering to ensure responsive gameplay. Riot aims for one buffered frame of movement data for clients and an average of half a frame of movement data on servers.
- **Latency Reduction**: Riot is focusing on reducing latency for players and optimizing servers to achieve a 35ms ping for 70% of the player base.


Now let's talk about latency.

### Reducing Latency

Riot Games has made significant investments in reducing latency for players and optimizing server performance. Their approach includes both strategic server placement and technological enhancements. 

1. **Strategic Server Placement**: When Riot Games initially partnered with AWS, their server placement strategy was based on the utilization of AWS regions. However, through a data-driven approach that involved analyzing their existing League of Legends player base, they gained valuable insights into player demographics and geographic distribution. By conducting thorough assessments of key factors like ping, packet loss, and latency, it became clear that players situated beyond the boundaries of these AWS regions were not experiencing an optimal gaming experience.

In response, Riot Games transitioned from AWS Outposts to AWS-managed Local Zones, a move that significantly expanded their server presence. They currently operate in a total of 33 Local Zones globally. This shift allowed Riot to cater to players in regions previously overlooked, ensuring a more equitable experience for all. The identification of players using VPNs in various locations further informed their server placement strategy. This assessment was based on user latency compared to players physically located in specific regions.

2. **Optimizing Game Routing**: Riot established its internet backbone, [Riot Direct](https://technology.riotgames.com/news/leveling-networking-multi-game-future), to ensure efficient routing of game data. By identifying key points of presence and establishing direct fiber connections, they created a high-speed network that prioritizes game traffic. This network enables minimal packet loss and lower latency, enhancing the overall gaming experience.

### Matchmaking

In terms of matchmaking (connecting players to a game), Riot has services dedicated to matching players based on skill level and, more importantly, latency. When players try to enter a game, they check their ping to the game servers and then also consider how that correlates with the people in their party. For example, if they are in different states or countries,  it's imperative to connect them to a game server that can deliver satisfactory performance for all participants to ensure a fair gaming experience.

### Machine Learning (ML)

In collaboration with AWS Machine Learning Labs, Riot Games ventured into the world of ML to predict a team's likelihood of winning games, initially in League of Legends and now expanding to Valorant. This initiative aims to create a dynamic API offering real-time updates on win expectancy, enriching the experience for live commentators and viewers alike.

Furthermore, ML is used for [Automated Smurf Detection](https://playvalorant.com/en-us/news/dev/valorant-systems-health-series-smurf-detection/), to monitor smurf account MMRs (matchmaking ranks).
The smurf detection system works in such a way that it'll detect the skill level of newly created accounts and rank them up faster to adjust the skill gap.

## Gaming As A Career

Now, let me dispel a common misconception that I always had, and probably a lot of you also do: the idea that gaming is merely a hobby. From what I learned at the event, gaming can be a legitimate career.

Gamers today can secure contracts with professional teams, benefit from the guidance of coaches, nutritionists, personal trainers and physiotherapists and enjoy the potential to earn millions through partnerships, streaming, and competitive championships. I had the privilege of conversing with partners of the [Loud team](https://liquipedia.net/valorant/LOUD), the Brazilian squad that claimed third place in the championship, and they enlightened me about the intense dedication involved, where players immerse themselves in gaming day in and day out, receive expert coaching, and much more.

Yet, don’t think it’s easy to become a famous gamer. It demands an incredible amount of time, effort, and a multitude of other factors, many of which remain a mystery to me (otherwise, I'd be right there with them lol!).

## VALORANT Champions Tournament and Execution

Now let's delve into the heart-pounding action of the trip. 
Watch a summary of the first day [here](https://www.instagram.com/p/CwWnVDxrhLK/). The semi-final match between LOUD and Evil Geniuses had us on the edge of our seats. As a [LOUD](https://loud.gg) supporter, I joined the spirited crowd of Brazilians in the stadium. Unfortunately, [Evil Geniuses](https://evilgeniuses.gg/) emerged victorious in a nail-biting 3-2 finish.

During an exclusive backstage tour of the Kia Forum, we explored the tournament's inner workings (no pictures were allowed). This included a visit to the server room, guarded around the clock by a guard. Only a few people had access to enter there. The reason for the physical servers is that they offer predictable performance and lower latency crucial for the championship.

In the parking lot of the stadium were the broadcasting trucks. These trucks connect to a primary center in Dublin for global coverage, reaching millions of viewers online. Riot's global events team works with 22 broadcast partners in 21 languages.

![Valorant Statistics](https://blog-imgs-23.s3.amazonaws.com/valorant-stats.png)

The broadcast begins at the arena and is curated into a world feed via Riot Direct (the same server infrastructure used for games). From there, it's distributed to regional teams worldwide, each featuring native language broadcasts with region-specific narratives.


The next day was the final championship match between Evil Geniuses and Singapore's [Paper Rex](https://www.pprx.team/). We were all anxious to know Who would win the big gold trophy plus a $1 million prize. We attended the Kia Forum again, where we watched the Valorant Champions opening ceremony, with live performances of singers and dancers, including the official anthem ["Ticking Away" ft. Grabbitz & bbno](https://www.youtube.com/watch?v=CdZN8PI3MqM), an Ignition remix with [@its_emei](https://www.instagram.com/its.emei/?hl=en) and [Jazz Alonso](https://www.instagram.com/jazz_alonso_/?hl=en), and the song [“Greater Than One” by @ericdoa3347](https://www.youtube.com/watch?v=N7dUOC4x55E). The opening ceremony resembled a Super Bowl finale, featuring an extravagant display of fire, smoke, and lights that got the audience suuuper excited!
You can watch it here: ![Valorant Champions Opening Ceremony](https://www.youtube.com/watch?app=desktop&v=dWXDui9Cjmg)
It was a battle of wits and skills, and Evil Geniuses won the title with a 3-1 victory. It was a historical moment for the gaming industry because the team's coach, [Christine Chi](https://www.instagram.com/omgitspotter/?hl=en), aka Potter, became the first female coach to win a major eSports championship.


![Evil Geniuses collage](https://blog-imgs-23.s3.amazonaws.com/evil-geniuses.png)

## Gaming's Bright Future

In summary, my AWS VALORANT Champions VIP Hospitality Experience was nothing short of thrilling and packed with delightful surprises. From the thoughtful welcome kit to the delicious meals we enjoyed together, the lively fan fest, engaging panel discussions, enlightening VIP tours, and the heart-pounding gaming showdowns – every moment was unforgettable.

![Fanfest Valorant at Kia Forum](https://blog-imgs-23.s3.amazonaws.com/fanfest-valorant.png)

Sharing this incredible journey with fellow AWS community builders and heroes was a true pleasure, and added an extra layer of excitement to the experience. 

![AWS Community](https://blog-imgs-23.s3.amazonaws.com/aws-community-valorant.png)

I extend my heartfelt gratitude to the entire AWS team for their invitation and impeccable organization of this extraordinary experience, leaving no detail unattended. I eagerly look forward to the opportunity to participate in another Riot Games event in the future.

My vlog is coming out soon, so stay tuned on my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel or my social media where I’ll share it when it's live!

What questions do you have about eSports, cloud-based gaming, and the tech that powers all of this? 🤔💭

![Julia in the Valorant Stadium](https://blog-imgs-23.s3.amazonaws.com/kia-valorant-j.jpeg)

***
If you liked this article, go follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey) daily, connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
