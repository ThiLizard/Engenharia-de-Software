import React from 'react';

interface IconProps {
    size?: number | string;
    color?: string;
    className?: string;
    strokeWidth?: number;
}

const IconBase: React.FC<IconProps & { children: React.ReactNode }> = ({
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    children
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {children}
    </svg>
);

export const ArrowRight: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </IconBase>
);

export const ShieldCheck: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
    </IconBase>
);

export const AlertCircle: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
    </IconBase>
);

export const Activity: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </IconBase>
);

export const HeartPulse: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M19 14c1.49-1.28 3.6-2.34 4.54-2.34 6.89 0 13.15 4.59 13.15 10.32 0 5-4.5 9-11 11-6.1-2.35-8-4-8-7" transform="scale(0.5) translate(12,12)" />
        <path d="M19 14c-1.55-1.28-3.6-2.34-4.54-2.34-6.89 0-13.15 4.59-13.15 10.32 0 5 4.5 9 11 11 6.1-2.35 8-4 8-7" transform="scale(0.5) translate(12,12)" />
        {/* Simplified HeartPulse path to match typical icon look properly in 24x24 */}
        <path d="M19 14c1.49-1.28 3.6-2.34 4.54-2.34 0 0 .16-.07.16-.07C23.2 12 22 17.5 19 19.5c-3 2-6.5-1.5-6.5-1.5S9 20 6 18c-3-2-2-6.5-1.7-7.91 0 0 .16.07.16.07.94 0 3.05 1.06 4.54 2.34" opacity="0" />
        <path d="M19 14c1.49-1.28 3.6-2.34 4.54-2.34 6.89 0 13.15 4.59 13.15 10.32 0 5-4.5 9-11 11-6.1-2.35-8-4-8-7" style={{ display: 'none' }} />

        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
        <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </IconBase>
);

export const Thermometer: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </IconBase>
);

export const Save: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
    </IconBase>
);

export const XCircle: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </IconBase>
);

export const Send: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </IconBase>
);

export const Paperclip: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </IconBase>
);

export const AlertTriangle: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </IconBase>
);

export const FileText: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
    </IconBase>
);

export const MessageSquare: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </IconBase>
);

export const TrendingUp: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </IconBase>
);

export const Home: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </IconBase>
);

export const LogOut: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </IconBase>
);

export const User: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </IconBase>
);

export const Menu: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </IconBase>
);

export const X: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <line x1="18" x2="6" y1="6" y2="18" />
        <line x1="6" x2="18" y1="6" y2="18" />
    </IconBase>
);
