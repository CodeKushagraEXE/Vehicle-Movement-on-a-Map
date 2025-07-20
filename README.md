# Vehicle Movement on a Map

A modern, interactive web application for real-time vehicle tracking and route simulation. Built with React, TypeScript, and Google Maps API.

## Features

- 🗺️ **Interactive Google Maps Integration** - Real-time map display with vehicle tracking
- 🚗 **Vehicle Movement Simulation** - Smooth vehicle animation along predefined routes
- 🎮 **Playback Controls** - Play, pause, reset, and slider controls for route playback
- 🌙 **Dark/Light Mode Toggle** - Modern toggle switch with persistent preferences
- 📊 **Real-time Statistics** - Speed, distance, battery, and status information
- ⚙️ **Configuration Panel** - Vehicle and date selection with route filtering
- 📱 **Responsive Design** - Works seamlessly across different screen sizes
- 💾 **Local Storage** - Remembers user preferences and settings

## Screenshot

![Vehicle Movement Application](screenshot.png)

*The application features a dark-themed interface with Google Maps integration, real-time vehicle tracking, playback controls, and an information panel displaying vehicle statistics.*

## Technologies Used

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Google Maps API** - Map integration and geolocation services
- **@react-google-maps/api** - React wrapper for Google Maps

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Maps API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Vehicle-Movement-on-a-Map.git
cd Vehicle-Movement-on-a-Map
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google Maps API key:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Select Vehicle**: Choose from available vehicles (CAR-1, TRUCK-1)
2. **Select Date**: Choose between "Today" and "Yesterday" routes
3. **Apply Route**: Click the "APPLY" button to load the selected route
4. **Control Playback**: Use the play/pause buttons and slider to control vehicle movement
5. **View Information**: Click the info button or vehicle marker to view detailed statistics
6. **Toggle Theme**: Use the dark/light mode toggle in the top-right corner

## Project Structure

```
src/
├── components/
│   ├── MapView.tsx          # Google Maps integration
│   ├── Controls.tsx         # Playback controls
│   ├── ConfigPanel.tsx      # Vehicle and date selection
│   └── InfoPanel.tsx        # Vehicle information display
├── assets/
│   ├── car.png             # Vehicle marker icon
│   └── dummy-route.json    # Sample route data
├── App.tsx                 # Main application component
└── main.tsx               # Application entry point
```

## Features in Detail

### Map Integration
- Google Maps with custom vehicle markers
- Route polyline visualization
- Numbered waypoints for route tracking
- Smooth vehicle movement animation

### Playback Controls
- Play/Pause functionality
- Reset to start position
- Progress slider with real-time updates
- Current position indicator

### Vehicle Information
- Real-time speed calculation
- Total distance tracking
- Battery level monitoring
- Vehicle status (RUNNING/STOPPED)
- Current coordinates and timestamp

### Configuration
- Vehicle selection dropdown
- Date-based route filtering
- Persistent dark/light mode preference
- Responsive layout design

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Maps Platform for map services
- React team for the amazing framework
- Tailwind CSS for the utility-first styling approach

