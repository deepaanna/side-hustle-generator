document.getElementById('side-hustle-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const time = parseInt(this.time.value);
    const skill = this.skill.value;
    const budget = parseInt(this.budget.value);
    const difficulty = this.difficulty.value;

    const sideHustles = {
        writing: [
            { name: 'Freelance Blogging', cost: 0, timeEffort: 5, earnings: '$50-$500/mo', desc: 'Write for sites via Upwork or Medium.', why: 'Quick gigs for word lovers.', difficulty: 'beginner' },
            { name: 'eBook Author', cost: 10, timeEffort: 10, earnings: '$100-$1,000/mo', desc: 'Self-publish on Amazon KDP.', why: 'Scales with effort.', difficulty: 'intermediate' },
            { name: 'Copywriting', cost: 0, timeEffort: 5, earnings: '$100-$1,000/mo', desc: 'Craft ads on Fiverr.', why: 'High demand, fast cash.', difficulty: 'beginner' },
            { name: 'Ghostwriting', cost: 0, timeEffort: 20, earnings: '$200-$2,000/mo', desc: 'Write anonymously via LinkedIn.', why: 'Lucrative for pros.', difficulty: 'advanced' },
            { name: 'Content Editing', cost: 0, timeEffort: 10, earnings: '$50-$300/mo', desc: 'Proofread on Freelancer.com.', why: 'Steady work for detail nerds.', difficulty: 'intermediate' },
            { name: 'Newsletter Writer', cost: 0, timeEffort: 5, earnings: '$50-$400/mo', desc: 'Create emails via Substack.', why: 'Builds a following.', difficulty: 'beginner' },
            { name: 'Scriptwriting', cost: 20, timeEffort: 20, earnings: '$200-$1,500/mo', desc: 'Write for YouTubers on Upwork.', why: 'Creative and trending.', difficulty: 'advanced' },
            { name: 'SEO Articles', cost: 0, timeEffort: 10, earnings: '$100-$600/mo', desc: 'Optimize content via Textbroker.', why: 'In-demand skill.', difficulty: 'intermediate' }
        ],
        art: [
            { name: 'Digital Art Sales', cost: 20, timeEffort: 10, earnings: '$50-$500/mo', desc: 'Sell on Etsy or Redbubble.', why: 'Turns talent into cash.', difficulty: 'intermediate' },
            { name: 'Custom Stickers', cost: 50, timeEffort: 10, earnings: '$100-$1,000/mo', desc: 'Design via Stickermule.', why: 'Fun and profitable.', difficulty: 'intermediate' },
            { name: 'NFT Creation', cost: 100, timeEffort: 20, earnings: '$200-$10,000/mo', desc: 'Mint on OpenSea.', why: 'High reward for risk-takers.', difficulty: 'advanced' },
            { name: 'Portrait Commissions', cost: 0, timeEffort: 5, earnings: '$50-$300/mo', desc: 'Offer on Instagram.', why: 'Quick and personal.', difficulty: 'beginner' },
            { name: 'T-Shirt Design', cost: 10, timeEffort: 10, earnings: '$50-$400/mo', desc: 'Sell on Teespring.', why: 'Passive once designed.', difficulty: 'intermediate' },
            { name: 'Hand-Drawn Cards', cost: 20, timeEffort: 5, earnings: '$30-$200/mo', desc: 'Sell locally or on Etsy.', why: 'Low-tech art hustle.', difficulty: 'beginner' },
            { name: 'Logo Design', cost: 0, timeEffort: 10, earnings: '$100-$800/mo', desc: 'Freelance on 99designs.', why: 'High demand for branding.', difficulty: 'advanced' },
            { name: 'Art Prints', cost: 50, timeEffort: 5, earnings: '$50-$300/mo', desc: 'Print via Printful.', why: 'Scalable with low effort.', difficulty: 'intermediate' }
        ],
        tech: [
            { name: 'Website Testing', cost: 0, timeEffort: 5, earnings: '$20-$200/mo', desc: 'Test on UserTesting.', why: 'Easy tech entry.', difficulty: 'beginner' },
            { name: 'Freelance Coding', cost: 0, timeEffort: 10, earnings: '$200-$2,000/mo', desc: 'Build on Toptal.', why: 'High pay for skills.', difficulty: 'advanced' },
            { name: 'App Development', cost: 50, timeEffort: 20, earnings: '$500-$5,000/mo', desc: 'Use Bubble or Adalo.', why: 'Big payoff.', difficulty: 'advanced' },
            { name: 'Tech Support', cost: 0, timeEffort: 5, earnings: '$50-$500/mo', desc: 'Help via JustAnswer.', why: 'No coding needed.', difficulty: 'beginner' },
            { name: 'AI Prompt Engineering', cost: 0, timeEffort: 10, earnings: '$100-$1,000/mo', desc: 'Sell prompts on PromptBase.', why: '2025 hot trend.', difficulty: 'intermediate' },
            { name: 'WordPress Setup', cost: 20, timeEffort: 10, earnings: '$100-$600/mo', desc: 'Offer on Upwork.', why: 'Steady demand.', difficulty: 'intermediate' },
            { name: 'Data Entry', cost: 0, timeEffort: 5, earnings: '$20-$150/mo', desc: 'Work via Clickworker.', why: 'Simple tech gig.', difficulty: 'beginner' },
            { name: 'Chatbot Building', cost: 50, timeEffort: 20, earnings: '$200-$1,500/mo', desc: 'Use ManyChat for clients.', why: 'Future-proof skill.', difficulty: 'advanced' }
        ],
        sales: [
            { name: 'Affiliate Marketing', cost: 0, timeEffort: 10, earnings: '$50-$1,000/mo', desc: 'Promote via a blog or TikTok.', why: 'Passive potential.', difficulty: 'intermediate' },
            { name: 'Cold Calling', cost: 0, timeEffort: 5, earnings: '$50-$500/mo', desc: 'Sell for companies via Indeed.', why: 'Quick talker cash.', difficulty: 'beginner' },
            { name: 'eBay Reselling', cost: 20, timeEffort: 10, earnings: '$100-$800/mo', desc: 'Flip thrift store finds.', why: 'Low skill, high hustle.', difficulty: 'intermediate' },
            { name: 'Door-to-Door Sales', cost: 0, timeEffort: 10, earnings: '$100-$1,000/mo', desc: 'Sell solar locally.', why: 'High commission.', difficulty: 'advanced' },
            { name: 'Social Media Ads', cost: 50, timeEffort: 20, earnings: '$200-$2,000/mo', desc: 'Run ads for businesses on Fiverr.', why: 'Scalable sales skill.', difficulty: 'advanced' },
            { name: 'Thrift Store Flipping', cost: 10, timeEffort: 5, earnings: '$50-$300/mo', desc: 'Sell on Poshmark.', why: 'Fun and easy.', difficulty: 'beginner' },
            { name: 'Lead Generation', cost: 0, timeEffort: 10, earnings: '$100-$600/mo', desc: 'Find clients via LinkedIn.', why: 'Steady B2B gig.', difficulty: 'intermediate' },
            { name: 'Online Course Sales', cost: 50, timeEffort: 20, earnings: '$200-$1,500/mo', desc: 'Sell via Teachable affiliates.', why: 'Big wins for closers.', difficulty: 'advanced' }
        ],
        crafts: [
            { name: 'Handmade Jewelry', cost: 20, timeEffort: 10, earnings: '$50-$400/mo', desc: 'Sell on Etsy or craft fairs.', why: 'Creative cash flow.', difficulty: 'intermediate' },
            { name: 'Candle Making', cost: 50, timeEffort: 10, earnings: '$100-$600/mo', desc: 'Sell via Shopify.', why: 'Trendy and scalable.', difficulty: 'intermediate' },
            { name: 'Knitting Scarves', cost: 10, timeEffort: 5, earnings: '$30-$200/mo', desc: 'Sell locally or on Etsy.', why: 'Cozy hustle.', difficulty: 'beginner' },
            { name: 'Woodworking', cost: 100, timeEffort: 20, earnings: '$200-$1,000/mo', desc: 'Sell custom pieces on eBay.', why: 'High value craft.', difficulty: 'advanced' },
            { name: 'Sewing Repairs', cost: 0, timeEffort: 5, earnings: '$20-$150/mo', desc: 'Offer via Nextdoor.', why: 'Simple skill, steady work.', difficulty: 'beginner' },
            { name: 'DIY Home Decor', cost: 20, timeEffort: 10, earnings: '$50-$300/mo', desc: 'Sell on Facebook Marketplace.', why: 'Upcycle for profit.', difficulty: 'intermediate' },
            { name: 'Soap Making', cost: 30, timeEffort: 10, earnings: '$50-$400/mo', desc: 'Sell at farmers markets.', why: 'Low cost, high appeal.', difficulty: 'intermediate' },
            { name: 'Scrapbooking', cost: 10, timeEffort: 5, earnings: '$20-$100/mo', desc: 'Sell custom books on Etsy.', why: 'Niche but loyal market.', difficulty: 'beginner' }
        ],
        people: [
            { name: 'Virtual Assistant', cost: 0, timeEffort: 10, earnings: '$100-$800/mo', desc: 'Help businesses via Belay.', why: 'Flexible people gig.', difficulty: 'intermediate' },
            { name: 'Tutoring', cost: 0, timeEffort: 5, earnings: '$50-$300/mo', desc: 'Teach on Wyzant.', why: 'Share your smarts.', difficulty: 'beginner' },
            { name: 'Event Staffing', cost: 0, timeEffort: 5, earnings: '$50-$200/mo', desc: 'Work via TaskRabbit.', why: 'Social and quick.', difficulty: 'beginner' },
            { name: 'Life Coaching', cost: 50, timeEffort: 20, earnings: '$200-$1,500/mo', desc: 'Coach via Zoom, promote on Instagram.', why: 'Impactful work.', difficulty: 'advanced' },
            { name: 'Customer Support', cost: 0, timeEffort: 10, earnings: '$100-$600/mo', desc: 'Work remotely via Indeed.', why: 'Steady chat job.', difficulty: 'intermediate' },
            { name: 'Babysitting', cost: 0, timeEffort: 5, earnings: '$50-$300/mo', desc: 'Book via Care.com.', why: 'Kid-friendly cash.', difficulty: 'beginner' },
            { name: 'Senior Care', cost: 0, timeEffort: 10, earnings: '$100-$500/mo', desc: 'Assist via Papa.', why: 'Rewarding hustle.', difficulty: 'intermediate' },
            { name: 'Party Planning', cost: 20, timeEffort: 20, earnings: '$200-$1,000/mo', desc: 'Plan via Thumbtack.', why: 'Big wins for organizers.', difficulty: 'advanced' }
        ],
        hobbies: [
            { name: 'Gaming Streams', cost: 50, timeEffort: 20, earnings: '$50-$1,000/mo', desc: 'Stream on Twitch.', why: 'Play for pay.', difficulty: 'intermediate' },
            { name: 'Photography', cost: 100, timeEffort: 10, earnings: '$100-$800/mo', desc: 'Sell stock on Shutterstock.', why: 'Capture cash.', difficulty: 'advanced' },
            { name: 'Gardening Sales', cost: 20, timeEffort: 5, earnings: '$30-$200/mo', desc: 'Sell plants locally.', why: 'Green thumb gold.', difficulty: 'beginner' },
            { name: 'Cooking Classes', cost: 50, timeEffort: 10, earnings: '$100-$500/mo', desc: 'Teach via Outschool.', why: 'Foodie profit.', difficulty: 'intermediate' },
            { name: 'Trivia Hosting', cost: 0, timeEffort: 5, earnings: '$50-$300/mo', desc: 'Host at bars or online.', why: 'Fun facts pay off.', difficulty: 'beginner' },
            { name: 'Board Game Reviews', cost: 20, timeEffort: 10, earnings: '$20-$200/mo', desc: 'Post on YouTube.', why: 'Niche hobby cash.', difficulty: 'intermediate' },
            { name: 'Fishing Gear Resale', cost: 50, timeEffort: 5, earnings: '$50-$300/mo', desc: 'Sell on eBay.', why: 'Reel in profits.', difficulty: 'beginner' },
            { name: 'Cosplay Commissions', cost: 100, timeEffort: 20, earnings: '$200-$1,000/mo', desc: 'Craft for fans on Etsy.', why: 'Big for enthusiasts.', difficulty: 'advanced' }
        ],
        none: [
            { name: 'Dropshipping', cost: 50, timeEffort: 10, earnings: '$100-$1,000/mo', desc: 'Sell via Shopify.', why: 'No skills needed.', difficulty: 'intermediate' },
            { name: 'Online Surveys', cost: 0, timeEffort: 5, earnings: '$10-$100/mo', desc: 'Join Swagbucks.', why: 'Easiest start.', difficulty: 'beginner' },
            { name: 'Pet Sitting', cost: 0, timeEffort: 5, earnings: '$50-$300/mo', desc: 'Book on Rover.', why: 'Pet lover’s dream.', difficulty: 'beginner' },
            { name: 'Delivery Driver', cost: 0, timeEffort: 10, earnings: '$100-$800/mo', desc: 'Drive for DoorDash.', why: 'Steady cash.', difficulty: 'beginner' },
            { name: 'Ride-Sharing', cost: 0, timeEffort: 10, earnings: '$200-$1,000/mo', desc: 'Drive for Uber.', why: 'Flexible driving gig.', difficulty: 'intermediate' },
            { name: 'Mystery Shopping', cost: 0, timeEffort: 5, earnings: '$20-$150/mo', desc: 'Sign up on Field Agent.', why: 'Shop and earn.', difficulty: 'beginner' },
            { name: 'House Cleaning', cost: 20, timeEffort: 10, earnings: '$100-$500/mo', desc: 'Book via Handy.', why: 'Simple labor gig.', difficulty: 'intermediate' },
            { name: 'Car Washing', cost: 20, timeEffort: 5, earnings: '$50-$300/mo', desc: 'Offer via Nextdoor.', why: 'Quick cash outdoors.', difficulty: 'beginner' }
        ]
    };

    // Filter by time, budget, and difficulty
    let filteredHustles = sideHustles[skill].filter(hustle => 
        hustle.timeEffort <= time && 
        hustle.cost <= budget && 
        hustle.difficulty === difficulty
    );
    if (filteredHustles.length === 0) {
        filteredHustles = sideHustles[skill].filter(hustle => 
            hustle.timeEffort <= time && hustle.cost <= budget
        ).slice(0, 1); // Fallback to closest match
    }
    filteredHustles.sort(() => Math.random() - 0.5); // Shuffle
    const maxResults = time === 5 ? 1 : time === 10 ? 2 : 3;
    const selectedHustles = filteredHustles.slice(0, maxResults);

    // Generate rich response
    const output = selectedHustles.map(hustle => `
        <li>
            <strong>${hustle.name}</strong> (Est. Earnings: ${hustle.earnings})<br>
            <em>Startup Cost:</em> $${hustle.cost} | <em>Time:</em> ${hustle.timeEffort} hrs/wk | <em>Level:</em> ${hustle.difficulty}<br>
            ${hustle.desc}<br>
            <em>Why it’s great:</em> ${hustle.why}
        </li>
    `).join('');

    document.getElementById('side-hustle-result').innerHTML = `
        <h3>Your Tailored Side Hustles:</h3>
        <ul>${output}</ul>
        <p><em>Matched to ${time} hrs/wk, $${budget} budget, and ${difficulty}-level ${skill} skills!</em></p>
    `;
});