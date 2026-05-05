/**
 * Automated Team Assignment Algorithms
 * Intelligent routing of orders to optimize delivery times
 */

import { 
  collection, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Order, TeamMember, Collections } from './database-schema';

export interface TeamCapacity {
  memberId: string;
  memberName: string;
  role: 'project_manager' | 'developer' | 'designer' | 'content_manager' | 'qa_tester' | 'seo_specialist';
  skills: string[];
  currentWorkload: number; // percentage 0-100
  activeOrders: number;
  maxConcurrentOrders: number;
  averageSetupTime: number; // minutes
  successRate: number; // percentage
  clientSatisfaction: number; // 1-5 rating
  availableHours: number; // hours available this week
  timezone: string;
  languages: ('en' | 'ar')[];
  specializations: string[];
}

export interface AssignmentResult {
  projectManager: string;
  teamMembers: string[];
  estimatedCompletionTime: number; // minutes
  confidenceScore: number; // 0-100
  reasoning: string[];
}

export class TeamAssignmentEngine {
  
  /**
   * Main function to assign optimal team for an order
   */
  static async assignTeamToOrder(order: Order): Promise<AssignmentResult> {
    try {
      // Get available team members
      const availableTeam = await this.getAvailableTeamMembers();
      
      // Calculate order complexity score
      const complexityScore = this.calculateOrderComplexity(order);
      
      // Find optimal project manager
      const projectManager = await this.selectProjectManager(order, availableTeam, complexityScore);
      
      // Assemble specialist team
      const teamMembers = await this.assembleSpecialistTeam(order, availableTeam, complexityScore);
      
      // Estimate completion time
      const estimatedTime = this.estimateCompletionTime(order, projectManager, teamMembers, availableTeam);
      
      // Calculate confidence score
      const confidenceScore = this.calculateConfidenceScore(order, projectManager, teamMembers, availableTeam);
      
      // Generate reasoning
      const reasoning = this.generateAssignmentReasoning(order, projectManager, teamMembers, availableTeam);
      
      return {
        projectManager: projectManager.memberId,
        teamMembers: teamMembers.map(tm => tm.memberId),
        estimatedCompletionTime: estimatedTime,
        confidenceScore,
        reasoning
      };
      
    } catch (error) {
      console.error('Team assignment failed:', error);
      
      // Fallback assignment
      return {
        projectManager: 'default_pm',
        teamMembers: ['default_dev'],
        estimatedCompletionTime: this.getTargetTime(order.package),
        confidenceScore: 50,
        reasoning: ['Fallback assignment due to system error']
      };
    }
  }
  
