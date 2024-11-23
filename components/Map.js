import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import supabase from '../lib/supabase';
import 'leaflet/dist/leaflet.css';
import { FaLocationArrow } from 'react-icons/fa';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1); // Default zoom level

  const fetchLatestLocation = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gps_data')
        .select('*')
        .order('timestamp', { ascending: false }) // Get the most recent data
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching GPS data:', error);
      } else if (data) {
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
        setZoomLevel(16); // Zoom in when location is found
      } else {
        console.warn('No data found in gps_data table.');
      }
    } catch (error) {
      console.error('Unexpected error fetching GPS data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestLocation();
  }, []);

  const defaultPosition = [0, 0]; // Example: London
  const position = location ? [location.latitude, location.longitude] : defaultPosition;

  const CenterMap = () => {
    const map = useMap();
    if (location) {
      map.setView(position, zoomLevel);
    }
    return null;
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
        >
          Loading GPS Location...
        </div>
      )}

      <MapContainer
        center={position}
        zoom={zoomLevel}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Leaflet'
        />
        {location && (
          <Marker
            position={[location.latitude, location.longitude]}
            icon={new Icon({
              iconUrl: '/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              Latitude: {location.latitude} <br /> Longitude: {location.longitude}
            </Popup>
          </Marker>
        )}

        <CenterMap />
        <ZoomControl position="topleft" />
      </MapContainer>

      {/* Floating Button to Focus on Location */}
      <div
        style={{
          position: 'absolute',
          bottom: '100px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => {
            fetchLatestLocation();
          }}
          style={{
            backgroundColor: '#fbb56c',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            padding: '20px',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60px',
            height: '60px',
          }}
        >
          <FaLocationArrow />
        </button>
      </div>
    </div>
  );
};

export default Map;
