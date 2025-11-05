interface SplitViewProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

export function SplitView({ leftPanel, rightPanel }: SplitViewProps) {
  return (
    <div className="flex h-screen">
      {/* Left Panel - Dashboard Area */}
      <div className="flex-1 border-r border-border/50 bg-white relative">
        {leftPanel}
      </div>

      {/* Right Panel - Chat Area */}
      <div className="flex-1 bg-white relative">
        {rightPanel}
      </div>
    </div>
  );
}