  /**
   * Get available team members with current workload
   */
  private static async getAvailableTeamMembers(): Promise<TeamCapacity[]> {
    // In a real implementation, this would query Firebase
    // For now, return mock data representing current team
    return [
      {
        memberId: 'pm001',
        memberName: 'Sarah Johnson',
        role: 'project_manager',
        skills: ['shopify', 'woocommerce', 'project_management', 'client_communication'],
        currentWorkload: 60,
        activeOrders: 3,
        maxConcurrentOrders: 5,
        averageSetupTime: 85,
        successRate: 98,
        clientSatisfaction: 4.8,
        availableHours: 20,
        timezone: 'UTC-5',
        languages: ['en'],
        specializations: ['ecommerce', 'automation']
      },
      {
        memberId: 'pm002',
        memberName: 'Ahmed Al-Rashid',
        role: 'project_manager',
        skills: ['salla', 'zid', 'arabic_markets', 'project_management'],
        currentWorkload: 40,
        activeOrders: 2,
        maxConcurrentOrders: 4,
        averageSetupTime: 75,
        successRate: 96,
        clientSatisfaction: 4.9,
        availableHours: 30,
        timezone: 'UTC+3',
        languages: ['en', 'ar'],
        specializations: ['gcc_markets', 'arabic_ecommerce']
      },
      {
        memberId: 'dev001',
        memberName: 'Marcus Chen',
        role: 'developer',
        skills: ['shopify', 'woocommerce', 'javascript', 'liquid', 'php'],
        currentWorkload: 70,
        activeOrders: 4,
        maxConcurrentOrders: 6,
        averageSetupTime: 45,
        successRate: 99,
        clientSatisfaction: 4.7,
        availableHours: 15,
        timezone: 'UTC-8',
        languages: ['en'],
        specializations: ['shopify_apps', 'custom_development']
      },
      {
        memberId: 'dev002',
        memberName: 'Fatima Hassan',
        role: 'developer',
        skills: ['salla', 'zid', 'react', 'arabic_rtl', 'api_integration'],
        currentWorkload: 50,
        activeOrders: 2,
        maxConcurrentOrders: 5,
        averageSetupTime: 50,
        successRate: 97,
        clientSatisfaction: 4.8,
        availableHours: 25,
        timezone: 'UTC+3',
        languages: ['en', 'ar'],
        specializations: ['arabic_platforms', 'rtl_design']
      },
      {
        memberId: 'des001',
        memberName: 'Emily Rodriguez',
        role: 'designer',
        skills: ['ui_design', 'branding', 'figma', 'photoshop'],
        currentWorkload: 80,
        activeOrders: 3,
        maxConcurrentOrders: 4,
        averageSetupTime: 60,
        successRate: 95,
        clientSatisfaction: 4.9,
        availableHours: 10,
        timezone: 'UTC-6',
        languages: ['en'],
        specializations: ['modern_design', 'conversion_optimization']
      },
      {
        memberId: 'des002',
        memberName: 'Omar Al-Mahmoud',
        role: 'designer',
        skills: ['arabic_design', 'rtl_layouts', 'cultural_adaptation'],
        currentWorkload: 35,
        activeOrders: 1,
        maxConcurrentOrders: 3,
        averageSetupTime: 55,
        successRate: 94,
        clientSatisfaction: 4.8,
        availableHours: 30,
        timezone: 'UTC+3',
        languages: ['en', 'ar'],
        specializations: ['arabic_design', 'cultural_localization']
      },
      {
        memberId: 'seo001',
        memberName: 'David Kim',
        role: 'seo_specialist',
        skills: ['google_seo', 'keyword_research', 'analytics'],
        currentWorkload: 45,
        activeOrders: 2,
        maxConcurrentOrders: 6,
        averageSetupTime: 30,
        successRate: 92,
        clientSatisfaction: 4.6,
        availableHours: 25,
        timezone: 'UTC-5',
        languages: ['en'],
        specializations: ['ecommerce_seo', 'google_ads']
      }
    ];
  }
  
  /**
   * Calculate order complexity score (0-100)
   */
  private static calculateOrderComplexity(order: Order): number {
    let complexity = 0;
    
    // Base complexity by package
    const packageComplexity = {
      'basic': 20,
      'premium': 50,
      'enterprise': 80
    };
    complexity += packageComplexity[order.package] || 40;
    
    // Platform complexity
    const platformComplexity = {
      'shopify': 0,
      'woocommerce': 10,
      'salla': 15,
      'zid': 15,
      'custom': 30
    };
    complexity += platformComplexity[order.service] || 10;
    
    // Requirements complexity
    if (order.requirements) {
      const req = order.requirements;
      
      // Product count
      if (req.products > 100) complexity += 15;
      else if (req.products > 50) complexity += 10;
      else if (req.products > 10) complexity += 5;
      
      // Multi-language
      if (req.languages && req.languages.length > 1) complexity += 20;
      
      // Custom features
      if (req.customFeatures && req.customFeatures.length > 0) {
        complexity += req.customFeatures.length * 5;
      }
      
      // Multiple payment gateways
      if (req.paymentGateways && req.paymentGateways.length > 2) {
        complexity += 10;
      }
      
      // Multiple shipping zones
      if (req.shippingZones && req.shippingZones.length > 2) {
        complexity += 10;
      }
      
      // Integrations
      if (req.integrations && req.integrations.length > 0) {
        complexity += req.integrations.length * 8;
      }
    }
    
    return Math.min(complexity, 100);
  }
  
