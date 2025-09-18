import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

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
app.get("/make-server-0639f094/health", (c) => {
  return c.json({ status: "ok" });
});

// User authentication and profile routes
app.post("/make-server-0639f094/users", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, password } = body;
    
    const userId = crypto.randomUUID();
    const user = {
      id: userId,
      name,
      email,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    await kv.set(`user:${userId}`, user);
    await kv.set(`email:${email}`, userId);
    
    return c.json({ user });
  } catch (error) {
    console.log('User creation error:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

app.get("/make-server-0639f094/users/:id", async (c) => {
  try {
    const userId = c.req.param('id');
    const user = await kv.get(`user:${userId}`);
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    return c.json({ user });
  } catch (error) {
    console.log('User fetch error:', error);
    return c.json({ error: 'Failed to fetch user' }, 500);
  }
});

// Journal entries routes
app.post("/make-server-0639f094/journal", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, mood, content, gratitude, goals } = body;
    
    const entryId = crypto.randomUUID();
    const entry = {
      id: entryId,
      userId,
      mood,
      content,
      gratitude: gratitude || [],
      goals: goals || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`journal:${entryId}`, entry);
    await kv.set(`user_journal:${userId}:${entryId}`, entryId);
    
    return c.json({ entry });
  } catch (error) {
    console.log('Journal entry creation error:', error);
    return c.json({ error: 'Failed to create journal entry' }, 500);
  }
});

app.get("/make-server-0639f094/journal/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const limit = parseInt(c.req.query('limit') || '10');
    
    const userEntries = await kv.getByPrefix(`user_journal:${userId}:`);
    const entryIds = userEntries.map(entry => entry.value).slice(0, limit);
    
    const entries = await Promise.all(
      entryIds.map(id => kv.get(`journal:${id}`))
    );
    
    const validEntries = entries.filter(entry => entry !== null)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return c.json({ entries: validEntries });
  } catch (error) {
    console.log('Journal entries fetch error:', error);
    return c.json({ error: 'Failed to fetch journal entries' }, 500);
  }
});

// Booking appointments routes
app.post("/make-server-0639f094/appointments", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, counselorId, date, time, sessionType, reason, isUrgent } = body;
    
    const appointmentId = crypto.randomUUID();
    const appointment = {
      id: appointmentId,
      userId,
      counselorId,
      date,
      time,
      sessionType,
      reason: reason || '',
      isUrgent: isUrgent || false,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`appointment:${appointmentId}`, appointment);
    await kv.set(`user_appointments:${userId}:${appointmentId}`, appointmentId);
    
    return c.json({ appointment });
  } catch (error) {
    console.log('Appointment creation error:', error);
    return c.json({ error: 'Failed to create appointment' }, 500);
  }
});

app.get("/make-server-0639f094/appointments/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    
    const userAppointments = await kv.getByPrefix(`user_appointments:${userId}:`);
    const appointmentIds = userAppointments.map(entry => entry.value);
    
    const appointments = await Promise.all(
      appointmentIds.map(id => kv.get(`appointment:${id}`))
    );
    
    const validAppointments = appointments.filter(appointment => appointment !== null)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return c.json({ appointments: validAppointments });
  } catch (error) {
    console.log('Appointments fetch error:', error);
    return c.json({ error: 'Failed to fetch appointments' }, 500);
  }
});

// AI Chat history routes
app.post("/make-server-0639f094/chat", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, message, response, urgent } = body;
    
    const chatId = crypto.randomUUID();
    const chat = {
      id: chatId,
      userId,
      userMessage: message,
      aiResponse: response,
      urgent: urgent || false,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`chat:${chatId}`, chat);
    await kv.set(`user_chat:${userId}:${chatId}`, chatId);
    
    return c.json({ chat });
  } catch (error) {
    console.log('Chat history creation error:', error);
    return c.json({ error: 'Failed to save chat history' }, 500);
  }
});

// Wellness data routes (mood, hydration, etc.)
app.post("/make-server-0639f094/wellness", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, type, value, date } = body;
    
    const dataId = crypto.randomUUID();
    const wellnessData = {
      id: dataId,
      userId,
      type, // 'mood', 'hydration', 'exercise', etc.
      value,
      date: date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`wellness:${dataId}`, wellnessData);
    await kv.set(`user_wellness:${userId}:${type}:${wellnessData.date}`, dataId);
    
    return c.json({ data: wellnessData });
  } catch (error) {
    console.log('Wellness data creation error:', error);
    return c.json({ error: 'Failed to save wellness data' }, 500);
  }
});

app.get("/make-server-0639f094/wellness/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const type = c.req.query('type');
    const days = parseInt(c.req.query('days') || '7');
    
    const prefix = type ? `user_wellness:${userId}:${type}:` : `user_wellness:${userId}:`;
    const userWellnessData = await kv.getByPrefix(prefix);
    
    const dataIds = userWellnessData.map(entry => entry.value).slice(0, days);
    const wellnessData = await Promise.all(
      dataIds.map(id => kv.get(`wellness:${id}`))
    );
    
    const validData = wellnessData.filter(data => data !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return c.json({ data: validData });
  } catch (error) {
    console.log('Wellness data fetch error:', error);
    return c.json({ error: 'Failed to fetch wellness data' }, 500);
  }
});

// Admin analytics routes
app.get("/make-server-0639f094/analytics/overview", async (c) => {
  try {
    // Get total users
    const allUsers = await kv.getByPrefix('user:');
    const totalUsers = allUsers.length;
    
    // Get recent chat sessions
    const recentChats = await kv.getByPrefix('chat:');
    const totalChatSessions = recentChats.length;
    
    // Get appointments
    const allAppointments = await kv.getByPrefix('appointment:');
    const totalAppointments = allAppointments.length;
    
    // Get journal entries
    const allJournalEntries = await kv.getByPrefix('journal:');
    const totalJournalEntries = allJournalEntries.length;
    
    const analytics = {
      totalUsers,
      totalChatSessions,
      totalAppointments,
      totalJournalEntries,
      lastUpdated: new Date().toISOString()
    };
    
    return c.json({ analytics });
  } catch (error) {
    console.log('Analytics fetch error:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

Deno.serve(app.fetch);