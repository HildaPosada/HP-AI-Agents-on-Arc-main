// Mock data for frontend-only deployment

export const mockSpendingData = {
  response: `# Spending Analysis for December 2024

## Total Spending: $3,847.32

### Category Breakdown:
- **Groceries**: $892.45 (23%)
- **Dining**: $654.20 (17%)
- **Transportation**: $423.18 (11%)
- **Entertainment**: $387.50 (10%)
- **Shopping**: $765.99 (20%)
- **Utilities**: $724.00 (19%)

### Key Insights:
- Your spending is up 12% from last month
- Dining expenses increased significantly
- You're on track with your monthly budget
- Consider reducing dining out to save more

### Recommendations:
1. Set a dining budget of $500/month
2. Use grocery delivery to reduce impulse purchases
3. Review subscriptions under Entertainment`,
  session_id: "mock-session-spending",
  timestamp: Date.now(),
};

export const mockPerksData = {
  response: `# Your Banking Perks & Rewards

## Active Perks:
✅ **Premium Checking** - No monthly fees
✅ **Cash Back Rewards** - 2% on all purchases
✅ **Travel Insurance** - Complimentary coverage
✅ **Priority Support** - 24/7 dedicated line

## Available Points: 12,450
**Redemption Value**: $124.50

## This Month's Rewards:
- Cash back earned: $47.80
- Bonus points: 2,500
- Total saved: $67.30

## Upcoming Opportunities:
- Double points on dining (valid until Dec 31)
- 5% cash back at select retailers
- Refer a friend bonus: $50

## Recommendations:
- Redeem points for travel to maximize value
- Activate the dining bonus category
- Consider upgrading to Platinum for airport lounge access`,
  session_id: "mock-session-perks",
  timestamp: Date.now(),
};

export const mockPortfolioData = {
  response: `# Investment Portfolio Summary

## Total Portfolio Value: $87,432.50
**YTD Return**: +14.2% 📈

### Asset Allocation:
- **Stocks**: $52,459 (60%)
  - US Large Cap: $31,475
  - International: $12,984
  - Small Cap: $8,000

- **Bonds**: $26,173 (30%)
  - Government: $15,704
  - Corporate: $10,469

- **Cash**: $8,800 (10%)

### Top Holdings:
1. S&P 500 Index Fund - $28,500 (32.6%)
2. Total Bond Market - $15,200 (17.4%)
3. International Equity - $12,984 (14.8%)

### Performance:
- Best performer: Tech Sector +22.3%
- Dividend income YTD: $2,147
- Risk level: Moderate

### Recommendations:
- Portfolio is well-diversified
- Consider rebalancing stocks (currently overweight)
- Tax-loss harvesting opportunity in small cap
- Schedule annual review before year-end`,
  session_id: "mock-session-portfolio",
  timestamp: Date.now(),
};

export const mockAdvisorsData = {
  response: `# Financial Advisory Services

## Your Financial Advisor: Sarah Chen, CFP®
**Specialty**: Wealth Management & Retirement Planning

### Recent Activities:
- Portfolio review completed on Nov 15
- Tax planning session scheduled for Dec 10
- Retirement projection updated

### Current Goals Progress:
✅ **Emergency Fund**: 100% funded ($24,000)
🔄 **Retirement Savings**: 67% on track
🔄 **College Fund**: 45% funded
⏳ **Home Down Payment**: 30% saved

### Next Steps:
1. **Immediate**: Review tax-loss harvesting opportunities
2. **This Quarter**: Maximize 401(k) contributions
3. **Next Quarter**: Estate planning review

### Available Services:
- Complimentary financial planning
- Investment management (0.75% AUM fee)
- Tax optimization strategies
- Estate planning consultation

### Schedule Consultation:
Your next quarterly review is scheduled for:
**December 18, 2024 at 2:00 PM**

📞 Call: (555) 123-4567
📧 Email: sarah.chen@cymbalbank.com`,
  session_id: "mock-session-advisors",
  timestamp: Date.now(),
};

export const mockChatResponses: Record<string, string> = {
  spending: "I can help you analyze your spending patterns! Based on your recent transactions, you've spent $3,847.32 this month. Would you like me to break this down by category or suggest ways to save?",
  
  perks: "Great question about perks! You currently have 12,450 rewards points worth $124.50. You also have access to premium checking benefits, travel insurance, and 2% cash back on all purchases. Would you like to learn how to maximize these rewards?",
  
  portfolio: "Your investment portfolio is performing well with a 14.2% return this year! Your current balance is $87,432.50 with a moderate risk allocation. Would you like a detailed breakdown of your holdings or recommendations for rebalancing?",
  
  advisors: "Your financial advisor Sarah Chen is available to help with wealth management and retirement planning. Your emergency fund is fully funded at $24,000, and you're 67% on track for retirement. Would you like to schedule a consultation?",
  
  default: "I'm here to help with your banking needs! I can assist with:\n\n• **Spending Analysis** - Track and categorize your expenses\n• **Rewards & Perks** - Maximize your banking benefits\n• **Investment Portfolio** - Review your holdings and performance\n• **Financial Advice** - Connect with advisors and plan your future\n\nWhat would you like to know more about?",
};

export function getMockChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("spend") || lowerMessage.includes("expense") || lowerMessage.includes("budget")) {
    return mockChatResponses.spending;
  }
  
  if (lowerMessage.includes("perk") || lowerMessage.includes("reward") || lowerMessage.includes("point") || lowerMessage.includes("cashback")) {
    return mockChatResponses.perks;
  }
  
  if (lowerMessage.includes("portfolio") || lowerMessage.includes("invest") || lowerMessage.includes("stock") || lowerMessage.includes("bond")) {
    return mockChatResponses.portfolio;
  }
  
  if (lowerMessage.includes("advisor") || lowerMessage.includes("advice") || lowerMessage.includes("plan") || lowerMessage.includes("retirement")) {
    return mockChatResponses.advisors;
  }
  
  return mockChatResponses.default;
}
