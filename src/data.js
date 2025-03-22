// export const articles = [
//     {
//       id: 1,
//       title: 'Understanding Market Volatility: A Guide for Beginners',
//       excerpt: 'Learn how market fluctuations affect your investments and strategies to navigate through volatile periods.',
//       image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300',
//       category: 'investing',
//       tags: ['Market', 'Volatility', 'Risk Management'],
//       date: '2025-03-15',
//       readTime: 8,
//       featured: true
//     },
//     {
//       id: 2,
//       title: 'Retirement Planning in Your 30s: What You Need to Know',
//       excerpt: 'Starting early is key. Discover essential strategies for building a solid retirement foundation in your thirties.',
//       image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300',
//       category: 'retirement',
//       tags: ['Retirement', 'Planning', 'Long-term'],
//       date: '2025-03-10',
//       readTime: 6,
//       featured: false
//     },
//     {
//       id: 9,
//       title: 'Retirement Planning in Your 30s: What You Need to Know',
//       excerpt: 'Starting early is key. Discover essential strategies for building a solid retirement foundation in your thirties.',
//       image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300',
//       category: 'retirement',
//       tags: ['Retirement', 'Planning', 'Long-term'],
//       date: '2025-03-10',
//       readTime: 6,
//       featured: false
//     },
//     {
//       id: 102,
//       title: 'Retirement Planning in Your 30s: What You Need to Know',
//       excerpt: 'Starting early is key. Discover essential strategies for building a solid retirement foundation in your thirties.',
//       image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300',
//       category: 'retirement',
//       tags: ['Retirement', 'Planning', 'Long-term'],
//       date: '2025-03-10',
//       readTime: 6,
//       featured: false
//     },
//     {
//       id: 3,
//       title: 'Real Estate Investment Trusts: A Passive Income Strategy',
//       excerpt: 'REITs offer an accessible way to invest in real estate without directly owning property. Learn the pros and cons.',
//       image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300',
//       category: 'realestate',
//       tags: ['REIT', 'Passive Income', 'Real Estate'],
//       date: '2025-03-05',
//       readTime: 7,
//       featured: false
//     },
//     {
//       id: 4,
//       title: 'Emergency Funds: How Much Should You Really Save?',
//       excerpt: 'The conventional wisdom of 3-6 months of expenses might not apply to everyone. Find out whats right for you.',
//       image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300',
//       category: 'saving',
//       tags: ['Emergency Fund', 'Savings', 'Financial Security'],
//       date: '2025-02-28',
//       readTime: 5,
//       featured: false
//     },
//     {
//       id: 5,
//       title: 'Index Funds vs. Actively Managed Funds: The Showdown',
//       excerpt: 'A comprehensive comparison of passive and active investment strategies to help you make informed decisions.',
//       image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300',
//       category: 'investing',
//       tags: ['Index Funds', 'Active Management', 'Comparison'],
//       date: '2025-02-20',
//       readTime: 9,
//       featured: true
//     },
//     {
//       id: 6,
//       title: 'Dividend Stocks: Building Wealth Through Regular Income',
//       excerpt: 'How to create a portfolio of dividend-paying stocks that generates consistent passive income.',
//       image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300',
//       category: 'stocks',
//       tags: ['Dividends', 'Income Investing', 'Stocks'],
//       date: '2025-02-15',
//       readTime: 7,
//       featured: false
//     }
//   ];