  /**
   * Select optimal project manager
   */
  private static async selectProjectManager(
    order: Order, 
    team: TeamCapacity[], 
    complexity: number
  ): Promise<TeamCapacity> {
    const projectManagers = team.filter(member => member.role === 'project_manager');
    
    if (projectManagers.length === 0) {
      throw new Error('No project managers available');
    }
    
    // Score each PM
    const scoredPMs = projectManagers.map(pm => {
      let score = 0;
      
      // Availability (40% weight)
      const availabilityScore = (pm.maxConcurrentOrders - pm.activeOrders) / pm.maxConcurrentOrders;
      score += availabilityScore * 40;
      
      // Platform expertise (25% weight)
      const platformMatch = pm.skills.includes(order.service) ? 1 : 0;
      score += platformMatch * 25;
      
      // Performance metrics (20% weight)
      score += (pm.successRate / 100) * 10;
      score += (pm.clientSatisfaction / 5) * 10;
      
      // Language match (15% weight)
      const clientLanguage = this.getClientLanguage(order);
      const languageMatch = pm.languages.includes(clientLanguage) ? 1 : 0;
      score += languageMatch * 15;
      
      // Workload penalty
      score -= (pm.currentWorkload / 100) * 20;
      
      return { pm, score };
    });
    
    // Sort by score and return best match
    scoredPMs.sort((a, b) => b.score - a.score);
    return scoredPMs[0].pm;
  }
  
  /**
   * Assemble specialist team based on order requirements
   */
  private static async assembleSpecialistTeam(
    order: Order, 
    team: TeamCapacity[], 
    complexity: number
  ): Promise<TeamCapacity[]> {
    const selectedTeam: TeamCapacity[] = [];
    const clientLanguage = this.getClientLanguage(order);
    
    // Always need a developer
    const developers = team.filter(member => 
      member.role === 'developer' && 
      member.activeOrders < member.maxConcurrentOrders
    );
    
    const bestDeveloper = this.selectBestMemberForRole(developers, order, 'developer');
    if (bestDeveloper) selectedTeam.push(bestDeveloper);
    
    // Need designer for premium+ packages or if custom design requested
    if (order.package !== 'basic' || complexity > 40) {
      const designers = team.filter(member => 
        member.role === 'designer' && 
        member.activeOrders < member.maxConcurrentOrders
      );
      
      const bestDesigner = this.selectBestMemberForRole(designers, order, 'designer');
      if (bestDesigner) selectedTeam.push(bestDesigner);
    }
    
    // Need SEO specialist for premium+ packages
    if (order.package === 'premium' || order.package === 'enterprise') {
      const seoSpecialists = team.filter(member => 
        member.role === 'seo_specialist' && 
        member.activeOrders < member.maxConcurrentOrders
      );
      
      const bestSEO = this.selectBestMemberForRole(seoSpecialists, order, 'seo_specialist');
      if (bestSEO) selectedTeam.push(bestSEO);
    }
    
    // Add content manager for large product catalogs
    if (order.requirements?.products && order.requirements.products > 50) {
      const contentManagers = team.filter(member => 
        member.role === 'content_manager' && 
        member.activeOrders < member.maxConcurrentOrders
      );
      
      if (contentManagers.length > 0) {
        selectedTeam.push(contentManagers[0]);
      }
    }
    
    return selectedTeam;
  }
  
