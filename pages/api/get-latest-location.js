// pages/api/get-latest-location.js
import supabase from '../../lib/supabase';

export default async function handler(req, res) {
  try {
    // Fetch the latest GPS location from Supabase
    const { data, error } = await supabase
      .from('gps_data')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Send the latest location as response
    return res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching GPS data:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
