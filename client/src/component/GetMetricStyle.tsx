import { CloudRain, Thermometer, Wind, type LucideIcon } from 'lucide-react';

interface MetricStyle {
    label: string;
    unit: string;
    icon: LucideIcon;
    bgColor: string;
    iconColor: string;
    progressColor: string;
}

export const getMetricStyle = (type: 'temperature' | 'precipitation' | 'wind_speed'): MetricStyle => {
    switch (type) {
        case 'temperature':
            return {
                label: 'Temperature',
                unit: '°C',
                icon: Thermometer,
                bgColor: 'bg-orange-50 border-orange-100',
                iconColor: 'text-orange-500 bg-orange-100',
                progressColor: '#f97316', // Tailwind orange-500
            };
        case 'precipitation':
            return {
                label: 'Precipitation',
                unit: ' inch',
                icon: CloudRain,
                bgColor: 'bg-blue-50 border-blue-100',
                iconColor: 'text-blue-500 bg-blue-100',
                progressColor: '#3b82f6', // Tailwind blue-500
            };
        case 'wind_speed':
            return {
                label: 'Wind Speed',
                unit: ' mph',
                icon: Wind,
                bgColor: 'bg-emerald-50 border-emerald-100',
                iconColor: 'text-emerald-500 bg-emerald-100',
                progressColor: '#10b981', // Tailwind emerald-500
            };
    }
};
