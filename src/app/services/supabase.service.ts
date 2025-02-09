import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async selectQoutes() {
    try {
      const { data, error } = await this.supabase
        .from('Qoutes')
        .select('*')
        .order('RANDOM()', { ascending: false })
        .limit(25000)
      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}