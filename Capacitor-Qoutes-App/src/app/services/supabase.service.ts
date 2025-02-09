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

  async selectQoutes(Qoutes: any) {
    try {
      const { data, error } = await this.supabase
        .from('Qoutes_table')
        .select('*')
        .order('author', { ascending: true })
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