/**
 * Service for structured product analytics and comparisons
 */

// Calculate expected return based on product type and parameters
const calculateExpectedReturn = (product, marketScenario = 'neutral') => {
  // This is a simplified model - in production, use more sophisticated models
  let expectedReturn = 0;
  
  switch (product.type) {
    case 'CAPITAL_PROTECTED':
      // For capital protected products
      if (marketScenario === 'bullish') {
        expectedReturn = product.potentialYield * 0.9; // 90% of potential yield
      } else if (marketScenario === 'bearish') {
        expectedReturn = product.potentialYield * 0.3; // 30% of potential yield
      } else {
        expectedReturn = product.potentialYield * 0.6; // 60% of potential yield
      }
      break;
      
    case 'YIELD_ENHANCEMENT':
      // For yield enhancement products
      if (marketScenario === 'bullish') {
        expectedReturn = product.potentialYield;
      } else if (marketScenario === 'bearish') {
        // Calculate potential loss if barrier is breached
        const barrierLevel = product.knockInBarrier || 0.7; // Default to 70% if not specified
        const potentialLoss = (1 - barrierLevel) * 1.2; // Amplify the downside slightly
        expectedReturn = product.potentialYield - potentialLoss;
      } else {
        expectedReturn = product.potentialYield * 0.8; // 80% of potential yield
      }
      break;
      
    case 'PARTICIPATION':
      // For participation products
      const participationRate = product.participationRate || 1.0;
      if (marketScenario === 'bullish') {
        expectedReturn = 0.15 * participationRate; // Assume 15% market return
      } else if (marketScenario === 'bearish') {
        expectedReturn = -0.1 * (1 - (product.protectionLevel || 0) / 100); // Assume 10% market decline
      } else {
        expectedReturn = 0.05 * participationRate; // Assume 5% market return
      }
      break;
      
    case 'LEVERAGE':
      // For leverage products
      const leverageFactor = product.leverageFactor || 2.0;
      if (marketScenario === 'bullish') {
        expectedReturn = 0.15 * leverageFactor; // Assume 15% market return
      } else if (marketScenario === 'bearish') {
        expectedReturn = -0.1 * leverageFactor; // Assume 10% market decline
      } else {
        expectedReturn = 0.05 * leverageFactor; // Assume 5% market return
      }
      break;
      
    default:
      // Default case
      if (marketScenario === 'bullish') {
        expectedReturn = product.potentialYield || 0.1;
      } else if (marketScenario === 'bearish') {
        expectedReturn = 0;
      } else {
        expectedReturn = (product.potentialYield || 0.1) * 0.5;
      }
  }
  
  return expectedReturn;
};

// Calculate product risk score (1-10)
const calculateRiskScore = (product) => {
  // Base score from the risk level
  const riskLevelScores = {
    'LOW': 2,
    'MEDIUM_LOW': 4,
    'MEDIUM': 6,
    'MEDIUM_HIGH': 8,
    'HIGH': 10
  };
  
  let baseScore = riskLevelScores[product.riskLevel] || 5;
  
  // Adjust for product type
  const typeAdjustments = {
    'CAPITAL_PROTECTED': -1.5,
    'YIELD_ENHANCEMENT': 1,
    'PARTICIPATION': 0,
    'LEVERAGE': 2,
    'OTHER': 0
  };
  
  baseScore += typeAdjustments[product.type] || 0;
  
  // Adjust for liquidity
  const liquidityAdjustments = {
    'DAILY': -0.5,
    'WEEKLY': 0,
    'MONTHLY': 0.5,
    'QUARTERLY': 1,
    'ILLIQUID': 2
  };
  
  baseScore += liquidityAdjustments[product.liquidityProfile] || 0;
  
  // Adjust for protections
  if (product.protectionLevel) {
    baseScore -= (product.protectionLevel / 100) * 2; // Full protection reduces score by 2
  }
  
  // Ensure score is within 1-10 range
  return Math.max(1, Math.min(10, baseScore));
};

