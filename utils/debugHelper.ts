
import { supabase } from '@/app/integrations/supabase/client';

/**
 * Debug helper utilities for troubleshooting
 */

export const debugHelper = {
  /**
   * Check Supabase connection
   */
  async checkSupabaseConnection() {
    try {
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      if (error) {
        console.error('❌ Supabase connection error:', error);
        return false;
      }
      console.log('✅ Supabase connected successfully');
      return true;
    } catch (error) {
      console.error('❌ Supabase connection failed:', error);
      return false;
    }
  },

  /**
   * Check authentication status
   */
  async checkAuth() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error('❌ Auth check error:', error);
        return null;
      }
      if (session) {
        console.log('✅ User authenticated:', session.user.email);
      } else {
        console.log('ℹ️ No active session');
      }
      return session;
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      return null;
    }
  },

  /**
   * Check OpenAI API key
   */
  checkOpenAIKey() {
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      console.warn('⚠️ OpenAI API key not configured');
      return false;
    }
    if (apiKey === 'your_openai_api_key_here') {
      console.warn('⚠️ OpenAI API key is placeholder value');
      return false;
    }
    console.log('✅ OpenAI API key configured');
    return true;
  },

  /**
   * Check Realtime connection
   */
  async checkRealtime() {
    try {
      const channel = supabase.channel('debug-test');
      const status = await new Promise((resolve) => {
        channel.subscribe((status) => {
          resolve(status);
        });
      });
      await supabase.removeChannel(channel);
      console.log('✅ Realtime connection:', status);
      return status === 'SUBSCRIBED';
    } catch (error) {
      console.error('❌ Realtime connection failed:', error);
      return false;
    }
  },

  /**
   * Run all checks
   */
  async runAllChecks() {
    console.log('🔍 Running debug checks...\n');

    const results = {
      supabase: await this.checkSupabaseConnection(),
      auth: (await this.checkAuth()) !== null,
      openai: this.checkOpenAIKey(),
      realtime: await this.checkRealtime(),
    };

    console.log('\n📊 Debug Results:');
    console.log('Supabase:', results.supabase ? '✅' : '❌');
    console.log('Auth:', results.auth ? '✅' : '❌');
    console.log('OpenAI:', results.openai ? '✅' : '⚠️');
    console.log('Realtime:', results.realtime ? '✅' : '❌');

    return results;
  },

  /**
   * Log environment info
   */
  logEnvironment() {
    console.log('🌍 Environment Info:');
    console.log('Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL ? '✅' : '❌');
    console.log('Supabase Key:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ? '✅' : '❌');
    console.log('OpenAI Key:', process.env.EXPO_PUBLIC_OPENAI_API_KEY ? '✅' : '❌');
  },

  /**
   * Test database query
   */
  async testDatabaseQuery() {
    try {
      const { data, error } = await supabase.from('skills').select('*').limit(5);
      if (error) {
        console.error('❌ Database query error:', error);
        return false;
      }
      console.log('✅ Database query successful, found', data?.length, 'skills');
      return true;
    } catch (error) {
      console.error('❌ Database query failed:', error);
      return false;
    }
  },
};

// Auto-run checks in development
if (__DEV__) {
  setTimeout(() => {
    debugHelper.logEnvironment();
  }, 1000);
}