  /**
   * Select best team member for specific role
   */
  private static selectBestMemberForRole(
    candidates: TeamCapacity[], 
    order: Order, 
    role: string
  ): TeamCapacity | null {
    if (candidates.length === 0) return null;
    
    const clientLanguage = this.getClientLanguage(order);
    
    const scoredCandidates = candidates.map(member => {
      let score = 0;
      
      // Platform expertise
      const platformMatch = member.skills.includes(order.service) ? 25 : 0;
      score += platformMatch;
      
      // Language match
      const languageMatch = member.languages.includes(clientLanguage) ? 20 : 0;
      score += languageMatch;
      
      // Performance
      score += (member.successRate / 100) * 15;
      score += (member.clientSatisfaction / 5) * 15;
      
      // Availability
      const availability = (member.maxConcurrentOrders - member.activeOrders) / member.maxConcurrentOrders;
      score += availability * 15;
      
      // Speed (lower setup time is better)
      const speedScore = Math.max(0, 100 - member.averageSetupTime) / 100;
      score += speedScore * 10;
      
      return { member, score };
    });
    
    scoredCandidates.sort((a, b) => b.score - a.score);
    return scoredCandidates[0].member;
  }
  
  /**
   * Estimate completion time based on team composition
   */
  private static estimateCompletionTime(
    order: Order, 
    pm: TeamCapacity, 
    team: TeamCapacity[], 
    allTeam: TeamCapacity[]
  ): number {
    const targetTime = this.getTargetTime(order.package);
    
    // Base time from PM's average
    let estimatedTime = pm.averageSetupTime;
    
    // Adjust based on team composition
    const teamAverage = team.reduce((sum, member) => sum + member.averageSetupTime, 0) / team.length;
    estimatedTime = (estimatedTime + teamAverage) / 2;
    
    // Complexity adjustment
    const complexity = this.calculateOrderComplexity(order);
    const complexityMultiplier = 1 + (complexity / 200); // Max 50% increase
    estimatedTime *= complexityMultiplier;
    
    // Team workload adjustment
    const avgWorkload = [pm, ...team].reduce((sum, member) => sum + member.currentWorkload, 0) / (team.length + 1);
    const workloadMultiplier = 1 + (avgWorkload / 500); // Max 20% increase for high workload
    estimatedTime *= workloadMultiplier;
    
    // Platform expertise bonus
    const platformExpertise = team.filter(member => member.skills.includes(order.service)).length;
    const expertiseMultiplier = Math.max(0.8, 1 - (platformExpertise * 0.1)); // Up to 20% reduction
    estimatedTime *= expertiseMultiplier;
    
    return Math.min(estimatedTime, targetTime * 1.5); // Never exceed 150% of target
  }
  
  /**
   * Calculate confidence score for assignment
   */
  private static calculateConfidenceScore(
    order: Order, 
    pm: TeamCapacity, 
    team: TeamCapacity[], 
    allTeam: TeamCapacity[]
  ): number {
    let confidence = 100;
    
    // Team availability
    const avgWorkload = [pm, ...team].reduce((sum, member) => sum + member.currentWorkload, 0) / (team.length + 1);
    confidence -= avgWorkload * 0.3; // Reduce confidence for high workload
    
    // Platform expertise
    const platformExperts = [pm, ...team].filter(member => member.skills.includes(order.service)).length;
    confidence += platformExperts * 10;
    
    // Language match
    const clientLanguage = this.getClientLanguage(order);
    const languageExperts = [pm, ...team].filter(member => member.languages.includes(clientLanguage)).length;
    confidence += languageExperts * 5;
    
    // Team performance
    const avgSuccessRate = [pm, ...team].reduce((sum, member) => sum + member.successRate, 0) / (team.length + 1);
    confidence += (avgSuccessRate - 90) * 0.5; // Bonus/penalty from 90% baseline
    
    // Complexity vs experience
    const complexity = this.calculateOrderComplexity(order);
    const teamExperience = [pm, ...team].reduce((sum, member) => sum + member.specializations.length, 0);
    if (complexity > 70 && teamExperience < 3) confidence -= 20;
    
    return Math.max(20, Math.min(100, confidence));
  }
  
