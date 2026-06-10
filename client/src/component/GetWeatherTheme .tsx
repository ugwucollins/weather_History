import { Cloud, CloudRain, HelpCircle, Sun } from 'lucide-react';
import { type ReactElement } from 'react';
interface WeatherTheme {
    label?: string;
    gradient?: string;
    textColor?: string;
    icon?: ReactElement;
}

export const GetWeatherTheme = (code: number): WeatherTheme => {
    // Sunny codes: 0 = Clear sky, 1 = Mainly clear
    if (code === 0 || code === 1) {
        return {
            label: 'Sunny',
            gradient: 'from-amber-400 to-orange-500',
            textColor: 'text-amber-900',
            icon: <Sun size={120} />
        };
    }

    // Cloudy codes: 2 = Partly cloudy, 3 = Overcast
    if (code === 2 || code === 3) {
        return {
            label: 'Cloudy',
            gradient: 'from-slate-300 to-blue-400',
            textColor: 'text-slate-900',
            icon: <Cloud size={120} />
        };
    }

    // Rainy codes: 51-55 (Drizzle), 61-65 (Rain), 80-82 (Showers)
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
        return {
            label: 'Rainy',
            gradient: 'from-blue-500 to-indigo-600',
            textColor: 'text-blue-50',
            icon: <CloudRain size={120} />
        };
    }

    // Fallback default structure
    return {
        label: 'Unknown',
        gradient: 'from-gray-400 to-gray-600',
        textColor: 'text-white',
        icon: <HelpCircle size={120} />
    };
};
