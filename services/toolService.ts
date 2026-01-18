import { TOOLS_DATA } from '../constants';
import { Tool, FilterState, Category, UserTip } from '../types';
import { supabase } from './supabaseClient';

export const getTools = async (filters: FilterState): Promise<Tool[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = [...TOOLS_DATA];

  // Search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.description.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  // Category
  if (filters.category !== 'All') {
    filtered = filtered.filter(t => t.category === filters.category);
  }

  // Pricing
  if (filters.pricing !== 'All') {
    filtered = filtered.filter(t => t.pricing === filters.pricing);
  }

  // Sort
  if (filters.sortBy === 'popular') {
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  } else if (filters.sortBy === 'newest') {
    // Mock newest by ID for now, reversed
    filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  } else if (filters.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
};

export const getToolById = (id: string): Tool | undefined => {
  return TOOLS_DATA.find(t => t.id === id);
};

export const getRecommendations = (role: string, task: string, budget: string): Tool[] => {
  // Simple heuristic matching
  return TOOLS_DATA.filter(t => {
    let score = 0;
    const desc = t.description.toLowerCase();
    const tags = t.tags.join(' ').toLowerCase();
    const cat = t.category.toLowerCase();

    // Task Matching
    if (task.toLowerCase().includes('writ') && (cat.includes('writing') || tags.includes('writing') || desc.includes('writing'))) score += 2;
    if (task.toLowerCase().includes('cod') && (cat.includes('coding') || tags.includes('developer'))) score += 2;
    if (task.toLowerCase().includes('imag') && (cat.includes('image') || tags.includes('design'))) score += 2;
    if (task.toLowerCase().includes('data') && (cat.includes('data') || tags.includes('search'))) score += 2;

    // Budget Matching
    if (budget === 'Free' && t.pricing === 'Free') score += 1;
    if (budget === 'Any') score += 0.5;

    return score >= 1;
  }).slice(0, 3); // Return top 3
};

export const getRelatedTools = (tool: Tool): Tool[] => {
    return TOOLS_DATA.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 4);
};

// --- Tip Services (Supabase) ---

export const getToolTips = async (toolId: string): Promise<UserTip[]> => {
    try {
        const { data, error } = await supabase
            .from('tips')
            .select('*')
            .eq('tool_id', toolId)
            .order('created_at', { ascending: false });
        
        if (error) {
            console.warn("Supabase error fetching tips (likely missing table):", error.message);
            return [];
        }

        if (!data) return [];

        return data.map((tip: any) => ({
            id: tip.id,
            user: tip.user_name || 'Anonymous',
            content: tip.content,
            upvotes: tip.upvotes || 0,
            date: new Date(tip.created_at).toLocaleDateString()
        }));
    } catch (e) {
        console.warn("Error in getToolTips:", e);
        return [];
    }
}

export const addToolTip = async (toolId: string, user: string, content: string): Promise<UserTip | null> => {
    try {
        const { data, error } = await supabase
            .from('tips')
            .insert([{ tool_id: toolId, user_name: user, content: content, upvotes: 0 }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        if (!data) {
            throw new Error("No data returned from insert");
        }

        return {
            id: data.id,
            user: data.user_name,
            content: data.content,
            upvotes: data.upvotes,
            date: 'Just now'
        };
    } catch (err: any) {
        console.warn("Backend error adding tip. Falling back to mock for demo experience.", err.message || err);
        
        // Fallback: Return a successful mock object so the UI updates optimistically
        // This is crucial for prototypes where the backend might not be fully configured yet.
        return {
            id: `temp-${Date.now()}`,
            user: user,
            content: content,
            upvotes: 0,
            date: 'Just now'
        };
    }
}