  /**
   * Generate human-readable reasoning for assignment
   */
  private static generateAssignmentReasoning(
    order: Order, 
    pm: TeamCapacity, 
    team: TeamCapacity[], 
    allTeam: TeamCapacity[]
  ): string[] {
    const reasoning: string[] = [];
    const complexity = this.calculateOrderComplexity(order);
    const clientLanguage = this.getClientLanguage(order);
    
    // PM selection reasoning
    reasoning.push(`Selected ${pm.memberName} as PM due to ${pm.successRate}% success rate and availability`);
    
    if (pm.languages.includes(clientLanguage) && clientLanguage === 'ar') {
      reasoning.push(`PM speaks Arabic, matching client language preference`);
    }
    
    // Team composition reasoning
    const developer = team.find(m => m.role === 'developer');
    if (developer && developer.skills.includes(order.service)) {
      reasoning.push(`${developer.memberName} has direct experience with ${order.service}`);
    }
    
    const designer = team.find(m => m.role === 'designer');
    if (designer && clientLanguage === 'ar' && designer.languages.includes('ar')) {
      reasoning.push(`Arabic-speaking designer assigned for cultural adaptation`);
    }
    
    // Complexity reasoning
    if (complexity > 70) {
      reasoning.push(`High complexity order (${complexity}/100) - assembled experienced team`);
    } else if (complexity < 30) {
      reasoning.push(`Straightforward order (${complexity}/100) - efficient minimal team`);
    }
    
    // Timeline reasoning
    const avgWorkload = [pm, ...team].reduce((sum, member) => sum + member.currentWorkload, 0) / (team.length + 1);
    if (avgWorkload < 50) {
      reasoning.push(`Team has low workload (${Math.round(avgWorkload)}%) - faster delivery expected`);
    } else if (avgWorkload > 80) {
      reasoning.push(`Team at high capacity (${Math.round(avgWorkload)}%) - may need additional time`);
    }
    
    return reasoning;
  }
  
  /**
   * Get target delivery time based on package
   */
  private static getTargetTime(packageType: string): number {
    const times = {
      'basic': 240,     // 4 hours (Lightning)
      'premium': 1440,  // 24 hours (Thunder)
      'enterprise': 4320 // 72 hours (Storm)
    };
    return times[packageType] || 1440;
  }
  
