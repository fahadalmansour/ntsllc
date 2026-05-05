import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b245be9a/health", (c) => {
  return c.json({ status: "ok" });
});

// User signup endpoint
app.post("/make-server-b245be9a/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || '' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    console.log('User created successfully:', data.user?.id);
    return c.json({ 
      user: data.user,
      message: "Account created successfully" 
    });

  } catch (error) {
    console.error('Server error during signup:', error);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// User signin endpoint
app.post("/make-server-b245be9a/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Create a client with anon key for auth operations
    const authClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
    );

    const { data, error } = await authClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Signin error:', error);
      return c.json({ error: error.message }, 400);
    }

    console.log('User signed in successfully:', data.user?.id);
    return c.json({
      user: data.user,
      session: data.session,
      message: "Signed in successfully"
    });

  } catch (error) {
    console.error('Server error during signin:', error);
    return c.json({ error: "Internal server error during signin" }, 500);
  }
});

// Google OAuth initiation endpoint
app.post("/make-server-b245be9a/auth/google", async (c) => {
  try {
    // Create a client with anon key for OAuth
    const authClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
    );

    const { data, error } = await authClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${Deno.env.get('SUPABASE_URL')}/auth/v1/callback`
      }
    });

    if (error) {
      console.error('Google OAuth error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ url: data.url });

  } catch (error) {
    console.error('Server error during Google OAuth:', error);
    return c.json({ error: "Internal server error during Google OAuth" }, 500);
  }
});

// Session validation endpoint
app.post("/make-server-b245be9a/validate-session", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.error('Session validation error:', error);
      return c.json({ error: "Invalid session" }, 401);
    }

    return c.json({ user, valid: true });

  } catch (error) {
    console.error('Server error during session validation:', error);
    return c.json({ error: "Internal server error during session validation" }, 500);
  }
});

// Auth middleware for protected routes
const requireAuth = async (c: any, next: any) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return c.json({ error: "Unauthorized - No access token" }, 401);
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (!user || error) {
    return c.json({ error: "Unauthorized - Invalid token" }, 401);
  }

  c.set('user', user);
  await next();
};

// ============= CMS PORTFOLIO ROUTES =============

// Get all portfolio projects
app.get("/make-server-b245be9a/portfolio", requireAuth, async (c) => {
  try {
    const projects = await kv.getByPrefix('portfolio:');
    return c.json({ projects: projects || [] });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return c.json({ error: "Failed to fetch portfolio projects" }, 500);
  }
});

// Create new portfolio project
app.post("/make-server-b245be9a/portfolio", requireAuth, async (c) => {
  try {
    const { title, description, category, technologies, image, demoUrl, codeUrl, featured = false } = await c.req.json();
    
    if (!title || !description || !category) {
      return c.json({ error: "Title, description, and category are required" }, 400);
    }

    const projectId = `portfolio:${Date.now()}`;
    const project = {
      id: projectId,
      title,
      description,
      category,
      technologies: technologies || [],
      image: image || '',
      demoUrl: demoUrl || '',
      codeUrl: codeUrl || '',
      featured,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(projectId, project);
    
    console.log('Portfolio project created:', projectId);
    return c.json({ project, message: "Portfolio project created successfully" });
  } catch (error) {
    console.error('Error creating portfolio project:', error);
    return c.json({ error: "Failed to create portfolio project" }, 500);
  }
});

// Update portfolio project
app.put("/make-server-b245be9a/portfolio/:id", requireAuth, async (c) => {
  try {
    const projectId = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(projectId);
    if (!existing) {
      return c.json({ error: "Portfolio project not found" }, 404);
    }

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(projectId, updated);
    
    console.log('Portfolio project updated:', projectId);
    return c.json({ project: updated, message: "Portfolio project updated successfully" });
  } catch (error) {
    console.error('Error updating portfolio project:', error);
    return c.json({ error: "Failed to update portfolio project" }, 500);
  }
});

// Delete portfolio project
app.delete("/make-server-b245be9a/portfolio/:id", requireAuth, async (c) => {
  try {
    const projectId = c.req.param('id');
    
    const existing = await kv.get(projectId);
    if (!existing) {
      return c.json({ error: "Portfolio project not found" }, 404);
    }

    await kv.del(projectId);
    
    console.log('Portfolio project deleted:', projectId);
    return c.json({ message: "Portfolio project deleted successfully" });
  } catch (error) {
    console.error('Error deleting portfolio project:', error);
    return c.json({ error: "Failed to delete portfolio project" }, 500);
  }
});

// ============= CMS TESTIMONIALS ROUTES =============

// Get all testimonials
app.get("/make-server-b245be9a/testimonials", requireAuth, async (c) => {
  try {
    const testimonials = await kv.getByPrefix('testimonial:');
    return c.json({ testimonials: testimonials || [] });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return c.json({ error: "Failed to fetch testimonials" }, 500);
  }
});

// Create new testimonial
app.post("/make-server-b245be9a/testimonials", requireAuth, async (c) => {
  try {
    const { name, role, company, content, image, rating = 5, featured = false } = await c.req.json();
    
    if (!name || !content) {
      return c.json({ error: "Name and content are required" }, 400);
    }

    const testimonialId = `testimonial:${Date.now()}`;
    const testimonial = {
      id: testimonialId,
      name,
      role: role || '',
      company: company || '',
      content,
      image: image || '',
      rating,
      featured,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(testimonialId, testimonial);
    
    console.log('Testimonial created:', testimonialId);
    return c.json({ testimonial, message: "Testimonial created successfully" });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return c.json({ error: "Failed to create testimonial" }, 500);
  }
});

// Update testimonial
app.put("/make-server-b245be9a/testimonials/:id", requireAuth, async (c) => {
  try {
    const testimonialId = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(testimonialId);
    if (!existing) {
      return c.json({ error: "Testimonial not found" }, 404);
    }

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(testimonialId, updated);
    
    console.log('Testimonial updated:', testimonialId);
    return c.json({ testimonial: updated, message: "Testimonial updated successfully" });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return c.json({ error: "Failed to update testimonial" }, 500);
  }
});

// Delete testimonial
app.delete("/make-server-b245be9a/testimonials/:id", requireAuth, async (c) => {
  try {
    const testimonialId = c.req.param('id');
    
    const existing = await kv.get(testimonialId);
    if (!existing) {
      return c.json({ error: "Testimonial not found" }, 404);
    }

    await kv.del(testimonialId);
    
    console.log('Testimonial deleted:', testimonialId);
    return c.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return c.json({ error: "Failed to delete testimonial" }, 500);
  }
});

// ============= CMS CONTACTS ROUTES =============

// Get all contact submissions
app.get("/make-server-b245be9a/contacts", requireAuth, async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact:');
    return c.json({ contacts: contacts || [] });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return c.json({ error: "Failed to fetch contact submissions" }, 500);
  }
});

// Create new contact submission
app.post("/make-server-b245be9a/contacts", async (c) => {
  try {
    const { name, email, phone, company, message, service, budget } = await c.req.json();
    
    if (!name || !email || !message) {
      return c.json({ error: "Name, email, and message are required" }, 400);
    }

    const contactId = `contact:${Date.now()}`;
    const contact = {
      id: contactId,
      name,
      email,
      phone: phone || '',
      company: company || '',
      message,
      service: service || 'General Inquiry',
      budget: budget || '',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(contactId, contact);
    
    console.log('Contact submission created:', contactId);
    return c.json({ contact, message: "Contact submission received successfully" });
  } catch (error) {
    console.error('Error creating contact submission:', error);
    return c.json({ error: "Failed to create contact submission" }, 500);
  }
});

// Update contact status
app.put("/make-server-b245be9a/contacts/:id", requireAuth, async (c) => {
  try {
    const contactId = c.req.param('id');
    const { status, notes } = await c.req.json();
    
    const existing = await kv.get(contactId);
    if (!existing) {
      return c.json({ error: "Contact submission not found" }, 404);
    }

    const updated = {
      ...existing,
      status: status || existing.status,
      notes: notes || existing.notes || '',
      updatedAt: new Date().toISOString()
    };

    await kv.set(contactId, updated);
    
    console.log('Contact submission updated:', contactId);
    return c.json({ contact: updated, message: "Contact submission updated successfully" });
  } catch (error) {
    console.error('Error updating contact submission:', error);
    return c.json({ error: "Failed to update contact submission" }, 500);
  }
});

// ============= CMS SERVICES ROUTES =============

// Get all services
app.get("/make-server-b245be9a/services", requireAuth, async (c) => {
  try {
    const services = await kv.getByPrefix('service:');
    return c.json({ services: services || [] });
  } catch (error) {
    console.error('Error fetching services:', error);
    return c.json({ error: "Failed to fetch services" }, 500);
  }
});

// Create/Update service
app.post("/make-server-b245be9a/services", requireAuth, async (c) => {
  try {
    const { name, description, features, pricing, category, active = true } = await c.req.json();
    
    if (!name || !description) {
      return c.json({ error: "Name and description are required" }, 400);
    }

    const serviceId = `service:${name.toLowerCase().replace(/\s+/g, '-')}`;
    const service = {
      id: serviceId,
      name,
      description,
      features: features || [],
      pricing: pricing || '',
      category: category || 'general',
      active,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(serviceId, service);
    
    console.log('Service created/updated:', serviceId);
    return c.json({ service, message: "Service saved successfully" });
  } catch (error) {
    console.error('Error saving service:', error);
    return c.json({ error: "Failed to save service" }, 500);
  }
});

// ============= ANALYTICS ROUTES =============

// Get dashboard analytics
app.get("/make-server-b245be9a/analytics", requireAuth, async (c) => {
  try {
    // Get counts of different content types
    const portfolioProjects = await kv.getByPrefix('portfolio:');
    const testimonials = await kv.getByPrefix('testimonial:');
    const contacts = await kv.getByPrefix('contact:');
    const services = await kv.getByPrefix('service:');

    // Calculate basic analytics
    const analytics = {
      portfolio: {
        total: portfolioProjects.length,
        featured: portfolioProjects.filter((p: any) => p.featured).length
      },
      testimonials: {
        total: testimonials.length,
        featured: testimonials.filter((t: any) => t.featured).length,
        avgRating: testimonials.length > 0 
          ? testimonials.reduce((sum: number, t: any) => sum + (t.rating || 5), 0) / testimonials.length
          : 0
      },
      contacts: {
        total: contacts.length,
        new: contacts.filter((c: any) => c.status === 'new').length,
        inProgress: contacts.filter((c: any) => c.status === 'in-progress').length,
        completed: contacts.filter((c: any) => c.status === 'completed').length
      },
      services: {
        total: services.length,
        active: services.filter((s: any) => s.active).length
      }
    };

    return c.json({ analytics });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return c.json({ error: "Failed to fetch analytics" }, 500);
  }
});

Deno.serve(app.fetch);