// Generate product comparison
const compareProducts = (products, clientRiskProfile = 'MEDIUM') => {
  // Map client risk profile to numeric value
  const riskToleranceMap = {
    'LOW': 3,
    'MEDIUM_LOW': 4.5,
    'MEDIUM': 6,
    'MEDIUM_HIGH': 7.5,
    'HIGH': 9
  };
  
  const clientRiskTolerance = riskToleranceMap[clientRiskProfile] || 6;
  
  // Calculate metrics for each product
  const productsWithMetrics = products.map(product => {
    const riskScore = calculateRiskScore(product);
    const expectedReturnNeutral = calculateExpectedReturn(product, 'neutral');
    const expectedReturnBullish = calculateExpectedReturn(product, 'bullish');
    const expectedReturnBearish = calculateExpectedReturn(product, 'bearish');
    
    // Calculate risk-adjusted return (simple Sharpe-like ratio)
const riskAdjustedReturn = expectedReturnNeutral / (riskScore / 5);
    
    // Calculate suitability score for this client (closer to 0 is better match)
    const riskDifference = Math.abs(riskScore - clientRiskTolerance);
    const suitabilityScore = 10 - riskDifference;
    
    return {
      ...product,
      metrics: {
        riskScore,
        expectedReturnNeutral,
        expectedReturnBullish,
        expectedReturnBearish,
        riskAdjustedReturn,
        suitabilityScore
      }
    };
  });
  
  // Sort by suitability score (descending)
  productsWithMetrics.sort((a, b) => b.metrics.suitabilityScore - a.metrics.suitabilityScore);
  
  return productsWithMetrics;
};

// Generate scenario analysis
const generateScenarioAnalysis = (product) => {
  // Define scenarios
  const scenarios = [
    { name: 'Very Bullish', marketReturn: 0.3, probability: 0.1 },
    { name: 'Bullish', marketReturn: 0.15, probability: 0.25 },
    { name: 'Neutral', marketReturn: 0.05, probability: 0.3 },
    { name: 'Bearish', marketReturn: -0.1, probability: 0.25 },
    { name: 'Very Bearish', marketReturn: -0.3, probability: 0.1 }
  ];
  
  // Calculate product return in each scenario
  const scenarioResults = scenarios.map(scenario => {
    let productReturn = 0;
    
    switch (product.type) {
      case 'CAPITAL_PROTECTED':
        // Capital protected product
        if (scenario.marketReturn > 0) {
          // Participation in upside
          const participationRate = product.participationRate || 0.5;
          productReturn = Math.min(product.potentialYield || 0, scenario.marketReturn * participationRate);
        } else {
          // Protection on downside
          productReturn = 0; // Assuming 100% capital protection
        }
        break;
        
      case 'YIELD_ENHANCEMENT':
        // Yield enhancement product (e.g., reverse convertible)
        if (scenario.marketReturn >= -0.1) {
          // Above barrier - full coupon
          productReturn = product.potentialYield || 0.08;
        } else {
          // Below barrier - loss plus coupon
          const barrierLevel = product.knockInBarrier || 0.7;
          if (1 + scenario.marketReturn < barrierLevel) {
            productReturn = scenario.marketReturn + (product.potentialYield || 0.08);
          } else {
            productReturn = product.potentialYield || 0.08;
          }
        }
        break;
      
      // Add other product types as needed...
      
      default:
        // Default calculation
        productReturn = scenario.marketReturn;
    }
    
    // Calculate expected monetary outcome
    const monetaryOutcome = product.notionalAmount * (1 + productReturn);
    
    return {
      scenario: scenario.name,
      marketReturn: scenario.marketReturn,
      productReturn,
      monetaryOutcome,
      probability: scenario.probability
    };
  });
  
  // Calculate expected return
  const expectedReturn = scenarioResults.reduce(
    (sum, scenario) => sum + (scenario.productReturn * scenario.probability), 
    0
  );
  
  // Calculate value at risk (95% confidence)
  const sortedReturns = [...scenarioResults].sort((a, b) => a.productReturn - b.productReturn);
  let cumulativeProbability = 0;
  let valueAtRisk = -sortedReturns[0].productReturn;
  
  for (const scenario of sortedReturns) {
    cumulativeProbability += scenario.probability;
    if (cumulativeProbability >= 0.05) {
      valueAtRisk = -scenario.productReturn;
      break;
    }
  }
  
  return {
    product: {
      name: product.name,
      issuer: product.issuer,
      type: product.type
    },
    scenarios: scenarioResults,
    summary: {
      expectedReturn,
      valueAtRisk,
      bestCase: Math.max(...scenarioResults.map(s => s.productReturn)),
      worstCase: Math.min(...scenarioResults.map(s => s.productReturn))
    }
  };
};

module.exports = {
  calculateExpectedReturn,
  calculateRiskScore,
  compareProducts,
  generateScenarioAnalysis
};
