type TSidePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const SidePanel = ({ isOpen, onClose, children }: TSidePanelProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-500/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Side Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-2xl bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </>
  );
}; 