import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Tipos
interface RouterContextType {
    currentPath: string;
    navigate: (path: string) => void;
    searchParams: URLSearchParams;
}

interface RouterProps {
    children: ReactNode;
}

interface RouteProps {
    path: string;
    element: ReactNode;
}

interface LinkProps {
    to: string;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface NavigateProps {
    to: string;
    replace?: boolean;
}

// Contexto do Router
const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Hook para usar o router
export const useRouter = () => {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error('useRouter must be used within a Router');
    }
    return context;
};

// Hook customizado para navegação
export const useNavigate = () => {
    const { navigate } = useRouter();
    return navigate;
};

// Hook customizado para search params
export const useSearchParams = (): [URLSearchParams, (params: URLSearchParams) => void] => {
    const { searchParams, navigate, currentPath } = useRouter();

    const setSearchParams = (params: URLSearchParams) => {
        const newPath = currentPath.split('?')[0] + '?' + params.toString();
        navigate(newPath);
    };

    return [searchParams, setSearchParams];
};

// Componente Router principal
export const Router: React.FC<RouterProps> = ({ children }) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname + window.location.search);
    const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

    const navigate = (path: string) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path);

        // Atualizar search params
        const [, search] = path.split('?');
        setSearchParams(new URLSearchParams(search || ''));
    };

    // Listener para o botão voltar/avançar do navegador
    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname + window.location.search);
            setSearchParams(new URLSearchParams(window.location.search));
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <RouterContext.Provider value={{ currentPath, navigate, searchParams }}>
            {children}
        </RouterContext.Provider>
    );
};

// Componente Routes
export const Routes: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { currentPath } = useRouter();
    const pathname = currentPath.split('?')[0];

    // Encontrar a rota correspondente
    const routes = React.Children.toArray(children) as React.ReactElement<RouteProps>[];

    for (const route of routes) {
        if (route.props.path === '*') {
            // Rota 404 - renderizar se nenhuma outra rota corresponder
            continue;
        }

        if (route.props.path === pathname) {
            return <>{route.props.element}</>;
        }
    }

    // Se nenhuma rota corresponder, procurar pela rota 404
    const notFoundRoute = routes.find(route => route.props.path === '*');
    if (notFoundRoute) {
        return <>{notFoundRoute.props.element}</>;
    }

    return null;
};

// Componente Route
export const Route: React.FC<RouteProps> = ({ element }) => {
    return <>{element}</>;
};

// Componente Link
export const Link: React.FC<LinkProps> = ({ to, children, className, style, onClick }) => {
    const { navigate } = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (onClick) {
            onClick(e);
        }
        navigate(to);
    };

    return (
        <a href={to} onClick={handleClick} className={className} style={style}>
            {children}
        </a>
    );
};

// Componente Navigate (para redirecionamentos)
export const Navigate: React.FC<NavigateProps> = ({ to, replace = false }) => {
    const { navigate } = useRouter();

    useEffect(() => {
        if (replace) {
            window.history.replaceState({}, '', to);
        }
        navigate(to);
    }, [to, replace, navigate]);

    return null;
};

// Alias para compatibilidade
export const BrowserRouter = Router;
