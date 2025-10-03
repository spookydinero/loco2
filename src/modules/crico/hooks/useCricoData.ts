import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { CricoItem, CricoState } from '../types'

export const useCricoData = () => {
  const [state, setState] = useState<CricoState>({
    items: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    fetchCricoData()
  }, [])

  const fetchCricoData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      // Replace with your actual Supabase table query
      const { data, error } = await supabase
        .from('crico_items')
        .select('*')
        .order('createdAt', { ascending: false })

      if (error) throw error

      setState({
        items: data || [],
        loading: false,
        error: null,
      })
    } catch (error) {
      setState({
        items: [],
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      })
    }
  }

  return {
    ...state,
    refetch: fetchCricoData,
  }
}