  /**
   * Determine client's preferred language
   */
  private static getClientLanguage(order: Order): 'en' | 'ar' {
    // Check client country for Arabic-speaking regions
    const arabicCountries = ['SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'EG', 'JO', 'LB', 'SY', 'IQ', 'YE'];
    
    // In a real implementation, this would check the client's profile
    // For now, assume Arabic for GCC countries
    return 'en'; // Default to English, would be determined from client data
  }
  
  /**
   * Update team member workload after assignment
   */
  static async updateTeamWorkload(
    teamMembers: string[], 
    orderId: string, 
    estimatedHours: number
  ): Promise<void> {
    try {
      // In a real implementation, this would update team member records
      console.log(`📋 Updated workload for team members: ${teamMembers.join(', ')}`);
      console.log(`📊 Order ${orderId} estimated: ${estimatedHours} hours`);
      
      // TODO: Update team member workload in Firebase
      for (const memberId of teamMembers) {
        // await updateDoc(doc(db, Collections.TEAM_MEMBERS, memberId), {
        //   currentWorkload: newWorkload,
        //   activeOrders: increment(1),
        //   updatedAt: Timestamp.now()
        // });
      }
      
    } catch (error) {
      console.error('Failed to update team workload:', error);
    }
  }
  
  /**
   * Get team recommendations for order type
   */
  static async getTeamRecommendations(orderType: string): Promise<{
    recommendedSize: number;
    requiredRoles: string[];
    estimatedTime: number;
    tips: string[];
  }> {
    const recommendations = {
      'lightning': {
        recommendedSize: 2,
        requiredRoles: ['project_manager', 'developer'],
        estimatedTime: 240, // 4 hours
        tips: [
          'Focus on speed over customization',
          'Use pre-built templates',
          'Minimal testing phase',
          'Direct client communication'
        ]
      },
      'thunder': {
        recommendedSize: 4,
        requiredRoles: ['project_manager', 'developer', 'designer', 'seo_specialist'],
        estimatedTime: 1440, // 24 hours
        tips: [
          'Include design customization time',
          'Plan for SEO optimization',
          'Allow buffer for client feedback',
          'Implement email automation'
        ]
      },
      'storm': {
        recommendedSize: 6,
        requiredRoles: ['project_manager', 'developer', 'designer', 'seo_specialist', 'content_manager', 'qa_tester'],
        estimatedTime: 4320, // 72 hours
        tips: [
          'Plan multi-phase delivery',
          'Include comprehensive testing',
          'Allow time for integrations',
          'Implement advanced features',
          'Detailed documentation required'
        ]
      }
    };
    
    return recommendations[orderType] || recommendations['thunder'];
  }
  
  /**
   * Load balancing across team members
   */
  static async redistributeWorkload(): Promise<{
    balanced: boolean;
    actions: string[];
    recommendations: string[];
  }> {
    const team = await this.getAvailableTeamMembers();
    const actions: string[] = [];
    const recommendations: string[] = [];
    
    // Find overloaded members (>90% capacity)
    const overloaded = team.filter(member => member.currentWorkload > 90);
    
    // Find underutilized members (<40% capacity)
    const underutilized = team.filter(member => member.currentWorkload < 40);
    
    if (overloaded.length > 0) {
      actions.push(`Found ${overloaded.length} overloaded team members`);
      recommendations.push('Consider hiring additional staff or redistributing workload');
      
      for (const member of overloaded) {
        recommendations.push(`${member.memberName} at ${member.currentWorkload}% capacity - delegate some work`);
      }
    }
    
    if (underutilized.length > 0) {
      actions.push(`Found ${underutilized.length} underutilized team members`);
      recommendations.push('Assign more projects to underutilized team members');
    }
    
    // Check for skill gaps
    const skillCoverage = this.analyzeSkillCoverage(team);
    if (skillCoverage.gaps.length > 0) {
      recommendations.push(`Skill gaps identified: ${skillCoverage.gaps.join(', ')}`);
    }
    
    return {
      balanced: overloaded.length === 0 && underutilized.length <= 1,
      actions,
      recommendations
    };
  }
  
  /**
   * Analyze team skill coverage
   */
  private static analyzeSkillCoverage(team: TeamCapacity[]): {
    covered: string[];
    gaps: string[];
    redundant: string[];
  } {
    const requiredSkills = [
      'shopify', 'woocommerce', 'salla', 'zid',
      'javascript', 'php', 'liquid', 'react',
      'ui_design', 'arabic_design', 'branding',
      'google_seo', 'arabic_seo', 'analytics'
    ];
    
    const teamSkills = team.flatMap(member => member.skills);
    const skillCounts = teamSkills.reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const covered = requiredSkills.filter(skill => skillCounts[skill] > 0);
    const gaps = requiredSkills.filter(skill => !skillCounts[skill]);
    const redundant = Object.entries(skillCounts)
      .filter(([skill, count]) => count > 3)
      .map(([skill]) => skill);
    
    return { covered, gaps, redundant };
  }
}

// Export convenience functions
export const assignTeamToOrder = TeamAssignmentEngine.assignTeamToOrder;
export const updateTeamWorkload = TeamAssignmentEngine.updateTeamWorkload;
export const getTeamRecommendations = TeamAssignmentEngine.getTeamRecommendations;
export const redistributeWorkload = TeamAssignmentEngine.redistributeWorkload;