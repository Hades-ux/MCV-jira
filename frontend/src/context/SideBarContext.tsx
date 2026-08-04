import { createContext, useContext, useState, type ReactNode } from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | null>(null);

interface SideBarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SideBarProviderProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((perv => !perv))

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }

  return context;
};