export const articles = Array.from({ length: 100 }, (_, index) => {
    const id = index + 1;
    const categories = ['investing', 'retirement', 'realestate', 'saving', 'stocks', 'taxes', 'crypto', 'economy', 'budgeting'];
    const tagsMap = {
      investing: ['Stocks', 'Bonds', 'ETFs', 'Portfolio', 'Diversification', 'Risk', 'Market Trends'],
      retirement: ['401(k)', 'IRA', 'Pension', 'Social Security', 'Savings', 'Long-term'],
      realestate: ['REITs', 'Mortgage', 'Rental', 'Commercial', 'Flipping', 'Appraisal'],
      saving: ['Emergency Fund', 'High-Yield', 'CDs', 'Automation', 'Goals', 'Interest Rates'],
      stocks: ['Dividends', 'Growth', 'Value', 'Blue Chip', 'IPO', 'Sector Rotation'],
      taxes: ['Deductions', 'IRS', 'Retirement', 'Capital Gains', 'Tax-Loss Harvesting', 'Filing'],
      crypto: ['Bitcoin', 'Blockchain', 'Altcoins', 'Wallet', 'NFTs', 'DeFi'],
      economy: ['Inflation', 'Recession', 'GDP', 'Unemployment', 'Fed Rates', 'Consumer Spending'],
      budgeting: ['Zero-Based', '50/30/20', 'Tracking', 'Apps', 'Debt Payoff', 'Frugality']
    };
  
    // Random category and tags
    const category = categories[Math.floor(Math.random() * categories.length)];
    const tags = tagsMap[category].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Common article properties
    return {
      id,
      title: generateTitle(category, id),
      excerpt: generateExcerpt(category),
      image: `https://source.unsplash.com/random/800x600/?finance,${category}&sig=${id}`,
      category,
      tags,
      date: generateDate(id),
      readTime: 5 + Math.floor(Math.random() * 11), // 5-15 minutes
      featured: Math.random() < 0.02 // 15% chance of being featured
    };
  });
  
  // Helper functions
  function generateTitle(category, id) {
    const titles = {
      investing: [
        `Modern Portfolio Theory: Building Wealth in ${2020 + (id % 10)}`,
        'The Power of Compound Interest',
        'Sector Rotation Strategies for Current Markets',
        'Understanding Bear Market Psychology',
        'Global vs Domestic Investments: A Balanced Approach'
      ],
      retirement: [
        'Roth vs Traditional IRA: Which is Right for You?',
        'Healthcare Costs in Retirement: Planning Ahead',
        'The 4% Rule Revisited: Sustainable Withdrawals',
        'Social Security Optimization Strategies',
        'Part-Time Work in Retirement: Pros and Cons'
      ],
      realestate: [
        'House Hacking: Live for Free While Building Equity',
        'Commercial Real Estate Trends in Urban Areas',
        'Short-Term Rental Regulations: What Investors Need to Know',
        'REITs vs Physical Property: Passive Income Showdown',
        'Green Building Tax Incentives for 2024'
      ],
      saving: [
        'High-Yield Savings Accounts: Maximizing Your Cash',
        'CD Laddering Strategies for Rising Rate Environments',
        'Emergency Fund Psychology: Overcoming Savings Guilt',
        'Automating Your Way to Financial Freedom',
        'The True Cost of Lifestyle Inflation'
      ],
      stocks: [
        'Value Investing in Growth Markets',
        'Technical Analysis: Tools for Modern Traders',
        'ESG Investing: Doing Well While Doing Good',
        'IPO Analysis: Separating Hype from Value',
        'Dividend Aristocrats: Reliable Income Streams'
      ],
      taxes: [
        'Tax-Efficient Withdrawal Strategies in Retirement',
        'Charitable Contributions: Maximizing Deductions',
        'Cryptocurrency Tax Reporting Made Simple',
        'State Tax Considerations for Digital Nomads',
        'Audit Red Flags: How to Stay Compliant'
      ],
      crypto: [
        'Blockchain Technology: Beyond Cryptocurrency',
        'Cold Storage Wallets: Securing Your Digital Assets',
        'Regulatory Outlook for Decentralized Finance',
        'NFT Use Cases in Modern Finance',
        'Crypto Portfolio Diversification Strategies'
      ],
      economy: [
        'Yield Curve Inversion: Recession Predictor Explained',
        'Global Supply Chain Impacts on Inflation',
        'Central Bank Digital Currencies: The Future of Money?',
        'Labor Market Trends in Post-Pandemic Economy',
        'Consumer Debt Levels: A Ticking Time Bomb?'
      ],
      budgeting: [
        'Envelope System for Digital Age Money Management',
        'Couponing 2.0: Modern Savings Strategies',
        'Subscription Audit: Cutting Hidden Costs',
        'Financial Minimalism: Less Spending, More Living',
        'Family Budgeting: Aligning Values with Spending'
      ]
    };
  
    return titles[category][Math.floor(Math.random() * titles[category].length)];
  }
  
  function generateExcerpt(category) {
    const excerpts = {
      investing: 'Discover actionable strategies to grow your wealth through smart investment decisions...',
      retirement: 'Plan your golden years with confidence using these research-backed approaches...',
      realestate: 'Navigate the complex world of property investment with expert insights...',
      saving: 'Maximize your savings potential through disciplined habits and smart tools...',
      stocks: 'Analyze market trends and company fundamentals to make informed trading decisions...',
      taxes: 'Optimize your tax situation and keep more of your hard-earned money...',
      crypto: 'Understand the risks and opportunities in the rapidly evolving world of digital assets...',
      economy: 'Decode macroeconomic trends and their impact on personal finances...',
      budgeting: 'Take control of your cash flow with proven money management techniques...'
    };
    return excerpts[category];
  }
  
  function generateDate(id) {
    const startDate = new Date(2024, 0, 1);
    const increment = id * 2; // 2 days between articles
    const newDate = new Date(startDate.setDate(startDate.getDate() + increment));
    return newDate.toISOString().split('T')[0];
  }